//@ts-nocheck
// Customizable Area Start
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { showMessage } from "react-native-flash-message";
import { getStorageData, setStorageData } from "../../../framework/src/Utilities";
import React from "react";
import { CutomAlertFail } from "../../../components/src/CustomAlert";
import {
  BackHandler,
  StyleSheet,
  Text,
} from 'react-native'
import { style } from "../../../components/src/CustomFonts";

// Customizable Area End

export const configJSON = require("./config");
export interface Props {
  // Customizable Area Start
  navigation: any;
  id: string;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  firstName: any;
  lastName: any;
  email: any;
  phoneNumber: any;
  currentCountryCode: any;
  data: any[];
  passwordHelperText: string;
  enablePasswordField: boolean;
  enableReTypePasswordField: boolean;
  enableNewPasswordField: boolean;
  edtEmailEnabled: boolean;
  llDoChangePwdContainerVisible: boolean;
  llChangePwdDummyShowContainerVisible: boolean;
  currentPasswordText: any;
  newPasswordText: any;
  reTypePasswordText: any;
  edtMobileNoEnabled: boolean;
  countryCodeEnabled: boolean;
  saveButtonDisable: boolean;
  addName: any;
  activeGender: any;
  intrestedGender: any;
  month: any;
  date: any;
  year: any;
  selectedValues1: any;
  noPreference1: any;
  selectedValues2: any;
  noPreference2: any;
  question_id1: any;
  question_id2: any;
  token: any
  isvalidAddName: boolean;
  showDatePicker: boolean;
  selectedDate: any,
  dateTime: any
  showPicker: boolean
  isLoading: boolean
  identifyYourSelfId: any
  currentAns: any;
  myansswer: any;
  count: number;
  currentQuestion: any;
  firstNameError: string;
  dateofbirth: any;
  userName: any;
  usernameError: string;
  userNameFocus: boolean;
  mySelfFocus: boolean;
  resData: any;


  // Customizable Area End

}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class IdentifyYourSelfController extends BlockComponent<
  Props,
  S,
  SS
