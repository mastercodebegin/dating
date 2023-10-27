/* eslint-disable react/react-in-jsx-scope */
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { deviceWidth, getStorageData } from "framework/src/Utilities";
import { createRef } from "react";
import { CutomAlertFail } from "../../../components/src/CustomAlert";
import { configJSON } from "./QuestionBankController";
// Customizable Area End

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
  currentPosition: any;
  isLoder: boolean;
  questionApiData: Array<any>;
  selectedQue1: Array<any>;
  currentIndex: number;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class SelectedQuestionController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  questionAnswerApiId: any;
  question1ApiId: any;
  slideRef: any = createRef();
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
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
      isLoder: false,
      currentPosition: "",
      selectedQue1: [],
      currentIndex: 0,
      questionApiData: [],
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    // Customizable Area Start
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );
    if (apiRequestCallId == this.question1ApiId) {
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (responseJson.errors !== undefined) {
        CutomAlertFail(responseJson?.errors[0]?.message);
        this.setState({ isLoder: false });
      } else {
        this.setState({ questionApiData: responseJson.data });
      }
    }
    if (apiRequestCallId == this.questionAnswerApiId) {
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      console.log("questionAnswerApiId", responseJson);
      if (responseJson.errors !== undefined) {
        CutomAlertFail(responseJson?.errors[0]?.message);
        this.setState({ isLoder: false });
      } else {
        this.props.navigation.navigate("ResponseSubmited");
      }
    }
    this.setState({ isLoder: false });
    // Customizable Area End
  }

  // Customizable Area Start

  componentDidMount(): Promise<void> {
    return this.onNext();
  }

  startFromBegining = () => {
    this.setState({ currentPosition: 0 });
  };

  onPageChange = () => {
    this.setState((prevState) => ({
      currentPosition: prevState.currentPosition + 1,
    }));
  };
 

  async onNext() {
    this.setState({ isLoder: true });
    const tokenRes = await getStorageData("token");
    const headers = {
      token: tokenRes,
    };

    const getValidationsMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.question1ApiId = getValidationsMessage.messageId;

    getValidationsMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "/bx_block_question_bank/selected_question_list"
    );

    getValidationsMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      headers
    );

    getValidationsMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );

    runEngine.sendMessage(getValidationsMessage.id, getValidationsMessage);
  }

  async onSubmit() {
    this.setState({ isLoder: true });
    const res = await getStorageData("token");
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      token: res,
    };

    const httpBody = {
      data: {
        attributes: {
          answers: this.state.selectedQue1,
        },
      },
    };

    console.log("questionhttpBody", JSON.stringify(httpBody));

    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.questionAnswerApiId = getValidationsMsg.messageId;

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "/bx_block_question_bank/select_question_ans_save"
    );

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      headers
    );

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "POST"
    );

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    runEngine.sendMessage(getValidationsMsg.id, getValidationsMsg);
  }

  checkQueSelected = (item: any, id: any) => {
    const currentSelectedOption = this.state.selectedQue1;
    const filterData = currentSelectedOption.filter(
      (data: any) => data.question_bank_id == id
    );
    if (filterData.length > 0) {
      if (filterData[0].correct_answer == item) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  onPressOption(item: any, id: any) {
    let data = {
      correct_answer: item,
      question_bank_id: Number(id),
    };

    const currentSelectedOptionValue = this.state.selectedQue1;
    const filterData = currentSelectedOptionValue.filter(
      (data: any) => data.question_bank_id == id
    );
    if (filterData.length > 0) {
      const updatedSelectedOption = currentSelectedOptionValue.map((data: any) => {
        if (data.question_bank_id == id) {
          return {
            ...data,
            correct_answer: item,
          };
        } else {
          return data;
        }
      });
      this.setState({ selectedQue1: updatedSelectedOption });
    } else {
      const updatedSelectedOption = [...currentSelectedOptionValue, data];
      this.setState({ selectedQue1: updatedSelectedOption });
    }
  }

  onPressLeft = () => {
    this.slideRef.current._listRef._scrollRef.scrollTo({
      x: deviceWidth * (this.state.currentIndex - 1),
    });
  };
  
  _onViewableItemsChanged = ({ viewableItems }: any) => {
    this.setState({
      currentIndex: viewableItems[0]?.index,
    });
  };

  _viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  onPressRight = async () => {
    if (this.state.selectedQue1.length >= this.state.currentIndex + 1) {
      if (this.state.currentIndex === this.state.questionApiData.length - 1) {
        await this.onSubmit();
      } else {
        this.slideRef.current._listRef._scrollRef.scrollTo({
          x: deviceWidth * (this.state.currentIndex + 1),
        });
      }
    } else {
      CutomAlertFail("Please select the option");
    }
  };

  // Customizable Area End
}
