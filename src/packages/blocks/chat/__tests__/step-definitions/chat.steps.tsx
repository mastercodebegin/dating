import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Chat from "../../src/Chat";
import { IChat } from "../../src/ChatController";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    addListener: jest.fn().mockImplementation((event, callback) => {
      callback();
    }),
  },
  id: "Chat",
};

const feature = loadFeature("./__tests__/features/chat-scenario.feature");

const token = "TOKEN";
const accountId = 1;

const getChatableUsersApiSuccessResponse = {
  data: [
    {
      id: "173",
      type: "chat_friend",
      attributes: {
        account_id: 1387,
        friend_id: 1388,
        profile_id: 438,
        photo:
          "https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/5nqyx2vjrscehybi3cge78dvqdqs?response-content-disposition=inline%3B%20filename%3D%2220220725_000332.jpg%22%3B%20filename%2A%3DUTF-8%27%2720220725_000332.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230822%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230822T112100Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=db03e4524ac106db12365d600d51fddc0ee3e9f7efe17ed286850ebbe3767cde",
        full_name: "Priyanka Patel",
        user_name: "PRIYANKA",
      },
    },
  ],
};

const getNewMatchesApiSuccessResponses = {
  data: [
    {
      id: "1201",
      type: "matching_algorithm",
      attributes: {
        first_name: "dnjcdjcj",
        last_name: null,
        user_name: "dcjndcjn",
        profile_id: 304,
        photo:
          "https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/hmzxlb68sxfjhjlw2lw05fb92qr7?response-content-disposition=inline%3B%20filename%3D%22mountain.jpg%22%3B%20filename%2A%3DUTF-8%27%27mountain.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230822%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230822T115503Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=91b2a1068022f0acbd23bdac25d5f3a68aa24601dc32c771ac577a96b4b66ea4",
        compatibility: 60,
        star: false,
        is_attempted: false,
      },
    },
    {
      id: "1301",
      type: "matching_algorithm",
      attributes: {
        first_name: "abc",
        last_name: null,
        user_name: "Zkbzib",
        profile_id: 377,
        photo:
          "https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/bncdidn23xq925jnzz86edwdbg2n?response-content-disposition=inline%3B%20filename%3D%221.jpg%22%3B%20filename%2A%3DUTF-8%27%271.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230822%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230822T115503Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=ffe36a5b4388794f18a54ec4d5e217508a960445b37d5fb48b167969e6b2fc6e",
        compatibility: 70,
        star: false,
        is_attempted: false,
      },
    },
    {
      id: "1305",
      type: "matching_algorithm",
      attributes: {
        first_name: "Tanya",
        last_name: "Patel",
        user_name: null,
        profile_id: 380,
        photo:
          "https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/0decl91qq9w5doiuq56nf7ey0nl3?response-content-disposition=inline%3B%20filename%3D%221690952162149.jpg%22%3B%20filename%2A%3DUTF-8%27%271690952162149.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230822%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230822T115503Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=adb011113321374f91a8b02096278790b070f69687ee4d35e13278657538e408",
        compatibility: 100,
        star: false,
        is_attempted: false,
      },
    },
    {
      id: "1315",
      type: "matching_algorithm",
      attributes: {
        first_name: "Priti",
        last_name: null,
        user_name: "PRITI",
        profile_id: 385,
        photo:
          "https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/arex7t4o91szcdbip11yc01jbcz7?response-content-disposition=inline%3B%20filename%3D%22HTB1k1S2PFXXXXayXVXXq6xXFXXXp.jpg%22%3B%20filename%2A%3DUTF-8%27%27HTB1k1S2PFXXXXayXVXXq6xXFXXXp.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230822%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230822T115503Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=45500ad7685ec392a34489f37db8dbdca0a39b92ece0900294f51b0e7999a68e",
        compatibility: 100,
        star: false,
        is_attempted: false,
      },
    },
    {
      id: "1323",
      type: "matching_algorithm",
      attributes: {
        first_name: "abc",
        last_name: null,
        user_name: "Test66",
        profile_id: 391,
        photo:
          "https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/yh2b5hxsdzwy07nhbuuwhmcbf6dz?response-content-disposition=inline%3B%20filename%3D%22IMG_20230801_222040.jpg%22%3B%20filename%2A%3DUTF-8%27%27IMG_20230801_222040.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230822%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230822T115503Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=8c18c86750642d29e7f89aaeac3cb3590aac69059c1cb219110b5e43181bebc4",
        compatibility: 65,
        star: false,
        is_attempted: false,
      },
    },
  ],
};

const getNewMatchesApiFailureResponses = {
  errors: {}
};

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
    jest.spyOn(runEngine, "sendMessage");
  });

  test("User can see chatable users and new matches", ({
    given,
    when,
    then,
  }) => {
    let chatWrapper: ShallowWrapper;
    let instance: Chat;

    given("I am a User loading Chat screen", () => {
      chatWrapper = shallow(<Chat {...screenProps} />);
      instance = chatWrapper.instance() as Chat;
    });
    when("I will see chatable users and new matches", () => {
      const getChatableUsers = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getChatableUsers.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getChatableUsers.messageId
      );
      getChatableUsers.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        getChatableUsersApiSuccessResponse
      );
      instance.getChatableUsersApiId = getChatableUsers.messageId;
      runEngine.sendMessage("Unit Test", getChatableUsers);

      const getNewMatches = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getNewMatches.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getNewMatches.messageId
      );
      getNewMatches.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        getNewMatchesApiSuccessResponses
      );
      instance.getNewMatchesApiId = getNewMatches.messageId;
      runEngine.sendMessage("Unit Test", getNewMatches);
      expect(instance.state.newMatchesLoading).toBe(false);  
    });
    then("User clicks on a new match", () => {
      let flatList = chatWrapper.findWhere(
        (node) => node.prop("data-testid") === "newMatchFlatList"
      );
      const render_item = flatList.renderProp("renderItem")({
        item: getNewMatchesApiSuccessResponses.data[0],
        index: 0,
      });
      let newMatch = render_item.findWhere(
        (node) => node.prop("data-testid") === "newMatch"
      );
      expect(newMatch).toBeTruthy();
      newMatch.simulate("press");
    });
    then("If there are no new matches, newMatches array will be empty", () => {
      const getNewMatchesFail = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getNewMatchesFail.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getNewMatchesFail.messageId
      );
      getNewMatchesFail.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        getNewMatchesApiFailureResponses
      );
      instance.getNewMatchesApiId = getNewMatchesFail.messageId;
      runEngine.sendMessage("Unit Test", getNewMatchesFail);
      expect(instance.state.newMatches).toEqual([]);

      // Covering functions which are passed as prop to the component
      chatWrapper.findWhere(
        (node) => node.prop("data-testid") === "CometChatConversationListWithMessages"
      )
        .props()
        .startChatListLoading();
      chatWrapper.findWhere(
        (node) => node.prop("data-testid") === "CometChatConversationListWithMessages"
      )
        .props()
        .stopChatListLoading();
      chatWrapper.findWhere(
        (node) => node.prop("data-testid") === "CometChatConversationListWithMessages"
      )
        .props()
        .startUserListLoading();
      chatWrapper.findWhere(
        (node) => node.prop("data-testid") === "CometChatConversationListWithMessages"
      )
        .props()
        .stopUserListLoading();
    })
  });
});
