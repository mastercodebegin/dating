import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
import { getStorageData } from "../../../framework/src/Utilities";
import { BackHandler } from "react-native";
import { generateUniqueID } from "../../../components/src/CustomUtility";
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
  check: number
  isFistName: any,
  isLastname: any,
  isMobile: any,
  prifileimage: any,
  isLoading: boolean,
  data: any,
  imagepath: any,
  user_name: any,
  currentPasswordText: any;
  newPasswordText: any;
  reTypePasswordText: any;
  llDoChangePwdContainerVisible: boolean;
  edtEmailEnabled: boolean,
  llChangePwdDummyShowContainerVisible: boolean
  edtMobileNoEnabled: boolean
  imageData: any
  // Customizable Area End

}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class UserProfileBasicControllerNew extends BlockComponent<
  Props,
  S,
  SS
> {

  // Customizable Area Start

  userProfileGetApiCallId: any;
  userAttr: any;
  willFocusSubscription: any;
  userProfileUploadPicID: any
  registrationAndLoginType: any;
  authToken: any;
  apiCallMessageUpdateProfileRequestId: any;
  apiChangePhoneValidation: any;
  uniqueSessionRequesterId: any;
  validationApiCallId: any;
  emailReg: any;
  passwordReg: any;

  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.CountryCodeMessage)
    ];

    this.state = {
      isFistName: '',
      isLastname: '',
      isMobile: '',
      prifileimage: '',
      isLoading: false,
      data: {},
      imagepath: "",
      check: 0,
      email: '',
      user_name: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      currentCountryCode: '',
      currentPasswordText: "",
      newPasswordText: "",
      reTypePasswordText: "",
      llDoChangePwdContainerVisible: false,
      edtEmailEnabled: false,
      llChangePwdDummyShowContainerVisible: false,
      edtMobileNoEnabled: false,
      imageData: []
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this, this.subScribedMessages);
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
        if (apiRequestCallId === this.userProfileGetApiCallId) {
            this.UserDetailsSuccCallBack(responseJson);   
        }
        else {
          this.setState({ isLoading: false })

          this.parseApiErrorResponse(responseJson);
        }

        this.parseApiCatchErrorResponse(errorReponse);
      }

     
    }
    // Customizable Area End
  }
  goToPrivacyPolicy() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationPrivacyPolicyMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  goToTermsAndCondition() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationTermAndConditionMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }
  onCheckValue= () => {
    if(this.state.data?.age_between?.age_between === "null-null"){
      return "N/A"
    
    } else if (this.state.data?.age_between?.age_between){
      return this.state.data?.age_between?.age_between
    }else {
      return "N/A"
      
    }

  }

 

  requestSessionData() {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.uniqueSessionRequesterId = message.messageId;
    this.send(message);
  }

  getUserProfile() {
    const requestMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.userProfileGetApiCallId = requestMsg.messageId;

    requestMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiGetUserProfile
    );

    const header = {
      "Content-Type": configJSON.contentTypeApiGetUserProfile,
      token: this.authToken
    };

    requestMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.methodTypeApiGetUserProfile
    );

    runEngine.sendMessage(requestMsg.id, requestMsg);
  }

  getValidations() {
    const headers = {
      "Content-Type": configJSON.validationApiContentType
    };

    const getValidationsResMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.validationApiCallId = getValidationsResMsg.messageId;

    getValidationsResMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.urlGetValidations
    );

    getValidationsResMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    getValidationsResMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(getValidationsResMsg.id, getValidationsResMsg);
  }

  // Customizable Area Start
  UserDetailsSuccCallBack = (responseJson: any) => {
    console.log("responseJson@@@", JSON.stringify(responseJson))
    this.setState({
      imageData: responseJson && responseJson?.data?.attributes && responseJson?.data?.attributes?.photos && responseJson?.data?.attributes?.photos == null ? [] : responseJson?.data?.attributes?.photos,
      data: responseJson?.data?.attributes,
      isFistName: responseJson?.data?.attributes?.name,
      isLastname: responseJson?.data?.last_name,
      isMobile: responseJson?.data?.phone_number,
      prifileimage: responseJson?.data?.avatar?.url,
      email: responseJson?.data?.email,
      user_name: responseJson?.data?.attributes?.user_name,

    })

  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
  }

  async componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  }

  backPressed() {
    BackHandler.exitApp();
    return true;
  }

  async getUserProfileData() {
    const res = await getStorageData('token');

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
      token: res
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

  onClickEditIcon() {
    if (this.state.imageData != null && this.state.imageData?.length == 6) {
      this.props.navigation.navigate('UploadImageEdit', { ImageData: this.state.imageData, about: this.state.data.about })
    }
    else {
      let image = [...this.state.imageData];
      const count = 6 - this.state.imageData?.length
      for (let i = 0; i < count; i++) {
        image.push({
          id: generateUniqueID(),
          url: 'Emptyimage',
          isStatic: true
        })

      }
      this.props.navigation.navigate('UploadImageEdit', { ImageData: image, about: this.state.data.about })

    }

  }
  // Customizable Area End

}
