import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import EmailOTPInput from "../../src/EmailOTPInput"
const navigation = require("react-navigation")

const screenProps = {
  navigation: { state: { params: { signup: true } }  ,goBack:jest.fn()},
  id: "EmailOTPInput"
}

const screenPropsFalse = {
  navigation: { state: { params: { signup: false } },goBack:jest.fn()},
  id: "EmailOTPInputf"
}

const feature = loadFeature('./__tests__/features/EmailOTPInput-scenario.feature');

defineFeature(feature, (test) => {


  beforeEach(() => {
    jest.resetModules();
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
  });

  test('User navigates to EmailOTPInput', ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: EmailOTPInput;

    let exampleBlockWithProps: ShallowWrapper;
    let instanceWithProps: EmailOTPInput;

    given('I am a User loading EmailOTPInput', () => {
      exampleBlockA = shallow(<EmailOTPInput {...screenProps} />);
      exampleBlockWithProps = shallow(<EmailOTPInput {...screenPropsFalse} />);
      
    });

    when('I navigate to the EmailOTPInput', () => {
      instance = exampleBlockA.instance() as EmailOTPInput
      instanceWithProps = exampleBlockWithProps.instance() as EmailOTPInput
    });

    then('EmailOTPInput will load with out errors', () => {
      expect(exampleBlockA).toBeTruthy();
   
    });

    then('I press submit button with empty otp', () => {
      let textInputComponent1 = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnSubmitOTP');
      textInputComponent1.simulate('press',);
    });

    then('I press submit with signUp true props', () => {

        let textInputComponent1 = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnSubmitOTP');
         textInputComponent1.simulate('press',);
    });

    then('I can call signUpEmailOtpCallId with undefined', () => {
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
      //instance.signUpEmailOtpCallId = magLogInSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
    });

    then('I can enter text with out errors', () => {
      let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'Background');
      textInputComponent.simulate('press',);

      let textInputComponent2 = exampleBlockA.findWhere((node) => node.prop('testID') === 'resendOTP');
      textInputComponent2.simulate('press',);

      let textInputComponent3 = exampleBlockA.findWhere((node) => node.prop('testID') === 'focusNext');
      textInputComponent3.simulate('press');

      let textInputComponent1 = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnSubmitOTP');
      textInputComponent1.simulate('press',);

    });

    then('I can call addAdditionalDetailApiCallId with out errors', () => {
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
          "data": [
            {

            },
          ]
        }
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        magLogInSucessRestAPI.messageId
      );
      instance.addAdditionalDetailApiCallId = magLogInSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
    });

    then('I can call emailOtpApiCallId with out errors', () => {
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
          "data": [
            {

            },
          ]
        }
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        magLogInSucessRestAPI.messageId
      );
      instance.emailOtpApiCallId = magLogInSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
    });

    then('I can call signUpEmailOtpCallId with errors', () => {
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
          "errors": [
            {

            },
          ]
        }
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        magLogInSucessRestAPI.messageId
      );
      instance.signUpEmailOtpCallId = magLogInSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
    });


    then('I can call signUpEmailOtpCallId with out errors', () => {
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
          "data": [
            {

            },
          ]
        }
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        magLogInSucessRestAPI.messageId
      );
      instance.signUpEmailOtpCallId = magLogInSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
    });



    // then('I can leave the screen with out errors', () => {
     
    //   let textInputComponent1 = exampleBlockWithProps.findWhere((node) => node.prop('testID') === 'goBack');
    //   textInputComponent1.simulate('press',);

    //   let textInputComponent = exampleBlockWithProps.findWhere((node) => node.prop('testID') === 'btnSubmitOTP');
    //   textInputComponent.simulate('press',);

    //   expect(exampleBlockA).toBeTruthy();

    // });
  });

  test('User navigates to EmailOTPInputWithFalse', ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: EmailOTPInput;

    let exampleBlockWithProps: ShallowWrapper;
    let instanceWithProps: EmailOTPInput;

    given('I am a User loading EmailOTPInputFalse', () => {
      exampleBlockWithProps = shallow(<EmailOTPInput {...screenPropsFalse} />);
      
    });

    when('I navigate to the EmailOTPInputFalse', () => {
      instanceWithProps = exampleBlockWithProps.instance() as EmailOTPInput
    });

    then('EmailOTPInput will load with out errorsFalse', () => {
      expect(exampleBlockWithProps).toBeTruthy();
   
    });


    then('I can leave the screen with out errorsFalse', () => {
     
      let textInputComponent1 = exampleBlockWithProps.findWhere((node) => node.prop('testID') === 'goBack');
      textInputComponent1.simulate('press',);

      let textInputComponent = exampleBlockWithProps.findWhere((node) => node.prop('testID') === 'btnSubmitOTP');
      textInputComponent.simulate('press',);

      expect(exampleBlockWithProps).toBeTruthy();

    });
  });

});
