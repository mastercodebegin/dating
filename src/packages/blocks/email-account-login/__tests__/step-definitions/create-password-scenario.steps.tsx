import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from 'framework/src/Helpers'
import {runEngine} from 'framework/src/RunEngine'
import {Message} from "framework/src/Message"

import MessageEnum, {getName} from "framework/src/Messages/MessageEnum"; 
import React from "react";
import EmailAccountLoginBlock from "../../src/EmailAccountLoginBlock"
import CreatePassword from "../../src/CreatePassword"

const navigation = require("react-navigation")



const screenProps = { 
  navigation: {
    navigate: jest.fn(), 
},
    id: "EmailAccountLoginBlock"
  }

const feature = loadFeature('./__tests__/features/create-password-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to Email Log In', ({ given, when, then }) => {
        let mobileAccountLogInWrapper:ShallowWrapper;
        let instance:CreatePassword; 

        given('I am a User attempting to Log In with a Email', () => {
            mobileAccountLogInWrapper = shallow(<CreatePassword {...screenProps}/>)
            // expect(mobileAccountLogInWrapper).toBeTruthy()  

            instance = mobileAccountLogInWrapper.instance()as CreatePassword;


        });

        when('I navigate to the Log In Screen', () => {
             instance = mobileAccountLogInWrapper.instance() as CreatePassword
        });
        
        then('I can select the back button with out errors', () => {
         
          let textInputComponent7 = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'goBackTestID');
          //textInputComponent7.simulate('press');
          
        });
        
        then('I can change the customInputBox with out errors', () => {
          let textInputComponent7 = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'custTextInputTestID');
          textInputComponent7.simulate('changeText','abc');
        });
        
        then('I can change the customInputBox two with out errors', () => {
          let textInputComponent7 = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'custTextInputTestID');
          textInputComponent7.simulate('changeText','');
          
          let textInputComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'custTextInputTwoTestID');
          textInputComponent.simulate('changeText','abc');
        });
        
        then('I can change the customInputBox two condition with out errors', () => {
          let textInputComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'custTextInputTwoTestID');
          textInputComponent.simulate('changeText','');
          
          let textInputComponent7 = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'custTextInputTestID');
          textInputComponent7.simulate('changeText','Fama@123');

        });
        
        then('I can select the submit button with out errors', () => {
          let textInputComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'contactusTestFunTestID');
          textInputComponent.simulate('press');
          
          let textInputComponent1 = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'custTextInputTwoTestID');
          textInputComponent1.simulate('changeText','Fama@123');
        });

        then('I can check the reset password api with out errors', () => {
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
              
                 
                   'meta': {
                    'token':'test',
                    
                  }
         
              
            }
          );
          magLogInSucessRestAPI.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            magLogInSucessRestAPI.messageId
            );
            instance.apiResetCallId = magLogInSucessRestAPI.messageId;
            runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
            
        });
        

      

});
 
});
