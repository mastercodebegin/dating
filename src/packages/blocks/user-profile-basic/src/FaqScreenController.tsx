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
  // Customizable Area Start
  navigation: any;
  id: string;
  token: any
  // Customizable Area End
}

interface S {  
  token: any;
  faqDescription: any;
  faqQuestion: any;
  faqs: any,
  isLoading: boolean,
 
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class FaqScreenController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  // Customizable Area End
  getGetFaqApiCallId: any;
  getfaqAnswerCallId: any;
  getNotificationStatusCallId: any;
  getNotificationUpdate: any;
  apiDeactivitedAccount:any
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
      token: '',
      faqDescription: '',
      faqQuestion: '',
      faqs: [{
        id: '1',
     
        question: "Information Collection and Use",
        answer: "Hi my name is Aakash Ujjainwal I am a Good Football Player",
        
    },

    {
        id: '2',
       
            question: "Information Sharing",
            answer: "jbebrhbeh",
        
    },

    {
        id: '3',
   
        question: "Security",
        answer: "jbebrhbeh",
        
    },
    {
        id: '4',
       
        question: "Cookies",
            answer: "jbebrhbeh",
        
    },
    {
        id: '5',
        question: "Changes to this  Policy",
        answer: "jbebrhbeh",     
    },
],
      isLoading: false,

      // Customizable Area Start
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

      let apiResponse = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if (apiRequestCallId && apiResponse) {
        if (apiRequestCallId === this.getGetFaqApiCallId) {
              this.setState({ faqs: apiResponse , isLoading: false})

          }

        this.parseApiCatchErrorResponse(errorReponse);
      }
    }
    // Customizable Area End
  }

  // async receive(from: string, message: Message) {
  //     // Customizable Area Start

  //   // runEngine.debugLog("Message Recived", message);

  //   // if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
  //   //   const apiRequestCallId = message.getData(
  //   //     getName(MessageEnum.RestAPIResponceDataMessage)
  //   //   );

  //   //   var responseJson = message.getData(
  //   //     getName(MessageEnum.RestAPIResponceSuccessMessage)
  //   //   );

  //   //   var errorReponse = message.getData(
  //   //     getName(MessageEnum.RestAPIResponceErrorMessage)
  //   //   );
  //   //   if (responseJson) {
  //   //     if (apiRequestCallId === this.getGetFaqApiCallId) {
  //   //       this.setState({ faqs: responseJson })
  //   //       this.setState({ isLoading: false })

  //   //     }
  //   //   } else if (responseJson && responseJson.errors) {
  //   //     if (apiRequestCallId === this.getGetFaqApiCallId) {
  //   //       this.setState({ isLoading: false })
  //   //     }
  //   //   }
        
    
  //   // }
  //       // Customizable Area End

  // }


  async componentDidMount() {
    this.getfaqDetails()
  }


  onPressFaq = (items: any) => {
    let check = this.state.faqs;
    let newIndex = this.state.faqs && this.state.faqs.findIndex((item: any) => item.id === items?.id);
    check[newIndex].checked = !check[newIndex]?.checked;
    this.setState({ faqs: check });
    check.map((element: any) => {
      if (element.id !== items.id) {
        element.checked = false
      }
    })
    this.setState({ faqs: check })
  }
  // Customizable Area Start
 
  async getfaqDetails() {
    const res = await getStorageData('token');
    
    this.setState({isLoading:true})
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getGetFaqApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
     "account_block/accounts/frequently_asked_questions"
    );

    const header = {
      "Content-Type": configJSON.contentTypeApiGetUserProfile,
      token:res
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
  // Customizable Area End
}
