import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import GameScore from "../../src/GameScore";
const navigation = require("react-navigation");

const screenProps = {
  navigation,
  id: "GameScore",
};

const feature = loadFeature("./__tests__/features/GameScore-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
  });

  test("User can see score after game ends", ({ given, when, then }) => {
    let GameScoreWrapper: ShallowWrapper;
    let instance: GameScore;

    given("I am a User loading Game score", () => {
      GameScoreWrapper = shallow(<GameScore {...screenProps} />);
    });

    when("I navigate to Game score", () => {
     
    });

    then("I can see score", () => {
      
    });

  });
});
