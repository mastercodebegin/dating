import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgBell } from "./assets";
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
  // Customizable Area Start
  data: any[];
  selectedData: any;
  token: any;
  loading: boolean;
  refreshing: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class NotificationsController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getDataCallId: string = "";
  markAsReadCallId: string = "";
  deleteCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      data: [{
        attributes: {
          id: 1,
          headings: "Title 1",
          contents: "Lorem ipsum dolor sit amet",
          is_read: '',
          created_at: "25 August 2023"
        }
      },{
        attributes: {
          id: 2,
          headings: "Title 2",
          contents: "Lorem ipsum dolor sit amet",
          is_read: '',
          created_at: "26 August 2023"
        }
      },{
        attributes: {
          id: 3,
          headings: "Title 3",
          contents: "Lorem ipsum dolor sit amet",
          is_read: '',
          created_at: "27 August 2023"
        }
      },{
        attributes: {
          id: 4,
          headings: "Title 4",
          contents: "Lorem ipsum dolor sit amet",
          is_read: '',
          created_at: "28 August 2023"
        }
      },{
        attributes: {
          id: 5,
          headings: "Title 5",
          contents: "Lorem ipsum dolor sit amet",
          is_read: '',
          created_at: "29 August 2023"
        }
      }],
      selectedData: null,
      token: "",
      loading: false,
      refreshing: false,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    this.getToken();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
      });
    }
    // Customizable Area Start
    this.setState({ loading: true });
    this.getNotifications();
    // Customizable Area End
  }

  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      runEngine.debugLog("TOKEN", token);
    } else if (
      this.getDataCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const apiResponse = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      console.log("apiResponse.data", apiResponse)
      if(apiResponse.data) {
        this.setState({
          data: apiResponse.data,
          loading: false,
          refreshing: false,
        });
      } else {
        this.setState({
          data: [],
          loading: false,
          refreshing: false,
        })
      }
    } else if (
      this.markAsReadCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.getNotifications();
    } else if (
      this.deleteCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const apiResponse = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (apiResponse?.data) {
        this.showAlert("Message", configJSON.deleteMessage);
      }
      this.setState({ selectedData: null });
      this.getNotifications();
    }
    // Customizable Area End
  }

  // Customizable Area Start
  iconBellProps = {
    source: imgBell,
  };

  async getNotifications() {
    const getDataMsg = new Message(getName(MessageEnum.RestAPIRequestMessage));

    const token = await getStorageData("token");
    this.getDataCallId = getDataMsg.messageId;

    getDataMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPoint
    );

    getDataMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify({
        "Content-Type": configJSON.apiContentType,
        token,
      })
    );

    getDataMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getDataMethod
    );

    runEngine.sendMessage(getDataMsg.id, getDataMsg);
  }

  onRefreshing = () => {
    this.setState({ refreshing: true });
    this.getNotifications();
  }

  markAsRead(id: number) {
    const markAsReadMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.markAsReadCallId = markAsReadMsg.messageId;

    markAsReadMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.endPoint}/${id}`
    );

    markAsReadMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify({
        "Content-Type": configJSON.apiContentType,
        token: this.state.token ? this.state.token : "",
      })
    );

    markAsReadMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.markAsReadMethod
    );

    runEngine.sendMessage(markAsReadMsg.id, markAsReadMsg);
  }

  deleteNotifications(id: number) {
    console.log(id);
    const deletedMsg = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.deleteCallId = deletedMsg.messageId;

    deletedMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.endPoint}/${id}`
    );

    deletedMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify({
        "Content-Type": configJSON.apiContentType,
        token: this.state.token ? this.state.token : "",
      })
    );

    deletedMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "DELETE"
    );

    runEngine.sendMessage(deletedMsg.id, deletedMsg);
  }
  
  timeSince(date: string) {
    var seconds = Math.floor(
      (new Date().valueOf() - new Date(date).valueOf()) / 1000
    );
    var interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }
  convertDate(inputFormat: string) {
    function pad(s: any) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("-");
  }
  // Customizable Area End
}
