// Customizable Area Start
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import React from "react";
import { getStorageData } from "../../../framework/src/Utilities";
import moment from "moment";
import {
  Text,
  StyleSheet
} from 'react-native'
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
  firstName: any;
  lastName: any;
  email: string;
  phoneNumber: any;
  showErrorModal: boolean;
  content: any;
  password: any;
  loading: boolean;
  userName: any;
  dob: any;
  isLoading: boolean;
  AccountUserProfile: any;
  date: any;
  mode: any;
  show: boolean;
  expiration: string
  isvalidAddName: boolean;
  firstNameError: string;
  usernameError: string;
  emailError: string;
  firstNameFocus: boolean;
  emailFocus: boolean;
  userNameFocus: boolean;
  errorshow: boolean;
  showIam: boolean;
  i_am: any
  gender: any
  interest: any
  relationship_type: any
  min_age_between: any
  max_age_between: any
  data: any
  Relationship: any
  minRange: any
  // Customizable Area End

}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class PrivacySettingController extends BlockComponent<
  Props,
  S,
  SS
> {

  // Customizable Area Start
  updateAccountApiCallId: any

  userProfileGetApiCallId: any
  firstNameReg: any;
  emailReg: any;
  userNameReg: any;



  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.CountryCodeMessage)
    ];

    this.state = {
      firstName: "",
      lastName: "",
      email: '',
      phoneNumber: "",
      showErrorModal: false,
      content: '',
      password: '',
      loading: false,
      userName: '',
      dob: '',
      isLoading: false,
      AccountUserProfile: {},
      date: new Date(),
      mode: "date",
      show: false,
      expiration: "",
      isvalidAddName: false,
      firstNameError: "",
      emailError: "",
      usernameError: "",
      firstNameFocus: false,
      emailFocus: false,
      userNameFocus: false,
      errorshow: false,
      showIam: false,
      i_am: '',
      gender: '',
      interest: '',
      relationship_type: '',
      min_age_between: '',
      max_age_between: '',
      data:

        [{ label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
        { label: 'Fluid', value: 'Fluid' },],

      Relationship:
        [{ label: 'Long Term Relationship', value: 'Long Term Relationship' },
        { label: 'Short Term Relationship', value: 'Short Term Relationship' },
        { label: 'Casual Relationship', value: 'Casual Relationship' }],

      minRange: [{ label: "18", value: "18" }, { label: "19", value: "19" }, { label: "20", value: "20" }, { label: "21", value: "21" }, { label: "22", value: "22" }, { label: "23", value: "23" }, { label: "24", value: "24" }, { label: "25", value: "25" }, { label: "26", value: "26" }, { label: "27", value: "27" }, { label: "28", value: "28" }, { label: "29", value: "29" }, { label: "30", value: "30" }, { label: "31", value: "31" }, { label: "32", value: "32" }, { label: "33", value: "33" }, { label: "34", value: "34" }, { label: "35", value: "35" }, { label: "36", value: "36" }, { label: "37", value: "37" }, { label: "38", value: "38" }, { label: "39", value: "39" }, { label: "40", value: "40" }, { label: "41", value: "41" },
      { label: "42", value: "42" }, { label: "43", value: "43" }, { label: "44", value: "44" }, { label: "45", value: "45" }, { label: "46", value: "46" }, { label: "47", value: "47" }, { label: "48", value: "48" }, { label: "49", value: "49" }, { label: "50", value: "50" }, { label: "51", value: "51" }, { label: "52", value: "52" }, { label: "53", value: "53" }, { label: "54", value: "54" }, { label: "55", value: "55" }, { label: "56", value: "56" }, { label: "57", value: "57" }, { label: "58", value: "58" }, { label: "59", value: "59" }, { label: "60", value: "60" }, { label: "61", value: "61" }, { label: "62", value: "62" }, { label: "63", value: "63" }, { label: "64", value: "64" }, { label: "65", value: "65" },
      { label: "67", value: "67" }, { label: "68", value: "68" }, { label: "69", value: "69" }, { label: "70", value: "70" }, { label: "71", value: "71" }, { label: "72", value: "72" }, { label: "73", value: "73" }, { label: "74", value: "74" }, { label: "75", value: "75" }, { label: "76", value: "76" }, { label: "77", value: "77" }, { label: "78", value: "78" }, { label: "79", value: "79" }, { label: "80", value: "80" }, { label: "81", value: "81" }, { label: "82", value: "82" }, { label: "83", value: "83" }, { label: "84", value: "84" }, { label: "85", value: "85" }, { label: "86", value: "86" }, { label: "87", value: "87" }, { label: "88", value: "88" }, { label: "89", value: "89" }, { label: "90", value: "90" },
      { label: "91", value: "91" }, { label: "92", value: "92" }, { label: "93", value: "93" }, { label: "94", value: "94" }, { label: "95", value: "95" }, { label: "96", value: "96" }, { label: "97", value: "97" }, { label: "98", value: "98" }, { label: "99", value: "99" },
      ]
    };

    this.emailReg = new RegExp(
      /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$/
    );
    this.firstNameReg = new RegExp(/^[a-zA-Z ]+$/);
    this.userNameReg = new RegExp(/^(?=.*[a-zA-Z])([a-zA-Z0-9]{3,20})$/);
    // Customizable Area End
    runEngine.attachBuildingBlock(this, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("on recieive==>" + JSON.stringify(message));

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (!responseJson?.errors) {
        if (apiRequestCallId === this.updateAccountApiCallId) {
          this.props.navigation.navigate("UpdateIdentifyScreen1")
        } else if (
          apiRequestCallId === this.userProfileGetApiCallId
        ) {
          this.UserDetailsSuccCallBack(responseJson);
        }
      } else if (responseJson?.errors) {
        switch (apiRequestCallId) {
          case this.updateAccountApiCallId:
            this.loderClose();
            break;
          case this.userProfileGetApiCallId:
            this.loderClose();
            break;
          default:
            break;
        }
      }
    }


    // Customizable Area End
  }
  loderClose() {
    this.setState({ isLoading: false })
  }
  onChangeDob = (event: any, selectedDateTime: any) => {
    if (event?.type === 'set') {
      const selectedDate = new Date(selectedDateTime);
      const currentDate = new Date();
      const minDate = new Date();
      minDate.setFullYear(currentDate.getFullYear() - 18);
      if (selectedDate < minDate) {
        // Valid date, continue with the logic
        const formattedDate = moment(selectedDateTime).format("DD/MM/YYYY");
        this.setState({
          dob: formattedDate,
          //   month: formattedDate?.split('/')[1],
          //   date: formattedDate?.split('/')[0],
          //   year: formattedDate?.split('/')[2],
          show: false,
          errorshow: false,

        });
      } else {
        this.setState({

          //   month: formattedDate?.split('/')[1],
          //   date: formattedDate?.split('/')[0],
          //   year: formattedDate?.split('/')[2],
          errorshow: true,
          show: false,

        });
        // Invalid date, handle the error
      }
    } else {
      this.setState({
        show: false,
      });
    }
  }

  oncheckErrorDob = () => {
    if (this.state.errorshow)
      return <Text style={styles.inputErrorTextStyle} >Age Should Be 18 Years OR More</Text>

  }
  onCheckError = () => {
    if (this.state.firstNameError) {
      return <Text style={styles.inputErrorTextStyle}>{this.state.firstNameError}</Text>
    }
  }

  onCheckErrorUserName = () => {
    if (this.state.usernameError) {
      return <Text style={styles.inputErrorTextStyle}>{this.state.usernameError} </Text>

    }
  }

  onChangeDate = (event: any, selectedDateTime: any) => {
    console.log("event@@@", event, selectedDateTime)
    if (event?.type === 'set') {
        const selectedDate = new Date(selectedDateTime);
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();
        const day = selectedDate.getDate();
        const currentDate = new Date();
        const minDate = new Date();
        minDate.setFullYear(currentDate.getFullYear() - 18);
        if (selectedDate < minDate) {
            // Valid date, continue with the logic
            const formattedDate = moment(selectedDateTime).format("DD/MM/YYYY");
            this.setState({
                dob: formattedDate,
                date: new Date(year, month, day),
                show: false,
                errorshow: false,
            });
        } else {
            this.setState({
                errorshow: false,
                show: false,
            });
        }
    } else {
        this.setState({
            show: false,
        });
    }
}

  UserDetailsSuccCallBack = (responseJson: any) => {
    const formatedDate = moment(responseJson && responseJson?.data?.attributes?.date_of_birth).format("DD/MM/YYYY");
    const dobArray = responseJson?.data?.attributes?.date_of_birth.split('-');
    const year = parseInt(dobArray[0], 10);
    const month = parseInt(dobArray[1], 10) - 1;
    const day = parseInt(dobArray[2], 10);

    const ageRange = responseJson?.data?.attributes?.profile?.age_between;

    const res = ageRange && ageRange?.split("-");

    this.setState({
      firstName: responseJson && responseJson.data && responseJson?.data?.attributes && responseJson?.data?.attributes?.full_name,
      email: responseJson && responseJson?.data && responseJson?.data?.attributes && responseJson?.data?.attributes?.email,
      phoneNumber: responseJson && responseJson?.data?.attributes && responseJson?.data?.attributes?.phone_number,
      userName: responseJson && responseJson?.data && responseJson?.data?.attributes && responseJson?.data?.attributes?.user_name,
      dob: formatedDate,
      date: new Date(year, month, day),
      gender: responseJson?.data?.attributes?.gender,
      interest: responseJson?.data?.attributes?.interest,
      relationship_type: responseJson?.data?.attributes?.profile?.relationship_type,
      min_age_between: res && res[0],
      max_age_between: res && res[1]
    })
  }

  public onFocus = (focusId: string) => {
    switch (focusId) {
      case "firstNameFocuse":
        this.setState({ firstNameFocus: true, firstNameError: '' });
        break;
      case "emailFocuse":
        this.setState({ emailFocus: true, emailError: '' });
        break;
      case "UserNameFocuse":
        this.setState({ userNameFocus: true, usernameError: '' });
        break;
      default:

        return;
    }
  };

  public onBlur = (focusId: string) => {
    switch (focusId) {
      case "firstNameFocuse":
        this.hanldeFirstName();
        this.setState({ firstNameFocus: false });
        break;
      case "emailFocuse":
        this.handleEmail();
        this.setState({ emailFocus: false });
        break;
      case "UserNameFocuse":
        this.hanldeUserName();
        this.setState({ userNameFocus: false });
        break;
      default:
        return;
    }
  };
  isValidFirstName(firstName: string) {
    return this.firstNameReg.test(firstName);
  }

  isValidEmail(email: string) {
    return this.emailReg.test(email.toLowerCase());
  }

  isValidUserName(userName: string) {
    return this.userNameReg.test(userName);
  }

  hanldeFirstName() {
    if (this.state.firstName.trim().length == 0) {
      return this.setState({ firstNameError: configJSON.plsEnterName });
    } else if (this.state.firstName.length < 3) {
      return this.setState({
        firstNameError: configJSON.errorFirstNameMoreThanThreeCharacters,
      });
    }
    else if (this.state.firstName.length > 40) {
      return this.setState({
        firstNameError: configJSON.errorFirstNameLessThanFourtyCharacters,
      });
    } else if (!this.isValidFirstName(this.state.firstName.trim())) {
      return this.setState({
        firstNameError: configJSON.errorFirstNameNotValid,
      });
    } else {
      this.setState({ firstNameError: "" });
    }
  }
  hanldeUserName() {
    if (this.state.userName != null && this.state.userName != undefined) {
      if (this.state.userName.trim().length == 0) {
        return this.setState({ usernameError: configJSON.plsEnterUserName });
      } else
        if (this.isValidUserName(this.state.userName.trim())) {
          if (this.state.userName.length < 3) {
            return this.setState({
              usernameError: configJSON.erroruserFirstNameMoreThanThreeCharacters,
            });
          }
          else {
            this.setState({ usernameError: "" });
          }
        } else {
          return this.setState({
            usernameError: configJSON.errorUserFirstNameNotValid,
          });
        }
    }
  }


  handleEmail() {
    if (!this.isValidEmail(this.state.email)) {
      return this.setState({ emailError: configJSON.errorEmailNotValid });
    } else {
      this.setState({ emailError: "" });
    }
  }
  public changeState(objectID: string, value: any = null) {
    switch (objectID) {
      case "txtInputFirstName":
        this.setState({ firstName: value, firstNameError: '' });
        break;
      case "txtInputEmail":
        this.setState({ email: value.trim(), emailError: '' });
        break;
      case "txtInputUserName":
        this.setState({ userName: value.trim(), usernameError: '' });
        break;

      default:
        return null;
    }
  }

  async componentDidMount() {
    this.getUserProfile()
  }
  checkMinAge = () => {

    if (this.state.min_age_between === "null") {
      return 'Min Age'

    } else if (this.state.min_age_between) {
      return this.state.min_age_between
    } else {
      return 'Min Age'


    }
  }
  checkMaxAge = () => {
    if (this.state.max_age_between === "null") {
      return 'Max Age'
    } else if (this.state.max_age_between) {
      return this.state.max_age_between
    } else {
      return 'Max Age'
    }
  }
  async getUpdateProfile() {
    const ageRange = this.state.min_age_between || this.state.max_age_between ? this.state.min_age_between + "-" + this.state.max_age_between : ""


    const res = await getStorageData('token');
    if (!this.state.firstName || !this.state.email || !this.state.userName || !!this.state.firstNameError || !!this.state.emailError || !!this.state.usernameError) {
      this.hanldeFirstName();
      this.handleEmail();
      this.hanldeUserName();
      return false;
    }

    const header = {
      "Content-Type": configJSON.contenttypeApiValidateMobileNo,
    };

    const attrs = {
      name: this.state.firstName,
      email: this.state.email,
      user_name: this.state.userName,
      date_of_birth: this.state.dob,
      gender: this.state.gender,
      interest: this.state.interest,
      relationship_type: this.state.relationship_type,
      age_range: ageRange

    };

    const data = {
      attributes: attrs
    };

    const httpBody = {
      data: data,
      token: res
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.updateAccountApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "account_block/accounts/update_user_profile"
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
      configJSON.apiUpdateUserType
    );
    this.setState({
      loading: true,
    });
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }


  showDatepicker = () => {
    this.setState({ mode: "date", show: true });
  };

  async getUserProfile() {
    const res = await getStorageData('token');

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.userProfileGetApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.apiGetUserProfile
    );

    const header = {
      "Content-Type": configJSON.contentTypeApiGetUserProfile,
      token: res
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.methodTypeApiGetUserProfile
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }


}
const styles = StyleSheet.create({

  inputErrorTextStyle: {
    fontSize: 14,
    textAlign: "left",
    color: 'red'
  },
});