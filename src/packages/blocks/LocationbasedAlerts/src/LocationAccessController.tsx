import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { PermissionsAndroid, Linking } from "react-native";


// Customizable Area Start
import Geolocation from "react-native-geolocation-service";
import { getStorageData } from "../../../framework/src/Utilities";
import { CutomAlertFail } from "../../../components/src/CustomAlert";
// Customizable Area End

export const configJSON = require("./config.js");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  token: any,
  loading: boolean,
  isSecurePassword: boolean
  password: any
  confirmpassword: any
  isSecureCPassword: boolean
  isValidPassword: boolean
  isValidCPassword: boolean
  latitude: any
  longitude: any
  isLoder: boolean
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class LocationAccessController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  locationAddCallId: string;
  authToken: string
  getLocationApiCallId: string
  // Customizable Area End


  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage)
    ];

    this.state = {
      token: "",
      loading: false,
      isSecurePassword: true,
      password: '',
      confirmpassword: '',
      isSecureCPassword: true,
      isValidPassword: false,
      isValidCPassword: false,
      latitude: '',
      longitude: '',
      isLoder: false,
    };
    this.locationAddCallId = ''
    this.getLocationApiCallId = ''
    this.authToken = ''

    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }


  // Customizable Area Start
  async componentDidMount() {
    const token = await getStorageData('token')
    console.log('token------', token);

  }

  // navigateToLocationAccessSuccess = async (latitude: string, longitude: string) => {
  //   this.props.navigation.navigate('LocationConfirmation');
  // }
  // Customizable Area End

  // Customizable Area Start
  async fetchLocationRequest() {
    try {
      this.initBackgroundFetch()
      this.locationAdd('', '')
    }
    catch (error) {
      console.log(error);
    }
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
    this.setState({ isLoder: true });
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

        console.log("httpbody", httpBody);

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

      },
      (error: { message: any; }) => {
      console.log(error.message);
      this.setState({ isLoder: false });
      CutomAlertFail(error?.message)
    },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
    )
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start


    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {

      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      console.log("responseJson", responseJson);
      console.log("apiRequestCallId", apiRequestCallId);
      if (apiRequestCallId === this.locationAddCallId && !responseJson.errors) {
        if (!responseJson.errors) {
          this.props.navigation.navigate("LocationConfirmation");
        }
        this.parseApiCatchErrorResponse(errorReponse);
      } else {
        if (errorReponse === undefined) {
          CutomAlertFail(responseJson?.errors[0]?.message);
        }
      }
    }
    // Customizable Area End
  }


  locationAdd = (latitude: string, longitude: string,) => {
    console.log('updatePaymentStatus--------------------');


    const header = {
      "Content-Type": "application/json",
      token: this.authToken
    };

    const body =
    {
      "allow_location": "true",
      "latitude": latitude,
      "longitude": longitude
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.locationAddCallId = requestMessage.messageId;
    //give the id here

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.updatePaymentStatusEndPoint
      //endPoint of api
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.POSTMethod
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(body)
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };

  contactusTest = () => {
    console.log('contactusTest--------------------');
    this.props.navigation.navigate('QuestionBank1');
  };

  // Customizable Area End
}