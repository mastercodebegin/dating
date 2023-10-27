import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import IpBlocker from "../../src/IpBlocker"
const navigation = require("react-navigation")


const screenProps = {
    navigation: navigation,
    id: "IpBlocker"
  }

const feature = loadFeature('./__tests__/features/IpBlocker-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to IpBlocker', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:IpBlocker; 

        given('I am a User loading IpBlocker', () => {
            exampleBlockA = shallow(<IpBlocker {...screenProps}/>);
        });

        when('I navigate to the IpBlocker', () => {
             instance = exampleBlockA.instance() as IpBlocker
        });

        then('IpBlocker will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });

        then('User get IP address from his device without errors', () => {
            const getIpAddressRequestMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
            instance.ipAddressApiCallID = getIpAddressRequestMessage.messageId;
            getIpAddressRequestMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getIpAddressRequestMessage.messageId);
            getIpAddressRequestMessage.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    "ip": "23.228.109.155"
                }
            );
            runEngine.sendMessage("Unit Test", getIpAddressRequestMessage);
            expect(instance.state.ipAddress).toEqual("23.228.109.155");
        });

        then('User get IP address from his device with errors', () => {
            const getIpAddressErrorRequestMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
            instance.ipAddressApiCallID = getIpAddressErrorRequestMessage.messageId;
            getIpAddressErrorRequestMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getIpAddressErrorRequestMessage.messageId);
            getIpAddressErrorRequestMessage.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    "errors": "Unable to get IP address from device"
                }
            );
            runEngine.sendMessage("Unit Test", getIpAddressErrorRequestMessage);
            expect(instance.state.loading).toEqual(false);
        });

        then('User can press status button and get status of Ip address access granted', () => {
            let testStatusButton = exampleBlockA.findWhere((node) => node.prop('testID') === 'testStatusButton');
            testStatusButton.simulate('press');
            const getIpAddressStatusSuccessRequestMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
            instance.getIpStatusApiCallID = getIpAddressStatusSuccessRequestMessage.messageId;
            getIpAddressStatusSuccessRequestMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getIpAddressStatusSuccessRequestMessage.messageId);
            getIpAddressStatusSuccessRequestMessage.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    "message": "Access Granted",
                    "code": 200
                }
            );
            runEngine.sendMessage("Unit Test", getIpAddressStatusSuccessRequestMessage);
            expect(instance.state.accessStatus).toEqual("Access Granted");
        });

        then('User can press status button and get status of Ip address access denied', () => {
            let testStatusButton = exampleBlockA.findWhere((node) => node.prop('testID') === 'testStatusButton');
            testStatusButton.simulate('press');
            const getIpAddressStatusSuccessRequestMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
            instance.getIpStatusApiCallID = getIpAddressStatusSuccessRequestMessage.messageId;
            getIpAddressStatusSuccessRequestMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getIpAddressStatusSuccessRequestMessage.messageId);
            getIpAddressStatusSuccessRequestMessage.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    "message": "Access Denied",
                    "code": 403
                }
            );
            runEngine.sendMessage("Unit Test", getIpAddressStatusSuccessRequestMessage);
            expect(instance.state.accessStatus).toEqual("Access Denied");
        });

        then('User can press status button and get status of Ip address api failed', () => {
            let testStatusButton = exampleBlockA.findWhere((node) => node.prop('testID') === 'testStatusButton');
            testStatusButton.simulate('press');
            const getIpAddressStatusFailureRequestMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
            instance.getIpStatusApiCallID = getIpAddressStatusFailureRequestMessage.messageId;
            getIpAddressStatusFailureRequestMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getIpAddressStatusFailureRequestMessage.messageId);
            getIpAddressStatusFailureRequestMessage.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    "errors": "Internal Error",
                    "code": 503
                }
            );
            runEngine.sendMessage("Unit Test", getIpAddressStatusFailureRequestMessage);
            expect(instance.state.messageLoading).toEqual(false);
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