> {

  // Customizable Area Start
  labelFirstName: string;
  lastName: string;
  labelArea: string;
  labelMobile: string;
  labelEmail: string;
  labelCurrentPassword: string;
  labelNewPassword: string;
  labelRePassword: string;
  btnTextCancelPasswordChange: string;
  btnTextSaveChanges: string;
  labelHeader: any;
  btnTextChangePassword: string;

  arrayholder: any[];
  passwordReg: RegExp;
  userNameReg: RegExp;
  firstNameReg: RegExp;

  apiCallMessageUpdateProfileRequestId: any;
  indendtifyApiCallId: string = "";
  apiChangePhoneValidation: any;
  registrationAndLoginType: string = "";
  authToken: any;
  updateSelfidentityCallID: any
  userIdentificationProfileID: any;
  getIdentifySelf: any;
  updateIdentifySelf: any;
  userAttr: any;

  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      // getName(MessageEnum.SessionResponseMessage),
      // getName(MessageEnum.CountryCodeMessage)
    ];

    this.state = {
      isvalidAddName: true,
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      currentCountryCode: configJSON.hintCountryCode,
      data: [],
      passwordHelperText: "",
      enablePasswordField: true,
      enableReTypePasswordField: true,
      enableNewPasswordField: true,

      edtEmailEnabled: true,
      llDoChangePwdContainerVisible: false,
      llChangePwdDummyShowContainerVisible: false,

      currentPasswordText: "",
      newPasswordText: "",
      reTypePasswordText: "",

      edtMobileNoEnabled: true,
      countryCodeEnabled: true,
      saveButtonDisable: false,
      addName: '',
      activeGender: [],
      intrestedGender: [],
      month: '',
      date: '',
      year: '',
      selectedValues1: [],
      noPreference1: false,
      selectedValues2: [],
      noPreference2: false,
      question_id1: [],
      question_id2: [],
      token: {},
      showDatePicker: false,
      selectedDate: new Date(),
      dateTime: new Date(),
      showPicker: false,
      isLoading: false,
      identifyYourSelfId: [],
      currentAns: [],
      myansswer: [],
      count: 0,
      currentQuestion: {},
      firstNameError: '',
      dateofbirth: '',
      userName: '',
      usernameError: '',
      userNameFocus: false,
      mySelfFocus: false,
      resData: {},
    };

    this.arrayholder = [];
    this.firstNameReg = new RegExp(/^[a-zA-Z ]+$/);
    this.userNameReg = new RegExp( /^(?=.*[a-zA-Z])([a-zA-Z0-9]{3,20})$/);
    this.labelArea = configJSON.labelArea;
    this.labelMobile = configJSON.labelMobile;
    this.labelEmail = configJSON.labelEmail;
    this.labelFirstName = configJSON.labelFirstName;
    this.lastName = configJSON.lastName;
    this.labelCurrentPassword = configJSON.labelCurrentPassword;
    this.btnTextSaveChanges = configJSON.btnTextSaveChanges;
    this.labelHeader = configJSON.labelHeader;
    this.btnTextChangePassword = configJSON.btnTextChangePassword;
    this.labelNewPassword = configJSON.labelNewPassword;
    this.labelRePassword = configJSON.labelRePassword;
    this.btnTextCancelPasswordChange = configJSON.btnTextCancelPasswordChange;
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

      if (responseJson && !responseJson.errors) {
        if (apiRequestCallId === this.indendtifyApiCallId) {
          console.log('respnseJfgcbnvb', responseJson)
          this.setState({ resData: responseJson?.data?.attributes })
          await setStorageData('IdentifyUrSelf', JSON.stringify('true'))
          return this.props.navigation.navigate('IdentifyScreen1')
        } else if (apiRequestCallId === this.getIdentifySelf) {
          console.log("responseJson@@@@@@@@@@@@@", responseJson)
          this.setState({ identifyYourSelfId: responseJson, currentQuestion: responseJson[0] })
          this.setState({ isLoading: false, })
        } else if (apiRequestCallId === this.updateSelfidentityCallID) {
          console.log("responseJson@@@@@@@@@@@@@", responseJson)
          await setStorageData('IdentifyUrSelf2', JSON.stringify('true'))
          this.props.navigation.navigate('PhoneNumberInput');
          this.setState({ isLoading: false })
        } else if (apiRequestCallId === this.updateIdentifySelf) {
          console.log("@@@@@@@@@responseJson", JSON.stringify(responseJson))
          this.onSelectedAns(responseJson)
        } else if (apiRequestCallId === this.userIdentificationProfileID) {
          this.props.navigation.navigate('UserProfileBasicBlockNew');
          this.setState({ isLoading: false })
        }
      } else if (responseJson?.errors) {
        CutomAlertFail(responseJson?.errors[0]?.message)
        console.log("<<<responseJson", responseJson?.errors)
        this.setState({ isLoading: false })
      }
    }

    // Customizable Area End
  }

  async componentDidMount() {
    await this.onClickContinue()
    await this.getData()
  }
  async componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  async componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
    this.props.navigation.navigate("EmailAccountLoginBlock")
    return true;
  }
  onSelectedAns(responseJson) {
    let curr = responseJson?.data != '' && responseJson?.data[0]?.attributes
    let qid = curr?.questions?.id
    let noPreff = false;
    console.log("curr.correct_answer@@", curr.correct_answer)
    const result1 = curr.correct_answer.map((item: any, index: any) => {
      console.log("item@@@", item)
      if (item.includes('No Preference')) {
        noPreff = true
      }
      return { "id": qid, "option": item }
    });
    this.setState({
      identifyYourSelfId: responseJson?.data,
      currentQuestion: curr, currentAns: result1, noPreference1: noPreff, isLoading: false,
    })

  }
  getData = async () => {
    try {
      const valueEmailToken: any = await getStorageData('accessToken')

      const data1 = await getStorageData('user_name')

      if (data1) {
        this.setState({ addName: JSON.parse(data1) })
      }

      if (valueEmailToken !== null) {
        // value previously stored
        this.setState({ token: valueEmailToken })
      }
    } catch (e) {
      // error reading value
    }
  }
  handleYourSelf = (value: any) => {
    let initialValues = [...this.state.activeGender];

    if (initialValues?.includes(value)) {
      let newValues = initialValues?.filter((ele: any) => ele != value)
      return this.setState({ activeGender: newValues })
    } else {
      return this.setState({ activeGender: [value] })
    }
  }
  onItemClick(item: any, itmLength: any) {
    if (item) {
      return style.black
    }
    else {
      if (itmLength) {
        return style.black
      } else {
        return style.bColor;

      }
    }
  }
  handleIntrestedGender = (value: any) => {
    let initialValues = [...this.state.intrestedGender];

    if (initialValues?.includes(value)) {
      let newValues = initialValues?.filter((ele: any) => ele != value)
      return this.setState({ intrestedGender: newValues })
    } else {
      return this.setState({ intrestedGender: [value] })
    }
  }
  callUpdateidentifyApi = async () => {
    const resToken = await getStorageData('token');
    const header = {
      "Content-Type": configJSON.contenttypeApiValidateMobileNo,
      token: resToken
    };

    let temp = this.state.myansswer
    let ansIdetify: any = []
    temp.map((p: any) => {
      if (p.correct_answer && p.correct_answer != '') {
        ansIdetify.push({ "correct_answer": p.correct_answer, "question_id": p.question_id })
      }
      else ansIdetify.push({ "correct_answer": ['No Preference'], "question_id": p.question_id })
    });
    const httpBody = {
      "data":
      {
        "attributes": {
          "answers": ansIdetify
        }
      }
    }

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.userIdentificationProfileID = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      '/account_block/accounts/user_identification_for_profile'
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
      'POST'
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  callidentifyApi = async () => {
    const resToken = await getStorageData('token');
    const header = {
      "Content-Type": configJSON.contenttypeApiValidateMobileNo,
      token: resToken
    };

    let temp = this.state.myansswer
    let ansIdetify: any = []
    let temp1 = temp.map((p: any) => {
      if (p.correct_answer && p.correct_answer != '') {
        ansIdetify.push({ "question_id": p.question_id, "correct_answer": p.correct_answer })
      }
      else ansIdetify.push({ "question_id": p.question_id, "correct_answer": ['No Preference'] })
    });
    console.log("ansIdetify", temp1)
    const httpBody = {
      "data":
      {
        "attributes": {
          "answers": ansIdetify
        }
      }
    }

    console.log("httpBody@@@@@@", JSON.stringify(httpBody))
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.updateSelfidentityCallID = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      'account_block/accounts/user_identification'
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
      'POST'
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }
  onCheckCount (){
    if(this.state.count+1==2){
    return <Text style={styles.IdentifySubText1}>Don't Know about your primary love languages? {'\n'} Just choose your top 3.</Text>
    }else{
     return null
    }
  }

  // Customizable Area Start
  callIdentifyYourSelfApi = async () => {

    const resToken = await getStorageData('token');
    if (!this.state.addName || !!this.state.firstNameError) {
      this.onBlurName();
      return false;
    }
    if (!this.state.userName || !!this.state.usernameError) {
      this.hanldeUserName();
      return false;
    }
    if (this.state.activeGender.length < 1) {
      showMessage({ message: "Please select gender", type: "none", });
      return false;
    }

    if (this.state.date?.length < 1) {
      showMessage({ message: "Please select age", type: "none", });
      return false;
    }

    let age = this.validateAge(this.state.date + '/' + this.state.month + '/' + this.state.year)

    if (age < 18) {
      showMessage({ message: "Age is less than 18", type: "none", });
      return false;
    }

    if (this.state.intrestedGender.length < 1) {
      showMessage({ message: "Please select intrested gender", type: "none", });
      return false;
    }
    const inputDate = this.state.dateofbirth;
    const parts = inputDate.split("-");
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    console.log("formattedDate", formattedDate)
    console.log("date_of_birth", this.state.resData?.date_of_birth)
    console.log("this.state.resData", this.state.resData)

    if (
      this.state.addName == this.state.resData?.full_name &&
      this.state.userName == this.state.resData?.user_name &&
      this.state.activeGender[0] == this.state.resData?.gender &&
      formattedDate == this.state.resData?.date_of_birth &&
      this.state.intrestedGender[0] == this.state.resData?.interest
    ) {
      return this.props.navigation.navigate('IdentifyScreen1')
    }

    const headers = {
      "Content-Type": 'application/json',
      token: resToken,
    };

  

    const httpBody = {
      "data":
      {
        "attributes": {
          "full_name": this.state.addName,
          "gender": this.state.activeGender[0],
          "date_of_birth": this.state.dateofbirth,
          "interest": this.state.intrestedGender[0],
        }
      }
    };

    if (this.state.userName !== this.state.resData?.user_name) {
      httpBody.data.attributes.user_name = this.state.userName
    }

    console.log("httpBody@@@@@@@@", httpBody)
    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.indendtifyApiCallId = getValidationsMsg.messageId;

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      'account_block/accounts/myself'
    );

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      'POST'
    );
    runEngine.sendMessage(getValidationsMsg.id, getValidationsMsg);
  }

  handleCheckOptions = (val: any) => {
    let temp = this.state.noPreference1 ? [] : this.state.currentAns
    let curr = { option: val }

    if (temp && temp != '') {
      console.log("fistTime")
      const index = temp.findIndex(item => item.option === val);
      console.log("index", index)
      if (index >= 0) {
        temp.splice(index, 1);

      } else {
        temp.push(curr)

      }
    }
    else {
      console.log("secondtime")
      temp = [curr]
    }
    this.setState({
      currentAns: temp, noPreference1: false
    })

  }
  priousUpdateFunction = (currentAns: any) => {
    console.log("cudgvwvh", currentAns)
    let temp = this.state.count - 1;

    let qid = this.state.identifyYourSelfId[temp]?.attributes?.questions?.id

    if (this.state.identifyYourSelfId?.length && temp < this.state.identifyYourSelfId?.length) {
      this.setState({ currentQuestion: this.state.identifyYourSelfId[temp].attributes, count: temp, })

      this.state.myansswer.map(a => {
        if (a.question_id == qid) {
          let result1 = a.correct_answer.map((item: any, index: any) => { return { "id": JSON.stringify(index + 1), "option": item } });
          console.log("result1", result1)
          this.setState({ currentAns: result1, noPreference1: this.getNoPreference(result1) })
        }
        console.log("vVaishali", a.question_id, qid)
      })

    }

  }
  priousFunction = (currentAns: any) => {
    let temp = this.state.count - 1;
    let qid = this.state.identifyYourSelfId[temp]?.id

    if (this.state.identifyYourSelfId?.length && temp < this.state.identifyYourSelfId?.length) {
      this.setState({ currentQuestion: this.state.identifyYourSelfId[temp], count: temp, })
      this.state.myansswer.map(a => {
        if (a.question_id == qid) {
          let result1 = a.correct_answer.map((item: any, index: any) => { return { "id": JSON.stringify(index + 1), "option": item } });
          console.log("result1", result1)
          this.setState({ currentAns: result1, noPreference1: this.getNoPreference(result1) })
        }
      })
    }

  }
  getNoPreference = (result1: any) => {
    if (result1 && result1 != '' && result1?.length >= 0) return false;
    return true;
  }
  countFunctionUpdateIdentify = () => {
    if (this.state.currentAns.length < 1 && !this.state.noPreference1) {
      showMessage({ message: "Please select any one option", type: "none", });
      return false;
    }
    else {
      let qid = this.state.identifyYourSelfId[this.state.count]?.attributes?.questions?.id
      let temp = this.state.count + 1;
      let result = this.state.currentAns.map(a => a.option);

      let ans = this.state.myansswer
      console.log("ansData@@", ans)
      const findInd = ans.findIndex(p => p.question_id == qid)
      if (findInd >= 0) {
        ans.splice(findInd, 1)
      }
      let answerData = { question_id: qid, correct_answer: this.state.noPreference1 ? [] : result }
      ans = this.setAnsvalue(answerData, ans)
      let nextQid = this.state.identifyYourSelfId[temp]?.id
      const existNext_qid = ans.some(el => el.question_id === nextQid);
      let result1: any = this.getResult1(existNext_qid, nextQid)
      console.log(result1)
      if (this.state.identifyYourSelfId?.length && temp < this.state.identifyYourSelfId?.length) {
        let curr = this.state.identifyYourSelfId[temp].attributes
        let qid = curr?.questions?.id
        let noPreff = false;
        console.log("curr.correct_answer@@", curr.correct_answer)
        const result1 = curr.correct_answer.map((item: any, index: any) => {
          console.log("item@@@", item)
          if (item.includes('No Preference')) {
            noPreff = true
          }
          return { "id": qid, "option": item }
        });

        this.setState({
          currentQuestion: curr,
          // currentAns: result1,
          noPreference1: noPreff,
          currentAns: result1,
          // currentAns: result1,
          myansswer: ans, count: temp,
        })

      } else {
        this.callUpdateidentifyApi()

      }

    }
  }

  setAnsvalue = (answerData, value) => {
    let ans = value;
    if (this.state.myansswer && this.state.myansswer != '') {
      ans.push(answerData)
      return ans
    }
    else {
      ans = [answerData]
      return ans
    }
  }

  getResult1 = (existNext_qid, nextQid) => {
    let result1 = []
    if (existNext_qid) {
      this.state.myansswer.map((item: any, index: any) => {
        if (item.question_id === nextQid) {
          let data = item.correct_answer
          result1 = data.map((item: any, index: any) => {
            return { "option": item }
          });

        }
      })
    }
    return result1
  }

  countFunction = () => {
    if (this.state.currentAns.length < 1 && !this.state.noPreference1) {
      showMessage({ message: "Please select any one option", type: "none", });
      return false;
    }
    else {
      let qid = this.state.identifyYourSelfId[this.state.count]?.id
      let temp = this.state.count + 1;
      let result = this.state.currentAns.map(a => a.option);
      let ans = this.state.myansswer
      console.log("ansData@@", ans)
      const findInd = ans.findIndex(p => p.question_id == qid)
      if (findInd >= 0) {
        ans.splice(findInd, 1)
      }
      let answerData = { question_id: qid, correct_answer: this.state.noPreference1 ? [] : result }
      ans = this.setAnsvalue(answerData, ans)
      let nextQid = this.state.identifyYourSelfId[temp]?.id
      const existNext_qid = ans.some(el => el.question_id === nextQid);
      let result1: any = this.getResult1(existNext_qid, nextQid);
      if (this.state.identifyYourSelfId?.length && temp < this.state.identifyYourSelfId?.length) {
        this.setState({
          currentQuestion: this.state.identifyYourSelfId[temp], currentAns: existNext_qid ? result1 : [],
          myansswer: ans, count: temp,
          noPreference1: false
        })

        console.log("count:::", temp, this.state.identifyYourSelfId?.length)
      } else {
        this.callidentifyApi()
      }

    }
  }
  handleNoPreference1 = () => {

    this.setState({ currentAns: [] })
    this.setState({ noPreference1: !this.state.noPreference1 })

  }

  validateAge = (dateOfBirth: any) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }
  isValidFirstName(firstName: string) {
    return this.firstNameReg.test(firstName);
  }
  changeAddName = (text: any) => {
    this.setState({ addName: text, firstNameError: '' });
  }

  changeState = (value: any) => {
    this.setState({ userName: value.trim(), usernameError: '' });

  }

  onBlurName = () => {
    this.setState({ mySelfFocus: false });
    if (this.state.addName.trim().length == 0) {
      return this.setState({ firstNameError: configJSON.plsEnterName });
    } else if (this.state.addName.length < 3) {
      return this.setState({
        firstNameError: configJSON.errorFirstNameMoreThanThreeCharacters,
      });
    } else if (this.state.addName.length > 40) {
      return this.setState({
        firstNameError: configJSON.errorFirstNameLessThanFourtyCharacters,
      });
    } else if (!this.isValidFirstName(this.state.addName.trim())) {
      return this.setState({
        firstNameError: configJSON.errorFirstNameNotValid,
      });
    } else {
      this.setState({ firstNameError: "" });
    }
  }
  isValidUserName(userName: string) {
    return this.userNameReg.test(userName);
  }
  hanldeUserName() {
    if (this.state.userName.trim().length == 0) {
      return this.setState({ usernameError: configJSON.plsEnterUserName });
    } else if (this.state.userName.length < 3) {
      return this.setState({
        usernameError: configJSON.erroruserFirstNameMoreThanThreeCharacters,
      });
    } else if (!this.isValidUserName(this.state.userName.trim())) {
      return this.setState({
        usernameError: configJSON.errorUserFirstNameNotValid,
      });
    }
    else {
      this.setState({ usernameError: "" });
    }
  }

  onFocusUserName = () => {
    this.setState({ userNameFocus: true, usernameError: '' });

  }

  onBlurUserName = () => {
    this.hanldeUserName();
    this.setState({ userNameFocus: false });
  }


  onFocusName = () => {
    this.setState({ firstNameError: "", mySelfFocus: true });
  }
  // Customizable Area Start

  async UpdateUserIdentifyYourSelf() {
    const res = await getStorageData('token');

    this.setState({ isLoading: true })
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.updateIdentifySelf = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "account_block/accounts/identify_yourself_for_profile"
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
  async onClickContinue() {
    const res = await getStorageData('token');

    this.setState({ isLoading: true })
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getIdentifySelf = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "account_block/accounts/identify_yourself"
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

  getCurrentAns = (type: string) => {
    const get1 = this.state.currentAns.findIndex(
      (p) => p.option == this.state.currentQuestion.option1
    );
    const get2 = this.state.currentAns.findIndex(
      (p) => p.option == this.state.currentQuestion.option2
    );
    const get3 = this.state.currentAns.findIndex(
      (p) => p.option == this.state.currentQuestion.option3
    );
    const get4 = this.state.currentAns.findIndex(
      (p) => p.option == this.state.currentQuestion.option4
    );
    switch (type) {
      case "get1":
        return get1 >= 0 ? get1 + 1 : ""
      case "get2":
        return get2 >= 0 ? get2 + 1 : ""
      case "get3":
        return get3 >= 0 ? get3 + 1 : ""
      case "get4":
        return get4 >= 0 ? get4 + 1 : ""
      default:
        break;
    }
  }

  getColor = (value) => {
    if (value) {
      return style.black
    } else {
      return style.gray
    }
  }

  // Customizable Area End
}

const styles = StyleSheet.create({

  IdentifySubText1: {
    position: 'relative',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
    color: 'grey',
    fontFamily: 'DMSans-Regular',
  },
});