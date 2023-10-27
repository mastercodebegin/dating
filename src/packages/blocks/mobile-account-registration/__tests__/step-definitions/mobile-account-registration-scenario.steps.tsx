import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";

import SignupRegistrationForm from "../../src/SignupRegistrationForm/SignupRegistrationForm";

const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "mobile-account-registration-scenario",
};

const feature = loadFeature(
  "./__tests__/features/mobile-account-registration-scenario.feature"
);

const screenPropsSignUp = {
  navigation: navigation,
  id: "signupRegistrationFormScenario",
};

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to SignUp Screen", ({ given, when, then }) => {
    let mobileAccountRegistrationWrapperRegistration: ShallowWrapper;
    let instance: SignupRegistrationForm;

    given("I navigate to the Registration Screen", () => {
      mobileAccountRegistrationWrapperRegistration = shallow(
        <SignupRegistrationForm {...screenPropsSignUp} />
      );
      expect(mobileAccountRegistrationWrapperRegistration).toBeTruthy();
    });

    when("I am a User attempting to Register with a User Detail", () => {
      instance =
        mobileAccountRegistrationWrapperRegistration.instance() as SignupRegistrationForm;
      instance.setState({
        firstName: "FIRST",
        email: "a@b.com",
        password: "Test@123",
        reTypePassword: "Test@123",
      });
    });

    then("Registration Should Succeed", () => {
      // expect(instance.addAdditionalDetail()).toBe(true);
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
      instance.addAdditionalDetailApiCallId = magLogInSucessRestAPI;
      runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
    });
  });

  test("Enter Empty Name", ({ given, when, then }) => {
    let mobileAccountRegistrationWrapperRegistration: ShallowWrapper;
    let instance: SignupRegistrationForm;

    given("I am a User attempting to Register with a User Detail", () => {
      mobileAccountRegistrationWrapperRegistration = shallow(
        <SignupRegistrationForm {...screenPropsSignUp} />
      );
      expect(mobileAccountRegistrationWrapperRegistration).toBeTruthy();
    });

    when("I Register with an empty Name", () => {
      instance =
        mobileAccountRegistrationWrapperRegistration.instance() as SignupRegistrationForm;
      instance.setState({ firstName: "a" });
    });

    then("I Register with an invalid Name", () => {
      let textInputComponent =
        mobileAccountRegistrationWrapperRegistration.findWhere(
          (node) => node.prop("testID") === "txtInputFirstName"
        );
      textInputComponent.simulate("changeText", "");
      textInputComponent.simulate("focus");
      textInputComponent.simulate("blur");
    });
    then("Registration Should Fail", () => {
      // expect(instance.addAdditionalDetail()).toBe(false);
    });

    then("Name Validaton will return an error", () => {
      const msg = instance.setState({ firstName: "" });
      // expect(msg).toBe(configJSON.errorFirstNameNotValid);
    });
  });

  test("Register Mobile Account Additional Details", ({
    given,
    when,
    then,
  }) => {
    let mobileAccountRegistrationWrapperRegistration: ShallowWrapper;
    let instance: SignupRegistrationForm;

    given("I am a User attempting to Register with a User Detail", () => {
      mobileAccountRegistrationWrapperRegistration = shallow(
        <SignupRegistrationForm {...screenProps} />
      );
      expect(mobileAccountRegistrationWrapperRegistration).toBeTruthy();
    });

    when("I navigate to the Registration Screen", () => {
      instance =
        mobileAccountRegistrationWrapperRegistration.instance() as SignupRegistrationForm;
    });

    then("I can enter a first name with out errors", () => {
      let textInputComponent =
        mobileAccountRegistrationWrapperRegistration.findWhere(
          (node) => node.prop("testID") === "txtInputFirstName"
        );
      textInputComponent.simulate("changeText", "FIRST");
      textInputComponent.simulate("focus");
      textInputComponent.simulate("blur");

      let buttonComponent =
        mobileAccountRegistrationWrapperRegistration.findWhere(
          (node) => node.prop("testID") === "Background"
        );
      buttonComponent.simulate("press");
    });

    then("I can enter a email with out errors", () => {
      let textInputComponent =
        mobileAccountRegistrationWrapperRegistration.findWhere(
          (node) => node.prop("testID") === "txtInputEmail"
        );
      textInputComponent.simulate("focus");
      textInputComponent.simulate("blur");
      textInputComponent.simulate("changeText", "a@bb.com");
    });

    then("I can enter a password with out errors", () => {
      let textInputComponent =
        mobileAccountRegistrationWrapperRegistration.findWhere(
          (node) => node.prop("testID") === "txtInputPassword"
        );
      textInputComponent.simulate("focus");
      textInputComponent.simulate("blur");
      textInputComponent.simulate("changeText", "Test@123");
    });

    then("I can toggle the Password Show/Hide with out errors", () => {
      let buttonComponent =
        mobileAccountRegistrationWrapperRegistration.findWhere(
          (node) => node.prop("testID") === "btnPasswordShowHide"
        );
      let buttonImage = mobileAccountRegistrationWrapperRegistration.findWhere(
        (node) => node.prop("testID") === "imgEnablePasswordField"
      );
      buttonComponent.simulate("press");
      buttonImage.simulate("press");
    });

    then("I can enter a confimation password with out errors", () => {
      let textInputComponent =
        mobileAccountRegistrationWrapperRegistration.findWhere(
          (node) => node.prop("testID") === "txtInputConfirmPassword"
        );
      textInputComponent.simulate("focus");
      textInputComponent.simulate("blur");
      textInputComponent.simulate("changeText", "Test@123");
    });

    then(
      "I can toggle the Confimation Password Show/Hide with out errors",
      () => {
        let buttonComponent =
          mobileAccountRegistrationWrapperRegistration.findWhere(
            (node) => node.prop("testID") === "btnConfirmPasswordShowHide"
          );
        buttonComponent.simulate("press");
      }
    );

    then("I can select the Submit button with out errors", () => {
      const msgPlayloadAPI = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      msgPlayloadAPI.addData(
        getName(MessageEnum.AuthTokenDataMessage),
        "USER-TOKEN"
      );
      runEngine.sendMessage("Unit Test", msgPlayloadAPI);
      let buttonComponent =
        mobileAccountRegistrationWrapperRegistration.findWhere(
          (node) => node.prop("testID") === "btnSignUp"
        );
      buttonComponent.simulate("press");

      let magLogInSucessRestAPI = new Message(
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
      instance.addAdditionalDetailApiCallId = magLogInSucessRestAPI;
      runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(mobileAccountRegistrationWrapperRegistration).toBeTruthy();
    });
  });

  test("Invalid Email", ({ given, when, then }) => {
    let mobileAccountRegistrationWrapperRegistration: ShallowWrapper;
    let instance: SignupRegistrationForm;

    given("I am a User attempting to Register with a User Detail", () => {
      mobileAccountRegistrationWrapperRegistration = shallow(
        <SignupRegistrationForm {...screenProps} />
      );
      expect(mobileAccountRegistrationWrapperRegistration).toBeTruthy();
    });

    when("I Register with an Invalid Email", () => {
      instance =
        mobileAccountRegistrationWrapperRegistration.instance() as SignupRegistrationForm;

      instance.setState({
        firstName: "test",
        email: "a",
        password: "Test@123",
        reTypePassword: "Test@123",
      });
    });

    then("I Register with an valid Email", () => {
      let textInputComponent =
        mobileAccountRegistrationWrapperRegistration.findWhere(
          (node) => node.prop("testID") === "txtInputEmail"
        );
      textInputComponent.simulate("changeText", "abc@gmail.com");
      textInputComponent.simulate("focus");
      textInputComponent.simulate("blur");
    });
    then("Registration Should Fail", () => {
      //  expect(instance.isValidEmail('as')).toBe(false);
    });

    then("Email Validaton will return an error", () => {
      const msg = instance.setState({ email: "" });
    });
  });

  test("User can signup by filling out the form", ({ given, when, then }) => {
    let instance: SignupRegistrationForm;
    // mobileAccountRegistrationWrapperRegistration.instance() as SignupRegistrationForm;

    let navigation: any;
    let state: any;

    given("the user is on the Signup screen", () => {
      navigation = {
        navigate: jest.fn(),
      };
      state = {
        firstName: "",
        email: "",
        password: "",
        reTypePassword: "",
      };
    });

    when('they enter their first name "John"', () => {
      state.firstName = "John";
    });

    when('they enter their email "john@example.com"', () => {
      state.email = "john@example.com";
    });

    when('they enter their password "password"', () => {
      state.password = "password";
    });

    when('they enter their password again "password"', () => {
      state.reTypePassword = "password";
    });

    when("they tap the Signup button", () => {
      // trigger the Signup button press event
    });

    then("they should be taken to the PhoneNumberInput", () => {
      // expect(navigation.navigate).toHaveBeenCalledWith('PhoneNumberInput');
    });
  });
});
