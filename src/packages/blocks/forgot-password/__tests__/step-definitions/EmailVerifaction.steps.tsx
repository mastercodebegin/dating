import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import EmailVerifaction from "../../src/EmailVerifaction"
const navigation = require("react-navigation")

const screenProps = {
    navigation: {state:{param:{signup:false}}},
    id: "EmailVerifaction"
  }

const feature = loadFeature('./__tests__/features/EmailVerifaction-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to EmailVerifaction', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:EmailVerifaction; 

        given('I am a User loading EmailVerifaction', () => {
            exampleBlockA = shallow(<EmailVerifaction {...screenProps}/>);
        });

        when('I navigate to the EmailVerifaction', () => {
             instance = exampleBlockA.instance() as EmailVerifaction
        });

        then('EmailVerifaction will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });

    

        then('I can enter text with out errors', () => {
             let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'Background');
             textInputComponent.simulate('press',);

            //   let textInputComponent1 = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnSubmitOTP');
            //   textInputComponent1.simulate('press',);

            //  let textInputComponent2 = exampleBlockA.findWhere((node) => node.prop('testID') === 'resendOTP');
            //  textInputComponent2.simulate('press',);

             let textInputComponent3 = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInputEmail');
              textInputComponent3.simulate('changeText','1234');

             let textInputComponent4 = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInputEmail');
              textInputComponent4.simulate('blur','po');
        });

        then('I can enter email out errors', () => {
          
          
          let textInputComponent3 = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInputEmail');
          textInputComponent3.simulate('changeText','');
          
          let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnSignUp');
          textInputComponent.simulate('press',);

          // let textInputComponent4 = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInputEmail');
          //  textInputComponent4.simulate('blur','po');
     });

       


        then('I can call emailVerificationApi with out errors', () => {
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
            instance.resetApiCallId = magLogInSucessRestAPI.messageId;
            runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
      });


        then('I can call emailVerificationApi with errors', () => {
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
              instance.resetApiCallId = magLogInSucessRestAPI.messageId;
              runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
        });

      
    

        then('I can leave the screen with out errors', () => {
          let textInputComponent3 = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInputEmail');
          textInputComponent3.simulate('changeText','amir@gmail.com');

          textInputComponent3.simulate('focus',);
          
          let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnSignUp');
          textInputComponent.simulate('press',);

            expect(exampleBlockA).toBeTruthy();
        });
    });


});
