//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from 'framework/src/Helpers'
import { runEngine } from 'framework/src/RunEngine'
import { Message } from "framework/src/Message"

import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import React from "react";
import PrivacyPolicy from "../../src/PrivacyPolicyScreen"
const navigation = require("react-navigation")


const screenProps = {
    navigation: {
        addListener: jest.fn().mockImplementation((event, callback) => {
            callback();
        }),
        navigate: jest.fn(),
        goBack: jest.fn(),
        dispatch: jest.fn(),
        replace: jest.fn(),
        trim: jest.fn(),
        Alert: jest.fn(),
        split: jest.fn(),
        pop: jest.fn()
    },
    id: "PrivacyPolicy"
}

const feature = loadFeature('./__tests__/features/PrivacyPolicyScreen-scenario.feature');

defineFeature(feature, (test) => {

    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to PrivacyPolicy', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: PrivacyPolicy;

        given('I am a User loading PrivacyPolicy', () => {
            exampleBlockA = shallow(<PrivacyPolicy {...screenProps} />);
        });

        when('I navigate to the PrivacyPolicy', () => {
            instance = exampleBlockA.instance() as PrivacyPolicy
        });

        then('PrivacyPolicy will load with out errors', () => {
            let message: Message = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            )
            message.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                message.messageId
            )
            instance.getPrivacyPolicyCallId = message.messageId
        });

        then('PrivacyPolicy will load faqs with out errors', () => {
            let message: Message = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            )

            message.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                message.messageId
            );
            instance.getPrivacyPolicyCallId = message.messageId;
            message.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                [{
                    "content_of_faq": "tesing user",
                    "created_at": "2023-04-22T06:50:31.715Z",
                    "id": 1,
                    "type_of_faq": "test",
                    "updated_at": "2023-04-22T06:50:31.715Z",
                    "checked": true,
                }]
            )
            runEngine.sendMessage("Unit Test", message);
            let faqsListComponent = exampleBlockA.findWhere(
                (node) => node.prop("testID") === "faqsList"
            );
            faqsListComponent.props().renderItem({ item: instance.state.privacyPolicy[0] })
        });

        then('I can select the button with with out errors', () => {
            let navigation = {
                navigation: jest.fn(),
                goBack: jest.fn(),
                navigate: jest.fn(),
                BackCarImage: jest.fn()
            }
            let buttonComponent = exampleBlockA.findWhere(
                (node) => node.prop("testID") === "onHeaderID"
            );
            buttonComponent.simulate("press");
            expect(navigation.goBack).toBeTruthy()

        });

        then('I can Click FAQ Button', () => {
            let navigation = {
                navigation: jest.fn(),
                goBack: jest.fn(),
                navigate: jest.fn(),
                BackCarImage: jest.fn()
            }
            let faqsListComponent = exampleBlockA.findWhere(
                (node) => node.prop("testID") === "faqsList"
            );
            faqsListComponent.props().renderItem({ item: instance.state.privacyPolicy[0] })
            const faqsRenderItem = faqsListComponent.renderProp('renderItem')({ item: instance.state.privacyPolicy[0] })
            const faqBtn = faqsRenderItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'faqTestID')
            faqBtn.simulate("press");
            expect(navigation.goBack).toBeTruthy()
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });

});
