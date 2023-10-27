/* eslint-disable react/no-unused-state */
/* eslint-disable react/jsx-fragments */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable react/no-did-update-set-state */
import React, { createRef } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Keyboard,
  Platform,
  Image,
  FlatList,
} from 'react-native';
import * as consts from '../../../utils/consts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDIcon from 'react-native-vector-icons/AntDesign';
import EmojiBoard from 'react-native-emoji-board'
import { CometChat } from '@cometchat-pro/react-native-chat';
import Sound from 'react-native-sound';

import styles from './styles';

import {
  CometChatCreatePoll,
  CometChatSmartReplyPreview,
} from '../../Messages/Extensions';
import CometChatStickerKeyboard from '../CometChatStickerKeyboard';
import ComposerActions from './composerActions';

import { outgoingMessageAlert } from '../../../resources/audio';
import * as enums from '../../../utils/enums';
import * as actions from '../../../utils/actions';
import { heightRatio } from '../../../utils/consts';
import { logger } from '../../../utils/common';
import { CometChatContext } from '../../../utils/CometChatContext';
import { attachSquare, checkCircle, gameboy, send, smile, circle, forwardArrow } from '../../../../../assets';
import { deviceWidth, getStorageData } from 'framework/src/Utilities';
import { CutomAlertFail } from "../../../../../../../src/CustomAlert";
export const baseURL = require("framework/src/config.js").baseURL;
import { style } from "../../../../../../../src/CustomFonts";
import { EmojiButton, ModalPicker } from 'emoji-mart-native'

export default class CometChatMessageComposer extends React.PureComponent {
  static contextType = CometChatContext;
  slideRef = createRef();
  userChatId;
  constructor(props) {
    super(props);

    this.imageUploaderRef = React.createRef();
    this.fileUploaderRef = React.createRef();
    this.audioUploaderRef = React.createRef();
    this.videoUploaderRef = React.createRef();
    this.messageInputRef = React.createRef();

    this.node = React.createRef();
    this.isTyping = false;

    this.state = {
      showFilePicker: false,
      messageInput: '',
      messageType: '',
      emojiViewer: false,
      emojiBoardViewer: false,
      createPoll: false,
      messageToBeEdited: '',
      replyPreview: null,
      stickerViewer: false,
      composerActionsVisible: false,
      user: null,
      keyboardActivity: false,
      restrictions: null,
      gamePlay: false,
      isLastQuestion: false,
      gamePlayStatus: {},
      currentIndex: 0,
      selectedQue1: [],
      questionData: [],
      isGameStart: false,
      isLoader: false,
      answerData: {
        question: {
          "option": "",
          "friend_id": 0,
          "question_bank_id": 0
        }
      },
      totalQue: 0,
      emojiBoardHeight: 0,
      emojiBoardWidth: 0,
    };
    Sound.setCategory('Ambient', true);
    this.audio = new Sound(outgoingMessageAlert);
    CometChat.getLoggedinUser()
      .then((user) => (this.loggedInUser = user))
      .catch((error) => {
        const errorCode = error?.message || 'ERROR';
        this.props?.showMessage('error', errorCode);
      });
    this.userChatId = this.props.navigation.state?.params?.item
    const didFocusListener = this.props.navigation.addListener(
      'didFocus',
      () => {
        this.setState({ gamePlay: false })
        this.checkStatusOfUser()
      }
    );
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
    this.checkRestrictions();
  }

  onPressGame = () => {
    if (this.state.gamePlayStatus?.user_game_status?.data?.attributes?.is_friends) {
      this.getQuestionLevel2()
    } else {
      this.state.gamePlayStatus?.status ? this.userStatus() : this.onPressGameStart();
      console.log("gamePlayStatus", this.state.gamePlayStatus?.status);
    }
  };

  onPressGamePlay = () => {
    Keyboard.dismiss();
    this.setState({ gamePlay: !this.state.gamePlay, emojiViewer: false, emojiBoardViewer: false }, () => {
      if (this.state.gamePlay) {
        this.checkStatusOfUser()
        this.getQuestionApi()
      }
    });
  }

  onPressRight = async () => {
    console.log("currentIndex", this.state.currentIndex, this.state.questionData.length);
    if (this.state.currentIndex === this.state.questionData.length - 1) {
      this.setState({ isLastQuestion: true });
      await this.ansQuestionApi();
    } else if (this.state.answerData?.question?.option !== "") {
      await this.ansQuestionApi();
    } else {
      CutomAlertFail("Please select the option");
    }
  };

  userStatus = () => {
    const checkStatus = this.state.gamePlayStatus?.user_game_status?.data?.attributes
    console.log("checkStatus", checkStatus);
    if (checkStatus?.user_game_status) {
      if (checkStatus?.friends_game_status) {
        this.props.navigation.navigate("Level1Result",
          { friendId: this.userChatId?.uid });
      } else {
        this.props.navigation.navigate("NotifiedFriend")
      }
    } else {
      this.setState({ isGameStart: true });
      this.getQuestionApi()
    }
  }

