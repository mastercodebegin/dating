import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
    getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Level1screen1 from "../../src/level1Questions/Level1screen1";

const navigation = {
    addListener: jest.fn().mockImplementation((event, callback) => {
        callback();
    }),
    navigate: jest.fn(),
    goBack: jest.fn()
};

const screenProps = {
    navigation: navigation,
    id: "Level1Question",
};

const feature = loadFeature(
    "./__tests__/features/Level1Question-scenario.feature"
);

const questionDataResponse = {
    "data": [
        {
            "id": "15",
            "type": "question",
            "attributes": {
                "question": "What would you pick ?",
                "option": [
                    "1 Crore right away",
                    "50% chance of 10 crores"
                ]
            }
        },
        {
            "id": "12",
            "type": "question",
            "attributes": {
                "question": "What would you pick ?",
                "option": [
                    "Would you rather have a million dollars",
                    "Restart your life at 16 years of age"
                ]
            }
        }
    ]
}

let questionDataListComponent: any;

defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
        jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    });

    test("User navigates to Level1Question", ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: Level1screen1;

        given("I am a User loading Level1Question", () => {
            exampleBlockA = shallow(<Level1screen1 {...screenProps} />);
        });

        when("I navigate to the Level1Question", () => {
            instance = exampleBlockA.instance() as Level1screen1;
        });

        then("Level1Question will load without errors", () => {
            instance.componentDidMount();
            let message: Message = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            )
            message.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                message.messageId
            )
            instance.question1ApiId = message.messageId
            message.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                questionDataResponse
            )
            runEngine.sendMessage("Unit Test", message)

        });

        then("Get question api with error", () => {
            let message: Message = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            )
            message.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                message.messageId
            )
            instance.question1ApiId = message.messageId
            message.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    errors:  {}
                }
            )
            runEngine.sendMessage("Unit Test", message)
        })

        then("Render flatlist component", () => {
            questionDataListComponent = exampleBlockA.findWhere(
                (node) => node.prop("testID") === "questionDataList"
            );
            questionDataListComponent.props().keyExtractor({}, 3);
            questionDataListComponent.props().renderItem({ item: questionDataResponse.data[0], index: 0 })
            const FlatListRenderItem = questionDataListComponent.renderProp('renderItem')({ item: questionDataResponse.data[0], index: 0 })
            const questionDataListBtn = FlatListRenderItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'optionSelectButton0')
            questionDataListBtn.simulate("press");
        });

        then("I can press the right arrow button", () => {
            let rightArrowComponent = exampleBlockA.findWhere(
                (node) => node.prop("testID") === "testRightArrow"
            );
            rightArrowComponent.simulate("press");
            questionDataListComponent.props().renderItem({ item: questionDataResponse.data[1], index: 1 })
            questionDataListComponent.props().onViewableItemsChanged({ viewableItems: [{ index: 1 }] })
        });

        then("I can press the left arrow button", () => {
            instance.slideRef = {
                current: {
                    _listRef: {
                        _scrollRef: {
                            scrollTo: jest.fn()
                        }
                    }
                }
            }
            let leftArrowComponent = exampleBlockA.findWhere(
                (node) => node.prop("testID") === "testLeftArrow"
            );
            leftArrowComponent.simulate("press");
            questionDataListComponent.props().renderItem({ item: questionDataResponse.data[0], index: 0 })
            questionDataListComponent.props().onViewableItemsChanged({ viewableItems: [{ index: 0 }] })
        });

        then("I can select the option and click right arrow button", () => {
            const FlatListRenderItem = questionDataListComponent.renderProp('renderItem')({ item: questionDataResponse.data[1], index: 1 })
            const questionDataListBtn = FlatListRenderItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'optionSelectButton0')
            questionDataListBtn.simulate("press");
            let rightArrowComponent = exampleBlockA.findWhere(
                (node) => node.prop("testID") === "testRightArrow"
            );
            rightArrowComponent.simulate("press");
            questionDataListComponent.props().renderItem({ item: questionDataResponse.data[1], index: 1 })
            questionDataListComponent.props().onViewableItemsChanged({ viewableItems: [{ index: 1 }] })
        });

        then("I can select the option and submit answer", () => {
            const FlatListRenderItem = questionDataListComponent.renderProp('renderItem')({ item: questionDataResponse.data[1], index: 1 })
            const questionDataListBtn = FlatListRenderItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'optionSelectButton0')
            questionDataListBtn.simulate("press");
            let rightArrowComponent = exampleBlockA.findWhere(
                (node) => node.prop("testID") === "testRightArrow"
            );
            rightArrowComponent.simulate("press");
            let submitApiMessage: Message = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            )
            submitApiMessage.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                submitApiMessage.messageId
            )
            instance.questionAnswerSubmitApiId = submitApiMessage.messageId
            submitApiMessage.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    data: {}
                }
            )
            runEngine.sendMessage("Unit Test", submitApiMessage)
        });

        then("Submit answer with error", () => {
            const FlatListRenderItem = questionDataListComponent.renderProp('renderItem')({ item: questionDataResponse.data[1], index: 1 })
            const questionDataListBtn = FlatListRenderItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'optionSelectButton0')
            questionDataListBtn.simulate("press");
            let rightArrowComponent = exampleBlockA.findWhere(
                (node) => node.prop("testID") === "testRightArrow"
            );
            rightArrowComponent.simulate("press");
            let submitApiMessage: Message = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            )
            submitApiMessage.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                submitApiMessage.messageId
            )
            instance.questionAnswerSubmitApiId = submitApiMessage.messageId
            submitApiMessage.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    errors: {}
                }
            )
            runEngine.sendMessage("Unit Test", submitApiMessage)
        });
    });


});
