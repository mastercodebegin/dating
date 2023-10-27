import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import VisualAnalytics from "../../src/VisualAnalytics"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "VisualAnalytics"
  }

const feature = loadFeature('./__tests__/features/visualanalytics-scenario.feature');

defineFeature(feature, (test) => {

    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to visualanalytics', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:VisualAnalytics; 

        given('I am a User loading visualanalytics', () => {
            exampleBlockA = shallow(<VisualAnalytics {...screenProps}/>)
        });

        when('I navigate to the visualanalytics', () => {
             instance = exampleBlockA.instance() as VisualAnalytics
        });

        then('visualanalytics will load with out errors', () => {
            const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
            tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
            runEngine.sendMessage("Unit Test", tokenMsg);

            const getUserData = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
            getUserData.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              getUserData.messageId
            );
            getUserData.addData(
              getName(MessageEnum.RestAPIResponceSuccessMessage),
              {
                "data": {
                    "labels": [
                        "Tue",
                        "Mon",
                        "Sun",
                        "Sat",
                        "Fri",
                        "Thu",
                        "Wed",
                        "Tue",
                        "Mon"
                    ],
                    "data": [
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ]
                    ],
                    "barColors": [
                        "#7db6b0"
                    ]
                }
            }           
             );
            instance.apiGetDataCallId = getUserData.messageId;
            runEngine.sendMessage("Unit Test", getUserData);
            expect(exampleBlockA).toBeTruthy()
      //       let buttonComponent1 =
      //       exampleBlockA.findWhere(
      //     (node) => node.prop("testID") === "Background"
      //   );
      // buttonComponent1.simulate("press");

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
                      [
                          {}
                      ]
  
              }
          );
          magLogInSucessRestAPI.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              magLogInSucessRestAPI.messageId
          );
          instance.apiGetDataCallId = magLogInSucessRestAPI.messageId;
          runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
  
      });
        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy()
        });
    });


});
