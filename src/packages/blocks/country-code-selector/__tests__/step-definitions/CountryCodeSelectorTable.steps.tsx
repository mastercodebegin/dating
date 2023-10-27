import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import CountryCodeSelectorTable from "../../src/CountryCodeSelectorTable";

import React from "react";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import { Message } from "framework/src/Message";
import { runEngine } from "framework/src/RunEngine";
const navigation = require("react-navigation")

const screenProps = {
    navigation:
    {
        navigate: jest.fn(),
        pop: jest.fn()

    },
    id: "CountryCodeSelectorTable"
}

const feature = loadFeature('./__tests__/features/CountryCodeSelectorTable-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to CountryCodeSelectorTable', ({ given, when, then }) => {
        let countryCodeSelectorTable: ShallowWrapper;
        let instance: CountryCodeSelectorTable;

        given('I am a User loading CountryCodeSelectorTable', () => {
            countryCodeSelectorTable = shallow(<CountryCodeSelectorTable {...screenProps} />)
        });

        when('I navigate to the CountryCodeSelectorTable', () => {
            instance = countryCodeSelectorTable.instance() as CountryCodeSelectorTable
        });

        then('CountryCodeSelectorTable will load with out errors', () => {
            expect(CountryCodeSelectorTable).toBeTruthy()
        });

        then('I can leave the screen with out errors', () => {
            expect(CountryCodeSelectorTable).toBeTruthy()
        });
        then("I can click action button", () => {
            let flatListData =
                countryCodeSelectorTable.findWhere(
                    (node) => node.prop("testID") === "actionList"
                );

            shallow(flatListData.props().ListHeaderComponent())
            shallow(flatListData.props().ItemSeparatorComponent())

            let actionData = flatListData.renderProp('renderItem')({
                item: {
                    attributes: {
                        emoji_flag: "",
                        name: '',
                        country_code: ''
                    },
                    id: 1,
                }
            });
            let buttonComponent =
                actionData.findWhere(
                    (node) => node.prop("testID") === "actionOnRow"
                );
                jest.useFakeTimers()
               
            buttonComponent.simulate("press");
            jest.advanceTimersByTime(1.0)
           
        });

        then("I can change search data", () => {
            // let buttonComponent =
            //     countryCodeSelectorTable.findWhere(
            //         (node) => node.prop("testID") === "searchFilter"
            //     );
            // buttonComponent.simulate("onchange");
        });


        then("countryCodeApiCallId api will return error", () => {
            let countryCodeApi = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            countryCodeApi.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                countryCodeApi.messageId
            );
            countryCodeApi.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    errors: [
                        {
                            "Login Failed": "Invalid email"
                        }
                    ]

                }
            );
            instance.countryCodeApiCallId = countryCodeApi.messageId;
            runEngine.sendMessage("Unit Test", countryCodeApi);
        })

        then("countryCodeApiCallId api will return success", () => {
            const countryCodeApi = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            countryCodeApi.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                countryCodeApi.messageId
            );
            countryCodeApi.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {

                    data: {
                        id: "31",
                        type: "email_account",
                        attributes: {
                            name: "dsbjbcsd",
                            email: "xyzdhd@djd.com",
                            activated: true
                        }
                    },
                    "meta": {
                        "token": "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MzEsImV4cCI6MTY3MzUyNjQzNX0.XGphBFSBZa4PU0ep2Qw1oQGw_DQAPddkUuGb_m_WYVjiVQH1tjpvO10Ec9EPVKl5TvRJgdn_32IMoUJVxFxC-g"
                    }
                }
            );
            instance.countryCodeApiCallId = countryCodeApi.messageId;
            runEngine.sendMessage("Unit Test", countryCodeApi);
        })
    });
});
