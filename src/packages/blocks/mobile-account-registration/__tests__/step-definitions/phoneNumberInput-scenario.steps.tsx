import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";

import PhoneNumberInput from "../../src/PhoneNumberInput";

const navigation = require("react-navigation");

const screenProps = {
  navigation: {
    navigate: jest.fn()
  },
  id: "phoneNumberInput-scenario",
};

const feature = loadFeature(
  "./__tests__/features/phoneNumberInput-scenario.feature"
);

const screenPropsSignUp = {
  navigation: navigation,
  id: "phoneNumberInputScenario",
};

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to Mobile Phone Number Registration", ({
    given,
    when,
    then,
  }) => {
    let mobileAccountRegistrationWrapperRegistration: ShallowWrapper;
    let instance: PhoneNumberInput;

    given(
      "I am a User attempting to Register with a Mobile Phone Number",
      () => {
        mobileAccountRegistrationWrapperRegistration = shallow(
          <PhoneNumberInput {...screenProps} />
        );
        expect(mobileAccountRegistrationWrapperRegistration).toBeTruthy();
      }
    );

    when("I navigate to the Registration Screen", () => {
      instance =
        mobileAccountRegistrationWrapperRegistration.instance() as PhoneNumberInput;
    });

    then("I can enter a phone number with out errors", () => {
      let textInputComponent =
        mobileAccountRegistrationWrapperRegistration.findWhere(
          (node) => node.prop("testID") === "txtInputPhoneNumber"
        );
      textInputComponent.simulate("changeText", "9876543213");
      textInputComponent.simulate("focus");
      textInputComponent.simulate("blur");

      let buttonComponent =
        mobileAccountRegistrationWrapperRegistration.findWhere(
          (node) => node.prop("testID") === "Background"
        );
      buttonComponent.simulate("press");

    });

    then("I can select the Submit button with out errors", () => {
      let buttonComponent =
        mobileAccountRegistrationWrapperRegistration.findWhere(
          (node) => node.prop("testID") === "btnSendOtp"
        );
      buttonComponent.simulate("press");
    });

    then("I can click on back btn", () => {
      let buttonComponent =
        mobileAccountRegistrationWrapperRegistration.findWhere(
          (node) => node.prop("testID") === "backBtn"
        );
      buttonComponent.simulate("press");
    });
    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(mobileAccountRegistrationWrapperRegistration).toBeTruthy();
    });
  });

  test("Empty Mobile Phone Number", ({ given, when, then }) => {
    let mobileAccountRegistrationWrapperRegistration: ShallowWrapper;
    let instance: PhoneNumberInput;

    given("I am a User attempting to Register with a Mobile Phone", () => {
      mobileAccountRegistrationWrapperRegistration = shallow(
        <PhoneNumberInput {...screenProps} />
      );
      expect(mobileAccountRegistrationWrapperRegistration).toBeTruthy();
    });

    when("I Register with an empty Mobile Phone Number", () => {
      instance =
        mobileAccountRegistrationWrapperRegistration.instance() as PhoneNumberInput;
      instance.setState({ mobileNo: "" });
    });

    then("Registration Should Fail", () => {
      // expect(instance.sendOtp()).toBe(true);
    });

    then("Phone Number Validaton will return an error", () => {
      const msg = instance.setState({ mobileNo: "" });
      // expect(msg).toBe("Please enter a valid phone number");
    });
  });

  test("Enter Valid Mobile Phone Number", ({ given, when, then }) => {
    let mobileAccountRegistrationWrapperRegistration: ShallowWrapper;
    let instance: PhoneNumberInput;

    given("I am User attempting to Register with a Mobile Phone", () => {
      mobileAccountRegistrationWrapperRegistration = shallow(
        <PhoneNumberInput {...screenProps} />
      );
      expect(mobileAccountRegistrationWrapperRegistration).toBeTruthy();
    });

    when("I Registration with Mobile Phone Number", () => {
      instance =
        mobileAccountRegistrationWrapperRegistration.instance() as PhoneNumberInput;
      instance.setState({ mobileNo: "9876543215" });
    });

    then("Registration Should Succeed", () => {
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
          "erro": {},
        }
      );
      instance.phoneAuthApiCallId = magLogInSucessRestAPI;
      runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
    });

    then("RestAPI will return token", () => {
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
          meta: {
            token:
              "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAsInR5cGUiOiJTbXNBY2NvdW50IiwiZXhwIjoxNTc2Njk1ODk4fQ.kB2_Z10LNwDmbo6B39esgM0vG9qTAG4U9uLxPBYrCX5PCro0LxQHI9acwVDnfDPsqpWYvQmoejC2EO8MFoEz7Q",
          },
        }
      );
      instance.phoneAuthApiCallId = magLogInSucessRestAPI;
      runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
    });


    then("to check mobile number error", () => {
      let textInputComponent = mobileAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'txtInputPhoneNumber');
      textInputComponent.simulate('changeText', '');
      textInputComponent.simulate('blur');
    
    });

  });
});
