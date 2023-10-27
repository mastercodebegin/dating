import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import OTPInputWith from "../../src/OTPInputAuth"
const navigation = require("react-navigation")

const screenProps = {
  navigation: { state: { params: { signup: true } }  ,navigate:jest.fn(),goBack:jest.fn()},
  id: "OTPInputWith"
}


const feature = loadFeature('./__tests__/features/OTPInput-scenario.feature');

defineFeature(feature, (test) => {


  beforeEach(() => {
    jest.resetModules();
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
  });


  test('User navigates to OTPInputWith', ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: OTPInputWith;

  

    given('I am a User loading OTPInputWith', () => {
      exampleBlockA = shallow(<OTPInputWith {...screenProps} />);
      
    });

    when('I navigate to the OTPInputWith', () => {
      instance = exampleBlockA.instance() as OTPInputWith
    });

    then('OTPInputWith will load with out errors', () => {
      let textInputComponent3 = exampleBlockA.findWhere((node) => node.prop('testID') === 'submitOtp');
      textInputComponent3.simulate('press',);
      expect(exampleBlockA).toBeTruthy();
   });

    then('I can check events', () => {
      
      let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'userNavigate');
      textInputComponent.simulate('press',);
      
      let textInputComponent2 = exampleBlockA.findWhere((node) => node.prop('testID') === 'textInput0');
      textInputComponent2.simulate('changeText','6576','0');
   
      
      let textInputComponent3 = exampleBlockA.findWhere((node) => node.prop('testID') === 'submitOtp');
      textInputComponent3.simulate('press',);
      // expect(exampleBlockA).toBeTruthy();
      let textInputComponent1 = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnSubmitOTP');
      textInputComponent1.simulate('press',);
   });

    then('I can check Api with errors', () => {

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
      instance.otpAuthApiCallId = magLogInSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
    });

    then('I can check Api with out errors', () => {

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
      instance.otpAuthApiCallId = magLogInSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
    });



    then('I can leave the screen with out errors', () => {
     
   
      let textInputComponent2 = exampleBlockA.findWhere((node) => node.prop('testID') === 'textInput0');
       textInputComponent2.simulate('changeText','');

       let textInputComponent4 = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnSubmitOTPProps');
       textInputComponent4.simulate('press',);

       
      let textInputComponent3 = exampleBlockA.findWhere((node) => node.prop('testID') === 'submitOtp');
      textInputComponent3.simulate('press',);

    

      expect(exampleBlockA).toBeTruthy();

    });
  });

});
