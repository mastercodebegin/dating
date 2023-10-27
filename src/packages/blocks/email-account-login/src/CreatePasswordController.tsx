import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";


// Customizable Area Start
import { getStorageData } from "../../../framework/src/Utilities";
import { BackHandler } from "react-native";
import { CutomAlertFail } from "../../../components/src/CustomAlert";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// Customizable Area End

export const configJSON = require("./config.js");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  token: any,
  loading: boolean,
  isSecurePassword:boolean
  password:any
  confirmpassword:any
  isSecureCPassword:boolean
  isValidPassword:boolean
  isValidCPassword:boolean
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class CreatePasswordController extends BlockComponent<Props, S, SS> {

  apiEmailLoginCallId: string = "";
  apiResetCallId:any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      // getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      // getName(MessageEnum.SessionSaveMessage),
      // getName(MessageEnum.SessionResponseMessage)
    ];

    this.state = {
      token: "",
      loading: false,
      isSecurePassword:true,
      password:'',
      confirmpassword:'',
      isSecureCPassword:true,
      isValidPassword:false,
      isValidCPassword:false,
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }


  // Customizable Area Start

  async componentDidMount(){
    this.getData();
  }
  async componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  async componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
    return true;
  }

  getData = async () => {
    try {      
      const valueEmailToken :any = await getStorageData("emailToken");
      if(valueEmailToken !== null) {
        // value previously stored
        this.setState({token : JSON.parse(valueEmailToken)})
      }
    } catch(e) {
      // error reading value
    }
  }

  contactusTest(): boolean {

    const header = {
      "Content-Type": configJSON.loginApiContentType,
      "token":this.state.token
    };

    const attrs = {
      new_password: this.state.password,
      password_confirmation: this.state.confirmpassword,
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

    this.apiResetCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      'account_block/accounts/reset_password'
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
      'post'
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }
  // Customizable Area End

  // Customizable Area Start
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

        if (apiRequestCallId === this.apiResetCallId) {
          if (responseJson) {
            this.props.navigation.navigate('EmailAccountLoginBlock')
            console.log('__log details',responseJson);
          } else {
            //Check Error Response
            console.log(responseJson,errorReponse)
            CutomAlertFail('An error has occuured. Please try again later.');
            this.parseApiErrorResponse(responseJson);
          }

          this.parseApiCatchErrorResponse(errorReponse);
        }
      }
    }
    // Customizable Area End
  }
  
   checkPasswordStrong = (password: string) => {
    return RegExp(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*]).{8,}$/).exec(String(password));
    };

  // Customizable Area End
}