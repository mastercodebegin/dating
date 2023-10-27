import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";

import AdditionalDetailForm from "../../src/AdditionalDetailForm";

const navigation = require("react-navigation");

const screenProps = {
  navigation: {
    navigate: jest.fn()
  },
  id: "AdditionalDetailForm-scenario",
};

const feature = loadFeature(
  "./__tests__/features/AdditionalDetailForm-scenario.feature"
);

const screenPropsSignUp = {
  navigation: navigation,
  id: "AdditionalDetailFormScenario",
};

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to Mobile Phone Number AdditionalDetailForm", ({
    given,
    when,
    then,
  }) => {
    let mobileAccountRegistrationWrapperRegistration: ShallowWrapper;
    let instance: AdditionalDetailForm;

    given(
      "I am a User attempting to AdditionalDetailForm with a Mobile Phone Number",
      () => {
        mobileAccountRegistrationWrapperRegistration = shallow(
          <AdditionalDetailForm {...screenProps} />
        );
        expect(mobileAccountRegistrationWrapperRegistration).toBeTruthy();
      }
    );

    when("I navigate to the AdditionalDetailForm Screen", () => {
      instance =
        mobileAccountRegistrationWrapperRegistration.instance() as AdditionalDetailForm;
    });

    then("I can enter a phone number with out errors", () => {
      let textInputComponent =
        mobileAccountRegistrationWrapperRegistration.findWhere(
          (node) => node.prop("testID") === "txtInputFirstName"
        );
      textInputComponent.simulate("changeText", "abc");

      let buttonComponent =
        mobileAccountRegistrationWrapperRegistration.findWhere(
          (node) => node.prop("testID") === "Background"
        );
      buttonComponent.simulate("press");

    });

      then("I can enter a last Name with out errors", () => {
        let textInputComponent =
          mobileAccountRegistrationWrapperRegistration.findWhere(
            (node) => node.prop("testID") === "txtInputLastName"
          );
        textInputComponent.simulate("changeText", "abc");
    
      });
      then("I can enter a email with out errors", () => {
        let textInputComponent =
          mobileAccountRegistrationWrapperRegistration.findWhere(
            (node) => node.prop("testID") === "txtInputEmail"
          );
        textInputComponent.simulate("changeText", "abc");
    
      });
      then("I can enter a password with out errors", () => {
        let textInputComponent =
          mobileAccountRegistrationWrapperRegistration.findWhere(
            (node) => node.prop("testID") === "txtInputPassword"
          );
        textInputComponent.simulate("changeText", "abc");
    
      });

    then("I can select the Submit button with out errors", () => {
      let buttonComponent =
        mobileAccountRegistrationWrapperRegistration.findWhere(
          (node) => node.prop("testID") === "btnSignUp"
        );
      buttonComponent.simulate("press");
    });
    then("I can select the hide button with out errors", () => {
        let buttonComponent =
          mobileAccountRegistrationWrapperRegistration.findWhere(
            (node) => node.prop("testID") === "btnPasswordShowHide"
          );
        buttonComponent.simulate("press");
      });
      then("I can select the confirm passowrd button with out errors", () => {
        let buttonComponent =
          mobileAccountRegistrationWrapperRegistration.findWhere(
            (node) => node.prop("testID") === "txtInputConfirmPassword"
          );
          buttonComponent.simulate("changeText", "abc");
      });
      then("I can select the confirm passowrd hide button with out errors", () => {
        let buttonComponent =
          mobileAccountRegistrationWrapperRegistration.findWhere(
            (node) => node.prop("testID") === "btnConfirmPasswordShowHide"
          );
        buttonComponent.simulate("press");
      });
      
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


      then('I can check new validationApiCallId api with out error', () => {

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
                "data":
                    [
                        {}
                    ]

            }
        );
        magLogInSucessRestAPI.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            magLogInSucessRestAPI.messageId
        );
        instance.validationApiCallId = magLogInSucessRestAPI.messageId;
        runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);


    });

    then('I can check new validationApiCallId api with error', () => {

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
                    [
                        {}
                    ]

            }
        );
        magLogInSucessRestAPI.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            magLogInSucessRestAPI.messageId
        );
        instance.validationApiCallId = magLogInSucessRestAPI.messageId;
        runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);

    });

    then("validating mobile on server", () => {
        instance.goToPrivacyPolicy()
        instance.goToTermsAndCondition()
      });



    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(mobileAccountRegistrationWrapperRegistration).toBeTruthy();
    });

  });

});
