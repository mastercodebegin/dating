import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import QuestionBank from "../../src/QuestionBank";
import AllowMedia from "../../src/AllowMedia";
import ResponseSubmited from "../../src/ResponseSubmited";
import ProfileActive from "../../src/ProfileActive";

const navigation =  {
  addListener: jest.fn().mockImplementation((event, callback) => {
    callback();
  }),
  navigate: jest.fn(),
  goBack: jest.fn()
};

const screenProps = {
  navigation: navigation,
  id: "QuestionBank",
};

const allowMediaProps = {
  navigation: navigation,
  id: "AllowMedia",
};

const responseSubmitedProps = {
  navigation: navigation,
  id: "ResponseSubmited",
};

const profileActiveProps = {
  navigation: navigation,
  id: "ProfileActive",
};

const feature = loadFeature(
  "./__tests__/features/QuestionBank-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to QuestionBank", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: QuestionBank;

    given("I am a User loading QuestionBank", () => {
      exampleBlockA = shallow(<QuestionBank {...screenProps} />);
    });

    when("I navigate to the QuestionBank", () => {
      instance = exampleBlockA.instance() as QuestionBank;
    });

    then("QuestionBank will load without errors", () => {
      instance.componentDidMount();
      let message: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      )
      message.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        message.messageId
      )
      instance.questionGetApiCallId = message.messageId
      message.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "data": [
            {
              "id": "17",
              "type": "question",
              "attributes": {
                "question": "Gorgeous building Ugly view, Ugly building gorgeous view",
                "option": [
                  "Gorgeous building Ugly view",
                  "Ugly building gorgeous view"
                ]
              }
            },
            {
              "id": "18",
              "type": "question",
              "attributes": {
                "question": "Would you rather be able to fly or be invisible",
                "option": [
                  "Would you rather be able to fly",
                  "be invisible"
                ]
              }
            },
            {
              "id": "20",
              "type": "question",
              "attributes": {
                "question": " Pets/children",
                "option": [
                  "Pets",
                  "children"
                ]
              }
            },
            {
              "id": "21",
              "type": "question",
              "attributes": {
                "question": "Own aggression/partner’s aggression",
                "option": [
                  "Own aggression",
                  "partner’s aggression"
                ]
              }
            }
          ]
        }
      )
      runEngine.sendMessage("Unit Test", message)

    });

    then("I can select the 5 question without errors", () => {
      exampleBlockA.setState({ selectedQuestionIds: [1, 2, 3, 4, 5, 6] });
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "btnSubmitQuestion"
      );
      buttonComponent.simulate("press");
      instance.selectedQuestoinApi()
      instance.onPressQuestion(5)
      instance.doButtonPressed()
      instance.OkayButtonPressed()

      let message: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      )
      message.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        message.messageId
      )
      instance.questionSelectedApiCallId = message.messageId
      message.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "data": [
              {
                  "id": "354",
                  "type": "selected_question",
                  "attributes": {
                      "id": 354,
                      "account_id": 783,
                      "question_bank_id": 17
                  }
              },
              {
                  "id": "355",
                  "type": "selected_question",
                  "attributes": {
                      "id": 355,
                      "account_id": 783,
                      "question_bank_id": 18
                  }
              },
              {
                  "id": "356",
                  "type": "selected_question",
                  "attributes": {
                      "id": 356,
                      "account_id": 783,
                      "question_bank_id": 20
                  }
              },
              {
                  "id": "357",
                  "type": "selected_question",
                  "attributes": {
                      "id": 357,
                      "account_id": 783,
                      "question_bank_id": 21
                  }
              }
          ]
      }
      )
      runEngine.sendMessage("Unit Test", message)
    
    });

    then("Question selected api failed with errors", () => {
      let message: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      )
      message.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        message.messageId
      )
      instance.questionSelectedApiCallId = message.messageId
      message.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "errors": []
      }
      )
      runEngine.sendMessage("Unit Test", message)
    })

    then("I can leave the screen with out errors", () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "btnSubmitQuestion"
      );
      buttonComponent.simulate("press");
    });
  });

  test("User navigates to QuestionBank with error", ({ given, when, then, and }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: QuestionBank;

    given("I am a User load QuestionBank", () => {
      exampleBlockA = shallow(<QuestionBank {...screenProps} />);
    });

    when("I am a User navigate to the QuestionBank", () => {
      instance = exampleBlockA.instance() as QuestionBank;
    });

    then("QuestionBank will not load", () => {
      instance.componentDidMount();
      let message: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      )
      message.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        message.messageId
      )
      instance.questionGetApiCallId = message.messageId
      message.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "data": []
        }
      )
      runEngine.sendMessage("Unit Test", message)
    });

    then("Failed get question bank api", () => {
      let message: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      )
      message.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        message.messageId
      )
      instance.questionGetApiCallId = message.messageId
      message.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "errors": []
        }
      )
      runEngine.sendMessage("Unit Test", message)
    })

    and("I can not leave the screen with out errors", () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "btnSubmitQuestion"
      );
      buttonComponent.simulate("press");
    });
  });

  test("User navigates to QuestionBank with SelectedQuestion with error", ({ given, when, then, and }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: QuestionBank;

    given("I am a User load QuestionBank", () => {
      exampleBlockA = shallow(<QuestionBank {...screenProps} />);
    });

    when("I am a User navigate to the QuestionBank", () => {
      instance = exampleBlockA.instance() as QuestionBank;
    });

    then("QuestionBank load without errors", () => {
      instance.componentDidMount();
      let message: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      )
      message.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        message.messageId
      )
      instance.questionGetApiCallId = message.messageId
      message.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "data": [
              {
                  "id": "354",
                  "type": "selected_question",
                  "attributes": {
                      "id": 354,
                      "account_id": 783,
                      "question_bank_id": 17
                  }
              },
              {
                  "id": "355",
                  "type": "selected_question",
                  "attributes": {
                      "id": 355,
                      "account_id": 783,
                      "question_bank_id": 18
                  }
              },
              {
                  "id": "356",
                  "type": "selected_question",
                  "attributes": {
                      "id": 356,
                      "account_id": 783,
                      "question_bank_id": 20
                  }
              },
              {
                  "id": "357",
                  "type": "selected_question",
                  "attributes": {
                      "id": 357,
                      "account_id": 783,
                      "question_bank_id": 21
                  }
              }
          ]
      }
      )
      runEngine.sendMessage("Unit Test", message)
    });

    and("I can not select the 5 question", () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "btnSubmitQuestion"
      );
      buttonComponent.simulate("press");

    });

    and("I can not navigate to the next screen", () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "btnSubmitQuestion"
      );
      buttonComponent.simulate("press");
    }
    );

  });

  test("User navigates to AllowMedia", ({ given, when, then, and }) => {
    // Mock the necessary dependencies and navigation props
    let exampleBlockB: ShallowWrapper;
    let instance: AllowMedia;
    
    given("I navigate to the AllowMedia", () => {
      exampleBlockB = shallow(<AllowMedia {...allowMediaProps} />);
    });
    
    when("AllowMedia will load without errors", () => {
      instance = exampleBlockB.instance() as AllowMedia;
      instance.componentDidMount();
      // expect(exampleBlockB).toBeTruthy();
    });

    then("I can get Media access without errors", () => {
      instance.allowMedia();
      const buttonComponent = exampleBlockB.findWhere(
        (node) => node.prop("testID") === "btnAllowMedia"
      );
      buttonComponent.simulate("press");
      // expect(exampleBlockB).toBeTruthy();
    });

    and("I can navigate to UploadImage screen without errors", () => {
      // expect(navigation.navigate).toHaveBeenCalledWith("UploadImage");
    });
  });

  test("User navigates to AllowMedia with out error", ({ given, when, then, and }) => {
    // Mock the necessary dependencies and navigation props
    let exampleBlockB: ShallowWrapper;
    let instance: AllowMedia;

    given("I navigate to the AllowMedia screen", () => {
      exampleBlockB = shallow(<AllowMedia {...allowMediaProps} />);
    });

    when("AllowMedia screen will load without errors", () => {
      instance = exampleBlockB.instance() as AllowMedia;
      instance.componentDidMount();
      // expect(exampleBlockB).toBeTruthy();
    });

    then("I can not get Media access", () => {
      // instance.denyMedia();
      // const buttonComponent = exampleBlockB.findWhere(
      //   (node) => node.prop("testID") === "btnDenyMedia"
      // );
      // buttonComponent.simulate("press");
      // expect(exampleBlockB).toBeTruthy();
    });

    and("I can not navigate to UploadImage screen", () => {
      // expect(navigation.navigate).toHaveBeenCalledWith("UploadImage");
    });

  });

  test("User navigates to ResponseSubmited", ({ given, when, then }) => {
    // Mock the necessary dependencies and navigation props
    let exampleBlockC: ShallowWrapper;
    let instance: ResponseSubmited;

    given("I navigate to the ResponseSubmited", () => {
      exampleBlockC = shallow(<ResponseSubmited {...responseSubmitedProps} />);
    });

    when("ResponseSubmited will load without errors", () => {
      instance = exampleBlockC.instance() as ResponseSubmited;
      instance.componentDidMount();
      // expect(exampleBlockC).toBeTruthy();
    });

    then("I can navigate to the ProfileActive screen without errors", () => {
      const buttonComponent = exampleBlockC.findWhere(
        (node) => node.prop("testID") === "btnPressOkay"
      );
      buttonComponent.simulate("press");

    });
  });

  test("User navigates to ProfileActive", ({ given, when, then }) => {
    // Mock the necessary dependencies and navigation props
    let exampleBlockD: ShallowWrapper;
    let instance: ProfileActive;

    given("I navigate to the ProfileActive", () => {
      exampleBlockD = shallow(<ProfileActive {...profileActiveProps} />);
    });

    when("ProfileActive will load without errors", () => {
      instance = exampleBlockD.instance() as ProfileActive;
      instance.componentDidMount();
      // expect(exampleBlockD).toBeTruthy();

    })

    then("I can navigate to the AllowMedia screen without errors", () => {
      instance.goToQuestionBanck();
      const buttonComponent = exampleBlockD.findWhere(
        (node) => node.prop("testID") === "btnPressNext"
      );
      buttonComponent.simulate("press");
    });
  });


});
