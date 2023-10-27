//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from 'framework/src/Helpers'
import React from "react";
import IdentifyScreen1 from "../../src/IdentifyScreen1"
import { Message } from "framework/src/Message";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import { runEngine } from "framework/src/RunEngine";
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
    id: "IdentifyScreen1"
}

const feature = loadFeature('./__tests__/features/IdentifyScreen1-scenario.feature');

defineFeature(feature, (test) => {

    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to IdentifyScreen1', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: IdentifyScreen1;

        given('I am a User loading IdentifyScreen1', () => {
            exampleBlockA = shallow(<IdentifyScreen1 {...screenProps} />);
        });

        when('I navigate to the IdentifyScreen1', () => {
            instance = exampleBlockA.instance() as IdentifyScreen1
        });

        then('IdentifyScreen1 will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
            const apiIdentifyYourSelf = new Message(getName(MessageEnum.RestAPIResponceMessage))
            instance.getIdentifySelf = apiIdentifyYourSelf.messageId
            apiIdentifyYourSelf.addData(getName(MessageEnum.RestAPIResponceDataMessage), apiIdentifyYourSelf.messageId);
            apiIdentifyYourSelf.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                [{ "created_at": "2023-05-25T11:54:53.069Z", "id": 4, "option1": "Workplace Collaborations", "option2": "Something platonics", "option3": "Something Romantic", "option4": "Something casual", "option5": "No Preference", "question": "What kind of intimacy do you think you are looking for here?", "updated_at": "2023-05-30T03:56:14.500Z" }, { "created_at": "2023-05-25T07:35:06.847Z", "id": 3, "option1": "Spend quality time together", "option2": "Do acts of service together", "option3": "Physical touch", "option4": "Receiving Gifts", "option5": "Words of Affirmation ", "question": "How do you tend to communicate with your partner?", "updated_at": "2023-05-30T08:00:06.737Z" }]
            );
            runEngine.sendMessage("Unit Test", apiIdentifyYourSelf);
        });
        then("I can select the no preference option", () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop("testID") === "noPreference");
            buttonComponent.simulate("press");
        });
   
        then('I can click continue button', () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'onContinue');
            buttonComponent.simulate('press');
        });

        then("I can click back button", () => {
            instance.setState({count:true})
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'onPrivousFunCall');
            buttonComponent.simulate('press');
            let continueButtonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'onContinue');
            continueButtonComponent.simulate('press');
        })

        then("I can select the option 1", () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop("testID") === "option1");
            buttonComponent.simulate("press");
        });

        then("I can select the option 2", () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop("testID") === "option2");
            buttonComponent.simulate("press");
        });

        then("I can select the option 3", () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop("testID") === "option3");
            buttonComponent.simulate("press");
        });

        then("I can select the option 4", () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop("testID") === "option4");
            buttonComponent.simulate("press");
        });

        then('I can click continue button again', () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'onContinue');
            buttonComponent.simulate('press');
            const apiIdentifyYourSelf = new Message(getName(MessageEnum.RestAPIResponceMessage))
            instance.updateSelfidentityCallID = apiIdentifyYourSelf.messageId
            apiIdentifyYourSelf.addData(getName(MessageEnum.RestAPIResponceDataMessage), apiIdentifyYourSelf.messageId);
            apiIdentifyYourSelf.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
            [
                {
                    "id": 416,
                    "account_id": 821,
                    "identify_yourself_id": 1,
                    "correct_answer": [
                        "Something Casual",
                        "Something Romantic",
                        "Something Platonic"
                    ],
                    "created_at": "2023-06-29T07:11:50.231Z",
                    "updated_at": "2023-06-29T07:11:50.231Z"
                },
                {
                    "id": 417,
                    "account_id": 821,
                    "identify_yourself_id": 2,
                    "correct_answer": [
                        "Spend quality time",
                        "Do act of services together"
                    ],
                    "created_at": "2023-06-29T07:11:50.239Z",
                    "updated_at": "2023-06-29T07:11:50.239Z"
                }
            ]
            );
            runEngine.sendMessage("Unit Test", apiIdentifyYourSelf);
        });

        then('I can leave the screen with out errors', () => {
            // instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
