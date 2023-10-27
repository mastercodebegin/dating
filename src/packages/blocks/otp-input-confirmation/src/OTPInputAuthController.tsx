import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
import { BackHandler } from "react-native";
import { getStorageData, setStorageData } from "../../../framework/src/Utilities";
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
  labelInfo: string


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
  otpAuthApiCallId: any;
  btnSubmitOtp: string;
  placeHolderOtp: string;
  headerText: string;
  subHeaderText: string;
  full_phone_number: any;
  submitButtonColor: any = configJSON.submitButtonColor;
  otpRef: any = createRef()

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
      labelInfo: '',
      otp: [],
      otpAuthToken: "",
      userAccountID: "",
      toMessage: "",
      isFromForgotPassword: false,
      isError: false,
      otpTextInput: [],
      noOfOtpBoxes: 4,
      signupName: '',
      otpError: false,
      isLoder: false,
    };
    this.headerText = configJSON.headerText;
    this.subHeaderText = configJSON.subHeaderText;
    this.btnSubmitOtp = configJSON.btnSubmitOtp;
    this.placeHolderOtp = configJSON.placeHolderOtp;
    this.full_phone_number = props.navigation.state?.params?.phoneNo
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    // Customizable Area End
  }

  async receive(from: String, message: Message) {
    // Customizable Area Start
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage),
    )
    if (apiRequestCallId == this.otpAuthApiCallId) {
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
      )
      await setStorageData('user_name', JSON.stringify(this.state.signupName))
      await setStorageData('signupData', 'true')
      if (responseJson.errors !== undefined) {
        showMessage({
          message: responseJson.errors[0].pin,
          type: "none"
        });
        this.setState({ isLoder: false })
        this.setState({ otpError: true, otp: [] })
        console.log("Something went wrong------------", responseJson.errors);

      }
      else {
        return this.props.navigation.navigate('LocationbasedAlerts');
      }

    }
    this.setState({ isLoder: false })
    // Customizable Area End
  }

  // Customizable Area Start

  async componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  async componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
    this.props.navigation.navigate("EmailAccountLoginBlock")
    return true;
  }
  async onNext() {
    this.setState({ isLoder: true })
    const res = await getStorageData('token');
    let phone = this.full_phone_number
    console.log('after next first');

    if (this.state.otp.length < 4) {
      CutomAlertFail("Please enter your OTP")
      this.setState({ isLoder: false, })
      return false;
    }
    console.log('after next');

    const headers = {
      'Content-Type': configJSON.validationApiContentType,
      token: res
    }

    const params = {
      "full_phone_number": "91" + phone,
      "pin": this.state.otp.join(''),
    }

    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    )
    this.otpAuthApiCallId = getValidationsMsg.messageId

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.otpInputApiEndPoint,
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
      JSON.stringify({
        ...params,
      }),
    )

    runEngine.sendMessage(getValidationsMsg.id, getValidationsMsg)
  }


  async submitOtp() {
    console.log('this.state.otp', this.state.otp);

    if (!this.state.otp || this.state.otp.length === 0) {
      this.showAlert(configJSON.errorTitle, configJSON.errorOtpNotValid);
      return;
    }

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    console.log('isFromForgotPassword-----', this.state.isFromForgotPassword);

    if (this.state.isFromForgotPassword) {
      const header = {
        "Content-Type": configJSON.apiVerifyOtpContentType
      };

      //GO TO REQUEST STATE
      this.otpAuthApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.otpInputApiEndPoint
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );

      const data = {
        token: this.state.otpAuthToken ? this.state.otpAuthToken : "",
        otp_code: this.state.otp ? this.state.otp : ""
      };

      const httpBody = {
        data: data
      };

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(httpBody)
      );
    } else {
      const headers = {
        "Content-Type": configJSON.apiVerifyOtpContentType,
        token: this.state.otpAuthToken
      };

      this.otpAuthApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.otpInputApiEndPoint + this.state.otp
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(headers)
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(JSON.stringify({}))
      );
    }

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiVerifyOtpMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  btnSubmitOTPProps = {

    onPress: () => {
      this.submitOtp()
      this.setState({ isFromForgotPassword: true })
    }
  };

  focusPrevious(key: any, index: any) {
    if (key === "Backspace" && index !== 0)
      this.state.otpTextInput[index - 1].focus();
  }
  focusNext(index: any, value: any) {
    if (value && index < this.state.otpTextInput.length - 1) {
      this.state.otpTextInput[index + 1].focus();
    }
    if (index === this.state.otpTextInput.length - 1) {
      this.state.otpTextInput[index].blur();
    }
    const otp = this.state.otp;
    otp[index] = value.charAt(value.length - 1);
    this.setState({ otpError: false, otp });
  }

  onBack() {
    this.props.navigation.goBack()
  }

  txtMobilePhoneOTPWebProps = {
    onChangeText: (text: string) => this.setState({ otp: text })
  };

  txtMobilePhoneOTPMobileProps = {
    ...this.txtMobilePhoneOTPWebProps,
    keyboardType: "numeric"
  };

  txtMobilePhoneOTPProps = this.isPlatformWeb()
    ? this.txtMobilePhoneOTPWebProps
    : this.txtMobilePhoneOTPMobileProps;

  // Customizable Area End
}
