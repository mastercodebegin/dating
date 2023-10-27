import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import PersonalityStatement from "../../src/PersonalityStatement";

let navigation = require('react-navigation')

navigation = {
  addListener: jest.fn().mockImplementation((event, callback) => {
    callback();
  }),
  navigate: jest.fn(),
  goBack: jest.fn(),
  state: {
    params: {
      imgData: [
        {
          name: "image.jpg",
          type: "image/jpg",
          uri: "https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/4stfck3yisk2k7vl0klilc3jxmcm?response-content-disposition=inline%3B%20filename%3D%22image.jpg%22%3B%20filename%2A%3DUTF-8%27%27image.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230626%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230626T091916Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=39be0d6f83489a9dae62b734a46c33ccad7cabcbbe9638fa77fb76df512f4cf7",
        },
        { name: "image.jpg", type: "image/jpg", uri: "Emptyimage" },
        { name: "image.jpg", type: "image/jpg", uri: "Emptyimage" },
        { name: "image.jpg", type: "image/jpg", uri: "Emptyimage" },
        { name: "image.jpg", type: "image/jpg", uri: "Emptyimage" },
        { name: "image.jpg", type: "image/jpg", uri: "Emptyimage" },
      ],
    },
  },
  dispatch: jest.fn(),
};

const screenProps = {
  navigation: navigation,
  id: "PersonalityStatement",
};

