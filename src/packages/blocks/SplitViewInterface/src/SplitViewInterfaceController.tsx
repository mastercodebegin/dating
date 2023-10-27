import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { getStorageData } from "../../../framework/src/Utilities";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}
interface UserInfo {
  id: number;
  type: string;
  attributes: {
    id: number;
    account_id: number;
    score: number;
    user_name: string;
  };
}

interface S {
  // Customizable Area Start
  questionData: {
    id: number;
    type: string;
    attributes: { question: string; option_1: string; option_2: string };
  }[];
  questionIndex: number;
  currentQuestion: {
    id: number;
    type: string;
    attributes: { question: string; option_1: string; option_2: string };
  };
  myInfo: UserInfo;
  opponentsInfo: UserInfo;
  token: string | null;
  myId: number;
  opponentsId: number;
  options: string[];
  selectedOption: string;
  toggleSnackbar: boolean;
  gameMessage: string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class SplitViewInterfaceController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getScoreApiId: string = "getScoreApiId";
  getQuestionsApiId: string = "getQuestionsApiId";
  submitAnswerApiId: string = "submitAnswerApiId";
  interval: ReturnType<typeof setInterval> = setInterval(() => { }, 99999);
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
      // Customizable Area Start
      questionData: [],
      questionIndex: 0,
      currentQuestion: {
        id: 0,
        type: "",
        attributes: { question: "", option_1: "", option_2: "" },
      },
      myInfo: {
        id: 0,
        type: "",
        attributes: {
          id: 0,
          account_id: 0,
          score: 0,
          user_name: "",
        },
      },
      opponentsInfo: {
        id: 0,
        type: "",
        attributes: {
          id: 0,
          account_id: 0,
          score: 0,
          user_name: "",
        },
      },
      token: "",
      myId: 0,
      opponentsId: 0,
      options: [],
      selectedOption: "",
      toggleSnackbar: false,
      gameMessage: ""
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

      switch (apiRequestCallId) {
        case this.getScoreApiId:
          this.setState({
            myInfo: responseJson.first_user_score.data,
            opponentsInfo: responseJson.second_user_score.data,
          });
          break;
        case this.getQuestionsApiId:
          let currentQuestionIndex;
          let whereToStart = responseJson.data.findIndex(
            (questionObject: {
              id: number;
              type: string;
              attributes: {
                question: string;
                option_1: string;
                option_2: string;
                is_attempted: boolean;
              };
            }) => {
              return questionObject.attributes.is_attempted === false;
            }
          );
          if (whereToStart === -1) {
            currentQuestionIndex = 0;
          } else {
            currentQuestionIndex = whereToStart;
          }
          this.setState({
            questionData: responseJson.data,
            questionIndex: currentQuestionIndex,
            currentQuestion: responseJson.data[currentQuestionIndex],
            options: [
              responseJson.data[currentQuestionIndex].attributes.option_1,
              responseJson.data[currentQuestionIndex].attributes.option_2,
            ],
          });
          break;
        case this.submitAnswerApiId:
          if (responseJson?.data?.attributes) {
            this.setState({ toggleSnackbar: true, gameMessage: `Answer is ${responseJson.data.attributes.is_correct}` })
          }
          else {
            this.setState({ toggleSnackbar: true, gameMessage: responseJson.message })
          }
          this.getUserScore();
          this.clearMessage();
          break;
      }
      this.parseApiCatchErrorResponse(errorResponse);
    }
    // Customizable Area End
  }

  // Customizable Area Start

  async componentDidMount() {
    let token = await getStorageData('authToken');
    let loggedInUserId = await getStorageData("userId")
    this.setState({ token, myId: loggedInUserId, opponentsId: configJSON.opponentId }, () => {
      this.getUserScore();
      this.getQuestions();
    });
    this.interval = setInterval(this.getUserScore, 5000);
  }

  async componentWillUnmount() {
    clearInterval(this.interval);
  }

  onCloseMessage = () => {
    this.setState({ toggleSnackbar: false, gameMessage: "" });
  };

  handleProfileImageClick = () => {
    alert(configJSON.alertMessage)
  }

  getUserScore = async () => {
    const fetchReasonsHeader = {
      "Content-Type": configJSON.apiContentTypeApplicationJson,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getScoreApiId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getScoreApiEndPoint +
      `?question[account_id]=${this.state.myId}&user[account_id]=${this.state.opponentsId}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(fetchReasonsHeader)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGET
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  getQuestions = async () => {
    const fetchReasonsHeader = {
      "Content-Type": configJSON.apiContentTypeApplicationJson,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getQuestionsApiId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getQuestionApiEndPoint +
      `?question[sendar_id]=${this.state.myId}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(fetchReasonsHeader)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGET
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  submitAnswer = (answer: string) => {
    const fetchReasonsHeader = {
      "Content-Type": configJSON.apiContentTypeApplicationJson,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.submitAnswerApiId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.submitAnswerApiEndPoint +
      `?question[option]=${answer}&question[account_id]=${this.state.opponentsId}&question[question_bank_id]=${this.state.currentQuestion.id}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(fetchReasonsHeader)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypePOST
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  onRadioBtnClick = (option: string) => {
    this.setState({
      selectedOption: option,
    });
    this.submitAnswer(option);
    this.getNextQuestion();
  };

  clearMessage = async () => {
    setTimeout(() => {
      this.setState({ gameMessage: "" });
    }, 2000)
  }

  getNextQuestion = () => {
    const { questionData, questionIndex } = this.state;
    if (questionIndex < questionData.length - 1)
      this.setState((prevState) => ({
        questionIndex: prevState.questionIndex + 1,
        currentQuestion: questionData[prevState.questionIndex + 1],
        options: [
          questionData[prevState.questionIndex + 1].attributes.option_1,
          questionData[prevState.questionIndex + 1].attributes.option_2,
        ],
      }));
  };
  // Customizable Area End
}
