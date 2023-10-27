import { IBlock } from "../../../framework/src/IBlock";
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
  // Customizable Area Start
  token: string;
  questionData: Array<any>;
  isGameStart: boolean;
  isLoader: boolean;
  answerData: Object;
  // Customizable Area End
}

interface SS {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export default class NotifiedFriendController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  gameStartApiCallId: string = "";
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
      questionData: [],
      isGameStart: false,
      isLoader: false,
      answerData: {
        question: {
          "option": "",
          "friend_id": 0,
          "question_bank_id": 0
        }
      },
    
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

  async componentWillUnmount() {
    // clearInterval(this.refreshChatInterval as number);
  }

  OkayButtonPressed = () => {
    this.props.navigation.goBack();
  };
  // Customizable Area End
}