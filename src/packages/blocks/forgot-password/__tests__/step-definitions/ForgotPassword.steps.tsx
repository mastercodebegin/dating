import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Formik } from "formik";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import ForgotPassword from "../../src/ForgotPassword";
const navigation = require("react-navigation");

const screenProps = {
  navigation: { state: { param: { signup: false } } },
  id: "ForgotPassword"
};

const feature = loadFeature(
  "./__tests__/features/ForgotPassword-scenario.feature"
);

defineFeature(feature, test => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to ForgotPassword", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: ForgotPassword;

    given("I am a User loading ForgotPassword", () => {
      exampleBlockA = shallow(<ForgotPassword {...screenProps} />);
    });

    when("I navigate to the ForgotPassword", () => {
      instance = exampleBlockA.instance() as ForgotPassword;
    });

    then("ForgotPassword will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can call api with errors", () => {
      const magLogInSucessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        magLogInSucessRestAPI
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: undefined
        }
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        magLogInSucessRestAPI.messageId
      );
      instance.requestEmailOtpCallId = magLogInSucessRestAPI.messageId;
      instance.goToLogin()
      runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
    });

    then("I can call requestEmailOtpCallId api with out errors", () => {
      const msgLogInSucessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInSucessRestAPI.messageId
      );
      msgLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {

          data: {
            id: "31",
            type: "email_account",
            attributes: {
              name: "dsbjbcsd",
              email: "xyzdhd@djd.com",
              activated: true
            }
          },
          "meta": {
            "token": "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MzEsImV4cCI6MTY3MzUyNjQzNX0.XGphBFSBZa4PU0ep2Qw1oQGw_DQAPddkUuGb_m_WYVjiVQH1tjpvO10Ec9EPVKl5TvRJgdn_32IMoUJVxFxC-g"
          }
        }
      );
      instance.requestEmailOtpCallId = msgLogInSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLogInSucessRestAPI);

    });

    then("I can call api with out errors", () => {
      const msgLogInSucessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInSucessRestAPI.messageId
      );
      msgLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {

          data: {
            id: "31",
            type: "email_account",
            attributes: {
              name: "dsbjbcsd",
              email: "xyzdhd@djd.com",
              activated: true
            }
          },
          "meta": {
            "token": "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MzEsImV4cCI6MTY3MzUyNjQzNX0.XGphBFSBZa4PU0ep2Qw1oQGw_DQAPddkUuGb_m_WYVjiVQH1tjpvO10Ec9EPVKl5TvRJgdn_32IMoUJVxFxC-g"
          }
        }
      );
      instance.requestPhoneOtpCallId = msgLogInSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLogInSucessRestAPI);

    });

    then("I can leave the screen with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    then("Click on hide keyboard button", () => {
      // let hideButtonClick = exampleBlockA.findWhere(
      //   node => node.prop("testID") === "hideKeyboard"
      // );
      // hideButtonClick.simulate("press");
    });

    then("Click on forForgotEmail button", () => {
      let forForgotEmail = exampleBlockA.findWhere(
        node => node.prop("testID") === "startForgotPasswordButtonForForgotEmail"
      );
      forForgotEmail.simulate("press");

      let txtInputEmail = exampleBlockA
        .find("Formik")
        .dive()
        .findWhere((node) => node.prop("testID") === "txtInputEmail");
      txtInputEmail.simulate("change", "email");
      txtInputEmail.simulate("blur", "email");
      exampleBlockA.find(Formik).at(0).prop('onSubmit')({
        email: "5",
      }, { setSubmitting: jest.fn() })
    });

    then("Click on forgotPasswordSMS button", () => {
      const wrapper = shallow(<ForgotPassword {...screenProps} />)
      let forgotPasswordSMS = wrapper.findWhere(
        node => node.prop("testID") === "startForgotPasswordButtonForForgotPasswordSMS"
      );
      forgotPasswordSMS.simulate("press");

      let txtInputPhoneNumber = wrapper
        .find("Formik")
        .dive()
        .findWhere((node) => node.prop("testID") === "txtInputPhoneNumber");
      txtInputPhoneNumber.simulate("change", "phone");
      txtInputPhoneNumber.simulate("blur", "phone");
      wrapper.find(Formik).at(0).prop('onSubmit')({
        email: "5",
      }, { setSubmitting: jest.fn() })
    });

    then("EnterPhoneOTP and EnterEmailOTP", () => {
      instance.setState({ accountStatus: 'EnterPhoneOTP' })
      let txtInputOtpCode = exampleBlockA
        .find("Formik")
        .dive()
        .findWhere((node) => node.prop("testID") === "txtInputOtpCode");
      txtInputOtpCode.simulate("change", "otpCode");
      txtInputOtpCode.simulate("blur", "otpCode");
    });

    then("I can call requestPhoneOtpCallId api with out errors", () => {
      const msgLogInSucessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInSucessRestAPI.messageId
      );
      msgLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {

          data: {
            id: "31",
            type: "email_account",
            attributes: {
              name: "dsbjbcsd",
              email: "xyzdhd@djd.com",
              activated: true
            }
          },
          "meta": {
            "token": "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MzEsImV4cCI6MTY3MzUyNjQzNX0.XGphBFSBZa4PU0ep2Qw1oQGw_DQAPddkUuGb_m_WYVjiVQH1tjpvO10Ec9EPVKl5TvRJgdn_32IMoUJVxFxC-g"
          }
        }
      );
      instance.requestGoToConfirmationCallId = msgLogInSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLogInSucessRestAPI);

    });


    then("I can call requestChangePasswordCallId api with out errors", () => {
      const msgLogInSucessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInSucessRestAPI.messageId
      );
      msgLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {

          data: {
            id: "31",
            type: "email_account",
            attributes: {
              name: "dsbjbcsd",
              email: "xyzdhd@djd.com",
              activated: true
            }
          },
          "meta": {
            "token": "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MzEsImV4cCI6MTY3MzUyNjQzNX0.XGphBFSBZa4PU0ep2Qw1oQGw_DQAPddkUuGb_m_WYVjiVQH1tjpvO10Ec9EPVKl5TvRJgdn_32IMoUJVxFxC-g"
          }
        }
      );
      instance.requestChangePasswordCallId = msgLogInSucessRestAPI.messageId;
      instance.goToChangePasswordAfterOtp({ otpCode: '' })
      instance.goToConfirmationAfterPasswordChange({ password: '', confirmPassword: '' })
      runEngine.sendMessage("Unit Test", msgLogInSucessRestAPI);
    });

  });
});
