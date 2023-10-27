import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { getStorageData } from "../../../framework/src/Utilities";
import { BackHandler } from "react-native";
import { style } from "../../../components/src/CustomFonts";
export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export interface S {
  // Customizable Area Start
  dataSource: any[];
  mobileNo: string;
  token: string;
  authToken: string;
  isFocused: boolean;
  signupName:any;
  isLoder: boolean;
  mobileNoError: string;
  // Customizable Area End
}

export interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class PhoneNumberInputController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  phoneAuthApiCallId: any;
  placeHolderMobile: string;
  placeHolderSelectCountry: string;
  btnTxtSendOtp: string;
  labelInfo: string;
  bodyText: string;
  mobileReg : RegExp
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    this.receive = this.receive.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    runEngine.attachBuildingBlock(this as IBlock, [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
    ]);
    this.state = {
      dataSource: [],
      mobileNo: "",
      token: "",
      authToken: '',
      isFocused: false,
      signupName:'',
      isLoder: false,
      mobileNoError: "",
    };

    this.placeHolderMobile = configJSON.placeHolderMobile;
    this.placeHolderSelectCountry = configJSON.placeHolderSelectCountry;
    this.btnTxtSendOtp = configJSON.btnTxtSendOtp;
    this.labelInfo = configJSON.labelInfo;
    this.bodyText = configJSON.bodyText;
    this.mobileReg = new RegExp(/^[6-9]\d{9}$/im)
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.phoneAuthApiCallId &&
      this.phoneAuthApiCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (responseJson) {
        console.log("responseJson@@", responseJson)
        this.props.navigation.navigate('OTPInputAuth', {
          "phoneNo": this.state.mobileNo,
          "signupName":this.state.signupName
        })
       
        
      } else if (responseJson.errors) {
        this.parseApiErrorResponse(responseJson);
      } else {
        let errorReponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        this.parseApiCatchErrorResponse(errorReponse);
      }
    }
    this.setState({isLoder: false})
    // Customizable Area End
  }

  // Customizable Area Start


  async componentDidMount() {
    let data = this.props.navigation?.state?.params?.state;
    if(data){
      this.setState({signupName:data});
    }
  }
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
  async sendOtp() {
    this.setState({isLoder: true})
    const res = await getStorageData('token');

    if (this.state.mobileNo.length <= 0 || !!this.state.mobileNoError) {
      this.onBlur();
      this.setState({isLoder: false})
      return false;
    }

    const headers = {
      "Content-Type": configJSON.apiSendOtpContentType,
      token: res
    };

    const attrs = {
      'full_phone_number': "+91" + this.state.mobileNo,
    };

    const data = {
      attributes: attrs,
    };

    const httpBody = {
      data: data,
    };

    console.log("httpBody>>>>>.", httpBody);

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.phoneAuthApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.apiSendOtpEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      headers
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiSendOtpMethod
    );
    console.log("")
    console.log("")
    console.log("")
    console.log("")
    console.log("")
    console.log("")

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  isValidMobileNo(mobileNo: string) {
    return this.mobileReg.test(mobileNo);
  }
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
  processOnClickMessage(messageID: string, values: any = null) {
    switch (messageID) {
      case "btnSendOtp":
        this.sendOtp();
        break;
      default:
        return null;
    }
  }

  backBtnClick() {
    this.props.navigation.navigate('EmailAccountLoginBlock')
  }

   onFocus = () => {
    this.setState({ isFocused: true });
    this.setState({ mobileNoError: "" });
  };

   onBlur = () => {
    this.setState({ isFocused: false });
    if (this.state.mobileNo.length === 0) {
      return this.setState({ mobileNoError: "Please enter your mobile number" });
      
    } else if (!this.isValidMobileNo(this.state.mobileNo)) {
      return this.setState({ mobileNoError: configJSON.errorMobileNotValid });
    } else {
      return this.setState({ mobileNoError: "" });
    }
  };

  public changeState(objectID: string, value: any = null) {
    switch (objectID) {
      case "txtInputPhoneNumber":
        this.setState({ mobileNo: value });
        break;
      default:
        return null;
    }
  }

  getState(objectID: string) {
    switch (objectID) {
      case "txtInputPhoneNumber":
        return this.state.mobileNo;
      default:
        return null;
    }
  }
  // Customizable Area End
}
