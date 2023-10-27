import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  loading: boolean;
  ipAddress: string;
  accessStatus: string;
  messageLoading: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class IpBlockerController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  ipAddressApiCallID: string = "";
  getIpStatusApiCallID: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      loading: false,
      ipAddress: "",
      accessStatus: "",
      messageLoading: false,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    // Customizable Area Start
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const ipBlockerApiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let ipBlockerResponseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let ipBlockerErrorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if (ipBlockerResponseJson && !ipBlockerResponseJson.errors) {
        if (ipBlockerApiRequestCallId === this.ipAddressApiCallID) {
          this.getIpAddressSuccessCallback(ipBlockerResponseJson);
        } else if (ipBlockerApiRequestCallId === this.getIpStatusApiCallID) {
          this.getIpAddressStatusSuccessCallback(ipBlockerResponseJson);
        }
      } else if (ipBlockerResponseJson.errors) {
        if (ipBlockerApiRequestCallId === this.ipAddressApiCallID) {
          this.getIpAddressErrorCallback();
        } else if (ipBlockerApiRequestCallId === this.getIpStatusApiCallID) {
          this.getIpAddressStatusFailureCallback();
        }
      } else if (ipBlockerErrorReponse) {
        // Error handling
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    this.getIpAddress();
  }

  getIpAddress = () => {
    this.setState({ loading: true });
    const header = {
      "Content-Type": configJSON.applicationType,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.ipAddressApiCallID = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getIpAddressAPIEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  getIpAddressStatus = () => {
    this.setState({ messageLoading: true });
    const header = {
      "Content-Type": configJSON.applicationType,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getIpStatusApiCallID = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getIpAddressStatusAPIEndPoint + this.state.ipAddress
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  getIpAddressStatusSuccessCallback = (responseJSON: { code: number, message: string }) => {
    this.setState({ messageLoading: false, accessStatus: responseJSON.message });
  }

  getIpAddressStatusFailureCallback = () => {
    this.setState({ messageLoading: false });
  }

  getIpAddressSuccessCallback = (responseJSON: { ip: string }) => {
    this.setState({ loading: false, ipAddress: responseJSON.ip });
  }

  getIpAddressErrorCallback = () => {
    this.setState({ loading: false });
  }
  // Customizable Area End
}
