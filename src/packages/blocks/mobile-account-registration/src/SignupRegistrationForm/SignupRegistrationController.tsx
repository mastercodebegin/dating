import { IBlock } from "../../../../framework/src/IBlock";
import { Message } from "../../../../framework/src/Message";
import { BlockComponent } from "../../../../framework/src/BlockComponent";
import { runEngine } from "../../../../framework/src/RunEngine";
// Customizable Area Start
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { showMessage } from "react-native-flash-message";
import { getStorageData, setStorageData } from "../../../../framework/src/Utilities";
import { style } from "../../../../components/src/CustomFonts";
import { Platform } from "react-native";
import StorageProvider from "../../../../framework/src/StorageProvider";
export const configJSON = require("./config");
// Customizable Area End

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export interface S {
  // Customizable Area Start
  firstName: string;
  email: string;
  password: string;
  otpAuthToken: string;
  reTypePassword: string;
  reTypePasswordError: string;
  data: any[];
  passwordHelperText: string;
  enablePasswordField: boolean;
  enableReTypePasswordField: boolean;
  isFocused: boolean;
  firstNameFocus: boolean;
  emailFocus: boolean;
  passwordFocus: boolean;
  reTypePasswordFocus: boolean;
  firstNameError: string;
  emailError: string;
  passwordError: string;
  confirmPasswordError: string;
  isLoder: boolean;
  isCheck: boolean;
  isCheckError: string;
  fcmToken:any
  // Customizable Area End
}

export interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class SignupRegistrationController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  arrayholder: any[];
  passwordReg: RegExp;
  emailReg: RegExp;
  firstNameReg: RegExp;
  addAdditionalDetailApiCallId: any;
  validationApiCallId: string = "";
  createSignupApiCallId: string = "";

  labelHeader: any;
  labelFirstName: string;
  labelEmail: string;
  labelPassword: string;
  labelRePassword: string;
  labelLegalText: string;
  labelLegalTermCondition: string;
  labelLegalPrivacyPolicy: string;
  btnTextSignUp: string;
  isFocused: boolean = false;
  firstNameFocus: boolean = false;
  emailFocus: boolean = false;
  passwordFocus: boolean = false;
  reTypePasswordFocus: boolean = false;
  welcomeText: string;
  creatAccText: string;

  // Customizable Area End

  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
    ];
    this.receive = this.receive.bind(this);
    this.state = {
      firstName: "",
      firstNameError: "",
      emailError: "",
      passwordError: "",
      confirmPasswordError: "",
      email: "",
      password: "",
      reTypePassword: "",
      reTypePasswordError: "",
      otpAuthToken: "",
      data: [],
      passwordHelperText: "",
      enablePasswordField: true,
      enableReTypePasswordField: true,
      isFocused: false,
      firstNameFocus: false,
      emailFocus: false,
      passwordFocus: false,
      reTypePasswordFocus: false,
      isLoder: false,
      isCheck: false,
      isCheckError: "",
      fcmToken:""
    };

    this.arrayholder = [];
    this.passwordReg = new RegExp(
      /^(?=.*\d)(?=.*\W)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/
    );
    this.emailReg = new RegExp(
      /^[a-z0-9_%+-]+(\.[a-z0-9_%+-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/
    );
    this.firstNameReg = new RegExp(/^[a-zA-Z ]+$/);
    this.labelHeader = configJSON.labelHeader;
    this.labelFirstName = configJSON.labelFirstName;
    this.labelEmail = configJSON.labelEmail;
    this.labelPassword = configJSON.labelPassword;
    this.labelRePassword = configJSON.labelRePassword;
    this.labelLegalText = configJSON.labelLegalText;
    this.labelLegalTermCondition = configJSON.labelLegalTermCondition;
    this.labelLegalPrivacyPolicy = configJSON.labelLegalPrivacyPolicy;
    this.btnTextSignUp = configJSON.btnTextSignUp;
    this.creatAccText = configJSON.creatAccText;
    this.welcomeText = configJSON.welcomeText;
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
      if (apiRequestCallId && responseJson) {
        this.successResponse(apiRequestCallId, responseJson)
      }
    }
    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      const otpAuthTkn = message.getData(
        getName(MessageEnum.AuthTokenDataMessage)
      );
      if (otpAuthTkn && otpAuthTkn.length > 0) {
        this.setState({ otpAuthToken: otpAuthTkn });
        runEngine.debugLog("otpAuthTkn", this.state.otpAuthToken);
        runEngine.unSubscribeFromMessages(this as IBlock, [message.id]);
      }
    }
    this.setState({ isLoder: false })
    // Customizable Area End
  }


  // Customizable Area Start

  async successResponse(apiRequestCallId: any, responseJson: any) {
    if (apiRequestCallId === this.addAdditionalDetailApiCallId) {
      if (responseJson.errors) {
        showMessage({
          message: responseJson.errors[0].account,
          type: "none"
        });
      }
      if (!responseJson.errors) {
        const msg: Message = new Message(
          getName(MessageEnum.AccoutResgistrationSuccess)
        );
       await setStorageData("token", responseJson.meta.token);
        await setStorageData("FIRSTNAME", this.state.firstName);
        await setStorageData("USERID", responseJson.data.id);
        await setStorageData("USERNAME", responseJson.data.attributes.user_name);
        console.log("nnnnn", responseJson)

        msg.addData(
          getName(MessageEnum.NavigationPropsMessage),
          this.props
        );

        this.props.navigation.navigate("EmailOTPInput", {
          user_name: this.state.firstName,
          email: this.state.email,
          password: this.state.password,
          password_confirmation: this.state.reTypePassword,
          signup: true,
        }); 
                
       } else {
        //Check Error Response
      }
    }

  }
  isValidFirstName(firstName: string) {
    return this.firstNameReg.test(firstName);
  }

  isValidEmail(email: string) {
    return this.emailReg.test(email.toLowerCase());
  }
  onItemClick(item: any, itmLength: any) {
    if (item) {
      return style.black
    }
    else {
      if (itmLength) {
        return style.black
      } else {
        return style.bColor;

      }
    }
  }

  public onFocus = (focusId: string) => {
    switch (focusId) {
      case "firstNameFocuse":
        this.setState({ firstNameFocus: true, firstNameError: '' });
        break;
      case "emailFocuse":
        this.setState({ emailFocus: true, emailError: '' });
        break;
      case "passwordFocus":
        this.setState({ passwordFocus: true, passwordError: '' });
        break;
      case "reTypePasswordFocus":
        this.setState({ reTypePasswordFocus: true, confirmPasswordError: '' });
        break;
      default:
        return;
    }
  };

  public onBlur = (focusId: string) => {
    switch (focusId) {
      case "firstNameFocuse":
        this.hanldeFirstName();
        this.setState({ firstNameFocus: false });
        break;
      case "emailFocuse":
        this.handleEmail();
        this.setState({ emailFocus: false });
        break;
      case "passwordFocus":
        this.handlePassword()
        this.setState({ passwordFocus: false });
        break;
      case "reTypePasswordFocus":
        this.handleConfirmPassword()
        this.setState({ reTypePasswordFocus: false });
        break;
      default:
        return;
    }
  };

  componentDidUpdate(prevProps: any, prevState: { isCheck: boolean; }) {
    if (this.state.isCheck && this.state.isCheck !== prevState.isCheck) {
      this.setState({ isCheckError: '' });
    }
  }


  async addAdditionalDetail(): Promise<boolean> {
    let fcmToken = await getStorageData('USER_FCM_TOKEN');
    console.log('@@@ User login Fcm Token=========', fcmToken)
 
    this.setState({ isLoder: true,fcmToken: fcmToken })

    if (!this.state.firstName || !this.state.email || !this.state.password || !this.state.reTypePassword || !!this.state.firstNameError || !!this.state.emailError || !!this.state.passwordError || !!this.state.confirmPasswordError) {
      this.hanldeFirstName();
      this.handleEmail();
      this.handlePassword();
      this.handleConfirmPassword();
      this.setState({ isLoder: false })
      return false
    }

    if (!this.state.isCheck) {
      this.setState({ isLoder: false })
      this.setState({ isCheckError: 'You must agree to our Terms and condition and Privacy Policy' })
      return false
    }

    const header = {
      "Content-Type": configJSON.contentTypeApiAddDetail,
    };

    const attrs = {
      full_name: this.state.firstName,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.reTypePassword,
      device_id: this.state.fcmToken,
      platform: Platform.OS,
    };

    const data = {
      type: "email_account",
      attributes: attrs,
    };

    const httpBody = {
      data: data,
    };

    const requestMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.addAdditionalDetailApiCallId = requestMsg.messageId;
    requestMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.apiEndPointAddDetail
    );

    requestMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMsg.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeAddDetail
    );

    runEngine.sendMessage(requestMsg.id, requestMsg);
    return true;
  }

  getValidations() {
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
    };

    const getValidationsMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.validationApiCallId = getValidationsMessage.messageId;

    getValidationsMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.urlGetValidations
    );

    getValidationsMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    getValidationsMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(getValidationsMessage.id, getValidationsMessage);
  }

  processOnClickMessage(messageID: string, values: any = null) {

    if (messageID === "btnSignUp") {
      this.addAdditionalDetail();
    }
  }

  hanldeFirstName() {
    if (this.state.firstName.trim().length == 0) {
      return this.setState({ firstNameError: configJSON.plsEnterName });
    } else if (this.state.firstName.length < 3) {
      return this.setState({
        firstNameError: configJSON.errorFirstNameMoreThanThreeCharacters,
      });
    } else if (this.state.firstName.length > 40) {
      return this.setState({
        firstNameError: configJSON.errorFirstNameLessThanFourtyCharacters,
      });
    } else if (!this.isValidFirstName(this.state.firstName.trim())) {
      return this.setState({
        firstNameError: configJSON.errorFirstNameNotValid,
      });
    } else {
      this.setState({ firstNameError: "" });
    }
  }

  handleEmail() {
    if (!this.isValidEmail(this.state.email)) {
      return this.setState({ emailError: configJSON.errorEmailNotValid });
    } else {
      this.setState({ emailError: "" });
    }
  }

  handlePassword() {
    if (this.state.password.trim().length == 0) {
      return this.setState({ passwordError: configJSON.errorPasswordEnter });
    } else if (this.state.password.trim().length < 8) {

      return this.setState({ passwordError: configJSON.errorPasswordNotValid });
    } else {
      this.setState({ passwordError: "" });
    }
  }

  handleConfirmPassword() {
    if (this.state.reTypePassword === null || this.state.reTypePassword.length == 0) {
      return this.setState({
        confirmPasswordError: configJSON.errorConfirmPasswordEnter,
      });
    } else if (this.state.password !== this.state.reTypePassword) {
      return this.setState({
        confirmPasswordError: configJSON.errorBothPasswordsNotSame,
      });
    } else {
      this.setState({ confirmPasswordError: "" });
    }
  }

  public changeState(objectID: string, value: any = null) {
    switch (objectID) {
      case "txtInputFirstName":
        this.setState({ firstName: value, firstNameError: '' });
        break;
      case "txtInputEmail":
        this.setState({ email: value.trim(), emailError: '' });
        break;
      case "txtInputPassword":
        this.setState({ password: value.trim(), passwordError: '' });
        break;
      case "btnPasswordShowHide":
        this.setState({ enablePasswordField: value });
        break;
      case "txtInputConfirmPassword":
        this.setState({ reTypePassword: value.trim(), confirmPasswordError: '' })
        break;
      case "btnConfirmPasswordShowHide":
        this.setState({ enableReTypePasswordField: value });
        break;
      default:
        return null;
    }
  }

  getState(objectID: string) {
    switch (objectID) {
      case "txtInputFirstName":
        return this.state.firstName;
      case "txtInputPassword":
      case "imgEnablePasswordField":
      case "btnPasswordShowHide":
        return this.state.enablePasswordField;
      case "txtInputConfirmPassword":
      case "enableConfirmPasswordField":
      case "btnConfirmPasswordShowHide":
        return this.state.enableReTypePasswordField;
      case "imgEnableRePasswordField":
        return this.state.enableReTypePasswordField;
      default:
        return null;
    }
  }

  // goBack() {
  //   this.props.navigation.replace("EmailOTPInput", {
  //     "userEmail": this.state.email,
  //   });
  // }
  // Customizable Area End
}
