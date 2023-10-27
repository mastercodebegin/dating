/* eslint-disable react/jsx-fragments */
/* eslint-disable react/no-did-update-set-state */
import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  FlatList,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {
  CometChatContextProvider,
  CometChatContext,
} from '../../../utils/CometChatContext';
import Icon from 'react-native-vector-icons/Ionicons';

import { CometChatManager } from '../../../utils/controller';
import { ConversationListManager } from '../../Chats/CometChatConversationList/controller';
import { UserListManager } from './controller';
import CometChatUserListItem from '../CometChatUserListItem';
import style from './styles';
import theme from '../../../resources/theme';
import { logger } from '../../../utils/common';
import * as enums from '../../../utils/enums';
import { CometChat } from '@cometchat-pro/react-native-chat';
import DropDownAlert from '../../Shared/DropDownAlert';
class CometChatUserList extends React.PureComponent {
  static contextType = CometChatContext;

  timeout;

  friendsOnly = false;

  // decoratorMessage = 'Loading...';

  constructor(props) {
    super(props);

    this.state = {
      userList: [],
      conversationList: [],
      selectedUser: null,
      textInputValue: '',
      textInputFocused: false,
      showSmallHeader: false,
      restrictions: null,
      updatedSuggestedUsersList: [],
    };
    this.userListRef = React.createRef();
    this.textInputRef = React.createRef(null);
    this.theme = { ...theme, ...this.props.theme };
    this.currentLetter = '';
  }

  componentDidMount() {
    this.checkRestrictions();
    this.props.startUserListLoading();
    try {
      if (Object.prototype.hasOwnProperty.call(this.props, 'friendsOnly')) {
        this.friendsOnly = this.props.friendsOnly;
      }

      this.navListener = this.props.navigation.addListener('willFocus', () => {

        // Getting conversation list like follow
        if (this.ConversationListManager) {
          this.ConversationListManager.removeListeners();
        }
        this.setState({ conversationList: [] });
        this.ConversationListManager = new ConversationListManager();
        this.getConversations();
        // this.ConversationListManager.attachListeners(this.conversationUpdated);
      });
    } catch (error) {
      logger(error);
      this.props.stopUserListLoading();
    }

    // Getting conversation list so users can be deleted from user list which are present in conversation list
    if (this.ConversationListManager) {
      this.ConversationListManager.removeListeners();
    }
    this.setState({ conversationList: [] });
    this.ConversationListManager = new ConversationListManager();
    this.getConversations();
    this.ConversationListManager.attachListeners(this.conversationUpdated);
  }

  checkRestrictions = async () => {
    let context = this.contextProviderRef.state;
    let isUserSearchEnabled =
      await context.FeatureRestriction.isUserSearchEnabled();
    this.setState({ restrictions: { isUserSearchEnabled } });
  };

  componentDidUpdate(prevProps) {
    try {
      if (this.state.textInputFocused) {
        this.textInputRef.current.focus();
      }
      const previousItem = JSON.stringify(prevProps.item);
      const currentItem = JSON.stringify(this.props.item);

      if (previousItem !== currentItem) {
        if (Object.keys(this.props.item).length === 0) {
          this.userListRef.scrollTop = 0;
          this.setState({ selectedUser: {} });
        } else {
          const userList = [...this.state.userList];

          // search for user
          const userKey = userList.findIndex(
            (u) => u.uid === this.props.item.uid,
          );
          if (userKey > -1) {
            const userObj = { ...userList[userKey] };
            this.setState({ selectedUser: userObj });
          }
        }
      }

      // if user is blocked/unblocked, update userList in state
      if (
        prevProps.item &&
        Object.keys(prevProps.item).length &&
        prevProps.item.uid === this.props.item.uid &&
        prevProps.item.blockedByMe !== this.props.item.blockedByMe
      ) {
        const userList = [...this.state.userList];

        // search for user
        const userKey = userList.findIndex(
          (u) => u.uid === this.props.item.uid,
        );
        if (userKey > -1) {
          const userObj = { ...userList[userKey] };
          const newUserObj = {
            ...userObj,
            blockedByMe: this.props.item.blockedByMe,
          };
          userList.splice(userKey, 1, newUserObj);

          this.setState({ userList });
        }
      }
      if(prevProps.updatedSuggestedUsersChatList.length !== this.props.updatedSuggestedUsersChatList.length) {
        this.getUsers();
      }
    } catch (error) {
      logger(error);
    }
  }

