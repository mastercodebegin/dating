import { BlockComponent } from "../../../framework/src/BlockComponent";
import { IBlock } from "../../../framework/src/IBlock";
import { runEngine } from "../../../framework/src/RunEngine";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
import { showMessage } from "react-native-flash-message";
import { CommonActions } from "@react-navigation/native";
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
  passwordFocus: boolean;
  reTypePasswordFocus: boolean;
  passwordError: "";
  confirmPasswordError: "";
  reTypePassword: string;
  reTypePasswordError: "";
  enablePasswordField: boolean;
  enableReTypePasswordField: boolean;
  isPasswordMatch: boolean;
  isLoder: boolean;
  isUserPressButton: boolean;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

// Customizable Area Start
// Customizable Area End

export default class CustomForgotPasswordController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  changePasswordAppId: string;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.receive = this.receive.bind(this);

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    this.state = {
      passwordError: "",
      passwordFocus: false,
      reTypePasswordFocus: false,
      confirmPasswordError: "",
      reTypePassword: "",
      token: "",
      loading: false,
      isSecurePassword: true,
      password: "",
      confirmpassword: "",
      isSecureCPassword: true,
      isValidPassword: false,
      isValidCPassword: false,
      reTypePasswordError: "",
      enablePasswordField: false,
      enableReTypePasswordField: false,
      isPasswordMatch: true,
      isLoder: false,
      isUserPressButton: false
    };
    this.changePasswordAppId = ""
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (responseJson && !responseJson.errors && responseJson.data) {
        showMessage({
          message: "Success! Your password has been changed successfully.",
          type: "success"
        });
        setTimeout(() => {
          this.props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "EmailAccountLoginBlock" }]
            })
          );
          this.props.navigation.navigate("EmailAccountLoginBlock", {
            isConfirmPassword: true
          });
        }, 2000);
      } else {
        let errorReponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        if (errorReponse === undefined) {
          console.log("Something went wrong", responseJson.errors[0]);
          showMessage({
            message: responseJson.errors[0].password,
            type: "none"
          });
        } else {
          console.log("errorReponse");
        }
      }
      this.setState({ isLoder: false });
    }
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    console.log("didmount--", this.props.navigation.state.params.token);
  }
  forgotPasswordSubmit = async () => {
    if (!this.state.password || !this.state.reTypePassword) {
      console.log("!password----------------------------------------------------------------");

      this.passwordFocus();
      this.confirmPasswordFocus();
      this.setState({ isLoder: false });
      return false;
    }
    if (this.state.password != this.state.reTypePassword) {
      console.log("password----------------------------------------------------------------");

      this.passwordFocus();
      this.confirmPasswordFocus();
      this.setState({ isLoder: false });
      return false;
    }

    if (!!this.state.passwordError || !!this.state.confirmPasswordError) {
      console.log("Test1----------------------------------------------------------------");
      this.passwordFocus();
      this.confirmPasswordFocus();
      this.setState({ isLoder: false });
      return false;
    }
    console.log("Test2----------------------------------------------------------------");
    this.updatePassword();
  };

  onPressLogin() {
    this.props.navigation.navigate("EmailAccountLoginBlock", {
      isConfirmPassword: true
    });
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
    if (
      this.state.reTypePassword === null ||
      this.state.reTypePassword.length == 0
    ) {
      return this.setState({
        confirmPasswordError: configJSON.errorConfirmPasswordEnter
      });
    } else if (this.state.password !== this.state.reTypePassword) {
      return this.setState({
        confirmPasswordError: configJSON.errorBothPasswordsNotSame
      });
    } else {
      this.setState({ confirmPasswordError: "" });
    }
  }

  passwordFocus() {
    this.handlePassword();
    this.setState({ passwordFocus: false });
  }

  confirmPasswordFocus() {
    this.handleConfirmPassword();
    this.setState({ reTypePasswordFocus: false });
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


  async updatePassword() {
    this.setState({ isLoder: true });

    const headers = {
      "Content-Type": configJSON.validationApiContentType
    };
    const body = {
      data: {
        token: this.props.navigation.state.params.token,
        new_password: this.state.password
      }
    };
    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.changePasswordAppId = getValidationsMsg.messageId;

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.updatePasswordEndPoint
    );

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      headers
    );

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "POST"
    );

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(body)
    );

    runEngine.sendMessage(getValidationsMsg.id, getValidationsMsg);
  }
  // public onBlur = (focusId: string) => {
  //   switch (focusId) {

  //     case "passwordFocus":
  //       this.handlePassword()
  //       this.setState({ passwordFocus: false });
  //       break;
  //     case "reTypePasswordFocus":
  //       this.handleConfirmPassword()
  //       this.setState({ reTypePasswordFocus: false });
  //       break;
  //     default:
  //       return;
  //   }
  // };

  // handlePassword() {
  //   if (this.state.password === null || this.state.password.length == 0) {
  //     return this.setState({ passwordError: configJSON.errorPasswordEnter });
  //   } else if (this.state.password.length <= 7) {
  //     return this.setState({ passwordError: configJSON.errorPasswordNotValid });
  //   } else {
  //     this.setState({ passwordError: "" });
  //   }
  // }

  // handleConfirmPassword() {
  //   if (this.state.reTypePassword === null || this.state.reTypePassword.length == 0) {
  //     return this.setState({
  //       confirmPasswordError: configJSON.errorConfirmPasswordEnter,
  //     });
  //   } else if (this.state.password !== this.state.reTypePassword) {
  //     return this.setState({
  //       confirmPasswordError: configJSON.errorBothPasswordsNotSame,
  //     });
  //   } else {
  //     this.setState({ confirmPasswordError: "" });
  //   }
  // }
  // public changeState(objectID: string, value: any = null) {
  //   switch (objectID) {

  //     case "txtInputPassword":
  //       this.setState({ password: value.trim(), passwordError: '' });
  //       break;
  //     case "btnPasswordShowHide":
  //       this.setState({ enablePasswordField: value });
  //       break;
  //     case "txtInputConfirmPassword":
  //       this.setState({reTypePassword: value.trim(), confirmPasswordError: ''})
  //       break;
  //     case "btnConfirmPasswordShowHide":
  //       this.setState({ enableReTypePasswordField: value });
  //       break;
  //     default:
  //       return null;
  //   }
  // }

  // getState(objectID: string) {
  //   switch (objectID) {

  //     case "btnPasswordShowHide":
  //       return this.state.enablePasswordField;
  //     case "txtInputConfirmPassword":
  //     case "enableConfirmPasswordField":
  //     case "btnConfirmPasswordShowHide":
  //       return this.state.enableReTypePasswordField;
  //     case "imgEnableRePasswordField":
  //       return this.state.enableReTypePasswordField;
  //     default:
  //       return null;
  //   }
  // }
  // Customizable Area End
}
