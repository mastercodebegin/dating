import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import ContactUs2 from "../../src/ContactUs2/ConstactUs2";
// import AddContactUs from "../../src/AddContactus";
const navigation = require("react-navigation");

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
export const configJSON = require("../../config.json");
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { _ } from "../../../../framework/src/IBlock";

const screenProps = {
  navigation: {
    goBack: jest.fn(),
  },
  id: "ContactUs2",
};

const submitQuerySuccessResponse = {
    "data": {
        "id": "2",
        "type": "contact",
        "attributes": {
            "id": 2,
            "title": "hii",
            "description": "Explaination of app",
            "created_at": "2023-08-28T13:01:37.787Z"
        }
    }
}

const feature = loadFeature("./__tests__/features/ContactUs2-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User will be able to submit queries", ({ given, when, then }) => {
    let ContactUs2Wrapper: ShallowWrapper;
    let instance: ContactUs2;

    given("User will load ContactUs2", () => {
      ContactUs2Wrapper = shallow(<ContactUs2 {...screenProps} />);
      instance = ContactUs2Wrapper.instance() as ContactUs2;

      let hideKeyboardBackGround = ContactUs2Wrapper.findWhere(
        (node) => node.prop("data-testid") === "background"
      );
      hideKeyboardBackGround.simulate("press");

      let backButton = ContactUs2Wrapper.findWhere(
        (node) => node.prop("data-testid") === "backButton"
      )
      backButton.simulate("press");
    });

    then("If user dont enter query title and description there will be error", () => {
        let textInput1 = ContactUs2Wrapper.findWhere(
            (node) => node.prop("data-testid") === "queryTitle"
        );
        textInput1.simulate("changeText", "");
        textInput1.simulate("focus");
        textInput1.simulate("blur")

        let textInput2 = ContactUs2Wrapper.findWhere(
            (node) => node.prop("data-testid") === "queryDescription"
        );
        textInput2.simulate("changeText", "");
        textInput2.simulate("focus");
        textInput2.simulate("blur")
        expect(instance.state.queryTitleError).toEqual("Please enter query title")
      

    });
    then("User can enter query title and description", () => {
        let textInput1 = ContactUs2Wrapper.findWhere(
            (node) => node.prop("data-testid") === "queryTitle"
        );
        textInput1.simulate("changeText", "Some title");
        textInput1.simulate("focus");
        textInput1.simulate("blur")

        let textInput2 = ContactUs2Wrapper.findWhere(
            (node) => node.prop("data-testid") === "queryDescription"
        );
        textInput2.simulate("changeText", "Some description");
        textInput2.simulate("focus");
        textInput2.simulate("blur")
        expect(instance.state.queryDescription).toEqual("Some description");
      

    });
    then("User can submit query details", () => {
        let submitButton = ContactUs2Wrapper.findWhere(
            (node) => node.prop("data-testid") === "submitButton"
        )
        submitButton.simulate("press", {
            data: {
              title: "nikhil",
              description: "this.state.queryDescription"
            } });

        const submitQuery = new Message(
            getName(MessageEnum.RestAPIResponceMessage)
          );
          submitQuery.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            submitQuery.messageId
          );
          submitQuery.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            submitQuerySuccessResponse
          );
          instance.submitQueryApiId = submitQuery.messageId;
          runEngine.sendMessage("Unit Test", submitQuery);
          expect(instance.props.navigation.goBack).toBeCalled();
      })
  });
});