  componentWillUnmount() {
    try {
      this.UserListManager.removeListeners();
      this.UserListManager = null;
    } catch (error) {
      logger(error);
    }
  }

  /**
   * Handle user updated from listener
   * @param user: user object
   */
  userUpdated = (user) => {
    try {
      const userList = [...this.state.userList];

      // search for user
      const userKey = userList.findIndex((u) => u.uid === user.uid);

      // if found in the list, update user object
      if (userKey > -1) {
        const userObj = { ...userList[userKey] };
        const newUserObj = { ...userObj, ...user };
        userList.splice(userKey, 1, newUserObj);

        this.setState({ userList });
      }
    } catch (error) {
      logger(error);
    }
  };

  /**
   * Handle on end reached of the list
   * @param
   */
  endReached = () => {
    // this.getUsers();
    this.getConversations();
  };

  /**
   * Handle click on the list item
   * @param
   */
  handleClick = (user) => {
    if (!this.props.onItemClick) return;
    this.props.onItemClick(user, CometChat.RECEIVER_TYPE.USER);
  };

  /**
   * Retrieve user from user list while searching
   * @param
   */
  // searchUsers = (val) => {
  //   this.setState(
  //     { textInputValue: val },

  //     () => {
  //       if (this.timeout) {
  //         clearTimeout(this.timeout);
  //       }

  //       this.timeout = setTimeout(() => {
  //         this.UserListManager = new UserListManager(val);
  //         this.setState({ userList: [] }, () => this.getUsers());
  //       }, 500);
  //     },
  //   );
  // };

  /**
   * Retrieve user list from sdk acc to logged in user
   * @param
   */
  getUsers = () => {
    new CometChatManager()
      .getLoggedInUser()
      .then(() => {
        this.UserListManager.fetchNextUsers()
          .then((userList) => {
            this.updateUserListData(userList);
          })
          .catch((error) => {
            const errorCode = error?.message || 'ERROR';
            this.dropDownAlertRef?.showMessage('error', errorCode);
            this.decoratorMessage = 'Error';
            console.log('Error in getting users in UserList Component');
            logger('[CometChatUserList] getUsers fetchNext error', error);
            this.props.stopUserListLoading();
          });
      })
      .catch((error) => {
        const errorCode = error?.message || 'ERROR';
        this.dropDownAlertRef?.showMessage('error', errorCode);
        this.decoratorMessage = 'Error';
        console.log(
          'Error in getting logged in user while gettig users in UserList Component ',
        );
        logger('[CometChatUserList] getUsers getLoggedInUser error', error);
        this.props.stopUserListLoading();
      });
  };