  checkStatusOfUser = async () => {
    this.setState({ isLoader: true });
    const token = await getStorageData('token');
    const header = {
      token: token,
    };

    fetch(baseURL + '/bx_block_game/user_game_status?game[friend_id]=' + this.userChatId?.uid, {
      method: 'GET',
      headers: header,
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ gamePlayStatus: responseJson });
        this.setState({ userGameScore: responseJson?.user_game_status?.data?.attributes?.user_score });
        this.setState({ frdGameScore: responseJson?.user_game_status?.data?.attributes?.friend_score });
        this.props.onChangeScore({
          userGameScore: responseJson?.user_game_status?.data?.attributes?.user_score,
          friendGameScore: responseJson?.user_game_status?.data?.attributes?.friend_score
        })
        const firend_name = responseJson?.user_game_status?.data?.attributes?.firend_name;
        const my_name = responseJson?.user_game_status?.data?.attributes?.my_name;
        this.setState({ frdName: firend_name?.split(' ')?.slice(0, 2)?.map((name) => name.charAt(0))?.join('')?.toUpperCase() });
        this.setState({ userName: my_name?.split(' ')?.slice(0, 2)?.map((name) => name?.charAt(0))?.join('')?.toUpperCase() });
        this.props.onSetUserName({
          userName: my_name?.split(' ')?.slice(0, 2)?.map((name) => name?.charAt(0))?.join('')?.toUpperCase(),
          frdName: firend_name?.split(' ')?.slice(0, 2)?.map((name) => name.charAt(0))?.join('')?.toUpperCase()
        })
        console.log("statusRes Response", JSON.stringify(responseJson));
        this.setState({ isLoader: false });
      }).catch(error => {
        this.setState({ isLoader: false });
      })
  };

  onPressGameStart = async () => {
    const token = await getStorageData('token');
    console.log("token", token);
    const header = {
      'Content-Type': 'application/json',
      token: token,
    };
    const bodyData = {
      "game": {
        "level_name": "Level 1",
        "friend_id": this.userChatId?.uid,
      }
    };

    fetch(baseURL + '/bx_block_game/games', {
      method: 'POST',
      headers: header,
      body: JSON.stringify(bodyData),
    })
      .then(response => response.json())
      .then(async (responseJson) => {
        if (responseJson?.errors) {
          console.log("Game Start Response>>>", responseJson);
          CutomAlertFail(responseJson?.errors);
        } else {
          console.log("Game Start Response", responseJson);
          CutomAlertFail(responseJson?.message);
          this.setState({ isGameStart: true });
          await this.getQuestionApi()
        }
      })
  };

  getQuestionApi = async () => {
    this.setState({ isLoader: true });
    const token = await getStorageData('token');
    const header = {
      token: token,
    };

    fetch(baseURL + '/bx_block_game/game_play_one_question?game[friend_id]=' + this.userChatId?.uid, {
      method: 'GET',
      headers: header,
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson?.errors) {
          console.log("Game Start Response>>>", responseJson);
          CutomAlertFail(responseJson?.errors);
          this.setState({ isLoader: false });
        } else {
          console.log("Game Start Response", JSON.stringify(responseJson));
          const questionData = responseJson?.data;
          const questionModifedData = questionData?.filter((item) => item?.attributes?.is_attempted === false)?.map((item) => {
            return {
              ...item,
              options: [
                item?.attributes?.option_1,
                item?.attributes?.option_2,
              ]
            }
          })
          console.log("questionModifedData", JSON.stringify(questionModifedData));
          this.setState({ totalQue: questionData.length });
          this.setState({ questionData: questionModifedData, isLoader: false });
        }
      }).catch(error => {
        this.setState({ isLoader: false });
      })
  };

  getQuestionLevel2 = async () => {
    this.setState({ isLoader: true });
    const token = await getStorageData('token');
    const header = {
      token: token,
    };

    console.log("this.userChatId>>", this.userChatId?.uid);


    fetch(baseURL + '/bx_block_question_bank/level_2_next_question?question[account_id]=' + this.userChatId?.uid , {
      method: 'GET',
      headers: header,
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson?.errors) {
          console.log("Level2 Response>>>", responseJson);
          CutomAlertFail(responseJson?.errors);
          this.setState({ isLoader: false });
        } else {
          console.log("Level2 Response", JSON.stringify(responseJson));
          // const questionData = responseJson?.data;
          // const questionModifedData = questionData?.filter((item) => item?.attributes?.is_attempted === false)?.map((item) => {
          //   return {
          //     ...item,
          //     options: [
          //       item?.attributes?.option_1,
          //       item?.attributes?.option_2,
          //     ]
          //   }
          // })
          console.log("questionModifedData", JSON.stringify(questionModifedData));
          // this.setState({ totalQue: questionData.length });
          // this.setState({ questionData: questionModifedData, isLoader: false });
          this.setState({ isLoader: false });
        }
      }).catch(error => {
        this.setState({ isLoader: false });
      })
  };

  ansOfLevel2 = async () => {
    const token = await getStorageData('token');
    const header = {
      token: token,
      'Content-Type': 'application/json',
    };
    const bodyData = {
      "question": {
        "account_id": 1010,
        "question_bank_id": 852,
        "option": "home"
      }
    };

    fetch(baseURL + '/bx_block_question_bank/save_level_2_question_attempts', {
      method: 'POST',
      headers: header,
      body: JSON.stringify(bodyData),
    })
      .then(response => response.json())
      .then(async (responseJson) => {
        if (responseJson?.errors) {
          console.log("ans error>>>", responseJson);
          CutomAlertFail(responseJson?.errors[0].message);
        } else {
          console.log("gameQuestionAnswerApiCallId res", responseJson);
          this.sendTextMessage(`${this.state.answerData.question.option}--${responseJson?.data?.attributes?.is_correct}`);
          this.setState({
            answerData: {
              question: {
                "option": "",
                "friend_id": 0,
                "question_bank_id": 0
              }
            },
          });
          this.setState({ frdGameScore: responseJson?.data?.attributes?.friend_score });
          this.setState({ userGameScore: responseJson?.data?.attributes?.user_score });
          this.props.onChangeScore({
            userGameScore: responseJson?.data?.attributes?.user_score,
            friendGameScore: responseJson?.data?.attributes?.friend_score
          })
          if (this.state.isLastQuestion) {
            if (responseJson?.data?.attributes?.friends_game_status) {
              this.setState({ gamePlay: false, isGameStart: false });
              this.props.navigation.navigate("Level1Result",
                { friendId: this.userChatId?.uid });
            } else {
              this.setState({ gamePlay: false, isGameStart: false });
              this.props.navigation.navigate("NotifiedFriend");
            }
          } else {
            this.slideRef.current._listRef._scrollRef.scrollTo({
              x: deviceWidth * (this.state.currentIndex + 1),
            });
          }

        }
      })
  };

  ansQuestionApi = async () => {
    const token = await getStorageData('token');
    const header = {
      token: token,
      'Content-Type': 'application/json',
    };
    const bodyData = this.state.answerData;

    fetch(baseURL + '/bx_block_game/score', {
      method: 'POST',
      headers: header,
      body: JSON.stringify(bodyData),
    })
      .then(response => response.json())
      .then(async (responseJson) => {
        if (responseJson?.errors) {
          console.log("ans error>>>", responseJson);
          CutomAlertFail(responseJson?.errors[0].message);
        } else {
          console.log("gameQuestionAnswerApiCallId res", responseJson);
          this.sendTextMessage(`${this.state.answerData.question.option}--${responseJson?.data?.attributes?.is_correct}`);
          this.setState({
            answerData: {
              question: {
                "option": "",
                "friend_id": 0,
                "question_bank_id": 0
              }
            },
          });
          this.setState({ frdGameScore: responseJson?.data?.attributes?.friend_score });
          this.setState({ userGameScore: responseJson?.data?.attributes?.user_score });
          this.props.onChangeScore({
            userGameScore: responseJson?.data?.attributes?.user_score,
            friendGameScore: responseJson?.data?.attributes?.friend_score
          })
          if (this.state.isLastQuestion) {
            if (responseJson?.data?.attributes?.friends_game_status) {
              this.setState({ gamePlay: false, isGameStart: false });
              this.props.navigation.navigate("Level1Result",
                { friendId: this.userChatId?.uid });
            } else {
              this.setState({ gamePlay: false, isGameStart: false });
              this.props.navigation.navigate("NotifiedFriend");
            }
          } else {
            this.slideRef.current._listRef._scrollRef.scrollTo({
              x: deviceWidth * (this.state.currentIndex + 1),
            });
          }

        }
      })
  };

  showPickerTrigger = () => {
    Keyboard.dismiss();
    if (this.state.emojiBoardViewer) {
      this.setState({ emojiBoardViewer: false });
    } else {
      setTimeout(() => {
        this.setState({ emojiBoardViewer: true });
      }, 100)
    }
    this.setState({ emojiViewer: !this.state.emojiViewer, gamePlay: false });
  }

  onSelectEmoji = (emoji) => {
    this.setState({ messageInput: this.state.messageInput + emoji.code });
  }

  onPressOption(item, id) {
    const data = {
      "question": {
        "option": item,
        "friend_id": this.userChatId?.uid,
        "question_bank_id": Number(id)
      }
    };
    console.log("data", data);
    this.setState({ answerData: data });
  }

  _onViewableItemsChanged = ({ viewableItems }) => {
    this.setState({
      currentIndex: viewableItems[0]?.index,
    });
  };

  _viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  checkRestrictions = async () => {
    let isLiveReactionsEnabled =
      await this.context.FeatureRestriction.isLiveReactionsEnabled();
    let isTypingIndicatorsEnabled =
      await this.context.FeatureRestriction.isTypingIndicatorsEnabled();
    let isSmartRepliesEnabled =
      await this.context.FeatureRestriction.isSmartRepliesEnabled();
    this.setState({
      restrictions: {
        isLiveReactionsEnabled,
        isTypingIndicatorsEnabled,
        isSmartRepliesEnabled,
      },
    });
  };

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({ keyboardActivity: true });
  };

  _keyboardDidHide = () => {
    this.setState({ keyboardActivity: false });
  };

  componentDidUpdate(prevProps) {
    try {
      if (prevProps.messageToBeEdited !== this.props.messageToBeEdited) {
        const { messageToBeEdited } = this.props;
        this.setState({
          messageInput: messageToBeEdited.text,
          messageToBeEdited,
        });

        const element = this.messageInputRef.current;
        if (messageToBeEdited) {
          element.focus();
        } else {
          this.setState({
            messageInput: '',
          });
        }
      }

      if (prevProps.replyPreview !== this.props.replyPreview) {
        this.setState({ replyPreview: this.props.replyPreview });
      }

      if (prevProps.item !== this.props.item) {
        this.setState({ stickerViewer: false });
      }
    } catch (error) {
      logger(error);
    }
  }

  /**
   * Handler for audio when message is sent
   * @param
   */
  playAudio = () => {
    this.audio.setCurrentTime(0);
    this.audio.play(() => { });
  };

  /**
   * Handler for on focus in TextInput(messageComposer)
   */

  onFocus = () => {
    this.setState({ gamePlay: false, emojiViewer: false, emojiBoardViewer: false, emojiBoardHeight: 0, emojiBoardWidth: 0 });
  };

  /**
   * Handler for change in TextInput(messageComposer)
   * @param text: TextInput's value
   */

  changeHandler = (text) => {
    this.startTyping();
    this.setState({ messageInput: text, messageType: 'text' });
  };

  /**
   * Fetches the receiver's details.
   * @param
   */

  getReceiverDetails = () => {
    let receiverId;
    let receiverType;

    if (this.props.type === CometChat.RECEIVER_TYPE.USER) {
      receiverId = this.props.item.uid;
      receiverType = CometChat.RECEIVER_TYPE.USER;
    } else if (this.props.type === CometChat.RECEIVER_TYPE.GROUP) {
      receiverId = this.props.item.guid;
      receiverType = CometChat.RECEIVER_TYPE.GROUP;
    }

    return { receiverId, receiverType };
  };

  /**
   * handler for sending and generating media message
   * @param messageInput: object messageInput
   * @param messageType: object messageType
   */

  sendMediaMessage = (messageInput, messageType) => {
    try {

      const { receiverId, receiverType } = this.getReceiverDetails();
      const conversationId = this.props.getConversationId();
      const mediaMessage = new CometChat.MediaMessage(
        receiverId,
        messageInput,
        messageType,
        receiverType,
      );
      if (this.props.parentMessageId) {
        mediaMessage.setParentMessageId(this.props.parentMessageId);
      }

      this.endTyping();
      // mediaMessage.setSender(this.loggedInUser);
      mediaMessage.setReceiver(receiverType);
      mediaMessage.setConversationId(conversationId);
      mediaMessage.setType(messageType);
      mediaMessage._composedAt = Date.now();
      mediaMessage._id = '_' + Math.random().toString(36).substr(2, 9);
      mediaMessage.setId(mediaMessage._id)
      mediaMessage.setData({
        type: messageType,
        category: CometChat.CATEGORY_MESSAGE,
        name: messageInput['name'],
        file: messageInput,
        url: messageInput['uri'],
        sender: this.loggedInUser,
      });
      console.log("mediaMessage:::: " + JSON.stringify(mediaMessage));
      this.props.actionGenerated(actions.MESSAGE_COMPOSED, [mediaMessage]);
      CometChat.sendMessage(mediaMessage)
        .then(async (response) => {
          this.playAudio();

          const newMessageObj = {
            ...response,
            _id: mediaMessage._id,
            localFile: messageInput,
          };
          this.props.actionGenerated(actions.MESSAGE_SENT, newMessageObj);
        })
        .catch((error) => {
          const newMessageObj = { ...mediaMessage, error: error };
          const errorCode = error?.message || 'ERROR';
          this.props.actionGenerated(
            actions.ERROR_IN_SEND_MESSAGE,
            newMessageObj,
          );

          this.props?.showMessage('error', errorCode);
          logger('Message sending failed with error: ', error);
        });
    } catch (error) {
      logger(error);
    }
  };

  /**
   * handler for sending Text Message
   * @param
   */

  sendTextMessage = (message) => {
    let textMsg = message || this.state.messageInput
    try {
      if (this.state.emojiViewer) {
        this.setState({ emojiViewer: false, emojiBoardViewer: false });
      }

      if (!textMsg.trim().length) {
        return false;
      }

      if (this.state.messageToBeEdited) {
        this.editMessage();
        return false;
      }
      this.endTyping();

      const { receiverId, receiverType } = this.getReceiverDetails();
      const messageInput = textMsg.trim();
      const conversationId = this.props.getConversationId();
      const textMessage = new CometChat.TextMessage(
        receiverId,
        messageInput,
        receiverType,
      );
      if (this.props.parentMessageId) {
        textMessage.setParentMessageId(this.props.parentMessageId);
      }

      textMessage.setSender(this.loggedInUser);
      textMessage.setReceiver(receiverType);
      textMessage.setText(messageInput);
      textMessage.setConversationId(conversationId);
      textMessage._composedAt = Date.now();
      textMessage._id = '_' + Math.random().toString(36).substr(2, 9);
      textMessage.setId(textMessage._id)
      this.props.actionGenerated(actions.MESSAGE_COMPOSED, [textMessage]);
      this.setState({ messageInput: '', replyPreview: false });

      this.messageInputRef.current.textContent = '';
      this.playAudio();
      CometChat.sendMessage(textMessage)
        .then((message) => {
          const newMessageObj = { ...message, _id: textMessage._id };
          this.setState({ messageInput: '' });
          this.messageInputRef.current.textContent = '';
          // this.playAudio();
          this.props.actionGenerated(actions.MESSAGE_SENT, newMessageObj);
        })
        .catch((error) => {
          const newMessageObj = { ...textMessage, error: error };
          this.props.actionGenerated(
            actions.ERROR_IN_SEND_MESSAGE,
            newMessageObj,
          );
          logger('Message sending failed with error:', error);
          const errorCode = error?.message || 'ERROR';
          this.props?.showMessage('error', errorCode);
        });
    } catch (error) {
      logger(error);
    }
  };

  /**
   * Handler for edit message
   * @param
   */

  editMessage = () => {
    try {
      const { messageToBeEdited } = this.props;

      const { receiverId, receiverType } = this.getReceiverDetails();

      const messageText = this.state.messageInput.trim();
      const textMessage = new CometChat.TextMessage(
        receiverId,
        messageText,
        receiverType,
      );
      textMessage.setId(messageToBeEdited.id);

      this.endTyping();

      CometChat.editMessage(textMessage)
        .then((message) => {
          this.setState({ messageInput: '' });
          this.messageInputRef.current.textContent = '';
          this.playAudio();

          this.closeEditPreview();
          this.props.actionGenerated(actions.MESSAGE_EDITED, message);
        })
        .catch((error) => {
          const errorCode = error?.message || 'ERROR';
          this.props?.showMessage('error', errorCode);
          logger('Message editing failed with error:', error);
        });
    } catch (error) {
      logger(error);
    }
  };

  /**
   * handler for action -> CLEAR_EDIT_PREVIEW
   * @param
   */
  closeEditPreview = () => {
    this.props.actionGenerated(actions.CLEAR_EDIT_PREVIEW);
  };

  /**
   * Handler For Generating typing Notification
   * @param timer: typingInterval
   * @param metadata: metadata object
   */

  startTyping = (timer, metadata) => {
    try {
      const typingInterval = timer || 5000;
      if (!this.state.restrictions?.isTypingIndicatorsEnabled) {
        return false;
      }
      if (this.isTyping) {
        return false;
      }

      const { receiverId, receiverType } = this.getReceiverDetails();
      const typingMetadata = metadata || undefined;

      const typingNotification = new CometChat.TypingIndicator(
        receiverId,
        receiverType,
        typingMetadata,
      );
      CometChat.startTyping(typingNotification);

      this.isTyping = setTimeout(() => {
        this.endTyping();
      }, typingInterval);
    } catch (error) {
      logger(error);
    }
  };

  /**
   * Handler to end typing Notification
   * @param metadata: metadata object
   */

  endTyping = (metadata) => {
    try {
      const { receiverId, receiverType } = this.getReceiverDetails();

      const typingMetadata = metadata || undefined;

      const typingNotification = new CometChat.TypingIndicator(
        receiverId,
        receiverType,
        typingMetadata,
      );
      CometChat.endTyping(typingNotification);

      clearTimeout(this.isTyping);
      this.isTyping = null;
    } catch (error) {
      logger(error);
    }
  };

  /**
   * Handler to toggle Sticker Picker screen
   * @param
   */

  toggleStickerPicker = () => {
    const { stickerViewer } = this.state;
    this.setState({
      composerActionsVisible: false,
      stickerViewer: !stickerViewer,
    });
  };

  /**
   * handler to toggle create poll screen
   * @param
   */
  toggleCreatePoll = () => {
    const { createPoll } = this.state;
    this.setState({ composerActionsVisible: false, createPoll: !createPoll });
  };

  /**
   * handler to close create poll screen
   * @param
   */
  closeCreatePoll = () => {
    this.toggleCreatePoll();
  };

  /**
   * handler for various action
   * @param action: action name
   * @param message: message object
   */
  actionHandler = (action, message) => {
    switch (action) {
      case actions.POLL_CREATED:
        this.toggleCreatePoll();
        if (this.props.type === enums.TYPE_USER) {
          this.props.actionGenerated(actions.POLL_CREATED, [message]);
        }
        // temporary check; custom data listener working for sender too\

        break;
      case actions.SEND_STICKER:
        this.sendSticker(message);
        break;
      case actions.CLOSE_STICKER:
        this.toggleStickerPicker();
        break;
      default:
        break;
    }
  };

  /**
   * handler for sending sticker message
   * @param stickerMessage: object stickerMessage
   */
  sendSticker = (stickerMessage) => {

    const { receiverId, receiverType } = this.getReceiverDetails();

    const customData = {
      sticker_url: stickerMessage.stickerUrl,
      sticker_name: stickerMessage.stickerName,
    };
    const customType = enums.CUSTOM_TYPE_STICKER;
    const conversationId = this.props.getConversationId();
    const customMessage = new CometChat.CustomMessage(
      receiverId,
      receiverType,
      customType,
      customData,
    );
    if (this.props.parentMessageId) {
      customMessage.setParentMessageId(this.props.parentMessageId);
    }
    customMessage.setConversationId(conversationId);
    customMessage.setSender(this.loggedInUser);
    customMessage.setReceiver(receiverType);
    customMessage.setConversationId(conversationId);
    customMessage._composedAt = Date.now();
    customMessage._id = '_' + Math.random().toString(36).substr(2, 9);
    this.props.actionGenerated(actions.MESSAGE_COMPOSED, [customMessage]);
    CometChat.sendCustomMessage(customMessage)
      .then((message) => {
        this.playAudio();
        const newMessageObj = { ...message, _id: customMessage._id };

        this.props.actionGenerated(actions.MESSAGE_SENT, newMessageObj);
      })
      .catch((error) => {
        const newMessageObj = { ...customMessage, error: error };
        this.props.actionGenerated(
          actions.ERROR_IN_SEND_MESSAGE,
          newMessageObj,
        );
        const errorCode = error?.message || 'ERROR';

        this.props?.showMessage('error', errorCode);
        logger('custom message sending failed with error', error);
      });
  };

  /**
   * handler for sending reply message
   * @param messageInput: object messageInput
   */

  sendReplyMessage = (messageInput) => {
    try {
      const { receiverId, receiverType } = this.getReceiverDetails();
      const textMessage = new CometChat.TextMessage(
        receiverId,
        messageInput,
        receiverType,
      );
      if (this.props.parentMessageId) {
        textMessage.setParentMessageId(this.props.parentMessageId);
      }

      CometChat.sendMessage(textMessage)
        .then((message) => {
          this.playAudio();
          this.setState({ replyPreview: null });
          this.props.actionGenerated(actions.MESSAGE_COMPOSED, [message]);
        })
        .catch((error) => {
          const errorCode = error?.message || 'ERROR';
          this.props?.showMessage('error', errorCode);
          logger('Message sending failed with error:', error);
        });
    } catch (error) {
      logger(error);
    }
  };

  clearReplyPreview = () => {
    this.setState({ replyPreview: null });
  };

  /**
   * handler for sending reactions
   * @param
   */
  sendReaction = (event) => {
    const typingInterval = 1000;
    try {
      const metadata = {
        type: enums.METADATA_TYPE_LIVEREACTION,
        reaction: this.props.reactionName || 'heart',
      };

      const { receiverId, receiverType } = this.getReceiverDetails();
      let transientMessage = new CometChat.TransientMessage(
        receiverId,
        receiverType,
        metadata,
      );
      CometChat.sendTransientMessage(transientMessage);
    } catch (err) {
      logger(err);
    }
    this.props.actionGenerated(actions.SEND_REACTION);
    event.persist();
    setTimeout(() => {
      this.props.actionGenerated(actions.STOP_REACTION);
    }, typingInterval);
  };

  /**
   * 
   * @param {*} e 
   */

  onChangeHeight = (e) => {
    this.setState({ emojiBoardHeight: e.height, emojiBoardWidth: e.width });
  }

  /**
   * Remove emoji
   */

  onRemoveEmoji = () => {
    let messageInput = this.state.messageInput
    let message = Array.from(messageInput).slice(0, -1).join('');
    this.setState({ messageInput: message })
  }

  render() {
    let disabled = false;
    if (this.props.item.blockedByMe) {
      disabled = true;
    }

    let liveReactionBtn = null;
    if (
      Object.prototype.hasOwnProperty.call(
        enums.LIVE_REACTIONS,
        this.props.reaction,
      )
    ) {
      const reactionName = this.props.reaction;
      liveReactionBtn = (
        <TouchableOpacity
          style={styles.reactionBtnStyle}
          disabled={disabled}
          onPress={this.sendReaction}>
          <Icon name={`${reactionName}`} size={30} color="#de3a39" />
        </TouchableOpacity>
      );
    }

    let sendBtn = (
      <TouchableOpacity
        style={styles.sendButtonStyle}
        onPress={() => this.sendTextMessage()}>
        <Icon name="send" size={20} color="#3299ff" />
      </TouchableOpacity>
    );

    if (
      !this.state.messageInput.length &&
      this.state.restrictions?.isLiveReactionsEnabled
    ) {
      sendBtn = null;
    } else {
      liveReactionBtn = null;
    }

    let editPreview = null;
    if (this.state.messageToBeEdited) {
      editPreview = (
        <View
          style={[
            styles.editPreviewContainerStyle,
            {
              backgroundColor: `${this.props.theme.backgroundColor.white}`,
              borderColor: `${this.props.theme.borderColor.primary}`,
            },
          ]}>
          <View
            style={[
              styles.previewHeadingContainer,
              {
                borderLeftColor: this.props.theme.color.secondary,
              },
            ]}>
            <View style={styles.previewHeadingStyle}>
              <Text
                style={[
                  styles.previewTextStyle,
                  {
                    color: `${this.props.theme.color.black}`,
                  },
                ]}>
                Edit message
              </Text>
              <TouchableOpacity
                style={styles.previewCloseStyle}
                onPress={this.closeEditPreview}>
                <Icon
                  name="close"
                  size={23}
                  color={this.props.theme.color.secondary}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={{
                  color: `${this.props.theme.color.helpText}`,
                }}>
                {this.state.messageToBeEdited.text}
              </Text>
            </View>
          </View>
        </View>
      );
    }
    let blockedPreview = null;
    if (disabled) {
      blockedPreview = (
        <View
          style={[
            styles.blockedPreviewContainer,
            {
              backgroundColor: this.props.theme.backgroundColor.blue,
            },
          ]}>
          <Text
            style={[
              styles.blockedPreviewText1,
              {
                color: this.props.theme.color.white,
              },
            ]}>
            You have blocked this user
          </Text>
          <Text
            style={[
              styles.blockedPreviewText2,
              {
                color: this.props.theme.color.white,
              },
            ]}>
            To start conversations, click on the user info and unblock the user
          </Text>
        </View>
      );
    }

    let smartReplyPreview = null;
    if (this.state.replyPreview) {
      const message = this.state.replyPreview;
      if (Object.prototype.hasOwnProperty.call(message, 'metadata')) {
        const { metadata } = message;
        if (Object.prototype.hasOwnProperty.call(metadata, '@injected')) {
          const injectedObject = metadata['@injected'];
          if (
            Object.prototype.hasOwnProperty.call(injectedObject, 'extensions')
          ) {
            const extensionsObject = injectedObject.extensions;
            if (
              Object.prototype.hasOwnProperty.call(
                extensionsObject,
                'smart-reply',
              )
            ) {
              const smartReplyObject = extensionsObject['smart-reply'];

              const options = [
                smartReplyObject.reply_positive,
                smartReplyObject.reply_neutral,
                smartReplyObject.reply_negative,
              ];

              smartReplyPreview = (
                <CometChatSmartReplyPreview
                  {...this.props}
                  options={options}
                  clicked={this.sendReplyMessage}
                  close={this.clearReplyPreview}
                />
              );
            }
          }
        }
      }
    }

    if (!this.state.restrictions?.isSmartRepliesEnabled) {
      smartReplyPreview: false;
    }

    let stickerViewer = null;
    if (this.state.stickerViewer) {
      stickerViewer = (
        <CometChatStickerKeyboard
          theme={this.props.theme}
          item={this.props.item}
          type={this.props.type}
          actionGenerated={this.actionHandler}
        />
      );
    }

    const createPoll = (
      <CometChatCreatePoll
        theme={this.props.theme}
        item={this.props.item}
        type={this.props.type}
        open={this.state.createPoll}
        close={this.closeCreatePoll}
        actionGenerated={this.actionHandler}
      />
    );

    const renderItem = ({ item, index }) => {
      return (
        <View style={styles.qustionContainer}>
          <View>
            <Text style={styles.questionText}>
              {item?.attributes?.question}
            </Text>
          </View>
          {!!item &&
            item?.options?.map((itm, index) => {
              return (
                <TouchableOpacity
                  testID="btnOption"
                  onPress={() => this.onPressOption(itm, item?.id)}
                  style={styles.optionsContainer}
                >
                  <Image
                    source={
                      this.state.answerData?.question?.option == itm
                        ? checkCircle
                        : circle
                    }
                    style={[
                      styles.emptybtn,
                      {
                        tintColor: this.state.answerData?.question?.option == itm
                          ? style.black
                          : style.bColor,
                      },
                    ]}
                  />
                  <Text
                    style={[styles.textbtn,
                    {
                      color: this.state.answerData?.question?.option == itm
                        ? style.black
                        : style.bColor,
                    },]}
                  >
                    {itm}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </View>
      );
    };
    return (
      <View
        style={
          Platform.OS === 'android' && this.state.keyboardActivity
            ? {
              marginBottom: 21 * heightRatio,
              // elevation: 5,
              backgroundColor: '#fff',
            }
            : { elevation: 5, backgroundColor: '#fff' }
        }>
        {blockedPreview}
        {editPreview}
        {createPoll}
        {stickerViewer}
        {smartReplyPreview}
        <ComposerActions
          visible={this.state.composerActionsVisible}
          close={() => {
            if (this.state.composerActionsVisible == true) {
              this.setState({ composerActionsVisible: false });
            }
          }}
          toggleStickers={this.toggleStickerPicker}
          toggleCreatePoll={this.toggleCreatePoll}
          sendMediaMessage={this.sendMediaMessage}
        />
        {/* <ModalPicker isVisible={this.state.emojiViewer} showCloseButton onPressClose={() => this.setState({ emojiViewer: false })} onSelect={(emoji) => this.onSelectEmoji(emoji)} /> */}
        <View style={styles.mainContainer}>
          <TextInput
            style={styles.messageInputStyle}
            editable={!disabled}
            value={this.state.messageInput}
            placeholder="Type a Message..."
            onChangeText={(text) => this.changeHandler(text)}
            onFocus={this.onFocus}
            onBlur={this.endTyping}
            ref={this.messageInputRef}
          />
          <TouchableOpacity onPress={() => this.onPressGamePlay()}>
            <Image source={gameboy} style={[styles.attachIcon, this.state.gamePlay ? { tintColor: 'black' } : { tintColor: 'grey' }]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({ composerActionsVisible: true, gamePlay: false })}>
            <Image source={attachSquare} style={[styles.attachIcon, this.state.gamePcomposerActionsVisiblelay ? { tintColor: 'black' } : { tintColor: 'grey' }]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.showPickerTrigger}>
            <Image source={smile} style={[styles.attachIcon, this.state.emojiViewer ? { tintColor: 'black' } : { tintColor: 'grey' }]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.sendTextMessage()}>
            <Image source={send} style={styles.attachIcon} />
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.plusCircleContainer}
            disabled={disabled}
            onPress={() => {
              this.setState({ composerActionsVisible: true });
            }}>
            <AntDIcon size={26} name="pluscircle" color="rgba(0,0,0,0.35)" />
          </TouchableOpacity>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.messageInputStyle}
              editable={!disabled}
              value={this.state.messageInput}
              placeholder="Type a Message..."
              onChangeText={(text) => this.changeHandler(text)}
              onBlur={this.endTyping}
              ref={this.messageInputRef}
            />
            {sendBtn}
          </View> */}
          {/* {liveReactionBtn} */}
        </View>
        {this.state.gamePlay && <View style={styles.gamePlayContainer}>
          <View style={styles.gamePlayInnerContainer}>
            {!this.state.isGameStart ? <View style={styles.levelView}>
              <Text style={styles.levelText}>
                {this.state.gamePlayStatus?.user_game_status?.data?.attributes?.is_friends
                  ? "LEVEL 2" : "LEVEL 1"}
              </Text>
              <Text style={styles.levelQuestionText}>
                {this.state.gamePlayStatus?.user_game_status?.data?.attributes?.is_friends ? "Match with your partner’s expectations to achieve common ground" : "You guess each others preferences"}
              </Text>
              <TouchableOpacity
                testID="btnSignUp"
                // disabled={this.state.gamePlayStatus?.user_game_status?.data?.attributes?.is_friends}
                onPress={() => this.onPressGame()}
                style={styles.startButton}
              >
                <Text style={styles.btnText}>
                  {this.state.gamePlayStatus?.user_game_status?.data?.attributes?.is_friends
                    ? "Comming soon" : "Continue"}
                </Text>
              </TouchableOpacity>
            </View> :
              <View>
                <Text style={styles.questionHeading}>
                  {"Question  "}{this.state.currentIndex + (this.state.totalQue - this.state.questionData.length)}{" of " + (this.state.totalQue - 1) + " (Level 1)"}
                </Text>
                <FlatList
                  testID="flatListSelectedQuestion"
                  data={this.state.questionData}
                  ref={this.slideRef}
                  renderItem={({ item, index }) => renderItem({ item, index })}
                  keyExtractor={(item, index) => index.toString()}
                  showsHorizontalScrollIndicator={false}
                  bounces={false}
                  horizontal
                  onViewableItemsChanged={this._onViewableItemsChanged}
                  viewabilityConfig={this._viewabilityConfig}
                  pagingEnabled
                  scrollEnabled={false}
                />
                <View style={styles.arrowsContainer}>
                  <View>
                    <TouchableOpacity
                      testID="btnRightArrow"
                      style={styles.rightAerrow}
                      onPress={() => this.onPressRight()}
                    >
                      <Image
                        source={forwardArrow}
                        style={styles.aerrowStyle}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

              </View>}
          </View>
        </View>}
        {this.state.emojiViewer && <EmojiBoard numCols={5} numRows={8} showBoard={this.state.emojiViewer} onClick={(emoji) => this.onSelectEmoji(emoji)} onRemove={() => this.onRemoveEmoji()} onLayout={(e) => this.onChangeHeight(e)} />}
        {this.state.emojiBoardViewer && <View style={{ height: this.state.emojiBoardHeight, width: this.state.emojiBoardWidth }} />}
      </View>
    );
  }
}
