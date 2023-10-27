import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { getStorageData } from "../../../framework/src/Utilities";
import { Alert, Dimensions } from "react-native";
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
  myID: number,
  opponentID: number,
  score: { 
    first_user_score: number,
    second_user_score: number,
  };
  token:string;
  firstUserName: string;
  secondUserName: string;
  isModalOpen: boolean;
  isPortrait: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export interface DimensionType {
  screen: Screen;
  window: Screen;
}

export interface Screen {
  fontScale: number;
  height: number;
  scale: number;
  width: number;
}

export default class GameScore2Controller extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getReasonId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIRequestMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];
    // Customizable Area End
    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      myID: 0,
      opponentID: 0,
      score: {
        first_user_score: 0,
        second_user_score: 0,
      },
      token: "",
      firstUserName: "",
      secondUserName: "",
      isModalOpen: false,
      isPortrait: this.isPortrait(),
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const errorResponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if (apiRequestCallId == this.getReasonId && responseJson) {
        this.setState({
          score: {
            first_user_score: responseJson.first_user_score.data.attributes.score,
            second_user_score: responseJson.second_user_score.data.attributes.score
          },
          firstUserName: responseJson.first_user_score.data.attributes.user_name,
          secondUserName: responseJson.second_user_score.data.attributes.user_name
        });
      }

    }
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    let token = await getStorageData('authToken');
    let loggedInUserId = await getStorageData("userId");
    this.setState({ token, myID: loggedInUserId, opponentID: configJSON.opponentID }, () => {
     this.getScoreData(configJSON.gameID);
    });

    Dimensions.addEventListener('change', this.getDimentions);
    // Customizable Area End
  }

  // web events

  // Customizable Area Start
  getDimentions = () => {
    this.setState({ isPortrait: this.isPortrait() })
  }

  isPortrait = () => {
    const dimension = Dimensions.get('screen');
    return dimension.height >= dimension.width;
  };

  handleAvatarClick = () => {
    this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
  };

  getScoreData = async (gameId: number) => {
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getReasonId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.getUserGameScoreApiEndpoint}?game[game_type_id]=${gameId}&account_id=${this.state.opponentID}`
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
  };

  onMyImageclick = () => {
    Alert.alert("My image Clicked")
  }

  onOpponentImageclick = () => {
    Alert.alert("Opponent image Clicked")
  }
  // Customizable Area End
}
