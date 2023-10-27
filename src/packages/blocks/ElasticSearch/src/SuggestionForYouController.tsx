import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";


// Customizable Area Start
import { getStorageData } from "framework/src/Utilities";
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
  userList: any;
  suggestedSixFriend: any;
  isLoading: boolean;
  isModalVisible: boolean;
  token: string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  searchTimeout: ReturnType<typeof setTimeout> | null;
  didFocusListener: any
  // Customizable Area End
}

export default class SuggestionForYouController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  suggestedFriendCallId: string;
  searchTimeout: any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.suggestedFriendCallId = "suggestedFriendCallId";

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
      userList: [],
      isLoading: false,
      suggestedSixFriend: [],
      isModalVisible: false,
      token: "",

      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }
  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));
      this.showAlert(
        "Change Value ",
        `From: ${this.state.txtSavedValue} To: ${value}`
      );
      this.setState({ txtSavedValue: value });
    }
    // Customizable Area Start
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );

    if (apiRequestCallId == this.suggestedFriendCallId) {
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      this.suggestedUserApiRes(responseJson)
    }
    this.setState({ isLoading: false });
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    this.setState({ userList: [] });
    const token = await getStorageData("token");
    this.setState({ token: token });
  }

  async componentWillUnmount() {
    this.setState({ userList: [] });
  }

  suggestedUserApiRes(responseJson: any) {
    this.setState({ isLoading: false });
    console.log("frd--------------------------", responseJson.data)
    if (responseJson?.errors) {
      this.setState({ isLoading: false });
    } else {
      this.setState({ suggestedSixFriend: responseJson.data })
    }
    this.setState({ isLoading: false });
  }


  onPressUser(userId: any, is_attempted: any) {
    this.props.navigation.navigate("InsightsScreen", {
      userId: userId,
      is_attempted: is_attempted,
    });
    this.setState({ isModalVisible: false });
  }

  goBackBtn() {
    this.props.navigation.goBack();
  }

  async getSuggestedFriend() {
    const token = await getStorageData("token");
    this.setState({ isLoading: true });
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.suggestedFriendCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.suggestFriendsEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  // Customizable Area End
}
