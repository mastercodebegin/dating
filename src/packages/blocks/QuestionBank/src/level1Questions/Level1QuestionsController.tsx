/* eslint-disable react/react-in-jsx-scope */
import { IBlock } from "../../../../framework/src/IBlock";
import { Message } from "../../../../framework/src/Message";
import { BlockComponent } from "../../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "../assets";
import { deviceWidth, getStorageData } from "framework/src/Utilities";
import { createRef } from "react";
import { CutomAlertFail } from "../../../../components/src/CustomAlert";
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

export default class Level1QuestionsController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  question1ApiId: any;
  questionAnswerSubmitApiId: any;
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
      currentPosition: "",
      isLoder: false,
      questionApiData: [],
      selectedQue1: [],
      currentIndex: 0,
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
        "Change Value",
        "From: " + this.state.txtSavedValue + " To: " + value
      );

      this.setState({ txtSavedValue: value });
    }

    // Customizable Area Start
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );
    if (apiRequestCallId == this.question1ApiId) {
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (responseJson?.errors !== undefined) {
        CutomAlertFail(responseJson?.errors?.[0]?.message);
        this.setState({ isLoder: false });
      } else {
        this.setState({ questionApiData: responseJson.data });
      }
    }

    if (apiRequestCallId == this.questionAnswerSubmitApiId) {
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (responseJson?.errors !== undefined) {
        CutomAlertFail(responseJson?.errors?.[0]?.message);
        this.setState({ isLoder: false });
      } else {
        this.props.navigation.navigate("ProfileActive", {
          isLevel1: true,
        });
        console.log("responseJson>>>", JSON.stringify(responseJson.data));
      }
    }
    this.setState({ isLoder: false });
    // Customizable Area End
  }

  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false,
  };

  btnExampleProps = {
    onPress: () => this.doButtonPressed(),
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    keyboardType: "email-address",
    autoCompleteType: "email",
  };

  txtInputProps = this.isPlatformWeb()
    ? this.txtInputWebProps
    : this.txtInputMobileProps;

  btnShowHideProps = {
    onPress: () => {
      this.setState({ enableField: !this.state.enableField });
      this.txtInputProps.secureTextEntry = !this.state.enableField;
      this.btnShowHideImageProps.source = this.txtInputProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };


  btnShowHideImageProps = {
    source: this.txtInputProps.secureTextEntry
      ? imgPasswordVisible
      : imgPasswordInVisible,
  };

  doButtonPressed() {
    let message = new Message(getName(MessageEnum.AccoutLoginSuccess));
    message.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(message);
  }

  // web events
  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };

  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  // Customizable Area Start

  componentDidMount(): Promise<void> {
    return this.onNext();
  }

  onPageChange = () => {
    this.setState((prevState) => ({
      currentPosition: prevState.currentPosition + 1,
    }));
  };
  startFromBegining = () => {
    this.setState({ currentPosition: 0 });
  };

  async onNext() {
    this.setState({ isLoder: true });
    const res = await getStorageData("token");
    const headers = {
      token: res,
    };

    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.question1ApiId = getValidationsMsg.messageId;

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "/bx_block_question_bank/mandatory_question"
    );

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      headers
    );

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );

    runEngine.sendMessage(getValidationsMsg.id, getValidationsMsg);
  }

  async onSubmit() {
    this.setState({ isLoder: true });
    const res = await getStorageData("token");
    const headers = {
      "Content-Type": "application/json",
      token: res,
    };

    const httpBody = {
      data: {
        attributes: {
          answers: this.state.selectedQue1,
        },
      },
    };

    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.questionAnswerSubmitApiId = getValidationsMsg.messageId;

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_question_bank/mandatory_ans_save"
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
    this.setState({ isLoder: false });
    runEngine.sendMessage(getValidationsMsg.id, getValidationsMsg);
  }

  onPressOption(item: any, id: any) {
    let data = {
      question_bank_id: Number(id),
      correct_answer: item,
    };

    const currentSelectedOption = this.state.selectedQue1;
    const filterData = currentSelectedOption.filter(
      (data: any) => data.question_bank_id == id
    );
    if (filterData.length > 0) {
      const updatedSelectedOption = currentSelectedOption.map((data: any) => {
        if (data?.question_bank_id == id) {
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
      const updatedSelectedOption = [...currentSelectedOption, data];
      this.setState({ selectedQue1: updatedSelectedOption });
    }
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

  _onViewableItemsChanged = ({ viewableItems }: any) => {
    this.setState({
      currentIndex: viewableItems[0]?.index,
    });
  };

  _viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  onPressLeft = () => {
    this.slideRef.current._listRef._scrollRef.scrollTo({
      x: deviceWidth * (this.state.currentIndex - 1),
    });
  };

  onPressRight = async () => {
    console.log('onPressRight', this.state.selectedQue1.length, this.state.currentIndex, this.state.questionApiData.length)
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