  updateUserListData = (userList) => {

    const suggestedUsers = this.props.suggestedUsers;
    let suggestedUsersDataFromCometChat = []; // This data of users is from cometchat which are also present in suggestedUsers
    for (let i = 0; i < userList.length; i++) {
      for (let j = 0; j < suggestedUsers.length; j++) {
        if (
          userList[i].uid === String(suggestedUsers[j].attributes.friend_id)
        ) {
          suggestedUsersDataFromCometChat.push(userList[i]);
        }
      }
    }

    const chatList = this.state.conversationList;
    // console.log("chatListchatList", chatList)
    let suggestedUsersWithoutConversation = []; // This list is for excluding suggested users from userList which are in chatList
    const chatUserIds = chatList.map((chat) => chat.conversationWith.uid);
    suggestedUsersWithoutConversation = suggestedUsersDataFromCometChat.filter(
      (user) => !chatUserIds.includes(String(user.uid)),
    );

    let updatedSuggestedUsersList = [];
    suggestedUsersWithoutConversation.forEach((chat) => {
      suggestedUsers.forEach((user) => {
        if (chat.uid == user.attributes.friend_id) {
          updatedSuggestedUsersList.push({
            ...chat,
            username: user.attributes.user_name,
            photo: user.attributes.photo,
          });
        }
      });
    });

    if (
      this.props.updatedSuggestedUsersChatList.length === 0 &&
      updatedSuggestedUsersList.length === 0
    ) {
      this.decoratorMessage = "You don't have any chat yet";
    }else {
      this.decoratorMessage = "";
    }
    // console.log("updatedSuggestedUsersListupdatedSuggestedUsersList", updatedSuggestedUsersList)
    this.setState({ userList: [...this.state.userList, ...userList], updatedSuggestedUsersList: updatedSuggestedUsersList });
    setTimeout(() => {
      this.props.stopUserListLoading();
    }, 1000)

    // console.log("------------------------------------------------")
    // console.log("userList", JSON.stringify(this.state.userList));
    // console.log("chatList", JSON.stringify(this.state.conversationList));
    // console.log("suggestedUsers", JSON.stringify(suggestedUsers));
    // console.log("suggestedUsersDataFromCometChat", JSON.stringify(suggestedUsersDataFromCometChat));
    // console.log("suggestedUsersWithoutConversation", JSON.stringify(suggestedUsersWithoutConversation));
    // console.log("updatedSuggestedUsersList", JSON.stringify(updatedSuggestedUsersList));
  }

  getConversations = () => {
    new CometChatManager()
      .getLoggedInUser()
      .then((user) => {
        this.loggedInUser = user;
        this.ConversationListManager.fetchNextConversation()
          .then((conversationList) => {
            this.setState({
              conversationList: [
                ...this.state.conversationList,
                ...conversationList,
              ],
            });
            // this.decoratorMessage = 'Loading...';
            if (this.UserListManager) {
              this.UserListManager.removeListeners();
            }
            this.setState({ userList: [] });
            this.UserListManager = new UserListManager();
            this.UserListManager.initializeUsersRequest()
              .then((response) => {
                this.getUsers();
                this.UserListManager.attachListeners(this.userUpdated);
              })
              .catch((error) => {
                logger(error);
              });
          })
          .catch((error) => {
            this.decoratorMessage = 'Error';
            const errorCode = error?.message || 'ERROR';
            this.dropDownAlertRef?.showMessage('error', errorCode);
            logger(
              '[CometChatConversationList] getConversations fetchNext error',
              error,
            );
            this.props.stopUserListLoading();
          });
      })
      .catch((error) => {
        this.decoratorMessage = 'Error';
        console.log(
          'Error in getting logged in user while gettig chats in UserList Component ',
        );
        logger(
          '[CometChatConversationList] getConversations getLoggedInUser error',
          error,
        );
        this.props.stopUserListLoading();
      });
  };

  /**
   * Component for flatList item
   * @param
   * if item - sticky header
   * @returns Component with ContactAlphabet
   * if item - user
   * @returns UserListComponent
   */
  renderUserView = ({ item, index }) => {
    // This following if is for showing initial letter of users name
    // if (item.header) {
    //   const headerLetter = item.value;
    //   return (
    //     <View style={style.contactAlphabetStyle} key={index}>
    //       <Text style={style.contactAlphabetTextStyle}>{headerLetter}</Text>
    //     </View>
    //   );
    // }

    // const user = item.value;
    const user = item;
    return (
      <CometChatUserListItem
        key={index}
        theme={this.theme}
        user={user}
        selectedUser={this.state.selectedUser}
        clickHandler={this.handleClick}
      />
    );
  };

