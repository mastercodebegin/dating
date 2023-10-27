import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import ForgotPasswordOTP from "../../src/ForgotPasswordOTP"
const navigation = require("react-navigation")

const screenProps = {
    navigation: {state:{param:{signup:false}}},
    id: "ForgotPasswordOTP"
  }

const feature = loadFeature('./__tests__/features/ForgotPasswordOTP-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to ForgotPasswordOTP', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:ForgotPasswordOTP; 
     
        //Then ForgotPasswordOTP will load with out errors
        //And I can enter text with out errors
        //And I can call emailVerificationApi with errors
        //And I can call emailVerificationApi with out errors
        //And I can leave the screen with out errors"

        given('I am a User loading ForgotPasswordOTP', () => {
            exampleBlockA = shallow(<ForgotPasswordOTP {...screenProps}/>);
        });

        when('I navigate to the ForgotPasswordOTP', () => {
             instance = exampleBlockA.instance() as ForgotPasswordOTP
        });

        then('ForgotPasswordOTP will load with out errors', () => {
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
                  'data':undefined
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
            //  let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'Background');
            //  textInputComponent.simulate('press',);

              // let textInputComponent1 = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnSubmitOTP');
              // textInputComponent1.simulate('press',);

             let textInputComponent2 = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnSubmitOTP');
             textInputComponent2.simulate('press',);

             let textInputComponent3 = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtMobilePhoneOTP');
             textInputComponent3.simulate('changeText','1234');
        });

        then('I can leave the screen with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
