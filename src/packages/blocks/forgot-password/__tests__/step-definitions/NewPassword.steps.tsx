import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import NewPassword from "../../src/NewPassword"
const navigation = require("react-navigation")

const screenProps = {
  navigation: { state: { param: { signup: false } } },
  id: "NewPassword"
}

const feature = loadFeature('./__tests__/features/NewPassword-scenario.feature');

defineFeature(feature, (test) => {


  beforeEach(() => {
    jest.resetModules();
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
  });

  test('User navigates to NewPassword', ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: NewPassword;

    //Then NewPassword will load with out errors
    //And I can enter text with out errors
    //And I can call emailVerificationApi with errors
    //And I can call emailVerificationApi with out errors
    //And I can leave the screen with out errors"

    given('I am a User loading NewPassword', () => {
      exampleBlockA = shallow(<NewPassword {...screenProps} />);
    });

    when('I navigate to the NewPassword', () => {
      instance = exampleBlockA.instance() as NewPassword
    });

    then('NewPassword will load with out errors', () => {
      expect(exampleBlockA).toBeTruthy();
    });

    then('I can call api with errors', () => {
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
          'data': undefined
        }
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        magLogInSucessRestAPI.messageId
      );
      instance.validationAPICallId = magLogInSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
    });

    then("api will return success", () => {
      const msgLogInSucessRestAPI = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
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
      instance.validationAPICallId = msgLogInSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLogInSucessRestAPI);
    })

    then('I can enter text with out errors', () => {
      instance.setState({ accountStatus: 'ChangePassword' })
      let textInputComponent = exampleBlockA
        .find("Formik")
        .dive()
        .findWhere((node) => node.prop("testID") === "txtInputPassword");
      textInputComponent.simulate("change", "password");
      textInputComponent.simulate("blur", "password");

      let passwordShowHide = exampleBlockA
        .find("Formik")
        .dive()
        .findWhere((node) => node.prop("testID") === "passwordShowHide");
      passwordShowHide.simulate("press");


      let txtInputConfirmPassword = exampleBlockA
        .find("Formik")
        .dive()
        .findWhere((node) => node.prop("testID") === "txtInputConfirmPassword");
      txtInputConfirmPassword.simulate("change", "password");
      txtInputConfirmPassword.simulate("blur", "password");


      let btnConfirmPasswordShowHide = exampleBlockA
        .find("Formik")
        .dive()
        .findWhere((node) => node.prop("testID") === "btnConfirmPasswordShowHide");
      btnConfirmPasswordShowHide.simulate("press");
    });

    then('I can leave the screen with out errors', () => {
      instance.setState({ accountStatus: 'Confirmation' })
      let textInputComponent = exampleBlockA.findWhere((node) => node.prop("testID") === "goToHomeButton");
      textInputComponent.simulate("press");
      expect(exampleBlockA).toBeTruthy();
    });
  });


});
