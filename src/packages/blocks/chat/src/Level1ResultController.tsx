import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { IMessage as IMessageType } from "react-native-gifted-chat";
import { getStorageData } from "framework/src/Utilities";
import { CutomAlertFail } from "../../../components/src/CustomAlert";
// Customizable Area End

export const configJSON = require("./config");

// Customizable Area Start
export interface IChatData {
  id: string;
  attributes: {
    id: number;
    name: string;
    is_notification_mute: boolean;
    accounts_chats: [
      {
        id: string;
        attributes: {
          account_id: number;
          muted: boolean;
          unread_count: number;
        };
      }
    ];
    messages: IMessageType[];
  };
  relationships: { accounts: { data: { id: string; type: string }[] } };
}

export interface IMessage {
  message: IMessageType
}
// Customizable Area End

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  token: string;
  isGameStart: boolean;
  isLoader: boolean;
  scoreData: any;
  userId: string;
  frdReqId: string;
  is_requested: boolean | undefined;
  is_accepted: boolean | undefined;

  // Customizable Area End
}

interface SS {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export default class Level1ResultController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getUserScoreApiCallId: string = "";
  sendFrdReqApiCallId: string = "";
  acceptAndRejectReqApiCallId: string = "";
  pendingReqApiCallId: string = "";
  refreshChatInterval: unknown;
  friendId: any;

  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      token: "",
      isGameStart: false,
      isLoader: false,
      scoreData: {},
      userId: "",
      frdReqId: "",
      is_requested: false,
      is_accepted: false,

      // Customizable Area End
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    this.friendId = this.props.navigation?.state?.params?.friendId;
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    super.componentDidMount();
    await this.getUserScore();
    await this.pendingReq();
  }

  async componentWillUnmount() {
    // clearInterval(this.refreshChatInterval as number);
  }

  goBackFunction = () => {
    this.props.navigation.goBack();
  };

  chechaddFrdStatus = () => {
    if (this.state.is_requested) {
      return () => { };
    }
    else {
      return this.sendFrdReq();
    }
  };

  checkaddFrdText = () => {
    if (this.state.is_requested) {
      return "Pending";
    }
    else {
      return "Add Friend";
    }
  };


  sendFrdReq = async () => {
    this.setState({ isLoader: true });
    const token = await getStorageData('token');

    const header = {
      "Content-Type": configJSON.apiContentType,
      token: token,
    };

    const httpBody = {
      "connection": {
        "receiver_id": !this.state.scoreData?.status ? this.friendId : this.state.userId,
      }
    }

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.sendFrdReqApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.sendFrdRequestApiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.postApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  acceptAndRejectReq = async (val: any) => {
    this.setState({ isLoader: true });
    const token = await getStorageData('token');

    const header = {
      "Content-Type": configJSON.apiContentType,
      token: token,
    };

    const httpBody = {
      "connection":
      {
        "account_id": this.friendId,
        "status": val,
      }
    }

    console.log("httpBody", httpBody);

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.acceptAndRejectReqApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.acceptFrdRequestApiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.putApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  getUserScore = async () => {
    this.setState({ isLoader: true });
    const token = await getStorageData('token');
    const userId = await getStorageData('USERID');
    console.log("userId", userId);
    this.setState({ userId: userId });

    const header = {
      token: token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getUserScoreApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.showScoreApiEndPoint + this.friendId
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  pendingReq = async () => {
    this.setState({ isLoader: true });
    const token = await getStorageData('token');

    const header = {
      token: token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.pendingReqApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.pendingFrdRequestApiEndPoint + this.friendId
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  handleSuccess = async (apiRequestCallId: any, responseJson: any) => {
    if (this.getUserScoreApiCallId === apiRequestCallId) {
      console.log("getUserScoreApiCallId", JSON.stringify(responseJson));
      console.log("getUserScoreApiCallId Response", responseJson);
      this.setState({ scoreData: responseJson?.data?.attributes, isLoader: false });
    } else if (this.sendFrdReqApiCallId === apiRequestCallId) {
      console.log("sendFrdReqApiCallId Response", responseJson);
      CutomAlertFail(responseJson?.meta?.message);
      await this.pendingReq();
      this.setState({ isLoader: false });
    } else if (this.acceptAndRejectReqApiCallId === apiRequestCallId) {
      console.log("acceptAndRejectReqApiCallId", responseJson);
      CutomAlertFail(responseJson?.meta?.message);
      this.props.navigation.navigate("ElasticSearch");
      console.log("acceptAndRejectReqApiCallId Response", JSON.stringify(responseJson));
      this.setState({ isLoader: false });
    } else if (this.pendingReqApiCallId === apiRequestCallId) {
      console.log("pendingReqApiCallId Response", JSON.stringify(responseJson));
      console.log("userId", this.state.userId);
      console.log("frdID", this.friendId);
      this.setState({
        is_requested: responseJson?.data?.attributes?.is_requested || responseJson?.meta?.is_requested,
        is_accepted: responseJson?.data?.attributes?.is_accepted || responseJson?.meta?.is_accepted,
        isLoader: false
      });
      console.log("is_accepted", responseJson?.data?.attributes?.is_accepted || responseJson?.meta?.is_accepted);
      console.log("is_requested", responseJson?.data?.attributes?.is_requested || responseJson?.meta?.is_requested);
    }
  }

  handleError = async (apiRequestCallId: any, responseJson: any) => {
    if (this.getUserScoreApiCallId === apiRequestCallId) {
      console.log("getUserScoreApiCallId", JSON.stringify(responseJson));
      console.log("getUserScoreApiCallId Response>>>", responseJson?.errors);
      CutomAlertFail(responseJson?.errors[0]?.message);
      this.setState({ isLoader: false });
    } else if (this.sendFrdReqApiCallId === apiRequestCallId) {
      console.log("sendFrdReqApiCallId Response>>>", responseJson);
      CutomAlertFail(responseJson?.errors[0]);
      this.setState({ isLoader: false });
    } else if (this.acceptAndRejectReqApiCallId === apiRequestCallId) {
      console.log("acceptAndRejectReqApiCallId Response>>>", responseJson);
      CutomAlertFail(responseJson?.error);
      this.setState({ isLoader: false });
    } else if (this.pendingReqApiCallId === apiRequestCallId) {
      console.log("pendingReqApiCallId Response>>>", responseJson);
      CutomAlertFail(responseJson?.errors[0]?.message);
      this.setState({ isLoader: false });
    }
  }

  async receive(from: string, message: Message) {
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );
    let responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    let errorResponse = message.getData(
      getName(MessageEnum.RestAPIResponceErrorMessage)
    );

    if (!responseJson?.errors) {
      this.handleSuccess(apiRequestCallId, responseJson);
    } else if (responseJson?.errors) {
      this.handleError(apiRequestCallId, responseJson);
    } else if (errorResponse) {
      this.setState({ isLoader: false });
    }
  }
  // Customizable Area End
}