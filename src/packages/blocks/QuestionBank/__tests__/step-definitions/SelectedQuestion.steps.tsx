import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import SelectedQuestion from "../../src/SelectedQuestion";

const navigation =  {
  addListener: jest.fn().mockImplementation((event, callback) => {
    callback();
  }),
  navigate: jest.fn(),
  goBack: jest.fn()
};

const screenProps = {
  navigation: navigation,
  id: "SelectedQuestion",
};

const feature = loadFeature(
  "./__tests__/features/SelectedQuestion-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to SelectedQuestion", ({ given, when, then }) => {
    let selectedQuestionShallowWrapper: ShallowWrapper;
    let instance: SelectedQuestion;

    given("I am a User loading SelectedQuestion", () => {
      selectedQuestionShallowWrapper = shallow(
        <SelectedQuestion {...screenProps} />
      );
    });

    when("I navigate to the SelectedQuestion", () => {
      instance = selectedQuestionShallowWrapper.instance() as SelectedQuestion;
    });

    then("SelectedQuestion will load without errors", () => {

      instance.componentDidMount();

      let message: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      )
      message.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        message.messageId
      )
      instance.question1ApiId = message.messageId
      instance.receive('test', message)

      let  selectedQuestionFlatlist = selectedQuestionShallowWrapper.findWhere(
        (node) => node.prop("testID") === "flatListSelectedQuestion"
    );

    selectedQuestionFlatlist.props().keyExtractor({}, 3);
    selectedQuestionFlatlist.props().renderItem({ item:  instance.state.questionApiData[0], index: 0 })
    const FlatListRenderItem = selectedQuestionFlatlist.renderProp('renderItem')({ item:  instance.state.questionApiData[0], index: 0 })
    // const openGalleryBtn = FlatListRenderItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'btnOption')
    // openGalleryBtn.simulate("press");

      instance.onSubmit()
      instance.onNext()
      instance.onPressOption("question", 1)
      instance.checkQueSelected("question", 1)
      instance.onPageChange()
      instance.startFromBegining()

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
    // let buttonComponent = selectedQuestionShallowWrapper.findWhere(
    //   (node) => node.prop("testID") === "btnSubmitQuestion"
    // );
    // buttonComponent.simulate("press");
    let message: Message = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    )
    message.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      message.messageId
    )
    instance.questionAnswerApiId = message.messageId

    message.addData(
      getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "data": [
              {
                  "id": "1019",
                  "type": "attempt_question",
                  "attributes": {
                      "id": 1019,
                      "account_id": 783,
                      "question_bank_id": null,
                      "save_correct_answer": "[\"option1\"]"
                  }
              },
              {
                  "id": "1020",
                  "type": "attempt_question",
                  "attributes": {
                      "id": 1020,
                      "account_id": 783,
                      "question_bank_id": null,
                      "save_correct_answer": "[\"option1\"]"
                  }
              }
          ]
      }
    )
    runEngine.sendMessage("Unit Test", message)
  });

  then("I can leave the screen with out errors", () => {
    // let btnLeftArrow = selectedQuestionShallowWrapper.findWhere(
    //   (node) => node.prop("testID") === "btnLeftArrow"
    // );
    // btnLeftArrow.simulate("press");
    let btnRightArrow = selectedQuestionShallowWrapper.findWhere(
      (node) => node.prop("testID") === "btnRightArrow"
    );
    btnRightArrow.simulate("press");
    // instance.onSubmit()
    
  });
});
});
