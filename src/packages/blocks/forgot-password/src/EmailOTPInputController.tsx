import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
import { getStorageData } from "../../../framework/src/Utilities";
import { createRef } from "react";
import { showMessage } from "react-native-flash-message";
import { CutomAlertFail } from "../../../components/src/CustomAlert";

// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export interface S {
  // Customizable Area Start
  otp: any;
  otpAuthToken: string;
  userAccountID: string;
  toMessage: string;
  isError: boolean
  isFromForgotPassword: boolean;
  otpTextInput: any,
  noOfOtpBoxes: any
  signupName: any
  otpError: boolean
  isLoder: boolean
  token: string

  // Customizable Area End
}

export interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class OTPInputAuthController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  emailOtpApiCallId: any;
  signUpEmailOtpCallId: any;
  btnSubmitOtp: string;
  placeHolderOtp: string;
  headerText: string;
  subHeaderText: string;
  userData: any;
  submitButtonColor: any = configJSON.submitButtonColor;
  otpRef: any = createRef()
  addAdditionalDetailApiCallId: any;


  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage)
      // Customizable Area End
    ];

    this.receive = this.receive.bind(this);

    runEngine.attachBuildingBlock(this, this.subScribedMessages);

    // Customizable Area Start
    this.state = {
      token: '',
      noOfOtpBoxes: 4,
      signupName: '',
      otp: [],
      otpAuthToken: "",
      userAccountID: "",
      toMessage: "",
      isFromForgotPassword: false,
      isError: false,
      otpTextInput: [],
      otpError: false,
      isLoder: false,
    };
    this.headerText = configJSON.headerText;
    this.subHeaderText = configJSON.subHeaderText;
    this.btnSubmitOtp = configJSON.btnSubmitOtp;
    this.placeHolderOtp = configJSON.placeHolderOtp;
    this.userData = props.navigation.state?.params?.userData
    // Customizable Area End
  }



  // Customizable Area Start 
  onPressContinue() {
    if (this.state.otp.length < 4) {
      this.setState({ otpError: true, otp: [] })
      CutomAlertFail("Please enter your OTP")
    }
    else {
      console.log('navigate', this.state.otp)
      // this.setState({ otpError: false, otp: [] })
      this.props.navigation.state.params.signup ?
        this.verifySignupEmail() : this.verifyForgotPasswordEmail()
      // this.props.navigation.navigate('ForgotPassword')
    }
  }

  async componentDidMount() {
    console.log('navigation----', this.props.navigation.state.params);


  }
  async verifyForgotPasswordEmail() {
    this.setState({ isLoder: true })
    console.log('token in function', this.props.navigation.state.params.token);

    this.setState({ token: this.props.navigation.state.params.token })
    const headers = {
      'Content-Type': configJSON.validationApiContentType,
    }
    const body = {
      "data":
      {
        "token": this.props.navigation.state.params.token,
        "otp_code": this.state.otp.join('')
      }
    }
    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    )
    this.emailOtpApiCallId = getValidationsMsg.messageId

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.verifyEmailOtpApiEndPoint,
    )

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      headers,
    )

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      'POST',
    )

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(
        body
      ),
    )

    runEngine.sendMessage(getValidationsMsg.id, getValidationsMsg)
  }

  async verifySignupEmail() {
    this.setState({ isLoder: true })
    const resToken = await getStorageData('token');
    console.log("res token", resToken)
    console.log("res otp", this.state.otp)

    const headers = {
      'Content-Type': configJSON.validationApiContentType,
      token: resToken
    }

    const body = {
      "email": this.props.navigation.state.params.email,
      "pin": this.state.otp.join("")
    }

    console.log("Email verification>>>", body, headers)

    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    )
    this.signUpEmailOtpCallId = getValidationsMsg.messageId

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_signup/email_confirmation",
    )

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      headers,
    )

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      'POST',
    )

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(
        body
      ),
    )

    runEngine.sendMessage(getValidationsMsg.id, getValidationsMsg)
  }

  async receive(from: string, message: Message) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      if (responseJson && !responseJson.errors) {
        this.successResponse(apiRequestCallId, responseJson)
      }
      else {
        this.failureResponse(responseJson)
      }
    }
    this.setState({ isLoder: false })
  }

  successResponse(apiRequestCallId: any, responseJson: any) {
    if (apiRequestCallId === this.emailOtpApiCallId) {
      this.setState({ isLoder: false })
      this.props.navigation.replace('CustomForgotPassword',
        { token: this.state.token })
    }
    else if (apiRequestCallId === this.signUpEmailOtpCallId) {
      this.setState({ isLoder: false })
      this.props.navigation.navigate('identifyYourSelf')
    }
  }
  failureResponse(responseJson: any) {
    if (responseJson.errors !== undefined) {
      if (!this.props.navigation.state.params.signup) {
        showMessage({
          message: responseJson.errors[0].otp,
          type: "none"
        });
      }
      if (this.props.navigation.state.params.signup) {
        showMessage({
          message: responseJson.errors[0].pin,
          type: "none"
        });
      }
      this.setState({ isLoder: false })
      this.setState({ otpError: true, otp: [] })
      console.log("Something went wrong------------", responseJson.errors);

    } else {
      this.setState({ isLoder: false })
    }
  }
  txtMobilePhoneOTPWebProps = {
    onChangeText: (text: string) => this.setState({ otp: text })
  };

  focusPrevious(key: any, index: any) {
    if (key === "Backspace" && index !== 0)
      this.state.otpTextInput[index - 1].focus();
  }



  onBack() {
    this.props.navigation.goBack()
  }



  txtMobilePhoneOTPMobileProps = {
    ...this.txtMobilePhoneOTPWebProps,
    keyboardType: "numeric"
  };

  txtMobilePhoneOTPProps = this.isPlatformWeb()
    ? this.txtMobilePhoneOTPWebProps
    : this.txtMobilePhoneOTPMobileProps;


  focusNext(index: any, value: any) {
    if (index < this.state.otpTextInput.length - 1 && value) {
      this.state.otpTextInput[index + 1].focus();
    }
    if (index === this.state.otpTextInput.length - 1) {
      this.state.otpTextInput[index].blur();
    }
    const otp = this.state.otp;
    otp[index] = value.charAt(value.length - 1);
    this.setState({ otp, otpError: false });
  }
  // Customizable Area End
}
