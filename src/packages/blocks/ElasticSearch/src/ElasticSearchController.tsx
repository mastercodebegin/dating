import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";


// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import { PermissionsAndroid, Linking } from "react-native";
import { getStorageData } from "framework/src/Utilities";
import { CutomAlertFail } from "../../../components/src/CustomAlert";
import Geolocation from "react-native-geolocation-service";
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
  searchValue: string;
  userList: any;
  suggestedFriendList: any;
  suggestedSixFriend: any;
  isLoading: boolean;
  pageCount: number;
  isModalVisible: boolean;
  token: string;
  imageData: any;
  check: any;
  latitude: any;
  longitude: any;
  frdList: Array<any>
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  searchTimeout: ReturnType<typeof setTimeout> | null;
  didFocusListener: any
  // Customizable Area End
}

export default class ElasticSearchController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  searchApiCallId: string;
  paginationApiCallId: string;
  suggestedFriendCallId: string;
  sendFriendApiCallId: string;
  searchTimeout: any;
  locationAddCallId: string;
  getFrdListApiCallId: string;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start

    (this.searchApiCallId = "searchApiCallId");
    (this.paginationApiCallId = "paginationApiCallId");
    this.suggestedFriendCallId = "suggestedFriendCallId";
    this.sendFriendApiCallId = "sendFriendApiCallId"
    this.locationAddCallId = "";
    this.getFrdListApiCallId = "";


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
      searchValue: "",
      pageCount: 0,
      userList: [],
      isLoading: false,
      suggestedFriendList: [],
      suggestedSixFriend: [],
      isModalVisible: false,
      token: "",
      imageData: [
        {
          id: 1,
          url: "https://source.unsplash.com/user/c_v_r/100x100",
        },
        {
          id: 2,
          url: "https://picsum.photos/200/300",
        },
      ],
      check: 0,
      latitude: "",
      longitude: "",
      frdList: []

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
    if (apiRequestCallId == this.searchApiCallId) {
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      this.searchApiRes(responseJson)
    }
    if (apiRequestCallId == this.paginationApiCallId) {
      this.paginationApiSuccessResponse(message)
    }
    if (apiRequestCallId == this.sendFriendApiCallId) {
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      console.log("sendFriendApiCallId", JSON.stringify(responseJson))
      this.addFrdApiRes(responseJson)
    }
    if (apiRequestCallId == this.suggestedFriendCallId) {
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      this.suggestedUserApiRes(responseJson)
    }
    if (apiRequestCallId == this.locationAddCallId) {
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (responseJson.errors) {
        this.setState({ isLoading: false });
      }
      else {
        console.log('locationAddCallId', responseJson);
        this.setState({ isLoading: false });
      }
    }
    if (apiRequestCallId == this.getFrdListApiCallId) {
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      this.frdListApiRes(responseJson)
    }
    this.setState({ isLoading: false });
    // Customizable Area End
  }

  paginationApiSuccessResponse(message: Message) {
    let responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    if (responseJson.errors == undefined) {
      this.setState({ isLoading: false });
      CutomAlertFail("No more user found");
    } else {
      if (responseJson.data.length == 0 && this.state.userList.length > 10) {
        CutomAlertFail("No user found");
      } else {
        this.setState({
          userList: [...this.state.userList, ...responseJson.data],
          isLoading: false,
          pageCount: this.state.pageCount + 1,
        });
      }
    }
  }

  btnExampleProps = {
    onPress: () => this.doButtonPressed(),
  };

  btnShowHideProps = {
    onPress: () => {
      this.setState({ enableField: !this.state.enableField });
      this.txtInputProps.secureTextEntry = !this.state.enableField;
      this.btnShowHideImageProps.source = this.txtInputProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };

  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false,
  };
  goBack = () => {
    this.props.navigation.navigate("InsightsScreen");
  };
  txtInputMobileProps = {
    ...this.txtInputWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  txtInputProps = this.isPlatformWeb()
    ? this.txtInputWebProps
    : this.txtInputMobileProps;



  btnShowHideImageProps = {
    source: this.txtInputProps.secureTextEntry
      ? imgPasswordVisible
      : imgPasswordInVisible,
  };



  doButtonPressed() {
    let msg = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msg.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(msg);
  }

  // web events
  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };

  // Customizable Area Start
  async componentDidMount() {
    this.setState({ userList: [] });
    const token = await getStorageData("token");
    this.setState({ token: token });
    await this.fetchLocationRequest();
  }

  onClickCheckLength = (responseJson: any) => {
    if (responseJson.data.length == 0 && this.state.userList.length > 10) {
      CutomAlertFail("No user found");
    } else {
      this.setState({
        userList: [...this.state.userList, ...responseJson.data],
        isLoading: false,
        pageCount: this.state.pageCount + 1,
      });
    }
  }
  async componentWillUnmount() {
    this.setState({ userList: [] });
  }

  async fetchLocationRequest() {
    const granted: any = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'DatingApp',
        message: 'Dating App access to your location',
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      this.initBackgroundFetch()
    } else {
      if (granted == "never_ask_again") {
        Linking.openSettings();
        console.log(granted, "error")
      } else {
        CutomAlertFail("Location permission denied");
        console.log(granted, "error")
      }
    }
  }

  async initBackgroundFetch() {
    this.setState({ isLoading: true });
    console.log("in init background fetch")
    // alert('in background fetch')
    Geolocation.getCurrentPosition(
      //Will give you the current location
      async (position) => {
        const { coords } = position;
        const latitude = JSON.stringify(coords?.latitude)
        const longitude = JSON.stringify(coords?.longitude);

        this.setState({ latitude: latitude, longitude: longitude })

        const res = await getStorageData("token");
        const headers = {
          "Content-Type": configJSON.validationApiContentType,
          token: res
        };

        const getValidationsMsg = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
        this.locationAddCallId = getValidationsMsg.messageId;

        const httpBody = {
          "allow_location": "true",
          "latitude": latitude,
          "longitude": longitude
        };

        console.log("httpbody>>>>", httpBody);

        getValidationsMsg.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          "account_block/accounts/user_current_location"
        );

        getValidationsMsg.addData(
          getName(MessageEnum.RestAPIRequestHeaderMessage),
          JSON.stringify(headers)
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

      }, (error: { message: any; }) => {
        console.log(error.message);
        this.setState({ isLoading: false });
        CutomAlertFail(error?.message)
      },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
    );
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

  addFrdApiRes(responseJson: any) {
    if (responseJson.errors !== undefined) {
      CutomAlertFail(responseJson?.errors[0]?.message)
      this.setState({ isLoading: false });
    }
    else {
      CutomAlertFail("This user added successfully")
      this.setState({ isLoading: false });
    }
  }

  frdListApiRes(responseJson: any) {
    if (responseJson.errors) {
      this.setState({ isLoading: false });
    }
    else {
      console.log('getFrdListApiCallId', JSON.stringify(responseJson));
      this.setState({ frdList: responseJson?.data, isLoading: false });
    }
  }

  searchApiRes(responseJson: any) {
    if (responseJson.errors !== undefined) {
      this.setState({ isLoading: false, userList: [] });
    }
    else {
      console.log('searchApi', responseJson?.data);
      if (responseJson?.data.length == 0) {
        this.setState({ isLoading: false, userList: [] });
        CutomAlertFail("No User Found");
      }
      else {
        this.setState({ userList: responseJson?.data, isLoading: false });
      }
    }
  }

  onPressUserDetail(userId: any, is_attempted: any) {
    this.props.navigation.navigate("InsightsScreen", {
      userId: userId,
      is_attempted: is_attempted,
    });
  }

  onChangeText(v: string) {
    if (v.length > 0) {
      this.setState({ searchValue: v, isLoading: false, pageCount: 1 });
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
      this.searchTimeout = setTimeout(() => {
        this.searchUser(v);
      }, 500);
    } else {
      this.setState({ userList: [], searchValue: "" });
    }
  }

  onclearData = () => this.setState({ userList: [], searchValue: '' })

  async sendFriendReq(id: any) {
    const token = await getStorageData("token");
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: token,
    };


    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.sendFriendApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_matching_algorithm/add_friend?account_id=${id}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.postMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    console.log("requestMessage@@@", requestMessage)

    return true;
  }

  async searchUser(value: any) {
    this.setState({ isLoading: true });
    const token = await getStorageData("token");
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: token,
    };

    const httpBody = {
      query: value,
      page: 0,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.searchApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.searchEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.postMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  async onEndReach(value: any) {
    const token = await getStorageData("token");
    this.setState({ isLoading: true });
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: token,
    };

    const httpBody = {
      query: value,
      page: this.state.pageCount,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.paginationApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.searchEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.postMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
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

  async getFrdListApi() {
    const token = await getStorageData("token");
    this.setState({ isLoading: true });
    const header = {
      token: token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getFrdListApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getFrdUserListEndPoint
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
