import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import LocationAccess from "../../src/LocationAccess"
const navigation = require("react-navigation")

const screenProps = {
    navigation: {navigate:jest.fn()},
    id: "LocationAccess",
     
  }

const feature = loadFeature('./__tests__/features/LocationAccess-scenario.feature');



jest.mock(
  "react-native//Libraries/PermissionsAndroid/PermissionsAndroid",
  () => {
    const PermissionsAndroid = jest.requireActual(
      "react-native//Libraries/PermissionsAndroid/PermissionsAndroid"
    );

return {
  PermissionsAndroid,
  check: jest.fn(() => Promise.resolve(true)),
  request: jest
    .fn()
    .mockImplementationOnce(() => Promise.resolve("denied"))
    .mockImplementation(() => Promise.resolve("granted"))
};
  }
);

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to LocationAccess', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:LocationAccess; 

        given('I am a User loading LocationAccess', () => {
            exampleBlockA = shallow(<LocationAccess {...screenProps}/>);
        });

        when('I navigate to the LocationAccess', () => {
             instance = exampleBlockA.instance() as LocationAccess
        });

        then('LocationAccess will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can enter text with out errors', () => {
            // let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInput');
            // textInputComponent.simulate('changeText', 'hello@aol.com');
        });

        then('I can select the button with with out errors', () => {

            let buttonComponent1 = exampleBlockA.findWhere((node) => node.prop('testID') === 'fetchLocation');
            buttonComponent1.simulate('press');

        });
        then('I can check addlocation Api with errors', () => {

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
            instance.locationAddCallId = magLogInSucessRestAPI.messageId;
            runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
          });

        then('I can check addlocation Api with out errors', () => {

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
            instance.locationAddCallId = magLogInSucessRestAPI.messageId;
            runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
          });

        then('I can leave the screen with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
