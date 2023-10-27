import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import GameScore2 from "../../src/GameScore2"
import { expect, jest, beforeEach } from '@jest/globals'
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "GameScore2"
  }

const feature = loadFeature('./__tests__/features/GameScore2-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'android' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'android');
    });

    test('User navigates to GameScore2', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:GameScore2; 

        given('I am a User loading GameScore2', () => {
            exampleBlockA = shallow(<GameScore2 {...screenProps}/>);
        });

        when('I navigate to the GameScore2', () => {
             instance = exampleBlockA.instance() as GameScore2
        });

        then('GameScore2 will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
            
            const checkUserStatusApiCallData = new Message(getName(MessageEnum.RestAPIResponceMessage))
            instance.getReasonId = checkUserStatusApiCallData.messageId;
            checkUserStatusApiCallData.addData(getName(MessageEnum.RestAPIResponceDataMessage), checkUserStatusApiCallData.messageId);
            checkUserStatusApiCallData.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    "first_user_score": {
                        "data": {
                            "id": "1",
                            "type": "game_score",
                            "attributes": {
                                "id": 1,
                                "account_id": 41,
                                "score": 0,
                                "game_level_id": null,
                                "game_type_id": null,
                                "user_name": "vishali"
                            }
                        }
                    },
                    "second_user_score": {
                        "data": {
                            "id": "1",
                            "type": "game_score",
                            "attributes": {
                                "id": 1,
                                "account_id": 41,
                                "score": 0,
                                "game_level_id": null,
                                "game_type_id": null,
                                "user_name": "vishali"
                            }
                    }
                }
            }
            );
            runEngine.sendMessage("Unit Test", checkUserStatusApiCallData);

            const apiCheckUserData = new Message(getName(MessageEnum.RestAPIResponceMessage))
            instance.getReasonId = apiCheckUserData.messageId;
            apiCheckUserData.addData(getName(MessageEnum.RestAPIResponceDataMessage), apiCheckUserData.messageId);
            apiCheckUserData.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    "first_user_score": {
                        "data": {
                            "id": "1",
                            "type": "game_score",
                            "attributes": {
                                "id": 1,
                                "account_id": 41,
                                "score": 5,
                                "game_level_id": null,
                                "game_type_id": null,
                                "user_name": "vishali"
                            }
                        }
                    },
                    "second_user_score": {
                        "data": {
                            "id": "1",
                            "type": "game_score",
                            "attributes": {
                                "id": 1,
                                "account_id": 41,
                                "score": 0,
                                "game_level_id": null,
                                "game_type_id": null,
                                "user_name": "vishali"
                            }
                    }
                }
            }
                
            );
            runEngine.sendMessage("Unit Test", apiCheckUserData);

            const apiCheckUserIncreasingData = new Message(getName(MessageEnum.RestAPIResponceMessage))
            instance.getReasonId = apiCheckUserIncreasingData.messageId;
            apiCheckUserIncreasingData.addData(getName(MessageEnum.RestAPIResponceDataMessage), apiCheckUserIncreasingData.messageId);
            apiCheckUserIncreasingData.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    "first_user_score": {
                        "data": {
                            "id": "1",
                            "type": "game_score",
                            "attributes": {
                                "id": 1,
                                "account_id": 41,
                                "score": 0,
                                "game_level_id": null,
                                "game_type_id": null,
                                "user_name": "vishali"
                            }
                        }
                    },
                    "second_user_score": {
                        "data": {
                            "id": "1",
                            "type": "game_score",
                            "attributes": {
                                "id": 1,
                                "account_id": 41,
                                "score": 5,
                                "game_level_id": null,
                                "game_type_id": null,
                                "user_name": "vishali"
                            }
                    }
                }
            }
                
            );
            runEngine.sendMessage("Unit Test", apiCheckUserIncreasingData);
        });

        then('I can click my image with out errors', () => {
            let myImageClickTestComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'myImageClickTest');
            myImageClickTestComponent.simulate('press');
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can click opponent image with out errors', () => {
            let opponentImageClickTestComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'opponentImageClickTest');
            opponentImageClickTestComponent.simulate('press');
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
