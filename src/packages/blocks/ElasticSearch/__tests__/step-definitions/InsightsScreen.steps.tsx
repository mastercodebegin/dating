
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import InsightsScreen from "../../src/InsightsScreen"
import { FlatList } from "react-native"


const navigation = {
  addListener: jest.fn().mockImplementation((event, callback) => {
    callback();
  }),
  navigate: jest.fn(),
  goBack: jest.fn(),
  state: {
    prams: {
      is_attempted: true,
    }
  }
};

const screenProps = {
  navigation: navigation,
  id: "InsightsScreen",
  navigate: jest.fn(),
  goBack: jest.fn()
}

const qestionApiRes = { "data": { "id": "41", "type": "question", "attributes": { "question": "Read minds or speak any language fluently", "option": ["Read minds", "speak any language fluently"] } } }

const userProfileDataApiRes = { "data": { "attributes": { "about": "Okk", "comtability": 90, "first_name": "Rahul", "gender": "Male", "intemancy": 0, "is_attempted": false, "last_name": null, "photo": [Array], "profile_id": 312, "question_hide": true, "suggested_friends": true, "user_name": "Meenaji" }, "id": "1209", "type": "friend_profile" } }

const feature = loadFeature('./__tests__/features/InsightsScreen-scenario.feature');

defineFeature(feature, (test) => {


  beforeEach(() => {
    jest.resetModules();
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
  });

  test('User navigates to InsightsScreen', ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: InsightsScreen;

    given('I am a User loading InsightsScreen', () => {
      exampleBlockA = shallow(<InsightsScreen {...screenProps} />);
    });

    when('I navigate to the InsightsScreen', () => {
      instance = exampleBlockA.instance() as InsightsScreen
    });

    then('InsightsScreen will load with out errors', () => {
      instance.componentDidMount()
    });


    then('I can increase check count', () => {
      let wrapper = shallow(<InsightsScreen navigation={navigation} id='id' />)
      let textInputComponent = wrapper.findWhere((node) => node.prop('testID') === 'onHeaderID');
      textInputComponent.simulate('press');

    })

    then('I can check userList with error', () => {

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
      instance.suggestFriendDetailCallId = magLogInSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);


    })

    then('I can check userList without error', () => {

      const magLogInSucessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        magLogInSucessRestAPI
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        userProfileDataApiRes
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        magLogInSucessRestAPI.messageId
      );
      instance.suggestFriendDetailCallId = magLogInSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);

    })


    then('I can check questions with error', () => {

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
      instance.getQuestionCallId = magLogInSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);


    })

    then('I can check questions without error', () => {

      const magLogInSucessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        magLogInSucessRestAPI
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        qestionApiRes
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        magLogInSucessRestAPI.messageId
      );
      instance.getQuestionCallId = magLogInSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);

      let plans2 = exampleBlockA.findWhere((node) => node.prop('testID') === "flatListID");
      plans2.props().renderItem({
        item: "speak any language fluently", index: 0
      })

      const FlatListRenderItem = plans2.renderProp('renderItem')({
        item: "speak any language fluently", index: 0
      })
      const onPressUser1 = FlatListRenderItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'optionBtnID')
      onPressUser1.simulate("press");

      const continueBtn = exampleBlockA.findWhere((node) => node.prop('testID') === "gotUpdateBtn");
      continueBtn.simulate('press');

      const questionAnsSuccessRestApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      questionAnsSuccessRestApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        questionAnsSuccessRestApi
      );
      questionAnsSuccessRestApi.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        {
          "errors":
          {

          },
        }
      );
      questionAnsSuccessRestApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        questionAnsSuccessRestApi.messageId
      );
      instance.questionAnswerCallId = questionAnsSuccessRestApi.messageId;
      runEngine.sendMessage("Unit Test", questionAnsSuccessRestApi);
    })


    then('I can check questions and answer api with error', () => {

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
      instance.questionAnswerCallId = magLogInSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);


    })

    // then('I can check questions and answer api without error', () => {

    //   const magLogInSucessRestAPI = new Message(
    //     getName(MessageEnum.RestAPIResponceMessage)
    //   );
    //   magLogInSucessRestAPI.addData(
    //     getName(MessageEnum.RestAPIResponceDataMessage),
    //     magLogInSucessRestAPI
    //   );
    //   magLogInSucessRestAPI.addData(
    //     getName(MessageEnum.RestAPIResponceSuccessMessage),
    //     {
    //       "data":
    //       {
    //         "attributes": {
    //           "photo": "",
    //           "first_name": "test",
    //           "user_name": "test",
    //           "about": "test",
    //           "question": "",
    //           "option": ""
    //         }
    //       },

    //     }
    //   );
    //   magLogInSucessRestAPI.addData(
    //     getName(MessageEnum.RestAPIResponceDataMessage),
    //     magLogInSucessRestAPI.messageId
    //   );
    //   instance.questionAnswerCallId = magLogInSucessRestAPI.messageId;
    //   runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);


    // })

    //   const magLogInSucessRestAPI = new Message(
    //     getName(MessageEnum.RestAPIResponceMessage)
    //   );
    //   magLogInSucessRestAPI.addData(
    //     getName(MessageEnum.RestAPIResponceDataMessage),
    //     magLogInSucessRestAPI
    //   );
    //   magLogInSucessRestAPI.addData(
    //     getName(MessageEnum.RestAPIResponceSuccessMessage),
    //     {
    //       "data":
    //       {

    //       },

    //     }
    //   );
    //   magLogInSucessRestAPI.addData(
    //     getName(MessageEnum.RestAPIResponceDataMessage),
    //     magLogInSucessRestAPI.messageId
    //   );
    //   instance.questionAnswerCallId = magLogInSucessRestAPI.messageId;
    //   runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);


    // })

    then("questionAnswerCallId api will return success", () => {
      const msgLogInSucessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInSucessRestAPI.messageId
      );
      msgLogInSucessRestAPI.addData(
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
      instance.questionAnswerCallId = msgLogInSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLogInSucessRestAPI);
    })

    then('I can leave the screen with out errors', () => {
      instance.componentWillUnmount()
    });


  });




});
