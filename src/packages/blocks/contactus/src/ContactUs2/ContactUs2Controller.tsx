import { IBlock } from "../../../../framework/src/IBlock";
import { Message } from "../../../../framework/src/Message";
import { BlockComponent } from "../../../../framework/src/BlockComponent";
import { runEngine } from "../../../../framework/src/RunEngine";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { getStorageData } from "../../../../framework/src/Utilities";
import { style } from "../../../../components/src/CustomFonts";
import { CutomAlertFail } from "../../../../components/src/CustomAlert";
export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

export interface S {
  queryTitle: string;
  queryDescription: string;
  queryTitleFocus: boolean;
  queryDescriptionFocus: boolean;
  queryTitleError: string;
  queryDescriptionError: string;
  isLoading: boolean;
}

export interface SS {
  id: any;
}

export default class ContactUs2Controller extends BlockComponent<
  Props,
  S,
  SS
> {
  submitQueryApiId: string = "";

  constructor(props: Props) {
    super(props);

    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
    ];
    this.receive = this.receive.bind(this);
    this.state = {
      queryTitle: "",
      queryDescription: "",
      queryTitleError: "",
      queryDescriptionError: "",
      queryTitleFocus: false,
      queryDescriptionFocus: false,
      isLoading: false,
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  submitQuery = async () => {
    if (!this.state.queryTitle || !this.state.queryDescription || this.state.queryTitleError || this.state.queryDescriptionError) {
      this.hanldeQueryTitle();
      this.hanldeQueryDescription();
      return false;
    }
    this.setState({ isLoading: true })
    const token = await getStorageData("token");
    const headers = {
      "Content-Type": configJSON.submitQueryApiContentType,
      token
    };
    const httpBody = {
      data: {
        title: this.state.queryTitle,
        description: this.state.queryDescription
      },
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.submitQueryApiId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.submitQueryApiMethodType
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.submitQueryApiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  async receive(from: string, message: Message) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      let errorResponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (apiRequestCallId === this.submitQueryApiId) {
        if (!responseJson.errors) {
          CutomAlertFail("Query submitted successfully! We will get back to you soon");
          this.props.navigation.goBack();
        } else {
          CutomAlertFail("Error in submtting query, please try again");
        }
      }
      this.setState({ isLoading: false });
      this.parseApiCatchErrorResponse(errorResponse);
    }
  }

  decideBorderColor = (focus: boolean, inputTextLength: number) => {
    if (focus) {
      return style.black
    } else if (inputTextLength) {
      return style.black
    } else {
      return style.bColor;
    }
  }

  public onFocus = (focusId: string) => {
    switch (focusId) {
      case "queryTitleFocus":
        this.setState({ queryTitleFocus: true, queryTitleError: '' });
        break;
      case "queryDescriptionFocus":
        this.setState({ queryDescriptionFocus: true, queryDescriptionError: '' });
        break;
      default:
        return;
    }
  };

  public onBlur = (focusId: string) => {
    switch (focusId) {
      case "queryTitleFocus":
        this.hanldeQueryTitle();
        this.setState({ queryTitleFocus: false });
        break;
      case "queryDescriptionFocus":
        this.hanldeQueryDescription();
        this.setState({ queryDescriptionFocus: false });
        break;
      default:
        return;
    }
  };

  public changeState(input: string, value: string) {
    switch (input) {
      case "queryTitle":
        this.setState({ queryTitle: value, queryTitleError: '' });
        break;
      case "queryDescription":
        this.setState({ queryDescription: value, queryDescriptionError: '' });
        break;
      default:
        return null;
    }
  }

  hanldeQueryTitle() {
    if (this.state.queryTitle.trim().length == 0) {
      return this.setState({ queryTitleError: "Please enter query title" });
    }
    else {
      this.setState({ queryTitleError: "" });
    }
  }

  hanldeQueryDescription() {
    if (this.state.queryDescription.trim().length == 0) {
      return this.setState({ queryDescriptionError: "Please enter query description" });
    } 
    else {
      this.setState({ queryDescriptionError: "" });
    }
  }
}
