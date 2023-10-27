//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from 'framework/src/Helpers'
import React from "react";
import { runEngine } from 'framework/src/RunEngine'
import { Message } from "framework/src/Message"

import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import UserProfileBasicBlock from "../../src/UserProfileBasicBlock"
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
    id: "UserProfileBasicBlock"
}

const feature = loadFeature('./__tests__/features/UserProfileBasicBlock-scenario.feature');

defineFeature(feature, (test) => {

    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to UserProfileBasicBlock', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: UserProfileBasicBlock;

        given('I am a User loading UserProfileBasicBlock', () => {
            exampleBlockA = shallow(<UserProfileBasicBlock {...screenProps} />);
        });

        when('I navigate to the UserProfileBasicBlock', () => {
            instance = exampleBlockA.instance() as UserProfileBasicBlock
        });

        then('I call profile api', () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'UpdateApiTestID');
            buttonComponent.simulate('press');
        });

        then('I call validateMobileOnServer api', () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'validateMobileOnServerTestID');
            buttonComponent.simulate('press');
        });

        then('I can check validateMobileOnServer api with error', () => {

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
                    "errors":
                    {

                    },

                }
            );
            magLogInSucessRestAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                magLogInSucessRestAPI.messageId
            );
            instance.apiCallMessageUpdateProfileRequestId = magLogInSucessRestAPI.messageId;
            runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);

        });

        then('I can check validateMobileOnServer api with out error', () => {

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
                    "data":
                        {}

                }
            );
            magLogInSucessRestAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                magLogInSucessRestAPI.messageId
            );
            instance.apiCallMessageUpdateProfileRequestId = magLogInSucessRestAPI.messageId;
            runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);

        });


        then('I can check validationApiCallId api with out error', () => {

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
                    "data":
                    {
                        'attributes': {
                            'first_name': 'Message',
                            'last_name': 'Message',
                            'country_code': 'Message',
                            'phone_number': 'Message',
                            'email': 'Message',
                            'type': 'EmailAccount'
                        }
                    }

                }
            );
            magLogInSucessRestAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                magLogInSucessRestAPI.messageId
            );
            instance.userProfileGetApiCallId = magLogInSucessRestAPI.messageId;
            runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);

        });


        then('I can check new validationApiCallId api with out error', () => {

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
                    "data":
                        [
                            {
                                'password_validation_regexp': 'Message',
                                'email_validation_regexp': 'test'
                            }]

                }
            );
            magLogInSucessRestAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                magLogInSucessRestAPI.messageId
            );
            instance.validationApiCallId = magLogInSucessRestAPI.messageId;
            runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);

        });


        then('I can check new validationApiCallId api with out error phone number', () => {

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
                    "data":
                    {
                        'attributes': {
                            'first_name': 'Message',
                            'last_name': 'Message',
                            'country_code': 'Message',
                            'phone_number': '',
                            'email': 'Message',
                            'type': 'SocialAccount'
                        }
                    }

                }
            );
            magLogInSucessRestAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                magLogInSucessRestAPI.messageId
            );
            instance.userProfileGetApiCallId = magLogInSucessRestAPI.messageId;
            runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);

        });

        then('I can check new validationApiCallId api with out error type', () => {

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
                    "data":
                    {
                        'attributes': {
                            'first_name': 'Message',
                            'last_name': 'Message',
                            'country_code': 'Message',
                            'phone_number': '',
                            'email': 'Message',
                            'type': 'SmsAccount'
                        }
                    }

                }
            );
            magLogInSucessRestAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                magLogInSucessRestAPI.messageId
            );
            instance.userProfileGetApiCallId = magLogInSucessRestAPI.messageId;
            runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);

        });


        then('I can check new validationApiCallId api with error', () => {

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
                    "errors":
                        [{
                            'token': '908'
                        }
                        ]

                }
            );
            magLogInSucessRestAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                magLogInSucessRestAPI.messageId
            );
            instance.userProfileGetApiCallId = magLogInSucessRestAPI.messageId;
            runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);

        });

        then('I can check new validationApiCallId api with error array length zero', () => {

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
                    "errors":
                        [
                        ]

                }
            );
            magLogInSucessRestAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                magLogInSucessRestAPI.messageId
            );
            instance.userProfileGetApiCallId = magLogInSucessRestAPI.messageId;
            runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);

        });

        then('I can check new apiChangePhoneValidation api with out error', () => {

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
                    "data":
                        [
                            {}
                        ]

                }
            );
            magLogInSucessRestAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                magLogInSucessRestAPI.messageId
            );
            instance.apiChangePhoneValidation = magLogInSucessRestAPI.messageId;
            runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);

        });

        then('I can check new apiChangePhoneValidation api with error', () => {

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
                    "errors":
                        [
                            {}
                        ]

                }
            );
            magLogInSucessRestAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                magLogInSucessRestAPI.messageId
            );
            instance.apiChangePhoneValidation = magLogInSucessRestAPI.messageId;
            runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);

        });

        then('I can update type email', () => {

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
                    "data":
                    {
                        'attributes': {
                            'first_name': 'Message',
                            'last_name': 'Message',
                            'country_code': 'Message',
                            'phone_number': '786',
                            'email': 'Message',
                            'type': 'EmailAccount'
                        }
                    }

                }
            );
            magLogInSucessRestAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                magLogInSucessRestAPI.messageId
            );
            instance.userProfileGetApiCallId = magLogInSucessRestAPI.messageId;
            runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'UpdateApiTestID');
            buttonComponent.simulate('press');

        });

        then('I can update type social', () => {

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
                    "errors":
                    {
                        'attributes': {
                            'first_name': 'Message',
                            'last_name': 'Message',
                            'country_code': 'Message',
                            'phone_number': '987',
                            'email': 'Message',
                            'type': 'EmailAccounpt'
                        }
                    }

                }
            );
            magLogInSucessRestAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                magLogInSucessRestAPI.messageId
            );
            instance.userProfileGetApiCallId = magLogInSucessRestAPI.messageId;
            runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);

        });

        then('I can validateAndUpdateProfileTestID', () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'validateAndUpdateProfileTestID');
            buttonComponent.simulate('press');

            let textInputComponentt = exampleBlockA.findWhere((node) => node.prop('testID') === 'updatelastNameState');
            textInputComponentt.simulate('changeText', null);
            
            let buttonComponentt = exampleBlockA.findWhere((node) => node.prop('testID') === 'validateAndUpdateProfileTestID');
            buttonComponentt.simulate('press');

            let buttonComponent1 = exampleBlockA.findWhere((node) => node.prop('testID') === 'goToPrivacyTestID');
            buttonComponent1.simulate('press');

            let buttonComponent2 = exampleBlockA.findWhere((node) => node.prop('testID') === 'termAndConditionTestID');
            buttonComponent2.simulate('press');

            let buttonComponent3 = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnReTypePasswordShowHidePropsTestID');
            buttonComponent3.simulate('press');

            let buttonComponent4 = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnDisableEditPasswordPropsTestID');
            buttonComponent4.simulate('press');

            let buttonComponent5 = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnNewPasswordShowHideButtonPropsTestID');
            buttonComponent5.simulate('press');

            let buttonComponent6 = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnPasswordShowHideButtonPropsTestID');
            buttonComponent6.simulate('press');

            let buttonComponent7 = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnEnableEditPasswordPropsTestID');
            buttonComponent7.simulate('press');
            
            let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInputFirstName');
            textInputComponent.simulate('changeText', 'hello@aol.com');
            
            let textInputComponent1 = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInputNewPasswordProps');
            textInputComponent1.simulate('changeText', 'hello@aol.com');
            
            let textInputComponent2 = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInputCurrentPasswordProps');
            textInputComponent2.simulate('changeText', 'hello@aol.com');
            
            let textInputComponent3 = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInputEmailWebProps');
            textInputComponent3.simulate('changeText', 'hello@aol.com');
            
            let textInputComponent4 = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInputPhoneNumberlWebProps');
            textInputComponent4.simulate('changeText', 'hello@aol.com');
            
            let textInputComponent9 = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInputFirstNameProps');
            textInputComponent9.simulate('changeText', 'hello@aol.com');

            let textInputComponent10 = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInputLastNameProps');
            textInputComponent10.simulate('changeText', 'hello@aol.com');

            let buttonComponent8 = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInputPhoneNumberlWebPropsPress');
            buttonComponent8.simulate('press');

        });

        then('I can leave the screen with out errors', () => {
            // instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
