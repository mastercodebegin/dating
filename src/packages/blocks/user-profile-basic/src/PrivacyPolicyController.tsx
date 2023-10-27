// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { getStorageData } from "../../../framework/src/Utilities";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  token: any
  // Customizable Area Start
  // Customizable Area End
}

interface S {
 
  
  token: any;
  faqDescription: any;
  faqQuestion: any;
  privacyPolicy: any,
  isLoading: boolean,
 
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class PrivacyPolicyController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  // Customizable Area End
  getPrivacyPolicyCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
    // Customizable Area Start
      token: '',
      faqDescription: '',
      faqQuestion: '',
      privacyPolicy: [],
      isLoading: false,
      // Customizable Area End
    };
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage)
    ];
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
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
        if (apiRequestCallId === this.getPrivacyPolicyCallId) {

              this.setState({ privacyPolicy: responseJson, isLoading: false})

          
        }
        else {
          //Check Error Response
          this.showAlert("Error", responseJson.errors.toString())

          this.parseApiErrorResponse(responseJson);
        }

        this.parseApiCatchErrorResponse(errorReponse);
      }
    }
    // Customizable Area End
  }

 


  async componentDidMount() {
    this.getPrivacyPolicy()
  }

// Customizable Area Start
 
 async getPrivacyPolicy() {

  this.setState({isLoading:true})
  const requestMessage = new Message(
    getName(MessageEnum.RestAPIRequestMessage)
  );

  this.getPrivacyPolicyCallId = requestMessage.messageId;

  requestMessage.addData(
    getName(MessageEnum.RestAPIResponceEndPointMessage),
   "account_block/accounts/privacy_policy"
  );

  const header = {
    "Content-Type": configJSON.contentTypeApiGetUserProfile };

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
  onPressFaq = (items: any) => {
    let check = this.state.privacyPolicy;
    console.log("@@@@@@ ============", check)
    let newIndex = this.state.privacyPolicy.findIndex((item: any) => item.id === items.id);
    check[newIndex].checked = !check[newIndex].checked;
    this.setState({ privacyPolicy: check });
    check.map((element: any) => {
      if (element.id !== items.id) {
        element.checked = false
      }
    })
    this.setState({ privacyPolicy: check })
  }
  // Customizable Area Start
  // Customizable Area End
}
