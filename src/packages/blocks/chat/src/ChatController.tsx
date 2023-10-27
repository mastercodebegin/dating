import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { CutomAlertFail } from "../../../components/src/CustomAlert";
import { getStorageData } from "framework/src/Utilities";
// Customizable Area End

export const configJSON = require("./config");

// Customizable Area Start
export interface IChat {
  id: string;
  muted: boolean;
  unreadCount: number;
  lastMessage: string;
  name: string;
}
interface IChatResponse {
  id: string;
  attributes: {
    name: string;
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
    messages: {
      id: string;
      attributes: { id: number; message: string };
      message: string;
    };
  };
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
  accountId: number;
  chatName: string;
  chatList: IChat[];
  isVisibleModal: boolean;
  suggestedFriend: any;
  newMatches: {
    attributes: {
      compatibility: number;
      first_name: string;
      is_attempted: boolean,
      last_name: string;
      photo: string;
      profile_id: number;
      star: boolean;
      user_name: string;
    };
    id: string;
    type: string;
  }[];
  isLoading: boolean;
  newMatchesLoading: boolean;
  cometChatChatListLoading: boolean;
  cometChatUserListLoading: boolean;
  // Customizable Area End
}

interface SS {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export default class ChatController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getChatListApiCallId: string = "";
  createChatRoomApiCallId: string = "";
  getChatableUsersApiId: string = "";
  getNewMatchesApiId: string = "";
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
      accountId: -1,
      chatName: "",
      chatList: [],
      isVisibleModal: false,
      suggestedFriend: [],
      newMatches: [],
      isLoading: false,
      newMatchesLoading: false,
      cometChatChatListLoading: false,
      cometChatUserListLoading: false,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    super.componentDidMount();
  }

  async getChatableUsers() {
    const token = await getStorageData("token");
    this.setState({ isLoading: true });
    const header = {
      "Content-Type": "application/json",
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getChatableUsersApiId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getChatableUsersApiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  getNewMatches = async () => {
    this.setState({ newMatchesLoading: true });
    const token = await getStorageData("token");
    const header = {
      "Content-Type": configJSON.apiContentType,
      token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getNewMatchesApiId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getNewMatchesApiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  async receive(from: string, message: Message) {
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );
    let responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    if (apiRequestCallId == this.getChatableUsersApiId) {
      if (!responseJson?.errors) {
        this.setState({ suggestedFriend: responseJson.data });
      }
      this.setState({ isLoading: false });
    }
    if (apiRequestCallId == this.getNewMatchesApiId) {
      if (!responseJson?.errors) {
        this.setState({ newMatches: responseJson.data });
      } else {
        this.setState({ newMatches: [] });
        CutomAlertFail(responseJson?.errors[0].message);
      }
      this.setState({ newMatchesLoading: false });
    }
  }

  handleNewMatchPress = (userId: number | string, is_attempted: boolean) => {
    this.props.navigation.navigate("InsightsScreen", {
      userId: userId,
      is_attempted: is_attempted,
    });
  };

  onCometChatChatListLoadingStart = () => {
    this.setState({ cometChatChatListLoading: true });
  };

  onCometChatChatListLoadingStop = () => {
    this.setState({ cometChatChatListLoading: false });
  };

  onCometChatUserListLoadingStart = () => {
    this.setState({ cometChatUserListLoading: true });
  };

  onCometChatUserListLoadingStop = () => {
    this.setState({ cometChatUserListLoading: false });
  };
  // Customizable Area End
}