const feature = loadFeature(
  "./__tests__/features/PersonalityStatement-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to PersonalityStatement", ({ given, when, then }) => {
    let selectedQuestionShallowWrapper: ShallowWrapper;
    let instance: PersonalityStatement;

    given("I am a User loading PersonalityStatement", () => {
      selectedQuestionShallowWrapper = shallow(
        <PersonalityStatement {...screenProps} />
      );
    });

    when("I navigate to the PersonalityStatement", () => {
      instance =
        selectedQuestionShallowWrapper.instance() as PersonalityStatement;
    });

    then("PersonalityStatement will load without errors", () => {
      instance.componentDidMount();

      const backBtn = selectedQuestionShallowWrapper.findWhere(
        (node: { prop: (arg0: string) => string }) =>
          node.prop("testID") === "btnBack"
      );
      backBtn.simulate("press");
    });

    then("I can add bio without errors", () => {
      //add textInput
      let textInputComponent = selectedQuestionShallowWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputBio"
      );
      textInputComponent.simulate("changeText", "test");
    });

    then("I can leave the screen with out errors", () => {
      let buttonComponent = selectedQuestionShallowWrapper.findWhere(
        (node) => node.prop("testID") === "btnSubmitOTP"
      );
      buttonComponent.simulate("press");
      let message: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      message.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        message.messageId
      );
      instance.personalityStatementApiCallId = message.messageId;

      message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: {
          id: "67",
          type: "profile",
          attributes: {
            id: 67,
            address: null,
            about: "Hii, I'm user",
            distance: null,
            photos: [
              {
                id: 240,
                url: "https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/7q65e6ew8qsdkjfm31qlog5q7abb?response-content-disposition=inline%3B%20filename%3D%22mapDark.png%22%3B%20filename%2A%3DUTF-8%27%27mapDark.png&response-content-type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230627%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230627T063145Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=57742b4bacd60a19c72b8c4234e2dbfdc3cea611bb3fb9c00bdb0b9f7469f05c",
              },
              {
                id: 241,
                url: "https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/iu08e6jywx6fzdrvs8qid9z12o9d?response-content-disposition=inline%3B%20filename%3D%22mivi.png%22%3B%20filename%2A%3DUTF-8%27%27mivi.png&response-content-type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230627%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230627T063145Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=fa71a9ee0c8b67c4a3baf689ceb772e1ff26cba112202d63ef191517591e1294",
              },
              {
                id: 242,
                url: "https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/xnsebc2kzzmirzg6i2yr30gyxv8h?response-content-disposition=inline%3B%20filename%3D%22jai-shree-ram-hd-black-orange-face-1uqx37hp55ct9xg3.jpg%22%3B%20filename%2A%3DUTF-8%27%27jai-shree-ram-hd-black-orange-face-1uqx37hp55ct9xg3.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230627%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230627T063145Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=ac4729c627a655d34df3bea8124a5ebb15295a7581aa3994ce6f2406090beae1",
              },
              {
                id: 243,
                url: "https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/zzrn9w9fjvfsiyatf74f1ls8g3a6?response-content-disposition=inline%3B%20filename%3D%22mapLight.png%22%3B%20filename%2A%3DUTF-8%27%27mapLight.png&response-content-type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230627%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230627T063145Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=ff44945ca1797dd69bde980fd8daacae91f98907ba52b5b8cae5477947412267",
              },
            ],
            email: {
              email: "test95@gmail.com",
            },
            name: {
              name: "qwsd",
            },
            interest: {
              interest: "Male",
            },
            age: {
              age: null,
            },
            user_name: {
              user_name: "qwsd",
            },
            looking_for: null,
          },
        },
        meta: {
          message: "Profile Created Successfully",
        },
      });
      runEngine.sendMessage("Unit Test", message);
    });
  });

  test("User navigates to PersonalityStatement screen", ({
    given,
    when,
    then,
  }) => {
    let selectedQuestionShallowWrapper: ShallowWrapper;
    let instance: PersonalityStatement;
    given("I am a User loading PersonalityStatement screen", () => {
      selectedQuestionShallowWrapper = shallow(
        <PersonalityStatement {...screenProps} />
      );
    });

    when("I navigate to the PersonalityStatement screen", () => {
      instance =
        selectedQuestionShallowWrapper.instance() as PersonalityStatement;
    });

    then("PersonalityStatement screen will load without errors", () => {
      instance.componentDidMount();

      const backBtn = selectedQuestionShallowWrapper.findWhere(
        (node: { prop: (arg0: string) => string }) =>
          node.prop("testID") === "btnBack"
      );
      backBtn.simulate("press");
    });

    then("I can update bio without errors", () => {
      //add textInput
      let textInputComponent = selectedQuestionShallowWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputBio"
      );
      textInputComponent.simulate("changeText", "test");
    });

    then("I can leave screen with out errors", () => {
      instance.updateBioApi();
      let message: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      message.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        message.messageId
      );
      instance.bioUpdateApiCallId = message.messageId;
      instance.receive("test", message);

      message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), 
        {
          "data": {
              "id": "47",
              "type": "profile",
              "attributes": {
                  "id": 47,
                  "address": "udaypure",
                  "about": "ok",
                  "distance": null,
                  "photos": [
                      {
                          "id": 135,
                          "url": "https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/sur2bmos7okgui6334vilwt37xt3?response-content-disposition=inline%3B%20filename%3D%22img-ce-01_download-demo_25-c34fdf21163bcee63333536744266%25402x.jpg%22%3B%20filename%2A%3DUTF-8%27%27img-ce-01_download-demo_25-c34fdf21163bcee63333536744266%25402x.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230627%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230627T115732Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=c20b4bdcbc45dc03ae42b0a0d16a42654706f67c4bd0d090565983fa4e265451"
                      },
                      {
                          "id": 136,
                          "url": "https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/rfg811fohllzeovo7gf6x0t9o7fu?response-content-disposition=inline%3B%20filename%3D%22img-ce-01_download-demo_25-c34fdf21163bcee63333536744266%25402x.jpg%22%3B%20filename%2A%3DUTF-8%27%27img-ce-01_download-demo_25-c34fdf21163bcee63333536744266%25402x.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230627%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230627T115732Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=92c37043e90b11e5b5a732536fead5735adb282b16bbfa86808b89e08784badf"
                      }
                  ],
                  "email": {
                      "email": "exampal12630@gmail.com"
                  },
                  "name": {
                      "name": "Example"
                  },
                  "interest": {
                      "interest": null
                  },
                  "age": {
                      "age": null
                  },
                  "user_name": {
                      "user_name": null
                  },
                  "looking_for": null
              }
          },
          "meta": {
              "message": "Photo Updated Successfully"
          }
      }
      );
      runEngine.sendMessage("Unit Test", message);
    });
  });
});
