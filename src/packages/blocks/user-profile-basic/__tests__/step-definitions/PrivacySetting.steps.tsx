//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from 'framework/src/Helpers'
import { runEngine } from 'framework/src/RunEngine'
import { Message } from "framework/src/Message"
import moment from "moment";

import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import React from "react";
import PrivacySetting from "../../src/PrivacySetting"
import { Keyboard } from 'react-native'
const navigation = require("react-navigation")


const screenProps = {
  navigation: {
    addListener: jest.fn().mockImplementation((event, callback) => {
      callback();
    }),
    navigate: jest.fn(),
    goBack: jest.fn(),
    dispatch: jest.fn(),
    replace: jest.fn(),
    trim: jest.fn(),
    Alert: jest.fn(),
    split: jest.fn(),
    pop: jest.fn()
  },
  id: "PrivacySetting"
}

const feature = loadFeature('./__tests__/features/PrivacySetting-scenario.feature');

defineFeature(feature, (test) => {


  beforeEach(() => {
    jest.resetModules();
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
  });

  test('User navigates to PrivacySetting', ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: PrivacySetting;

    given('I am a User loading PrivacySetting', () => {
      exampleBlockA = shallow(<PrivacySetting {...screenProps} />);
    });

    when('I navigate to the PrivacySetting', () => {
      instance = exampleBlockA.instance() as PrivacySetting;
      instance.formatedDate = moment("2020-12-25T04:45:25.565Z");
    });

    then('PrivacySetting will load with out errors', () => {
      expect(exampleBlockA).toBeTruthy();
    });

    then('I can select button with out errors', () => {
      expect(exampleBlockA).toBeTruthy();
      let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'button-view-pad');
      buttonComponent.simulate('press');
      Keyboard.dismiss()
    });

    then('I can leave the screen with out errors', () => {
      instance.componentWillUnmount()
      expect(exampleBlockA).toBeTruthy();
    });


  });

  test('User can upload image', ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: PrivacySetting;

    given('I am a User want to upload image', () => {
      exampleBlockA = shallow(<PrivacySetting {...screenProps} />);
    });

    when('I navigate to the PrivacySetting', () => {
      instance = exampleBlockA.instance() as PrivacySetting
      instance.getUserProfile()
    });

    then("I can select back with out errors", () => {

      let navigation = {
        navigate: jest.fn(),
        goBack: jest.fn()
      }
      // navigation.navigate
      let wrapper = shallow(<PrivacySetting navigation={navigation} />)
      let buttonComponent = wrapper.findWhere((node) => node.prop("testID") === 'onGoBack');
      buttonComponent.simulate("press");
      expect(navigation.navigate).toBeTruthy()
    });

    then('I can enter Name', () => {
      let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInputFirstName');
      textInputComponent.simulate('changeText', 'firstName', 'test');
      textInputComponent.simulate("focus");
      textInputComponent.simulate("blur");

    });
    then('I can enter a Make Name with out errors', () => {
      let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInputFirstName');
      textInputComponent.simulate('changeText', "");
      textInputComponent.simulate("focus");
      textInputComponent.simulate("blur");
      console.log("username@@", instance.state.firstName)



    });

    then('I can enter a Modal Number with out errors', () => {

      let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInputEmail');
      textInputComponent.simulate('changeText', 'abc@gmail.com');
      textInputComponent.simulate("focus");
      textInputComponent.simulate("blur");
    });

    then('I can enter a Modal Number with  errors', () => {

      let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInputEmail');
      let submit = exampleBlockA.findWhere((node) => node.prop('testID') === 'gotUpdateBtn');
      textInputComponent.simulate('changeText', '');
      submit.simulate("press");
      // textInputComponent.simulate("blur");  
    });

    then('I can enter a Year with out errors', () => {
      let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInputUserName')
      textInputComponent.simulate('changeText', 'anc');
      textInputComponent.simulate("focus");
      textInputComponent.simulate("blur");
    });

    then('I can enter a username with  errors', () => {
      let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInputUserName')
      textInputComponent.simulate('changeText', '');
      textInputComponent.simulate("focus");
      textInputComponent.simulate("blur");
    });



    then('I can enter a color with out errors', () => {

      let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'testIdFullName');
      textInputComponent.simulate('changeText', 'red');
      console.log("username@@", instance.state.firstName)
    });


    then('I can click show picker userProfile', () => {
      expect(exampleBlockA).toBeTruthy();
      let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'ShowPicker');
      buttonComponent.simulate('press');
    });

    then('I can enter a ShowPicker with out errors', () => {
      let customInput = exampleBlockA.findWhere((node) => node.prop("testID") === "dateTimePicker");
      let event = { "nativeEvent": { "timestamp": -1183722103383 }, "type": "set" }
      let selectedDateTime = '1932-06-28T12:18:16.617Z';
      customInput.props().onChange(event, selectedDateTime);
      customInput.props().onChange('', '');
    });

    then("PrivacySetting will load with out error", () => {
      let message: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      message.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        message.messageId
      );
      instance.updateAccountApiCallId = message.messageId;
      message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        { "data": { "id": "48", "type": "profile", "attributes": { "id": 48, "address": null, "about": "hiii", "distance": null, "photos": [{ "id": 182, "url": "https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/4stfck3yisk2k7vl0klilc3jxmcm?response-content-disposition=inline%3B%20filename%3D%22image.jpg%22%3B%20filename%2A%3DUTF-8%27%27image.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230626%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230626T091558Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=ef633dd82ac1523f05ce913139326155f26f7e1d7ff417a7bde1532ff4ec40d3" }, { "id": 183, "url": "https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/6y9i4i40ksj9c0frljxe0cc9m4ed?response-content-disposition=inline%3B%20filename%3D%22image.jpg%22%3B%20filename%2A%3DUTF-8%27%27image.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230626%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230626T091558Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=b612876381d6a69d919a5e78f91c13cc4b6deb307ab2c350eb35cf5e2753f24c" }, { "id": 239, "url": "https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/bp6a6ei0mgxo41blw3qmamc41wy0?response-content-disposition=inline%3B%20filename%3D%22image.jpg%22%3B%20filename%2A%3DUTF-8%27%27image.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230626%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230626T091558Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=748f2d28ce0e3240a2dc7b1927cf7cbfad3972ce74355bafbef9ab84deca28c8" }], "email": { "email": "test98@gmail.com" }, "name": { "name": "cdhbchb" }, "interest": { "interest": "Male" }, "age": { "age": null }, "user_name": { "user_name": "cdhbchb" }, "looking_for": null } }, "meta": { "message": "Photo Updated Successfully" } });
      runEngine.sendMessage("Unit Test", message);

      let message1: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      message1.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        message1.messageId
      );
      instance.userProfileGetApiCallId = message1.messageId;
      message1.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "data": {
            "attributes": {
              "activated": true, "age": null, "app_language_id": null,
              "country_code": 91, "created_at": "2023-06-13T11:24:07.539Z",
              "date_of_birth": "2023-06-28", "device_id": null,
              "email": "test99@gmail.com", "first_name": "test",
              "full_name": "test", "full_phone_number": "919878573637",
              "gender": "Male", "id": 739, "identify_yourself_questions": true,
              "interest": null, "is_blacklisted": false, "is_paid": false,
              "last_name": null, "last_visit_at": null, "location": true,
              "mandotry_submit_ans": true, "media": true, "myself": true,
              "password_digest": "$2a$12$0zmdxwIqhgxLiYStgkz37.Vr2f5EhQ5BCeATEGOz6K9STy5xgkSE2",
              "phone_number": 9878573637, "phone_number_verified": true, "platform": null,
              "role_id": null, "select_ans": true, "select_ans_submit": true, "status": "regular",
              "stripe_id": null, "stripe_subscription_date": null, "stripe_subscription_id": null,
              "suspend_until": null, "unique_auth_id": "h9ufPSDG5p0ZnskpdAOEXAtt",
              "updated_at": "2023-06-28T13:13:37.065Z", "user_name": "testvaishali", "user_type": null,
              "profile": {
                "age_between": "",
                "relationship_type": ""
              }
            }
          }
        }
      )
      runEngine.sendMessage("Unit Test", message1);
      // instance.UserDetailsSuccCallBack({"data": {"attributes": {"activated": true, "country_code": "91", "created_at": "2023-06-13T11:24:07.539Z", "date_of_birth": "2023-06-28", "device_id": null, "email": "test99@gmail.com", "first_name": "test", "full_phone_number": "919878573637", "identify_yourself_questions": true, "last_name": null, "myself": true, "phone_number": "9878573637", "profile": [Object], "type": "EmailAccount", "unique_auth_id": "h9ufPSDG5p0ZnskpdAOEXAtt", "updated_at": "2023-06-28T13:13:37.065Z", "user_name": "testvaishali"}, "id": "739", "type": "account"}, "meta": {"message": "Account Details."}}  
      //           )
    });

    then("I can not get User profile data", () => {
      let message: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      message.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        message.messageId
      );
      instance.updateAccountApiCallId = message.messageId;
      message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: []
        }
      );
      runEngine.sendMessage("Unit Test", message);
    });

    then("I can not get userProfileGetApiCallId api data", () => {
      let message1: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      message1.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        message1.messageId
      );
      instance.userProfileGetApiCallId = message1.messageId;
      message1.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: {}
        }
      )
      runEngine.sendMessage("Unit Test", message1);


    });

    then('I can enter Name for submit button', () => {
      let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInputFirstName');
      textInputComponent.simulate('changeText', 'firstName', 'test');
      textInputComponent.simulate("focus");
      textInputComponent.simulate("blur");

    });

    then('I can enter a email for submit button', () => {
    let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInputEmail');
      textInputComponent.simulate('changeText', 'abc@gmail.com');
      textInputComponent.simulate("focus");
      textInputComponent.simulate("blur");
    });

    then('I can enter a username for submit button', () => {
      let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInputUserName')
      textInputComponent.simulate('changeText', 'anc');
      textInputComponent.simulate("focus");
      textInputComponent.simulate("blur");
    });


    then('I can Update getuserProfile', () => {

      expect(exampleBlockA).toBeTruthy();
      let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'gotUpdateBtn');
      buttonComponent.simulate('press');


    });
    then('I can leave the screen with out errors', () => {
      instance.componentWillUnmount()
      expect(exampleBlockA).toBeTruthy();
    });
  });



});
