import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import { getStorageData } from "framework/src/Utilities";
import { CutomAlertFail, showPopupWithOkAndCancel } from "../../../components/src/CustomAlert";
import { Linking, PermissionsAndroid, Platform } from "react-native";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  selectedQuestionIds: Array<any>;
  apiQuestionData: Array<any>;
  isLoder: boolean;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class QuestionBankController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  questionGetApiCallId: any;
  questionSelectedApiCallId: any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      apiQuestionData: [],
      selectedQuestionIds: [],
      isLoder: false,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  componentDidMount(): Promise<void> {
    return super.componentDidMount().then(() => { 
      this.getQuestionData();
    });
  }

  async receive(from: string, message: Message) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if (apiRequestCallId && responseJson) {
        if (apiRequestCallId === this.questionGetApiCallId) {
          console.log("questionGetApiCallId", responseJson);
         await this.questioGetSuccess(responseJson);
          this.parseApiCatchErrorResponse(errorReponse);
        }

        if (apiRequestCallId === this.questionSelectedApiCallId) {
          if (!responseJson.errors) {
            this.props.navigation.navigate("SelectedQuestion");
          } else {
            //Check Error Response
            console.log("responseJson.errors", responseJson.errors);
            CutomAlertFail(responseJson?.errors[0]?.message);
          }
          this.parseApiCatchErrorResponse(errorReponse);
        }
      }
    }
    this.setState({ isLoder: false });

    // Customizable Area Start
    // Customizable Area End
  }

  async questioGetSuccess(responseJson: any) {
    if (!responseJson.errors) {
      this.setState({ apiQuestionData: responseJson?.data });
      console.log("qestion get successfully", this.state.apiQuestionData);
    } else {
      //Check Error Response
      CutomAlertFail(responseJson?.errors[0]?.account);
    }
  }

  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false,
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
     keyboardType: "email-address",
     autoCompleteType: "email",
  };


  btnShowHideProps = {
    onPress: () => {
      this.setState({ enableField: !this.state.enableField });
      this.txtInputProps.secureTextEntry = !this.state.enableField;
      this.btnShowHideImageProps.source = this.txtInputProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };

  txtInputProps = this.isPlatformWeb()
    ? this.txtInputWebProps
    : this.txtInputMobileProps;

  btnExampleProps = {
    onPress: () => this.doButtonPressed(),
  };

  btnShowHideImageProps = {
    source: this.txtInputProps.secureTextEntry
      ? imgPasswordVisible
      : imgPasswordInVisible,
  };

  OkayButtonPressed() {
    this.props.navigation.navigate("ProfileActive", {
      isLevel1: false,
    });
  }

  ProfileActiveOk() {
    this.props.navigation.navigate("AllowMedia");
  }

  goToQuestionBanck() {
    this.props.navigation.navigate("QuestionBank");
  }

  async allowMedia() {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: "Media Permission",
            message: "App needs access to your media files.",
            buttonPositive: "OK",
            buttonNegative: "Cancel",
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.props.navigation.navigate("UploadImage");
        } else {
          if (granted == "never_ask_again") {
            Linking.openSettings();
          } else {
            CutomAlertFail("Media permission denied");
          }
        }
      } catch (error) {
        console.log("Error requesting media permission:", error);
      }
    } else {
      console.log("Media permission not required on iOS");
    }

  }

  goBack() {
    this.props.navigation.goBack();
  }

  async getQuestionData() {
    this.setState({ isLoder: true });
    const res = await getStorageData("token");
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      token: res,
    };

    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.questionGetApiCallId = getValidationsMsg.messageId;

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_question_bank/list_question"
    );

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );
    runEngine.sendMessage(getValidationsMsg.id, getValidationsMsg);
  }


  questionSubmitApi() {

    if (this.state.selectedQuestionIds.length < 5) {
      CutomAlertFail("Please select atleast five question");
      return;
    }

    if (this.state.selectedQuestionIds.length > 5) {
      CutomAlertFail("Please select maximum five question");
      return;
    }

    showPopupWithOkAndCancel(
      "Are you sure you want to submit?",
      "You will not be able to change your answers once submitted.",
      () => {},
      this.selectedQuestoinApi.bind(this),
      "Submit",
      "Cancel"
    );
  }
    

  async selectedQuestoinApi() {
    this.setState({ isLoder: true });

    const res = await getStorageData("token");
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      token: res,
    };
    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.questionSelectedApiCallId = getValidationsMsg.messageId;
    
    const result = this.state.selectedQuestionIds.map((item) => {
      return {
        question_bank_id: Number(item),
      };
    });

    const httpBody = {
      data: {
        attributes: {
          questions: result,
        },
      },
    };

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_question_bank/select_questions"
    );

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "POST"
    );

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    runEngine.sendMessage(getValidationsMsg.id, getValidationsMsg);
  }

  doButtonPressed() {
    let msg = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msg.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(msg);
  }

  // web events
  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };

  onPressQuestion = (id: any) => {
    let { selectedQuestionIds } = this.state;
    if (this.state.selectedQuestionIds.length === 5) {
        selectedQuestionIds = selectedQuestionIds.filter((qid) => qid !== id);
      this.setState({ selectedQuestionIds });
      CutomAlertFail("You have already selected five question");
      return;
    }
    if (selectedQuestionIds.includes(id)) {
      selectedQuestionIds = selectedQuestionIds.filter((qid) => qid !== id);
      console.log("selectedQuestionIds", selectedQuestionIds);
    } else {
      selectedQuestionIds.push(id);
      console.log("selectedQuestionIds >>>>", selectedQuestionIds);
    }
    this.setState({ selectedQuestionIds });
  };

  // Customizable Area Start
  // Customizable Area End
}
