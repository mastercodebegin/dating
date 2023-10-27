import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import SplitViewInterface from "../../src/SplitViewInterface";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "SplitViewInterface",
};

const feature = loadFeature(
  "./__tests__/features/SplitViewInterface-scenario.feature"
);

const getQuestionAPISuccessResponse = {
  data: [
    {
      id: "4",
      type: "question_list",
      attributes: {
        question:
          "Would you rather be able to read and write in any language, or have infinite memory",
        option_1: "Would you rather be able to read and write in any language",
        option_2: "Have infinite memory",
        is_attempted: true,
      },
    },
    {
      id: "5",
      type: "question_list",
      attributes: {
        question: "cottage in the mountains or a sea cruise trip",
        option_1: "Cottage in the mountains",
        option_2: "A sea cruise trip",
        is_attempted: true,
      },
    },
    {
      id: "6",
      type: "question_list",
      attributes: {
        question: "comedy show or a theater production",
        option_1: "Comedy show",
        option_2: " A theater production",
        is_attempted: true,
      },
    },
  ],
};

const getScoreAPISuccessResponse = {
  first_user_score: {
    data: {
      id: "466",
      type: "user_score2",
      attributes: {
        id: 466,
        account_id: 657,
        score: 5,
        user_name: "nik12",
      },
    },
  },
  second_user_score: {
    data: {
      id: "467",
      type: "user_score2",
      attributes: {
        id: 467,
        account_id: 658,
        score: 5,
        user_name: "nik13",
      },
    },
  },
};

const submitAnswerAPISuccessResponse = {
  data: {
    id: "12",
    type: "user_score",
    attributes: {
      id: 12,
      account_id: 203,
      score: 5,
      is_correct: false,
    },
  },
};

const questionNotAnsweredMessage = {
  "message": "Please save your answer first"
}

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  // Most actions are performed by custom component hence its test file is having most test code
  test("User can see questions submit answers and check game score", ({
    given,
    when,
    then,
  }) => {
    let SplitViewInterfaceBlock: ShallowWrapper;
    let instance: SplitViewInterface;

    given("user can see questions", () => {
      SplitViewInterfaceBlock = shallow(
        <SplitViewInterface {...screenProps} />
      );
      instance = SplitViewInterfaceBlock.instance() as SplitViewInterface;

      const fetchScore = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      fetchScore.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        fetchScore.messageId
      );
      fetchScore.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        getScoreAPISuccessResponse
      );
      instance.getScoreApiId = fetchScore.messageId;
      runEngine.sendMessage("Unit Test", fetchScore);

      const fetchQuestions = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      fetchQuestions.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        fetchQuestions.messageId
      );
      fetchQuestions.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        getQuestionAPISuccessResponse
      );
      instance.getQuestionsApiId = fetchQuestions.messageId;
      runEngine.sendMessage("Unit Test", fetchQuestions);
      expect(instance.state.questionData).toEqual(getQuestionAPISuccessResponse.data);
    });

    when("user submits answer", () => {
      let radioButton1 = SplitViewInterfaceBlock.findWhere(
        (node) => node.prop("data-testid") === "radioButton1"
      );
      radioButton1.simulate("press");

      const submitAnswer = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      submitAnswer.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        submitAnswer.messageId
      );
      submitAnswer.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        submitAnswerAPISuccessResponse
      );
      instance.submitAnswerApiId = submitAnswer.messageId;
      runEngine.sendMessage("Unit Test", submitAnswer);
      expect(instance.state.gameMessage).toBe("Answer is false")
    });

    then("user can see score", () => {
      expect(instance.state.myInfo.attributes.score).toEqual(
        getScoreAPISuccessResponse.first_user_score.data.attributes.score
      );
    });
  });

  test("User get question not answered message", ({ given, when, then }) => {
    let SplitViewInterfaceBlock: ShallowWrapper;
    let instance: SplitViewInterface;

    given("user can see question", () => {
      SplitViewInterfaceBlock = shallow(
        <SplitViewInterface {...screenProps} />
      );
      instance = SplitViewInterfaceBlock.instance() as SplitViewInterface;

      const fetchQuestions = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      fetchQuestions.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        fetchQuestions.messageId
      );
      fetchQuestions.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        getQuestionAPISuccessResponse
      );
      instance.getQuestionsApiId = fetchQuestions.messageId;
      runEngine.sendMessage("Unit Test", fetchQuestions);
      expect(instance.state.questionData).toEqual(getQuestionAPISuccessResponse.data);
    });

    when("user submits answer for question that has not answered by opponent", () => {
      let radioButton1 = SplitViewInterfaceBlock.findWhere(
        (node) => node.prop("data-testid") === "radioButton1"
      );
      radioButton1.simulate("press");

      const submitAnswer = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      submitAnswer.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        submitAnswer.messageId
      );
      submitAnswer.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        questionNotAnsweredMessage
      );
      instance.submitAnswerApiId = submitAnswer.messageId;
      runEngine.sendMessage("Unit Test", submitAnswer);
    });

    then("it will show message for same", () => {
      expect(instance.state.gameMessage).toEqual(
        questionNotAnsweredMessage.message
      );
    });
  });
});
