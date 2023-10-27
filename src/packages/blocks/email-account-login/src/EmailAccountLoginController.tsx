import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { imgPasswordInVisible, Eye } from "./assets";
import { setStorageData } from "../../../framework/src/Utilities";
import { showMessage } from "react-native-flash-message";
//@ts-ignore
import { CometChat } from '@cometchat-pro/react-native-chat';
//@ts-ignore
import { COMETCHAT_CONSTANTS } from "../../../components/src/cometchat-chat-uikit-react-native/CometChatWorkspace/src/utils/CometChatConstants";
import { style } from "../../../components/src/CustomFonts";
import { getStorageData } from "framework/src/Utilities";
import { GoogleSignin, statusCodes } from "@react-native-community/google-signin";
import { Platform } from "react-native";
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
  password: string;
  email: string;
  enablePasswordField: boolean;
  checkedRememberMe: boolean;
  placeHolderEmail: string;
  placeHolderPassword: string;
  imgPasswordVisible: any;
  imgPasswordInVisible: any;
  labelHeader: string;
  btnTxtLogin: string;
  labelRememberMe: string;
  btnTxtSocialLogin: string;
  labelOr: string;
  validEmailToken: any;
  isEmailFocus: boolean;
  isPasswordFocus: boolean;
  emailError: string;
  errorPassword: string;
  isLoder: boolean;
  checkCondition: boolean;
  fcmToken:any
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class EmailAccountLoginController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  apiEmailLoginCallId: string = "";
  googleLoginCallId: string = "";
  validationApiCallId: string = "";
  resetApiCallId: any;
  emailReg: RegExp;
  labelTitle: string = "";
  backHandler: any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage)];

    this.state = {
      email: "",
      password: "",
      enablePasswordField: true,
      checkedRememberMe: false,
      placeHolderEmail: configJSON.placeHolderEmail,
      placeHolderPassword: configJSON.placeHolderPassword,
      imgPasswordVisible: configJSON.imgPasswordVisible,
      imgPasswordInVisible: imgPasswordInVisible,
      labelHeader: configJSON.labelHeader,
      btnTxtLogin: configJSON.btnTxtLogin,
      labelRememberMe: configJSON.labelRememberMe,
      btnTxtSocialLogin: configJSON.btnTxtSocialLogin,
      labelOr: configJSON.labelOr,
      validEmailToken: [],
      isEmailFocus: false,
      isPasswordFocus: false,
      emailError: "",
      errorPassword: "",
      isLoder: false,
      checkCondition: true,
      fcmToken:''
    };

    this.emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.labelTitle = configJSON.labelTitle;
    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    this.callGetValidationApi();
    this.send(new Message(getName(MessageEnum.RequestUserCredentials)));
    // Customizable Area Start
    // this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
    //       // this.check();
    //       return true
    //     })
    // this.callResetValidationEmailApi();
    // Customizable Area End
  }

  // Customizable Area Start
  setEmail(arg:any){this.setState({isLoder:true})}
  setPassword(arg:any){this.setState({isLoder:true})}
  handleClickShowPassword(arg:any){this.setState({isLoder:true})}
  setRememberMe(arg:any){this.setState({isLoder:true})}

  callUnusedFunctions() {
    this.sendLoginFailMessage()
     this.sendLoginSuccessMessage()
     this.callResetValidationEmailApi()
     this.saveLoggedInUserData({'meta':{'token':'test'}})
     this.openInfoPage()
     this.onStyleEmail()
     this.btnPasswordShowHideProps()
   }

  onSuccessResponse =async (responseJson:any)=>{
    try {
      const jsonValue = JSON.stringify(responseJson.meta.token);
      await setStorageData("emailToken", jsonValue);
      // await AsyncStorage.setItem('emailToken', jsonValue)
    } catch (e) {
      // saving error
    }
    return this.props.navigation.navigate("CreatePassword");

  }
  // btnSocialLoginProps = {
  // check = () => {
  //   if(this.props.route?.name == 'HelpMeCountdownScreen'){
  //   return false
  //    //return null
  //     }
  //     else{
  //       return this.props.navigation.dispatch(StackActions.replace('MainNavigator'))
  //     }
  //   }

  // async componentDidMount(){
  // let loginToken = await getStorageData("logIn_token")
  //   // this.setState({ token: loginToken })
  //   this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
  //     this.check();
  //     return true
  //   })

  //   onPress: () => this.goToSocialLogin(),
  // };

  btnPasswordShowHideProps = () => {
    this.setState({ enablePasswordField: !this.state.enablePasswordField });
    this.txtInputPasswordProps.secureTextEntry =
      !this.state.enablePasswordField;
    this.btnPasswordShowHideImageProps.source = this.txtInputPasswordProps
      .secureTextEntry
      ? Eye
      : imgPasswordInVisible;
  };

  txtInputPasswordProps = {
    onChangeText: (text: string) => {
      this.setState({ password: text, errorPassword: "" });

      //@ts-ignore
      this.txtInputPasswordProps.value = text;
    },
    secureTextEntry: true,
  };

  btnPasswordShowHideImageProps = {
    source: Eye,
  };

  //     //@ts-ignore
  //     this.txtInputEmailProps.value = text;
  //   },
  // };

  storeData = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await setStorageData("accessToken", jsonValue);
      // await AsyncStorage.setItem('accessToken', jsonValue)
    } catch (e) {
      // saving error
    }
  };

  emailBlur() {
    this.setState({ isEmailFocus: false });
    if (this.state.email === null || this.state.email.length === 0) {
      return this.setState({ emailError: "Please enter your email id" });
    } else if (!this.validateEmail(this.state.email)) {
      return this.setState({ emailError: configJSON.errorEmailNotValid });
    } else {
      return this.setState({ emailError: "" });
    }
  }

  passwordBlur() {
    // !this.checkPasswordStrong(this.state.password))
    this.setState({ isPasswordFocus: false });
    if (this.state.password === null || this.state.password.length === 0) {
      return this.setState({ errorPassword: "Please enter your password" });
    } else {
      this.setState({ errorPassword: "" });
    }
  }

  googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const getToken = await GoogleSignin.getTokens()
      this.googleLoginAPi(getToken?.idToken)
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log("error1>>", error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("error2>>", error);
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("error3>>", error);
        // play services not available or outdated
      } else {
        console.log("error4>>", error);
        // some other error happened
      }
    }
  }

  stopLoading() {
    this.setState({ isLoder: false });
  }

  emailLogIn = async () => {
    let fcmToken = await getStorageData('USER_FCM_TOKEN');

    this.setState({ isLoder: true });
    if (
      !this.state.email ||
      !this.state.password ||
      !!this.state.emailError ||
      !!this.state.errorPassword
    ) {
      this.emailBlur();
      this.passwordBlur();
      this.setState({ isLoder: false ,fcmToken: fcmToken});
      return false;
    }

    const header = {
      "Content-Type": configJSON.loginApiContentType,
    };

    const attrs = {
      email: this.state.email,
      password: this.state.password,
      device_id: "",
      platform: Platform.OS,
    };

    const data = {
      type: "email_account",
      attributes: attrs,
    };

    const httpBody = {
      data: data,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiEmailLoginCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.loginAPIEndPoint
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
      configJSON.loginAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };
  onStyle = () => {
    if (this.state.emailError) {
      return style.red
    } else {
      if (this.state.isEmailFocus) {
        return style.black
      } else {
        if (this.state.email.length) {
          return style.black
        }
        else {
          return style.bColor;
        }
      }

    }

  }
  onSyleTintColour() {
    if (this.state.isPasswordFocus) {
      return style.black
    } else {
      if (this.state.password.length) {
        return style.black
      }
      else {
        return style.bColor;
      }
    }

  }


  onSyleEmailIconColour() {
    if (this.state.isEmailFocus) {
      return style.black
    } else {
      if (this.state.email.length) {
        return style.black
      }
      else {
        return style.bColor;
      }
    }

  }

  onStylePassword() {
    if (this.state.errorPassword) {
      return style.red
    } else {
      if (this.state.isPasswordFocus) {
        return style.black
      } else {
        if (this.state.password.length) {
          return style.black
        }
        else {
          return style.bColor;
        }
      }

    }

  }
  onStyleEmail = () => {
    if (this.state.isEmailFocus) {
      return style.black
    } else {
      if (this.state.email.length) {
        return style.black
      }
      else {
        return style.bColor;
      }
    }
  }
  validateEmail = (email: string) => {
    return RegExp(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    ).exec(String(email).toLowerCase());
  };

  callResetValidationEmailApi = () => {
    if (!this.validateEmail(this.state.email)) {
      showMessage({
        message: configJSON.errorEmailNotValid,
        type: "none",
      });
      return false;
    }
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
    };

    let httpBody = {
      email: this.state.email,
    };

    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.resetApiCallId = getValidationsMsg.messageId;

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "account_block/accounts/forgot_password"
    );

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "post"
    );
    runEngine.sendMessage(getValidationsMsg.id, getValidationsMsg);
  };

  handleforgotPass = () => {
    console.log("EmailVerifaction----------");

    this.props.navigation.navigate("EmailVerifaction");
  };

  navigateFunction = () => {
    this.props.navigation.navigate("SignupRegistrationForm");
  };

  googleLoginAPi(token: string): boolean {
    console.log("google token>>", token);

    const header = {
      "Content-Type": configJSON.loginApiContentType,
    };

    const httpBody = {
      "data": {
        "type": "social_account",
        "attributes": {
          "type": "google",
          "serverAuthCode": "",
          "access_token": token,
        }
      }
    }

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.googleLoginCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.googleLoginAPIEndPoint
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
      configJSON.loginAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  async loginApiRes(responseJson: any) {
    this.setState({ isLoder: true });
    if (responseJson?.meta?.token) {
      await this.storeData({
        token: responseJson.token,
        id: responseJson.id,
        unique_auth_id: responseJson.unique_auth_id,
      });
      console.log("login res>>", responseJson?.meta?.is_subscribed);
      await setStorageData("isSubscribed", JSON.stringify(responseJson?.meta?.is_subscribed));
      await setStorageData("USERID", JSON.stringify(responseJson?.meta?.id));
      const isSubscribed = await getStorageData("isSubscribed");
      console.log("isSubscribed>>>", isSubscribed);

      console.log("login api res>>", !this.state.checkCondition);
      if (
        (!responseJson.meta.myself &&
        !responseJson.meta.identify_yourself_questions) || (!responseJson.meta.myself)
      ) {
        this.setState({ isLoder: false });
        this.props.navigation.navigate("identifyYourSelf");
      } else if (!responseJson.meta.identify_yourself_questions) {
        this.setState({ isLoder: false });
        this.props.navigation.navigate("IdentifyScreen1");
      } else if (!responseJson.meta.phone_number_verified) {
        this.setState({ isLoder: false });
        this.props.navigation.navigate("PhoneNumberInput", {
          token: responseJson?.meta?.token,
        });
      } else if (!responseJson?.meta?.location) {
        this.setState({ isLoder: false });
        this.props.navigation.navigate("LocationbasedAlerts");
      } else if (!responseJson?.meta?.mandotry_submit_ans) {
        this.setState({ isLoder: false });
        this.props.navigation.navigate("QuestionBank1");
      } else if (!responseJson?.meta?.select_question) {
        this.setState({ isLoder: false });
        this.props.navigation.navigate("QuestionBank");
      } else if (!responseJson?.meta?.select_ans_submit) {
        this.setState({ isLoder: false });
        this.props.navigation.navigate("SelectedQuestion");
      } else if (!responseJson?.meta?.media) {
        this.setState({ isLoder: false });
        this.props.navigation.navigate("UploadImage");
      } else {
        let UID = responseJson?.meta.id;

        const appSetting = new CometChat.AppSettingsBuilder()
          .subscribePresenceForAllUsers()
          .setRegion(COMETCHAT_CONSTANTS.REGION)
          .build();
        CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSetting).then(
          () => {
            console.log("Initialization completed successfully while Logging in");

            CometChat.login(UID, COMETCHAT_CONSTANTS.AUTH_KEY).then(
              async (user: any) => {
                this.setState({ isLoder: false });
                await setStorageData("token", responseJson?.meta?.token);
                await setStorageData("logintoken", responseJson?.meta?.token);
                this.props.navigation.navigate("Footer");
                console.log('Login Successful:', { user });
              },
              (error: any) => {
                this.setState({ isLoder: false });
                console.log('Login failed with exception:', { error }, COMETCHAT_CONSTANTS.AUTH_KEY);
              },
            );
          },
          (error: any) => {
            this.setState({ isLoder: false });
            console.log("Initialization failed while logging in with error:", error);
          }
        );
      }
    } else {
      this.setState({ isLoder: false });
      showMessage({
        message: responseJson.errors[0].failed_login,
        type: "none",
      });
    }
  }

  async googleLoginApiRes(responseJson: any) {
    console.log("googleLoginApiRes>>", responseJson);
    this.setState({ isLoder: true });
    if (responseJson?.meta?.token) {
      await this.storeData({
        token: responseJson?.meta?.token,
        id: responseJson?.data?.id,
        unique_auth_id: responseJson.unique_auth_id,
      });
      await setStorageData("isSubscribed", JSON.stringify(responseJson?.data?.attributes?.is_subscribed));
      await setStorageData("USERID", JSON.stringify(responseJson?.data?.id));

      if (!responseJson?.data?.attributes?.activated) {
        this.setState({ isLoder: false });
        this.props.navigation.navigate("SignupRegistrationForm");
      } else if (
        (!responseJson?.data?.attributes?.myself &&
        !responseJson?.data?.attributes?.identify_yourself_questions) || (!responseJson?.data?.attributes?.myself)
      ) {
        this.setState({ isLoder: false });
        this.props.navigation.navigate("identifyYourSelf");
      } else if (!responseJson?.data?.attributes?.identify_yourself_questions) {
        this.setState({ isLoder: false });
        this.props.navigation.navigate("IdentifyScreen1");
      } else if (!responseJson?.data?.attributes?.phone_number_verified) {
        this.setState({ isLoder: false });
        this.props.navigation.navigate("PhoneNumberInput", {
          token: responseJson?.data?.attributes?.token,
        });
      } else if (!responseJson?.data?.attributes?.location) {
        this.setState({ isLoder: false });
        this.props.navigation.navigate("LocationbasedAlerts");
      } else if (!responseJson?.data?.attributes?.mandotry_submit_ans) {
        this.setState({ isLoder: false });
        this.props.navigation.navigate("QuestionBank1");
      } else if (!responseJson?.data?.attributes?.select_question) {
        this.setState({ isLoder: false });
        this.props.navigation.navigate("QuestionBank");
      } else if (!responseJson?.data?.attributes?.select_ans_submit) {
        this.setState({ isLoder: false });
        this.props.navigation.navigate("SelectedQuestion");
      } else if (!responseJson?.data?.attributes?.media) {
        this.setState({ isLoder: false });
        this.props.navigation.navigate("UploadImage");
      } else {
        let UID = responseJson?.data.id;

        const appSetting = new CometChat.AppSettingsBuilder()
          .subscribePresenceForAllUsers()
          .setRegion(COMETCHAT_CONSTANTS.REGION)
          .build();
        CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSetting).then(
          () => {
            console.log("Initialization completed successfully while Logging in");

            CometChat.login(UID, COMETCHAT_CONSTANTS.AUTH_KEY).then(
              async (user: any) => {
                this.setState({ isLoder: false });
                await setStorageData("token", responseJson?.meta?.token);
                await setStorageData("logintoken", responseJson?.meta?.token);
                this.props.navigation.navigate("Footer");
                console.log('Login Successful:', { user });
              },
              (error: any) => {
                this.setState({ isLoder: false });
                console.log('Login failed with exception:', { error }, COMETCHAT_CONSTANTS.AUTH_KEY);
              },
            );
          },
          (error: any) => {
            this.setState({ isLoder: false });
            console.log("Initialization failed while logging in with error:", error);
          }
        );
      }
    } else {
      this.setState({ isLoder: false });
      showMessage({
        message: responseJson.errors[0].failed_login,
        type: "none",
      });
    }
  }

  // Customizable Area End

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

      if (apiRequestCallId != null) {
        if (apiRequestCallId === this.apiEmailLoginCallId) {
          await this.loginApiRes(responseJson);
          console.log("Login Response", JSON.stringify(responseJson))

          this.parseApiCatchErrorResponse(errorReponse);
        } else if (apiRequestCallId === this.googleLoginCallId) {
          await this.googleLoginApiRes(responseJson);
          console.log("Google Response", JSON.stringify(responseJson))
        }
        else if (apiRequestCallId === this.resetApiCallId) {
          if (responseJson) {
            this.onSuccessResponse(responseJson)
          } else if (errorReponse) {
            this.setState({ isLoder: false });
            showMessage({
              message: "An error has occuured. Please try again later.",
              type: "none",
            });
          }
        }
      }
    }
    // Customizable Area End
  }

  sendLoginFailMessage() {
    const msg: Message = new Message(getName(MessageEnum.LoginFaliureMessage));
    this.send(msg);
  }

  sendLoginSuccessMessage() {
    const msg: Message = new Message(getName(MessageEnum.LoginSuccessMessage));

    msg.addData(getName(MessageEnum.LoginUserName), this.state.email);
    msg.addData(getName(MessageEnum.CountyCodeDataMessage), null);
    msg.addData(getName(MessageEnum.LoginPassword), this.state.password);
    msg.addData(
      getName(MessageEnum.LoginIsRememberMe),
      this.state.checkedRememberMe
    );

    this.send(msg);
  }

  saveLoggedInUserData(responseJson: any) {
    if (responseJson && responseJson.meta && responseJson.meta.token) {
      const msg: Message = new Message(getName(MessageEnum.SessionSaveMessage));

      msg.addData(
        getName(MessageEnum.SessionResponseData),
        JSON.stringify(responseJson)
      );
      msg.addData(
        getName(MessageEnum.SessionResponseToken),
        responseJson.meta.token
      );

      this.send(msg);
    }
  }

  openInfoPage() {
    const msg: Message = new Message(getName(MessageEnum.AccoutLoginSuccess));

    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

    this.send(msg);
  }

  goToForgotPassword() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationForgotPasswordMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    msg.addData(getName(MessageEnum.NavigationForgotPasswordPageInfo), "email");
    this.send(msg);
  }

  goToSocialLogin() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationSocialLogInMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  doEmailLogIn(): boolean {
    if (
      this.state.email === null ||
      this.state.email.length === 0 ||
      !this.emailReg.test(this.state.email)
    ) {
      this.showAlert("Error", configJSON.errorEmailNotValid);
      return false;
    }

    if (this.state.password === null || this.state.password.length === 0) {
      this.showAlert("Error", configJSON.errorPasswordNotValid);
      return false;
    }

    const header = {
      "Content-Type": configJSON.loginApiContentType,
    };

    const attrs = {
      email: this.state.email,
      password: this.state.password,
    };

    const data = {
      type: "email_account",
      attributes: attrs,
    };

    const httpBody = {
      data: data,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiEmailLoginCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.loginAPiEndPoint
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
      configJSON.loginAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  callGetValidationApi() {
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
    };

    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.validationApiCallId = getValidationsMsg.messageId;

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.urlGetValidations
    );

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(getValidationsMsg.id, getValidationsMsg);
  }
}
