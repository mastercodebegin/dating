import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import React from "react";
import GameScore2 from "../../src/GameScore2.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "GameScore2",
};

const feature = loadFeature(
  "./__tests__/features/GameScore2-scenario.web.feature"
);

let bothUserScoreSame = {
  first_user_score: {
    data: {
      id: "5",
      type: "game_score",
      attributes: {
        id: 5,
        account_id: 683,
        score: 10,
        game_level_id: null,
        game_type_id: "33",
        user_name: "Example",
      },
    },
  },
  second_user_score: {
    data: {
      id: "6",
      type: "game_score",
      attributes: {
        id: 6,
        account_id: 684,
        score: 10,
        game_level_id: null,
        game_type_id: "33",
        user_name: "Example",
      },
    },
  },
};

let userAscoregreaterthanUserBscore = {
  first_user_score: {
    data: {
      id: "1",
      type: "game_score",
      attributes: {
        id: 1,
        account_id: 41,
        score: 5,
        game_level_id: null,
        game_type_id: null,
        user_name: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      },
    },
  },
  second_user_score: {
    data: {
      id: "1",
      type: "game_score",
      attributes: {
        id: 1,
        account_id: 41,
        score: 0,
        game_level_id: null,
        game_type_id: null,
        user_name: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      },
    },
  },
};

let userAscorelessthanUserBscore = {
  first_user_score: {
    data: {
      id: "1",
      type: "game_score",
      attributes: {
        id: 1,
        account_id: 41,
        score: 0,
        game_level_id: null,
        game_type_id: null,
        user_name: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      },
    },
  },
  second_user_score: {
    data: {
      id: "1",
      type: "game_score",
      attributes: {
        id: 1,
        account_id: 41,
        score: 5,
        game_level_id: null,
        game_type_id: null,
        user_name: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      },
    },
  },
};

let smallusernameUser1 = {
  first_user_score: {
    data: {
      id: "5",
      type: "game_score",
      attributes: {
        id: 5,
        account_id: 683,
        score: 5,
        game_level_id: null,
        game_type_id: "33",
        user_name: "Example",
      },
    },
  },
  second_user_score: {
    data: {
      id: "6",
      type: "game_score",
      attributes: {
        id: 6,
        account_id: 684,
        score: 10,
        game_level_id: null,
        game_type_id: "33",
        user_name: "Example",
      },
    },
  },
};

let smallusernameUser2 = {
  first_user_score: {
    data: {
      id: "5",
      type: "game_score",
      attributes: {
        id: 10,
        account_id: 683,
        score: 5,
        game_level_id: null,
        game_type_id: "33",
        user_name: "Example",
      },
    },
  },
  second_user_score: {
    data: {
      id: "6",
      type: "game_score",
      attributes: {
        id: 6,
        account_id: 684,
        score: 5,
        game_level_id: null,
        game_type_id: "33",
        user_name: "Example",
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

  test("User navigates to GameScore2", ({ given, when, then }) => {
    let gameScore2Block: ShallowWrapper;
    let instance: GameScore2;

    given("I am a User loading GameScore2", () => {
      gameScore2Block = shallow(<GameScore2 {...screenProps} />);
    });

    when("I navigate to the GameScore2", () => {
      instance = gameScore2Block.instance() as GameScore2;
      let openModal = gameScore2Block.findWhere(node => node.prop("data-test-id") === "showModal");
      openModal.simulate("click");
    });

    then("renders the correct game result when Game is Tied", () => {
      const checkUserStatusApiCallData = new Message(getName(MessageEnum.RestAPIResponceMessage));
      instance.getReasonId = checkUserStatusApiCallData.messageId;
      checkUserStatusApiCallData.addData(getName(MessageEnum.RestAPIResponceDataMessage), checkUserStatusApiCallData.messageId);
      checkUserStatusApiCallData.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), bothUserScoreSame);
      runEngine.sendMessage("Unit Test", checkUserStatusApiCallData);
      expect(instance.state.score).toEqual({ first_user_score: 10, second_user_score: 10 });
    });

    then("renders tiny current player name", () => {
      const apiCheckUserData = new Message(getName(MessageEnum.RestAPIResponceMessage));
      instance.getReasonId = apiCheckUserData.messageId;
      apiCheckUserData.addData(getName(MessageEnum.RestAPIResponceDataMessage), apiCheckUserData.messageId);
      apiCheckUserData.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), smallusernameUser1);
      runEngine.sendMessage("Unit Test", apiCheckUserData);
      expect(instance.state.score).toEqual({ first_user_score: 5, second_user_score: 10 });
    });

    then("renders tiny oppoent player name", () => {
      const apiCheckUserData = new Message(getName(MessageEnum.RestAPIResponceMessage));
      instance.getReasonId = apiCheckUserData.messageId;
      apiCheckUserData.addData(getName(MessageEnum.RestAPIResponceDataMessage), apiCheckUserData.messageId);
      apiCheckUserData.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), smallusernameUser2);
      runEngine.sendMessage("Unit Test", apiCheckUserData);
      expect(instance.state.score).toEqual({ first_user_score: 5, second_user_score: 5 });
    });
  });

  test("Current user won", ({ given, when, then }) => {
    let gamescore2Wrapper: ShallowWrapper;
    let instance: GameScore2;

    given("I am a User loading GameScore2", () => {
      gamescore2Wrapper = shallow(<GameScore2 {...screenProps} />);
    });

    when("I navigate to the GameScore2", () => {
      instance = gamescore2Wrapper.instance() as GameScore2;
    });

    then("renders the correct game result when A has won by B", () => {
      const apiCheckUserData = new Message(getName(MessageEnum.RestAPIResponceMessage));
      instance.getReasonId = apiCheckUserData.messageId;
      apiCheckUserData.addData(getName(MessageEnum.RestAPIResponceDataMessage), apiCheckUserData.messageId);
      apiCheckUserData.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), userAscoregreaterthanUserBscore);
      runEngine.sendMessage("Unit Test", apiCheckUserData);
      expect(instance.state.score).toEqual({ first_user_score: 5, second_user_score: 0 });
    });

  });

  test("Opponent user won", ({ given, when, then }) => {
    let gamescore2: ShallowWrapper;
    let instance: GameScore2;

    given("I am a User loading GameScore2", () => {
      gamescore2 = shallow(<GameScore2 {...screenProps} />);
    });

    when("I navigate to the GameScore2", () => {
      instance = gamescore2.instance() as GameScore2;
    });

    then("renders the correct game result when B has won by A", () => {
      const apiCheckUserIncreasingData = new Message(getName(MessageEnum.RestAPIResponceMessage));
      instance.getReasonId = apiCheckUserIncreasingData.messageId;
      apiCheckUserIncreasingData.addData(getName(MessageEnum.RestAPIResponceDataMessage), apiCheckUserIncreasingData.messageId);
      apiCheckUserIncreasingData.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), userAscorelessthanUserBscore);
      runEngine.sendMessage("Unit Test", apiCheckUserIncreasingData);
      expect(instance.state.score).toEqual({ first_user_score: 0, second_user_score: 5 });
    });
  });
});
