import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import SplitViewInterface from "../../src/SplitViewInterface.web";
import { Snackbar } from "@material-ui/core";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "SplitViewInterface",
};

const feature = loadFeature(
  "./__tests__/features/SplitViewInterface-scenario.web.feature"
);

let optionsMock = [
  "Would you rather have a million dollars",
  "Restart your life at 16 years of age."
]

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

const questionNotAnsweredMessage = {
  "message": "Please save your answer first"
}

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

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to SplitViewInterface", ({ given, when, then }) => {
    let SplitViewInterfacewrapper: ShallowWrapper;
    let instance: SplitViewInterface;

    given("I am a User loading SplitViewInterface", () => {
      SplitViewInterfacewrapper = shallow(<SplitViewInterface {...screenProps} />);
    });

    when("I navigate to the SplitViewInterface", () => {
      instance = SplitViewInterfacewrapper.instance() as SplitViewInterface;
      let fetchScore = new Message(getName(MessageEnum.RestAPIResponceMessage));
      fetchScore.messageId = "getScoreApiId";
      fetchScore.addData(getName(MessageEnum.RestAPIResponceDataMessage),fetchScore.messageId);
      fetchScore.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),getScoreAPISuccessResponse);
      runEngine.sendMessage("Unit Test", fetchScore);

      let fetchQuestions = new Message(getName(MessageEnum.RestAPIResponceMessage));
      fetchQuestions.messageId = "getQuestionsApiId";
      fetchQuestions.addData(getName(MessageEnum.RestAPIResponceDataMessage),fetchQuestions.messageId);
      fetchQuestions.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),getQuestionAPISuccessResponse);
      runEngine.sendMessage("Unit Test", fetchQuestions);

      let submitAnswer = new Message(getName(MessageEnum.RestAPIResponceMessage));
      submitAnswer.messageId = "submitAnswerApiId";
      submitAnswer.addData(getName(MessageEnum.RestAPIResponceDataMessage),submitAnswer.messageId);
      submitAnswer.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),questionNotAnsweredMessage);
      runEngine.sendMessage("Unit Test", submitAnswer);
      expect(SplitViewInterfacewrapper).toBeTruthy()
    });

    then("I can select the button with without errors", () => {
      let selectOption = SplitViewInterfacewrapper.findWhere(
        (node) => node.prop("data-test-id") === "selectOption0"
      );
      selectOption.simulate("click");
      expect(SplitViewInterfacewrapper).toBeTruthy()
    });

    then("I will show user details", () => {
      let showUserdata = SplitViewInterfacewrapper.findWhere(
        node => node.prop('data-test-id') === 'showprofiledetail'
      )
      showUserdata.simulate('click')
      expect(SplitViewInterfacewrapper).toBeTruthy();
    });
  });
});
