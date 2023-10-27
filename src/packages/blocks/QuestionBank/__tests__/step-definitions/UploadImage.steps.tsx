import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import ImagePicker from "react-native-image-crop-picker";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import UploadImage from "../../src/UploadImage";
import UploadImageEdit from "../../src/UploadImageEdit";

const navigation = {
  addListener: jest.fn().mockImplementation((event, callback) => {
    callback();
  }),
  navigate: jest.fn(),
  goBack: jest.fn(),
  state: {
    params: {
      ImageData: [
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
      about: 'test',
    },
  },

};
jest.mock("react-native-image-crop-picker", () => ({
  openPicker: jest.fn().mockImplementation(() =>
    Promise.resolve({
      uri: "filepath",
      path: "test",
    })
  ),

}))
const screenProps = {
  navigation: navigation,
  id: "UploadImage",
};

const uploadImageEditProps = {
  navigation: navigation,
  id: "UploadImageEdit",
};

const feature = loadFeature(
  "./__tests__/features/UploadImage-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to UploadImage", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: UploadImage;

    given("I am a User loading UploadImage", () => {
      exampleBlockA = shallow(<UploadImage {...screenProps} />);
      expect(exampleBlockA).toBeTruthy();
      instance = exampleBlockA.instance() as UploadImage;
      expect(instance).toBeTruthy();
    });

    when("I navigate to the UploadImage", () => {
      instance.componentDidMount();
      const backBtn = exampleBlockA.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'btnBack')
      backBtn.simulate("press");
      expect(instance).toBeTruthy();
    });

    then("I can select the 6 Image without errors", () => {

      let uploadImageListComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "flatlistUploadImage"
      );
      uploadImageListComponent.props().keyExtractor({}, 3);
      uploadImageListComponent.props().renderItem({
        item: {
          id: 1,
          image: "file:///data/user/0/com.DatingApp/cache/react-native-image-crop-picker/seascape.jpg",
          umploadImg: {},
        }, index: 0
      })
      uploadImageListComponent.props().renderItem({
        item: {
          id: 1,
          image: "",
          umploadImg: {},
        }, index: 0
      })
      const FlatListRenderItem = uploadImageListComponent.renderProp('renderItem')({
        item: {
          id: 1,
          image: "file:///data/user/0/com.DatingApp/cache/react-native-image-crop-picker/seascape.jpg",
          umploadImg: {},
        }, index: 0
      })

      const image = {
        path: '/path/to/image.jpg',
        size: 1024,
        mime: 'image/jpeg',
      };
      // jest.spyOn(ImagePicker, 'openPicker').mockResolvedValue(image);
      const openGalleryBtn = FlatListRenderItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'btnOpenGallery')
      openGalleryBtn.simulate("press");


      const removeBtn = FlatListRenderItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'btnRemoveImage')
      removeBtn.simulate("press");
      expect(instance).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      const uploadImageBtn = exampleBlockA.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'btnUploadImage')
      uploadImageBtn.simulate("press");
      expect(instance).toBeTruthy();
    });
  });

  test("User navigates to UploadImageEdit", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: UploadImageEdit;

    given("I am a User loading UploadImageEdit", () => {
      exampleBlockA = shallow(<UploadImageEdit {...uploadImageEditProps} />);
      expect(exampleBlockA).toBeTruthy();
      instance = exampleBlockA.instance() as UploadImageEdit;
      expect(instance).toBeTruthy();
    });

    when("I navigate to the UploadImageEdit", () => {
      instance.componentDidMount();
      const backBtn = exampleBlockA.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'btnBack')
      backBtn.simulate("press");
      expect(instance).toBeTruthy();
    });

    then("I can edit image without errors", () => {
      instance.onPressEditImage(1, "file:///data/user/0/com.DatingApp/cache/react-native-image-crop-picker/seascape.jpg");
      let message: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      message.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        message.messageId
      );
      instance.userProfilePicEditId = message.messageId;
      message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { "data": { "id": "48", "type": "profile", "attributes": { "id": 48, "address": null, "about": "hiii", "distance": null, "photos": [{ "id": 182, "url": "https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/4stfck3yisk2k7vl0klilc3jxmcm?response-content-disposition=inline%3B%20filename%3D%22image.jpg%22%3B%20filename%2A%3DUTF-8%27%27image.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230626%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230626T091558Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=ef633dd82ac1523f05ce913139326155f26f7e1d7ff417a7bde1532ff4ec40d3" }, { "id": 183, "url": "https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/6y9i4i40ksj9c0frljxe0cc9m4ed?response-content-disposition=inline%3B%20filename%3D%22image.jpg%22%3B%20filename%2A%3DUTF-8%27%27image.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230626%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230626T091558Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=b612876381d6a69d919a5e78f91c13cc4b6deb307ab2c350eb35cf5e2753f24c" }, { "id": 239, "url": "https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/bp6a6ei0mgxo41blw3qmamc41wy0?response-content-disposition=inline%3B%20filename%3D%22image.jpg%22%3B%20filename%2A%3DUTF-8%27%27image.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230626%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230626T091558Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=748f2d28ce0e3240a2dc7b1927cf7cbfad3972ce74355bafbef9ab84deca28c8" }], "email": { "email": "test98@gmail.com" }, "name": { "name": "cdhbchb" }, "interest": { "interest": "Male" }, "age": { "age": null }, "user_name": { "user_name": "cdhbchb" }, "looking_for": null } }, "meta": { "message": "Photo Updated Successfully" } });
      runEngine.sendMessage("Unit Test", message);
      instance.getUserProfileData();

      let uploadImageEditComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "flatlistimageDataProfile"
      );

      uploadImageEditComponent.props().keyExtractor({}, 3);
      uploadImageEditComponent.props().renderItem({ item: instance.state.imageDataProfile[0], index: 0 })
      const FlatListRenderItem = uploadImageEditComponent.renderProp('renderItem')({ item: instance.state.imageDataProfile[0], index: 0 })
      const openGalleryBtn = FlatListRenderItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'btnEditGallery')
      openGalleryBtn.simulate("press");

    });

    then("userProfilePicDeleteId api will return success with else", () => {
      const msgLogInSucessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInSucessRestAPI.messageId
      );
      msgLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "data":
          {
            "id": "48", "type": "profile", "attributes":
            {
              "id": 48, "address": null, "about": "hiii", "distance": null,
              "photos":
                null, "email": { "email": "test98@gmail.com" }, "name": { "name": "cdhbchb" }, "interest": { "interest": "Male" },
              "age": { "age": null }, "user_name": { "user_name": "cdhbchb" }, "looking_for": null
            }
          }, "meta": { "message": "Successfully Loaded" }
        }

      );
      instance.userProfilePicDeleteId = msgLogInSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLogInSucessRestAPI);
    })

    then("userProfileGetApiCallId api will return success", () => {
      const msgLogInSucessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInSucessRestAPI.messageId
      );
      msgLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "data":
          {
            "id": "48", "type": "profile", "attributes":
            {
              "id": 48, "address": null, "about": "hiii", "distance": null,
              "photos":
                [{ "id": 182, "url": "https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/4stfck3yisk2k7vl0klilc3jxmcm?response-content-disposition=inline%3B%20filename%3D%22image.jpg%22%3B%20filename%2A%3DUTF-8%27%27image.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230626%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230626T091558Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=ef633dd82ac1523f05ce913139326155f26f7e1d7ff417a7bde1532ff4ec40d3" }, { "id": 183, "url": "https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/6y9i4i40ksj9c0frljxe0cc9m4ed?response-content-disposition=inline%3B%20filename%3D%22image.jpg%22%3B%20filename%2A%3DUTF-8%27%27image.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230626%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230626T091558Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=b612876381d6a69d919a5e78f91c13cc4b6deb307ab2c350eb35cf5e2753f24c" }, { "id": 239, "url": "https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/bp6a6ei0mgxo41blw3qmamc41wy0?response-content-disposition=inline%3B%20filename%3D%22image.jpg%22%3B%20filename%2A%3DUTF-8%27%27image.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230626%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230626T091558Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=748f2d28ce0e3240a2dc7b1927cf7cbfad3972ce74355bafbef9ab84deca28c8" }], "email": { "email": "test98@gmail.com" }, "name": { "name": "cdhbchb" }, "interest": { "interest": "Male" }, "age": { "age": null }, "user_name": { "user_name": "cdhbchb" }, "looking_for": null
            }
          }, "meta": { "message": "Successfully Loaded" }
        }

      );
      instance.userProfileGetApiCallId = msgLogInSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLogInSucessRestAPI);
    })


    then("userProfileGetApiCallId api will return success with else", () => {
      const msgLogInSucessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInSucessRestAPI.messageId
      );
      msgLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "data":
          {
            "id": "48", "type": "profile", "attributes":
            {
              "id": 48, "address": null, "about": "hiii", "distance": null,
              "photos":
                [{ "id": 182, "url": "https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/4stfck3yisk2k7vl0klilc3jxmcm?response-content-disposition=inline%3B%20filename%3D%22image.jpg%22%3B%20filename%2A%3DUTF-8%27%27image.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230626%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230626T091558Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=ef633dd82ac1523f05ce913139326155f26f7e1d7ff417a7bde1532ff4ec40d3" },
                { "id": 183, "url": "https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/6y9i4i40ksj9c0frljxe0cc9m4ed?response-content-disposition=inline%3B%20filename%3D%22image.jpg%22%3B%20filename%2A%3DUTF-8%27%27image.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230626%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230626T091558Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=b612876381d6a69d919a5e78f91c13cc4b6deb307ab2c350eb35cf5e2753f24c" },
                { "id": 239, "url": "https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/bp6a6ei0mgxo41blw3qmamc41wy0?response-content-disposition=inline%3B%20filename%3D%22image.jpg%22%3B%20filename%2A%3DUTF-8%27%27image.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230626%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230626T091558Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=748f2d28ce0e3240a2dc7b1927cf7cbfad3972ce74355bafbef9ab84deca28c8" },
                { "id": 240, "url": "https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/bp6a6ei0mgxo41blw3qmamc41wy0?response-content-disposition=inline%3B%20filename%3D%22image.jpg%22%3B%20filename%2A%3DUTF-8%27%27image.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230626%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230626T091558Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=748f2d28ce0e3240a2dc7b1927cf7cbfad3972ce74355bafbef9ab84deca28c8" },
                { "id": 241, "url": "https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/bp6a6ei0mgxo41blw3qmamc41wy0?response-content-disposition=inline%3B%20filename%3D%22image.jpg%22%3B%20filename%2A%3DUTF-8%27%27image.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230626%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230626T091558Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=748f2d28ce0e3240a2dc7b1927cf7cbfad3972ce74355bafbef9ab84deca28c8" },
                { "id": 242, "url": "https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/bp6a6ei0mgxo41blw3qmamc41wy0?response-content-disposition=inline%3B%20filename%3D%22image.jpg%22%3B%20filename%2A%3DUTF-8%27%27image.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230626%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230626T091558Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=748f2d28ce0e3240a2dc7b1927cf7cbfad3972ce74355bafbef9ab84deca28c8" },],
              "email": { "email": "test98@gmail.com" }, "name": { "name": "cdhbchb" }, "interest": { "interest": "Male" },
              "age": { "age": null }, "user_name": { "user_name": "cdhbchb" }, "looking_for": null
            }
          }, "meta": { "message": "Successfully Loaded" }
        }

      );
      instance.userProfileGetApiCallId = msgLogInSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLogInSucessRestAPI);
    })
    then("userProfileGetApiCallId api will return error", () => {
      let msgLogInSucessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInSucessRestAPI.messageId
      );
      msgLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [
            {
              "Login Failed": "Invalid email"
            }
          ]

        }
      );
      instance.userProfileGetApiCallId = msgLogInSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLogInSucessRestAPI);
    })


    then("I can not edit image", () => {
      instance.onPressEditImage(1, "file:///data/user/0/com.DatingApp/cache/react-native-image-crop-picker/seascape.jpg");
      let message: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      message.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        message.messageId
      );
      instance.userProfilePicEditId = message.messageId;
      message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: []
        }
      );
      runEngine.sendMessage("Unit Test", message);
      instance.getUserProfileData();

      let message1: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      message1.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        message1.messageId
      );
      instance.userProfileGetApiCallId = message1.messageId;

      message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: []
        }
      )
      runEngine.sendMessage("Unit Test", message1);

      let uploadImageEditComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "flatlistimageDataProfile"
      );

      uploadImageEditComponent.props().keyExtractor({}, 3);
      uploadImageEditComponent.props().renderItem({ item: instance.state.imageDataProfile[0], index: 0 })
      const FlatListRenderItem = uploadImageEditComponent.renderProp('renderItem')({ item: instance.state.imageDataProfile[0], index: 0 })
      const openGalleryBtn = FlatListRenderItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'btnEditGallery')
      openGalleryBtn.simulate("press");

    });

    then("I can leave the screen with out errors", () => {
      const continueBtn = exampleBlockA.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'btnContinue')
      continueBtn.simulate("press");
      expect(instance).toBeTruthy();
    });
  });

  test("User navigates to UploadImageEdit screen", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: UploadImageEdit;

    given("I am a User loading UploadImageEdit screen", () => {
      exampleBlockA = shallow(<UploadImageEdit {...uploadImageEditProps} />);
      expect(exampleBlockA).toBeTruthy();
      instance = exampleBlockA.instance() as UploadImageEdit;
      expect(instance).toBeTruthy();
    });

    when("I navigate to the UploadImageEdit screen", () => {
      instance.componentDidMount();
      expect(instance).toBeTruthy();
    });

    then("I can remove image without errors", () => {
      instance.onPressRemove(1);
      let message: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      message.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        message.messageId
      );
      instance.userProfilePicDeleteId = message.messageId;
      message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: {
          id: "48",
          type: "profile",
          attributes: {
            id: 48,
            address: null,
            about: "hiii",
            distance: null,
            photos: [
              {
                id: 182,
                url: "https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/4stfck3yisk2k7vl0klilc3jxmcm?response-content-disposition=inline%3B%20filename%3D%22image.jpg%22%3B%20filename%2A%3DUTF-8%27%27image.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230626%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230626T091916Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=39be0d6f83489a9dae62b734a46c33ccad7cabcbbe9638fa77fb76df512f4cf7",
              },
            ],
            email: { email: "test98@gmail.com" },
            name: { name: "cdhbchb" },
            interest: { interest: "Male" },
            age: { age: null },
            user_name: { user_name: "cdhbchb" },
            looking_for: null,
          },
        },
        meta: { message: "Photo Deleted Successfully" },
      });
      runEngine.sendMessage("Unit Test", message);
      expect(instance).toBeTruthy();
    });

    then("I can not remove image", () => {
      instance.onPressRemove(1);
      let message: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      message.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        message.messageId
      );
      instance.userProfilePicDeleteId = message.messageId;
      message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        errors: [],
      });
      runEngine.sendMessage("Unit Test", message);
      expect(instance).toBeTruthy();
    });

    then("I can leave the UploadImageEdit screen with out errors", () => {
      let btnContinue = exampleBlockA.findWhere(
        (node: { prop: (arg0: string) => string; }) => node.prop("testID") === "btnContinue"
      );
      btnContinue.simulate("press");
      expect(instance).toBeTruthy();
    });
  });
});
