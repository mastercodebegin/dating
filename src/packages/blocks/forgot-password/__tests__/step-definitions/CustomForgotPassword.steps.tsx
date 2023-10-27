jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');
import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import CustomForgotPassword from "../../src/CustomForgotPassword"
const navigation = require("react-navigation")

const screenProps = {
    navigation: {navigate:jest.fn()},
    id: "CustomForgotPassword"
  }

const feature = loadFeature('./__tests__/features/CustomForgotPassword-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.spyOn(global, 'setTimeout').mockImplementation((cb:any) => cb() );
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.resetModules();
    });

    test('User navigates to CustomForgotPassword', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:CustomForgotPassword; 
     
        //Then CustomForgotPassword will load with out errors
        //And I can enter text with out errors
        //And I can call emailVerificationApi with errors
        //And I can call emailVerificationApi with out errors
        //And I can leave the screen with out errors"

        given('I am a User loading CustomForgotPassword', () => {
            exampleBlockA = shallow(<CustomForgotPassword {...screenProps}/>);
        });

        when('I navigate to the CustomForgotPassword', () => {
             instance = exampleBlockA.instance() as CustomForgotPassword
        });

        then('CustomForgotPassword will load with out errors', () => {
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
              instance.changePasswordAppId = magLogInSucessRestAPI.messageId;
              runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
        });

        then('I can enter text with out errors', () => {
            //  let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'Background');
            //  textInputComponent.simulate('press',);

               let textInputComponent0 = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnSignUp');
               textInputComponent0.simulate('press',);

             let textInputComponent2 = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnPasswordShowHide');
             textInputComponent2.simulate('press',);

             let textInputComponent3 = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInputPassword');
             textInputComponent3.simulate('changeText','1234');
            
             let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInputConfirmPassword');
             textInputComponent.simulate('changeText','1234');

             let textInputComponent1 = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInputConfirmPassword');
             textInputComponent1.simulate('blur','1234');
            
             let textInputComponent4 = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInputPassword');
             textInputComponent4.simulate('blur','1234');
            
             let textInputComponent5 = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInputPassword');
             textInputComponent5.simulate('focus','1234');
             let textInputComponent01 = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnSignUp');
          textInputComponent01.simulate('press',);
        });

        then('I can check passwordError and confirmPasswordError', () => {
            
          let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInputPassword');
          textInputComponent.simulate('blur','');
          
          let textInputComponent0 = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnSignUp');
          textInputComponent0.simulate('press',);

      });

        then('I can check password and confirm password not match', () => {
            
            let textInputComponent3 = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInputPassword');
            textInputComponent3.simulate('changeText','1234');
            
            let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInputConfirmPassword');
            textInputComponent.simulate('changeText','12346');
            
            let textInputComponent0 = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnSignUp');
            textInputComponent0.simulate('press',);
            
          });
          
          then('I can leave the screen with out errors', () => {
            
            let textInputComponent0 = exampleBlockA.findWhere((node) => node.prop('testID') === 'loginTestID');
            textInputComponent0.simulate('press',);
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
