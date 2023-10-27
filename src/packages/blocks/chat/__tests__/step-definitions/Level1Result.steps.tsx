import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Level1Result from "../../src/Level1Result";

const navigation = {
  addListener: jest.fn().mockImplementation((event, callback) => {
    callback();
  }),
  navigate: jest.fn(),
  goBack: jest.fn()
};

const screenProps = {
  navigation,
  id: "Level1Result",
};

const feature = loadFeature("./__tests__/features/Level1Result-scenario.feature");
const getScoreAPISuccessResponse = {
  "data": {
    "id": "1",
    "type": "show_score",
    "attributes": {
      "id": 1,
      "my_score": 5,
      "friend_score": 5,
      "status": false,
      "points": 0,
      "my_photos": "https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/aaymtv6ad2pnaoypy6ss00m2cnio?response-content-disposition=inline%3B%20filename%3D%221692007543772.jpg%22%3B%20filename%2A%3DUTF-8%27%271692007543772.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230814%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230814T112013Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=3bb7d39aa5cd7041c4c5c821c738ccfd3c761e96e658e441e3984d102bbd8420",
      "friends_photos": "https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/o3fphbvj4cx2hdhktgxr68bbjyn3?response-content-disposition=inline%3B%20filename%3D%221692007361157.jpg%22%3B%20filename%2A%3DUTF-8%27%271692007361157.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230814%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230814T112013Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=ca373bb56b6cc472c8cfe35b209c1e51baf040d9dfe80f73bb6680dbc9eeb551",
      "my_name": "Shardha",
      "friends_name": "Srk"
    }
  }
}

const getWinScoreAPISuccessResponse = {
  "data": {
    "id": "1",
    "type": "show_score",
    "attributes": {
      "id": 1,
      "my_score": 5,
      "friend_score": 5,
      "status": true,
      "points": 0,
      "my_photos": "https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/aaymtv6ad2pnaoypy6ss00m2cnio?response-content-disposition=inline%3B%20filename%3D%221692007543772.jpg%22%3B%20filename%2A%3DUTF-8%27%271692007543772.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230814%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230814T112013Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=3bb7d39aa5cd7041c4c5c821c738ccfd3c761e96e658e441e3984d102bbd8420",
      "friends_photos": "https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/o3fphbvj4cx2hdhktgxr68bbjyn3?response-content-disposition=inline%3B%20filename%3D%221692007361157.jpg%22%3B%20filename%2A%3DUTF-8%27%271692007361157.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230814%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230814T112013Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=ca373bb56b6cc472c8cfe35b209c1e51baf040d9dfe80f73bb6680dbc9eeb551",
      "my_name": "Shardha",
      "friends_name": "Srk"
    }
  }
}

const getUserStatusAPISuccessResponse = {
  "data": {
    "id": "51",
    "type": "connection",
    "attributes": {
      "account_id": 291,
      "receiver_id": 292,
      "status": "pending",
      "profile_id": 59,
      "photo": "https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/n0ag06ujdi7z8ouxdgynbtgkt15u?response-content-disposition=inline%3B%20filename%3D%22Screenshot%20from%202023-07-21%2014-27-41%25281%2529.png%22%3B%20filename%2A%3DUTF-8%27%27Screenshot%2520from%25202023-07-21%252014-27-41%25281%2529.png&response-content-type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230816%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230816T170330Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=9bfe19dd7b053e169834dafb68476b1192063160f01c3848b4054ef24d92564e",
      "full_name": "nehal",
      "user_name": null,
      "is_requested": true,
      "is_accepted": false
    }
  }
}

const getWinUserStatusAPISuccessResponse = {
  "data": {
    "id": "51",
    "type": "connection",
    "attributes": {
      "account_id": 291,
      "receiver_id": 292,
      "status": "pending",
      "profile_id": 59,
      "photo": "https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/n0ag06ujdi7z8ouxdgynbtgkt15u?response-content-disposition=inline%3B%20filename%3D%22Screenshot%20from%202023-07-21%2014-27-41%25281%2529.png%22%3B%20filename%2A%3DUTF-8%27%27Screenshot%2520from%25202023-07-21%252014-27-41%25281%2529.png&response-content-type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230816%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230816T170330Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=9bfe19dd7b053e169834dafb68476b1192063160f01c3848b4054ef24d92564e",
      "full_name": "nehal",
      "user_name": null,
      "is_requested": true,
      "is_accepted": false
    }
  }
}

