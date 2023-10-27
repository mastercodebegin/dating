import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
import StorageProvider from "../../../framework/src/StorageProvider";
import { IBlock } from "framework/src/IBlock";
import { getStorageData } from "../../../framework/src/Utilities";
import { CometChat } from "@cometchat-pro/react-native-chat";
// @ts-ignore
import { StackActions, NavigationActions } from 'react-navigation';
// Customizable Area End

export const configJSON = require("./config");
export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  firstName: any;
  lastName: any;
  email: any;
  phoneNumber: any;
  currentCountryCode: any;
  data: any[];
  passwordHelperText: string;
  enablePasswordField: boolean;
  enableReTypePasswordField: boolean;
  enableNewPasswordField: boolean;

  edtEmailEnabled: boolean;
  llDoChangePwdContainerVisible: boolean;
  llChangePwdDummyShowContainerVisible: boolean;

  currentPasswordText: any;
  newPasswordText: any;
  reTypePasswordText: any;

  edtMobileNoEnabled: boolean;
  countryCodeEnabled: boolean;

  saveButtonDisable: boolean;
  check: number,
  userData: any,
  isLoading: boolean,
  imagePath: any,
  name: any,
  user_name:any
  // Customizable Area End

}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class UserProfileBasicController extends BlockComponent<
  Props,
  S,
  SS
> {

  // Customizable Area Start
  labelMobile: string;
  labelEmail: string;
  labelCurrentPassword: string;
  labelNewPassword: string;
  labelFirstName: string;
  lastName: string;
  btnTextSaveChanges: string;
  labelHeader: any;
  btnTextChangePassword: string;
  labelArea: string;
  labelRePassword: string;
  btnTextCancelPasswordChange: string;

  apiCallMessageUpdateProfileRequestId: any;
  validationApiCallId: string = "";
  apiChangePhoneValidation: any;
  arrayholder: any[];
  passwordReg: RegExp;
  emailReg: RegExp;
  uniqueSessionRequesterId: any;
  userProfileGetApiCallId: any;
  registrationAndLoginType: string = "";
  authToken: any;
  userAttr: any;
  willFocusSubscription: any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.CountryCodeMessage)
    ];

    this.state = {
      passwordHelperText: "",
      enablePasswordField: true,
      enableReTypePasswordField: true,
      enableNewPasswordField: true,
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      edtMobileNoEnabled: true,
      countryCodeEnabled: true,
      saveButtonDisable: false,

      currentCountryCode: configJSON.hintCountryCode,
      data: [],

      edtEmailEnabled: true,
      llDoChangePwdContainerVisible: false,
      llChangePwdDummyShowContainerVisible: false,

      currentPasswordText: "",
      newPasswordText: "",
      reTypePasswordText: "",

      check: 0,
      userData: '',
      isLoading: false,
      imagePath: '',
      name: '',
      user_name:''
    };

    this.arrayholder = [];
    this.passwordReg = /\w+/;
    this.emailReg = /\w+/;

    this.labelFirstName = configJSON.labelFirstName;
    this.lastName = configJSON.lastName;
    this.labelArea = configJSON.labelArea;
    this.labelMobile = configJSON.labelMobile;
    this.labelEmail = configJSON.labelEmail;
    this.labelCurrentPassword = configJSON.labelCurrentPassword;
    this.labelNewPassword = configJSON.labelNewPassword;
    this.labelRePassword = configJSON.labelRePassword;
    this.btnTextCancelPasswordChange = configJSON.btnTextCancelPasswordChange;
    this.btnTextSaveChanges = configJSON.btnTextSaveChanges;
    this.labelHeader = configJSON.labelHeader;
    this.btnTextChangePassword = configJSON.btnTextChangePassword;
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);
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

      if (responseJson && responseJson?.data) {
        if (apiRequestCallId === this.userProfileGetApiCallId) {
                 this.setState({
              imagePath: responseJson?.data?.attributes?.photos[0],
              user_name: responseJson?.data?.attributes?.user_name,
              name:responseJson?.data?.attributes?.name,
              isLoading: false
            })
          
        }
      } 
      else{
        this.showAlert("Error", responseJson.errors.toString())

        this.parseApiErrorResponse(responseJson);
      }

      this.parseApiCatchErrorResponse(errorReponse);
      }
      // Customizable Area End
    }

  logoutUserData = () => {
    CometChat.logout().then(
      () => {
        console.log("Logout completed successfully");
      },error=>{
        console.log("Logout failed with exception:",{error});
      }
    );
    StorageProvider.remove('login')
    StorageProvider.remove('logintoken')
    const resetAction = StackActions.reset({ // import StackActions & NavigationActions from react-navigation
      index: 0,
      key: null, // this is important
      actions: [NavigationActions.navigate({ routeName: "Splashscreen" })] // where you want to go after reset
    });
    this.props.navigation.dispatch(resetAction);
  };


  async componentDidMount() {
    this.getUserProfileData()
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.getUserProfileData();
      }
    )
  }
  async getUserProfileData() {
    const response = await getStorageData('token');

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.userProfileGetApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.apiGetUserProfileEndPoint
    );

    const header = {
      "Content-Type": configJSON.contentTypeApiGetUserProfile,
      token: response
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.methodTypeApiGetUserProfile
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }
  // Customizable Area End

}
