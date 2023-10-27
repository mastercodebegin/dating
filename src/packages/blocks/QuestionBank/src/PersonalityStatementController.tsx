import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { getStorageData } from "../../../framework/src/Utilities";
import { CutomAlertFail } from "../../../components/src/CustomAlert";
//@ts-ignore
import { NavigationActions } from 'react-navigation';
//@ts-ignore
import { COMETCHAT_CONSTANTS } from "../../../components/src/cometchat-chat-uikit-react-native/CometChatWorkspace/src/utils/CometChatConstants";
import { CometChat } from '@cometchat-pro/react-native-chat';
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
  // Customizable Area Start
  userInfo: string;
  imgData: any;
  isLoder: boolean;
  isUpdate: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class PersonalityStatementController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  personalityStatementApiCallId: any;
  bioUpdateApiCallId: any;
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
      userInfo: "",
      imgData: [],
      isLoder: false,
      isUpdate: false,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // const data = navigation.getParam("imgData", "[]");
    const data = this.props.navigation.state.params.imgData
    if (data) {
      this.setState({
        imgData: data,
      });
    }
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
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
        if (apiRequestCallId === this.personalityStatementApiCallId) {
          console.log("Response from personality statement", JSON.stringify(responseJson.data.attributes.name.name))
          await this.pesonalityApiSuccess(responseJson)
          const userId = await getStorageData("USERID");

          let newUser = new CometChat.User(userId);
          newUser.setName(responseJson.data.attributes.name.name);
          newUser.setAvatar(responseJson.data.attributes.photos[0].url);
          newUser.setMetadata(responseJson.data.attributes)
          console.log("new user", JSON.stringify(newUser));

          const appSetting = new CometChat.AppSettingsBuilder()
          .subscribePresenceForAllUsers()
          .setRegion(COMETCHAT_CONSTANTS.REGION)
          .build();
          CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSetting).then(
            () => {
              console.log("Initialization completed successfully while registering user");
              CometChat.createUser(newUser, COMETCHAT_CONSTANTS.AUTH_KEY).then(
                (user) => console.log("User created successfully", user),
                (error) => console.log("Error in creating user", error)
              );
            },
            (error) => {
              this.setState({ isLoder: false });
              console.log("Initialization failed while logging in with error:", error);
            }
          );
          this.parseApiCatchErrorResponse(errorReponse);
        } else if (apiRequestCallId === this.bioUpdateApiCallId) {
          if (!responseJson.errors) {
            this.setState({ isLoder: false })

            this.props.navigation.navigate("Footer");
          } else {
            console.log("error >>", responseJson);
            //Check Error Response
            this.setState({ isLoder: false })
            CutomAlertFail(responseJson?.errors[0]?.profiles);
          }
          this.parseApiCatchErrorResponse(errorReponse);
        }
      }
    }
    this.setState({ isLoder: false })
  }

  async pesonalityApiSuccess(responseJson: any) {
    if (!responseJson.errors) {
      this.setState({ isLoder: false })
      console.log("responseJson", responseJson);
      const navigateAction = NavigationActions.navigate({
        routeName: 'Footer',
        params: {},

        // navigate can have a nested navigate action that will be run inside the child router
        action: NavigationActions.navigate({ routeName: 'Footer' }),
      });
      this.props.navigation.dispatch(navigateAction);
    } else {
      //Check Error Response
      this.setState({ isLoder: false })
      CutomAlertFail("Select minimum 4 images");
    }
  }

  goBack() {
    this.props.navigation.goBack();
  }

  async doButtonPressed(imgData: Array<any>) {
    if (!this.state.userInfo) {
      return CutomAlertFail("Please enter your about You text")
    }

    if (this.state.isUpdate) {
      return this.updateBioApi();
    }

    this.setState({ isLoder: true })
    const res = await getStorageData("token");
    const header = {
      token: res
    };

    const httpBody = new FormData();
    imgData.forEach((item) => {
      httpBody.append("profile[photos][]", item);
    })
    httpBody.append("profile[about]", this.state.userInfo);

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.personalityStatementApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.apiEndPointPersonality
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      httpBody
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeAddDetail
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  async updateBioApi() {
    this.setState({ isLoder: true })
    const res = await getStorageData("token");
    const header = {
      "Content-Type": "application/json",
      token: res
    };

    const httpBody = {
      "about": this.state.userInfo,
    }
    console.log("httpBody", httpBody);
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.bioUpdateApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_profile/profiles/update_profile"
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "PUT"
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  // Customizable Area Start
  setUserInputValue = (text: string) => {
    this.setState({ userInfo: text });
  };

  async componentDidMount() {
    const imageData = this.props.navigation.state.params?.imgData;
    const aboutData = this.props.navigation.state.params?.about;
    console.log("imageData>>>", imageData);
    console.log("aboutData>>>", aboutData);
    const filterImage = imageData.filter((item: any) => item.uri !== "Emptyimage");
    if (filterImage.length > 0) {
      this.setState({ imgData: filterImage, userInfo: aboutData });
    }
    if (aboutData) {
      this.setState({ isUpdate: true });
    }
  }
  // Customizable Area End
}
