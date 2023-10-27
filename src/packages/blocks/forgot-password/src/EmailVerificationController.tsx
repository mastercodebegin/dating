import { BlockComponent } from "../../../framework/src/BlockComponent";
import { IBlock } from "../../../framework/src/IBlock";
import { runEngine } from "../../../framework/src/RunEngine";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
import { showMessage } from "react-native-flash-message";
import { style } from "../../../components/src/CustomFonts";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  token: any;
  loading: boolean;
  isSecurePassword: boolean;
  password: any;
  confirmpassword: any;
  isSecureCPassword: boolean;
  isValidPassword: boolean;
  isValidCPassword: boolean;
  passwordError: string;
  confirmPasswordError: string;
  email: string;
  emailError: string;
  isEmailFocus: boolean;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

// Customizable Area Start
// Customizable Area End

export default class ForgotPasswordController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  emailReg: RegExp;
  resetApiCallId: any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.receive = this.receive.bind(this);

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    this.state = {
      passwordError: "",
      confirmPasswordError: "",
      email: "",
      emailError: "",
      isEmailFocus: false,
      token: "",
      loading: false,
      isSecureCPassword: true,
      isValidPassword: false,
      isValidCPassword: false,
      isSecurePassword: true,
      password: "",
      confirmpassword: "",
    };
    this.emailReg = new RegExp(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    );
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      console.log("responseJson email", responseJson);
      if (responseJson.errors) {
        return showMessage({
          message: responseJson.errors[0].otp,
          type: "none"
        });
      }

      if (responseJson && !responseJson.errors && responseJson.data) {
        if (apiRequestCallId === this.resetApiCallId) {
          console.log(
            "response if-------------------",
            responseJson.meta.token
          );
          this.props.navigation.navigate("EmailOTPInput", {
            signup: false,
            email: this.state.email,
            token: responseJson.meta.token
          });
        }
      } else {
        if (errorReponse === undefined) {
          return showMessage({
            message: responseJson.errors[0].otp,
            type: "none"
          });
        }
      }
    }
  }
  // Customizable Area Start
  emailBlur() {
    this.setState({ isEmailFocus: false });
    if (
      this.state.email === null ||
      this.state.email.length === 0 ||
      !this.validateEmail(this.state.email)
    ) {
      return this.setState({ emailError: configJSON.errorEmailNotValid });
    } else {
      return this.setState({ emailError: "" });
    }
  }

  handleEmail() {
    if (!this.isValidEmail(this.state.email)) {
      return this.setState({ emailError: configJSON.errorEmailNotValid });
    } else {
      this.setState({ emailError: "" });
    }
  }

  isValidEmail(email: string) {
    return this.emailReg.test(email.toLowerCase());
  }
  onEmailFocus() {
    this.setState({ isEmailFocus: true });
    this.setState({ emailError: "" });
    console.log("email focus");
  }
  contactusTest = async () => {};

  validateEmail = (email: string) => {
    return RegExp(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      ).exec(String(email)
      .toLowerCase());
  };
  onItemClick(item:any,itmLength:any) {
    if(item){
      return style.black
    }
    else{
      if(itmLength){
        return style.black
      }else{
       return style.bColor;  

      }
    }
  }
  onPressContinue() {
    this.setState({ isEmailFocus: false });
    if (
      this.state.email === null ||
      this.state.email.length === 0 ||
      !this.validateEmail(this.state.email)
    ) {
      console.log(
        "configJSON.errorEmailNotValid",
        configJSON.errorEmailNotValid
      );

      return this.setState({ emailError: configJSON.errorEmailNotValid });
    } else {
      this.callResetValidationEmailApi();
      // this.props.navigation.navigate('EmailOTPInput')
      return this.setState({ emailError: "" });
    }
  }

  callResetValidationEmailApi = () => {
    const headers = {
      "Content-Type": configJSON.validationApiContentType
    };

    let httpBody = {
      data: {
        type: "email_account",
        attributes: {
          email: this.state.email
        }
      }
    };

    const getValidationsMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.resetApiCallId = getValidationsMessage.messageId;

    getValidationsMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_forgot_password/otps"
    );

    getValidationsMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    getValidationsMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    getValidationsMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "post"
    );
    runEngine.sendMessage(getValidationsMessage.id, getValidationsMessage);
  };
}

// Customizable Area End