  /**
   * Return component for empty user list
   * @param
   */
  listEmptyContainer = () => {
    return (
      <View style={style.contactMsgStyle}>
        <Text
          style={[
            style.contactMsgTxtStyle,
            {
              color: `${this.theme.color.secondary}`,
            },
          ]}>
          {this.decoratorMessage}
        </Text>
      </View>
    );
  };

  /**
   * Return separator component
   * @param
   */
  itemSeparatorComponent = ({ leadingItem }) => {
    // if (leadingItem.header) {
    //   return null;
    // }
    // return (
    //   <View
    //     style={[
    //       style.itemSeparatorStyle,
    //       {
    //         borderBottomColor: this.theme.borderColor.primary,
    //       },
    //     ]}
    //   />
    // );
    return <View style={style.itemSeparatorComponentStyle}></View>;
  };

  /**
   * Return header component with text input for search
   * @param
   */
  // listHeaderComponent = () => {
  //   return (
  //     <View style={[style.contactHeaderStyle]}>
  //       <Text style={style.contactHeaderTitleStyle}>Users</Text>
  //       {this.state.restrictions?.isUserSearchEnabled ? (
  //         <TouchableWithoutFeedback
  //           onPress={() => this.textInputRef.current.focus()}>
  //           <View
  //             style={[
  //               style.contactSearchStyle,
  //               {
  //                 backgroundColor: `${this.theme.backgroundColor.grey}`,
  //               },
  //             ]}>
  //             <Icon name="search" size={18} color={this.theme.color.helpText} />
  //             <TextInput
  //               ref={this.textInputRef}
  //               autoCompleteType="off"
  //               value={this.state.textInputValue}
  //               placeholder="Search"
  //               placeholderTextColor={this.theme.color.textInputPlaceholder}
  //               onChangeText={this.searchUsers}
  //               onFocus={() => {
  //                 this.setState({ textInputFocused: true });
  //               }}
  //               onBlur={() => {
  //                 this.setState({ textInputFocused: false });
  //               }}
  //               clearButtonMode="always"
  //               numberOfLines={1}
  //               style={[
  //                 style.contactSearchInputStyle,
  //                 {
  //                   color: `${this.theme.color.primary}`,
  //                 },
  //               ]}
  //             />
  //           </View>
  //         </TouchableWithoutFeedback>
  //       ) : null}
  //     </View>
  //   );
  // };

  /**
   * Check scroll value to enable small headers
   * @param
   */
  handleScroll = ({ nativeEvent }) => {
    if (nativeEvent.contentOffset.y > 35 && !this.state.showSmallHeader) {
      this.setState({
        showSmallHeader: true,
      });
    }
    if (nativeEvent.contentOffset.y <= 35 && this.state.showSmallHeader) {
      this.setState({
        showSmallHeader: false,
      });
    }
  };

  render() {

    return (
      <CometChatContextProvider ref={(el) => (this.contextProviderRef = el)}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={style.contactWrapperStyle}>
            {/* <View style={style.headerContainer}></View> */}
            {/* {this.listHeaderComponent()} */}
            {/* {console.log("++++", JSON.stringify(userListWithHeaders))} */}
            <FlatList
              // data={suggestedUsersWithoutConversation}
              data={this.state.updatedSuggestedUsersList}
              renderItem={this.renderUserView}
              contentContainerStyle={{ flexGrow: 1 }}
              ListEmptyComponent={this.listEmptyContainer}
              ItemSeparatorComponent={this.itemSeparatorComponent}
              keyExtractor={(item, index) => item.uid + '_' + index}
              stickyHeaderIndices={
                Platform.OS === 'android' ? null : headerIndices
              }
              onScroll={this.handleScroll}
              onEndReached={this.endReached}
              onEndReachedThreshold={0.3}
              showsVerticalScrollIndicator={false}
            />
            <DropDownAlert ref={(ref) => (this.dropDownAlertRef = ref)} />
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </CometChatContextProvider>
    );
  }
}

export default CometChatUserList;