const getUserAceeptedAPISuccessResponse = {
  "data": {
    "id": "51",
    "type": "connection",
    "attributes": {
      "account_id": 291,
      "receiver_id": 292,
      "status": "pending",
      "profile_id": 59,
      "photo": "https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/n0ag06ujdi7z8ouxdgynbtgkt15u?response-content-disposition=inline%3B%20filename%3D%22Screenshot%20from%202023-07-21%2014-27-41%25281%2529.png%22%3B%20filename%2A%3DUTF-8%27%27Screenshot%2520from%25202023-07-21%252014-27-41%25281%2529.png&response-content-type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230816%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230816T170330Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=9bfe19dd7b053e169834dafb68476b1192063160f01c3848b4054ef24d92564e",
      "full_name": "nehal",
      "user_name": null,
      "is_requested": false,
      "is_accepted": false
    }
  }
}


const sendFrdReqAPISuccessResponse = { "data": { "id": "5", "type": "connection", "attributes": { "account_id": 1333, "receiver_id": 1332, "status": "pending", "profile_id": 396, "photo": "https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/d3a9qg780td8entwlxuh4t1k355a?response-content-disposition=inline%3B%20filename%3D%22null-20230806-WA0003.jpg%22%3B%20filename%2A%3DUTF-8%27%27null-20230806-WA0003.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230817%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230817T040407Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=21585794db3793a37dc64911644d599bd4ceaaed08fea60391e82af708a4b509", "full_name": "Rakesh Patel", "user_name": "rakesh", "is_requested": true, "is_accepted": false } }, "meta": { "message": "Friend request has been sent to the Arti" } }
const alredySendFrdAPISuccessResponse = { "data": { "id": "5", "type": "connection", "attributes": { "account_id": 1333, "receiver_id": 1332, "status": "pending", "profile_id": 396, "photo": "https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/d3a9qg780td8entwlxuh4t1k355a?response-content-disposition=inline%3B%20filename%3D%22null-20230806-WA0003.jpg%22%3B%20filename%2A%3DUTF-8%27%27null-20230806-WA0003.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230817%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230817T040407Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=21585794db3793a37dc64911644d599bd4ceaaed08fea60391e82af708a4b509", "full_name": "Rakesh Patel", "user_name": "rakesh", "is_requested": false, "is_accepted": false } }, "meta": { "message": "Friend request has been sent to the Arti" } }
const acceptAndRejectReqAPISuccessResponse = { "data": { "id": "5", "type": "connection", "attributes": { "account_id": 1333, "receiver_id": 1332, "status": "accepted", "profile_id": 396, "photo": "https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/d3a9qg780td8entwlxuh4t1k355a?response-content-disposition=inline%3B%20filename%3D%22null-20230806-WA0003.jpg%22%3B%20filename%2A%3DUTF-8%27%27null-20230806-WA0003.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230817%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230817T040407Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=21585794db3793a37dc64911644d599bd4ceaaed08fea60391e82af708a4b509", "full_name": "Rakesh Patel", "user_name": "rakesh", "is_requested": true, "is_accepted": true } }, "meta": { "message": "Friend request has been accepted" } }


const errorRes = {
  "errors": []
}

const errorRes2 = {
  "errors": [
    { "message": "Something went wrong", }
  ]

}


defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
  });

  // btngoBack

  test("User can see score and status of user after game ends", ({ given, when, then }) => {
    let GameScoreWrapper: ShallowWrapper;
    let instance: Level1Result;

    given("I am a User loading Game score", () => {
      GameScoreWrapper = shallow(<Level1Result {...screenProps} />);
    });

    when("I navigate to Game score", () => {
      instance = GameScoreWrapper.instance() as Level1Result
    });

    then("I can see score and status of user", () => {

      const fetchScore = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      fetchScore.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        fetchScore.messageId
      );
      fetchScore.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        getScoreAPISuccessResponse
      );
      instance.getUserScoreApiCallId = fetchScore.messageId;
      runEngine.sendMessage("Unit Test", fetchScore);

      const userStatus = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      userStatus.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        userStatus.messageId
      );
      userStatus.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        getUserStatusAPISuccessResponse
      );
      instance.pendingReqApiCallId = userStatus.messageId;
      runEngine.sendMessage("Unit Test", userStatus);

    });

  });

  test("User can goback to chat page", ({ given, when, then }) => {
    let GameScoreWrapper: ShallowWrapper;
    let instance: Level1Result;

    given("I am a User loading Game score", () => {
      GameScoreWrapper = shallow(<Level1Result {...screenProps} />);
    });

    when("I navigate to Game score", () => {
      instance = GameScoreWrapper.instance() as Level1Result
    });


    then("I can check status win or lose", () => {
      const fetchScore = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      fetchScore.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        fetchScore.messageId
      );
      fetchScore.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        getWinScoreAPISuccessResponse
      );
      instance.getUserScoreApiCallId = fetchScore.messageId;
      runEngine.sendMessage("Unit Test", fetchScore);

      const userStatus = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      userStatus.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        userStatus.messageId
      );
      userStatus.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        getUserAceeptedAPISuccessResponse
      );
      instance.pendingReqApiCallId = userStatus.messageId;
      runEngine.sendMessage("Unit Test", userStatus);
    }
    );

    then("I can not see score and status of user", () => {
      const fetchScore = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      fetchScore.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        fetchScore.messageId
      );
      fetchScore.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        errorRes
      );
      instance.getUserScoreApiCallId = fetchScore.messageId;
      runEngine.sendMessage("Unit Test", fetchScore);

      const userStatus = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      userStatus.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        userStatus.messageId
      );
      userStatus.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        errorRes
      );
      instance.pendingReqApiCallId = userStatus.messageId;
      runEngine.sendMessage("Unit Test", userStatus);
    });

    then("I can see error message", () => {
      const fetchScore = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      fetchScore.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        fetchScore.messageId
      );
      fetchScore.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        errorRes
      );
      instance.getUserScoreApiCallId = fetchScore.messageId;
      runEngine.sendMessage("Unit Test", fetchScore);

      const userStatus = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      userStatus.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        userStatus.messageId
      );
      userStatus.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        errorRes
      );
      instance.pendingReqApiCallId = userStatus.messageId;
      runEngine.sendMessage("Unit Test", userStatus);
    });

    then("I can press goback button to go back to chat page", () => {
      let goBackBtn = GameScoreWrapper.findWhere(
        (node) => node.prop("testID") === "btngoBack"
      )
      goBackBtn.simulate("press")
    });

  });

  test("User can send friend request after user lost game", ({ given, when, then }) => {
    let GameScoreWrapper: ShallowWrapper;
    let instance: Level1Result;

    given("I am a User loading Game score", () => {
      GameScoreWrapper = shallow(<Level1Result {...screenProps} />);
    }
    );

    when("I navigate to Game score", () => {
      instance = GameScoreWrapper.instance() as Level1Result
    });

    then("I can check user is aleady send friend request or not", () => {
      let addFrdBtn = GameScoreWrapper.findWhere(
        (node) => node.prop("testID") === "btnPressAddFrd"
      )
      addFrdBtn.simulate("press")

      const sendFrdReq = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      sendFrdReq.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        sendFrdReq.messageId
      );
      sendFrdReq.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        alredySendFrdAPISuccessResponse
      );
      instance.sendFrdReqApiCallId = sendFrdReq.messageId;
      runEngine.sendMessage("Unit Test", sendFrdReq);
    });

    then("if user is not already sent friend request then press send friend request button", () => {
      let addFrdBtn = GameScoreWrapper.findWhere(
        (node) => node.prop("testID") === "btnPressAddFrd"
      )
      addFrdBtn.simulate("press")

      const sendFrdReq = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      sendFrdReq.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        sendFrdReq.messageId
      );
      sendFrdReq.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        sendFrdReqAPISuccessResponse
      );
      instance.sendFrdReqApiCallId = sendFrdReq.messageId;
      runEngine.sendMessage("Unit Test", sendFrdReq);
    });

    then("I can not able to send frd request", () => {
      let addFrdBtn = GameScoreWrapper.findWhere(
        (node) => node.prop("testID") === "btnPressAddFrd"
      )
      addFrdBtn.simulate("press")

      const sendFrdReq = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      sendFrdReq.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        sendFrdReq.messageId
      );
      sendFrdReq.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        errorRes
      );
      instance.sendFrdReqApiCallId = sendFrdReq.messageId;
      runEngine.sendMessage("Unit Test", sendFrdReq);

    });

    then("I can see error message", () => {
      let addFrdBtn = GameScoreWrapper.findWhere(
        (node) => node.prop("testID") === "btnPressAddFrd"
      )
      addFrdBtn.simulate("press")

      const sendFrdReq = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      sendFrdReq.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        sendFrdReq.messageId
      );
      sendFrdReq.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        errorRes
      );
      instance.sendFrdReqApiCallId = sendFrdReq.messageId;
      runEngine.sendMessage("Unit Test", sendFrdReq);
    });

  });

  test("User can see accept or reject request status after user win game", ({ given, when, then }) => {
    let GameScoreWrapper: ShallowWrapper;
    let instance: Level1Result;

    given("I am a User loading Game score", () => {
      GameScoreWrapper = shallow(<Level1Result {...screenProps} />);
    }

    );

    when("I navigate to Game score", () => {
      instance = GameScoreWrapper.instance() as Level1Result
    }
    );

    then("I can check status win or lose", () => {
      const fetchScore = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      fetchScore.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        fetchScore.messageId
      );
      fetchScore.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        getWinScoreAPISuccessResponse
      );
      instance.getUserScoreApiCallId = fetchScore.messageId;
      runEngine.sendMessage("Unit Test", fetchScore);

      const userStatus = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      userStatus.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        userStatus.messageId
      );
      userStatus.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        getWinUserStatusAPISuccessResponse
      );
      instance.pendingReqApiCallId = userStatus.messageId;
      runEngine.sendMessage("Unit Test", userStatus);
    }
    );

    then("if user is not already accept or reject friend request then press accept or reject button", () => {
      let acceptBtn = GameScoreWrapper.findWhere(
        (node) => node.prop("testID") === "btnPressAccept"
      )
      acceptBtn.simulate("press")

      let rejectBtn = GameScoreWrapper.findWhere(
        (node) => node.prop("testID") === "btnPressReject"
      )
      rejectBtn.simulate("press")

      const acceptAndRejectReq = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      acceptAndRejectReq.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        acceptAndRejectReq.messageId
      );
      acceptAndRejectReq.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        acceptAndRejectReqAPISuccessResponse
      );
      instance.acceptAndRejectReqApiCallId = acceptAndRejectReq.messageId;
      runEngine.sendMessage("Unit Test", acceptAndRejectReq);
    });

    then("I can not able to accept or reject frd request", () => {
      let acceptBtn = GameScoreWrapper.findWhere(
        (node) => node.prop("testID") === "btnPressAccept"
      )
      acceptBtn.simulate("press")

      let rejectBtn = GameScoreWrapper.findWhere(
        (node) => node.prop("testID") === "btnPressReject"
      )
      rejectBtn.simulate("press")

      const acceptAndRejectReq = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      acceptAndRejectReq.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        acceptAndRejectReq.messageId
      );
      acceptAndRejectReq.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        errorRes
      );
      instance.acceptAndRejectReqApiCallId = acceptAndRejectReq.messageId;
      runEngine.sendMessage("Unit Test", acceptAndRejectReq);
    });

    then("I can see error message", () => {
      let acceptBtn = GameScoreWrapper.findWhere(
        (node) => node.prop("testID") === "btnPressAccept"
      )
      acceptBtn.simulate("press")

      let rejectBtn = GameScoreWrapper.findWhere(
        (node) => node.prop("testID") === "btnPressReject"
      )
      rejectBtn.simulate("press")

      const acceptAndRejectReq = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      acceptAndRejectReq.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        acceptAndRejectReq.messageId
      );
      acceptAndRejectReq.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        errorRes
      );
      instance.acceptAndRejectReqApiCallId = acceptAndRejectReq.messageId;
      runEngine.sendMessage("Unit Test", acceptAndRejectReq);
      
    });

  });

});
