import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import NotifiedFriend from "../../src/NotifiedFriend";

const navigation = {
  addListener: jest.fn().mockImplementation((event, callback) => {
    callback();
  }),
  navigate: jest.fn(),
  goBack: jest.fn()
};

const screenProps = {
  navigation,
  id: "NotifiedFriend",
};

const feature = loadFeature("./__tests__/features/NotifiedFriend-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
  });

  test("After user end level1 game then usern can wait for friend user to end level1 game", ({ given, when, then }) => {
    let GameScoreWrapper: ShallowWrapper;
    let instance: NotifiedFriend;

    given("I am a User loading Notified screen", () => {
      GameScoreWrapper = shallow(<NotifiedFriend {...screenProps} />);
    });

    when("I see the okay button", () => {
      instance = GameScoreWrapper.instance() as NotifiedFriend
    });

    then("I can go back to the main screen", () => {
      let goBackBtn = GameScoreWrapper.findWhere(
        (node) => node.prop("testID") === "btnPressOkay"
      )
      goBackBtn.simulate("press");
    }
    );
  }
  );
}
);
