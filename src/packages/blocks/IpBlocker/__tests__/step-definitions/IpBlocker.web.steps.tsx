import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import IpBlocker from "../../src/IpBlocker.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "IpBlocker",
};

const feature = loadFeature(
  "./__tests__/features/IpBlocker-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to IpBlocker", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: IpBlocker;

    given("I am a User loading IpBlocker", () => {
      exampleBlockA = shallow(<IpBlocker {...screenProps} />);
    });

    when("I navigate to the IpBlocker", () => {
      instance = exampleBlockA.instance() as IpBlocker;
    });

    then("IpBlocker will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();
    });
  });
});
