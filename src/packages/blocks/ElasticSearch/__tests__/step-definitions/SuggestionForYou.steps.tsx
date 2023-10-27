
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import SuggestionForYou from "../../src/SuggestionForYou"

const navigation = {
  addListener: jest.fn().mockImplementation((event, callback) => {
    callback();
  }),
  navigate: jest.fn(),
  goBack: jest.fn()
};

const screenProps = {
  navigation: navigation,
  id: "SuggestionForYou"
}

const feature = loadFeature('./__tests__/features/SuggestionForYou-scenario.feature');

defineFeature(feature, (test) => {

  jest.useFakeTimers()
  beforeEach(() => {
    jest.resetModules();
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
  });

  test('User navigates to SuggestionForYou', ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: SuggestionForYou;

    given('I am a User loading SuggestionForYou', () => {
      exampleBlockA = shallow(<SuggestionForYou {...screenProps} />);
    });

    when('I navigate to the SuggestionForYou', () => {
      instance = exampleBlockA.instance() as SuggestionForYou
    });

    then('SuggestionForYou will load with out errors', () => {
      instance.componentDidMount()

    });

    then('I can check user suggested api with out errors', () => {
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
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10
          ]
        }
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        magLogInSucessRestAPI.messageId
      );
      instance.suggestedFriendCallId = magLogInSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
    });

    then('I can check user suggested api with errors', () => {

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

          ]
        }
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        magLogInSucessRestAPI.messageId
      );
      instance.suggestedFriendCallId = magLogInSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);


    });

    then('I can check the suggested friend flatlist', () => {
      let plans = exampleBlockA.findWhere((node) => node.prop('testID') === "suggestedFriendListID");
      plans.props().renderItem({
        item: {
          id: 2,
          attributes: {
            id: 2,
            duration: 'Monthly',
            currency: 'USD',
            amount: '250',
            plan_name: 'Monthly'
          }
        }
      })

      const FlatListRenderItem = plans.renderProp('renderItem')({
        item: {
          id: 2,
          attributes: {
            id: 2,
            duration: 'Monthly',
            currency: 'USD',
            amount: '250',
            plan_name: 'Monthly'
          }
        }, index: 0
      })
      const onPressUser = FlatListRenderItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'suggestedFriendListUserId')
      onPressUser.simulate("press");

      let goBack = exampleBlockA.findWhere((node) => node.prop('testID') === "suggestedFriendListBackButton");
      goBack.simulate('press');

    });

    then('I can leave the screen with out errors', () => {
      instance.componentWillUnmount()
    });
  });

});
