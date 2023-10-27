
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import ElasticSearch from "../../src/ElasticSearch"
import { FlatList } from "react-native"


const navigation = {
  addListener: jest.fn().mockImplementation((event, callback) => {
    callback();
  }),
  navigate: jest.fn(),
  goBack: jest.fn()
};

const screenProps = {
  navigation: navigation,
  id: "ElasticSearch"
}

const feature = loadFeature('./__tests__/features/ElasticSearch-scenario.feature');

const locationApiSuccessRes = {"success":true,"data":"Amroli, Adajan Taluka, Surat District, Gujarat, 394105, India"}

const searchFrdApiSuccessRes = [
  {
  "attributes":{
  "about":"Hello Parth",
  "age_between":null,
  "first_name":"Parth",
  "is_added":false,
  "is_attempted":false,
  "last_name":"Patel",
  "photo":"https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/cbrg6whm60bh6xso7rn7i8msc725?response-content-disposition=inline%3B%20filename%3D%22IMG_20220926_235923.jpg%22%3B%20filename%2A%3DUTF-8%27%27IMG_20220926_235923.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230822%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230822T042122Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=c6844e1fe73d31fb885e22ab57f8cd2a15860902680b721954897f7e4ca54ce7",
  "profile_id":297,
  "question_hide":true,
  "relationship_type":null,
  "suggested_friends":false,
  "user_name":"test122"
  },
  "id":"1194",
  "type":"search"
  },
]

defineFeature(feature, (test) => {

  jest.useFakeTimers()
  beforeEach(() => {
    jest.resetModules();
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
  });

  test('User navigates to ElasticSearch', ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: ElasticSearch;

    given('I am a User loading ElasticSearch', () => {
      exampleBlockA = shallow(<ElasticSearch {...screenProps} />);
    });

    when('I navigate to the ElasticSearch', () => {
      instance = exampleBlockA.instance() as ElasticSearch
    });

    then('ElasticSearch will load with out errors', () => {
      instance.componentDidMount()
      expect(exampleBlockA).toBeTruthy();
    });

    then('I can search user', () => {
      let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'searchBar');
      textInputComponent.simulate('changeText', 'hello@aol.com');

      const FlatListRenderItem = textInputComponent.renderProp('clearIcon')({})

      const onPressUser1 = FlatListRenderItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'searchBarClearIcon')
      onPressUser1.simulate("press");

    });

    then('I can fetch user location', () => {

      const locationSuccessRestApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      locationSuccessRestApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        locationSuccessRestApi
      );
      locationSuccessRestApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        locationApiSuccessRes
      );
      locationSuccessRestApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        locationSuccessRestApi.messageId
      );
      instance.locationAddCallId = locationSuccessRestApi.messageId;
      runEngine.sendMessage("Unit Test", locationSuccessRestApi);

    });

    then('I can check pagination with errors', () => {

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
         errors:[]
        }
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        magLogInSucessRestAPI.messageId
      );
      instance.paginationApiCallId = magLogInSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
    });

    then('I can check pagination with out errors', () => {

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
          "data": [
            
          ]
        }
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        magLogInSucessRestAPI.messageId
      );
      instance.paginationApiCallId = magLogInSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
      instance.setState({userList:[1,2,3,4,5,6,7,8,9,2,8,7]})
    });


    then('I can check userList with error', () => {

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
          {

          },

        }
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        magLogInSucessRestAPI.messageId
      );
      instance.searchApiCallId = magLogInSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);

      let plans2 = exampleBlockA.findWhere((node) => node.prop('testID') === "suggestedFourFriend");
      plans2.props().renderItem({
        item: {
          id: 2,
          attributes: {
            id: 2,
            duration: 'Monthly',
            currency: 'USD',
            amount: '250',
            plan_name: 'Monthly',
            star:true
          }
        }
      })

      const FlatListRenderItem = plans2.renderProp('renderItem')({
        item: {
          id: 2,
          attributes: {
            id: 2,
            duration: 'Monthly',
            currency: 'USD',
            amount: '250',
            plan_name: 'Monthly'
          }
        }, index: 0
      })
      const onPressUser1 = FlatListRenderItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'onPressUserDetailTestID')
      onPressUser1.simulate("press");
    });

    then('I can check user suggested api with out errors', () => {
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
          "data": [
            1,2,3,4,5,6,7,8,9,10
          ]
        }
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        magLogInSucessRestAPI.messageId
        );
        instance.suggestedFriendCallId = magLogInSucessRestAPI.messageId;
        runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
        let plans = exampleBlockA.findWhere((node) => node.prop('testID') === "suggestedFriendShowModalWindow");
        plans.simulate('press')

        let plans2 = exampleBlockA.findWhere((node) => node.prop('testID') === "btnPress");
        plans2.simulate('press')

        let plans3 = exampleBlockA.findWhere((node) => node.prop('testID') === "btnPress1");
        plans3.simulate('press')

        let plans4 = exampleBlockA.findWhere((node) => node.prop('testID') === "sendFriendReq");
        plans4.simulate('press')

        
    });

    then('I can check userList with out errors', () => {

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
            [1,2,3,4,5,6,7,8,9,10,11]

        }
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        magLogInSucessRestAPI.messageId
      );
      instance.searchApiCallId = magLogInSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);

      let plans2 = exampleBlockA.findWhere((node) => node.prop('testID') === "userListID");
      plans2.props().renderItem({
        item: {
          id: 2,
          attributes: {
            id: 2,
            duration: 'Monthly',
            currency: 'USD',
            amount: '250',
            plan_name: 'Monthly'
          }
        }
      })
      plans2.props().onEndReached()

      const FlatListRenderItem = plans2.renderProp('renderItem')({
        item: {
          id: 2,
          attributes: {
            id: 2,
            duration: 'Monthly',
            currency: 'USD',
            amount: '250',
            plan_name: 'Monthly'
          }
        }, index: 0
      })
      const onPressUser1 = FlatListRenderItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'onPressUserDetailTestID1')
      onPressUser1.simulate("press");

      const onPressUser2 = FlatListRenderItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'onPressUserDetailTestID2')
      onPressUser2.simulate("press");

      const onPressUser3 = FlatListRenderItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'sendFriendReqTestID')
      onPressUser3.simulate("press");
      //plans2.props().ListFooterComponent()
    });

    then('I can check the flatlist', () => {
      //instance.setState({userList:[8,8]})
      let plans = exampleBlockA.findWhere((node) => node.prop('testID') === "userListID");
      plans.props().renderItem({
        item: {
          id: 2,
          attributes: {
            id: 2,
            
          }
        }
      })
    });

    then('I can check user suggested api with errors', () => {

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
          "errors": [

          ]
        }
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        magLogInSucessRestAPI.messageId
      );
      instance.suggestedFriendCallId = magLogInSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);


    });

    then('I can check the suggested friend flatlist', () => {
      //instance.setState({isModalVisible:true})     
      // let plans = exampleBlockA.findWhere((node) => node.prop('testID') === "suggestedFriendListID");
      // plans.props().renderItem({
      //   item: {
      //     id: 2,
      //     attributes: {
      //       id: 2,
      //       duration: 'Monthly',
      //       currency: 'USD',
      //       amount: '250',
      //       plan_name: 'Monthly',
      //       star:true
      //     }
      //   }
      // })

    });

    then('I can check sendFriendApiCallId with errors', () => {

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
          "errors": [
            {

            },
          ]
        }
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        magLogInSucessRestAPI.messageId
      );
      instance.sendFriendApiCallId = magLogInSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
      
    });

    then('I can check sendFriendApiCallId with out errors', () => {

      const searchFrdSuccessRestApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      searchFrdSuccessRestApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        searchFrdSuccessRestApi
      );
      searchFrdSuccessRestApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        searchFrdApiSuccessRes
      );
      searchFrdSuccessRestApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        searchFrdSuccessRestApi.messageId
      );
      instance.searchApiCallId = searchFrdSuccessRestApi.messageId;
      runEngine.sendMessage("Unit Test", searchFrdSuccessRestApi);

      // let sendFrdBtn = exampleBlockA.findWhere((node) => node.prop('testID') === "sendFriendReqTestID");
      // sendFrdBtn.simulate('press');

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
          "data": [
            {

            },
          ]
        }
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        magLogInSucessRestAPI.messageId
      );
      instance.sendFriendApiCallId = magLogInSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
    });

    then('I can check frienduserList with out errors', () => {

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
            []

        }
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        magLogInSucessRestAPI.messageId
      );
      instance.searchApiCallId = magLogInSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);

      const getFrdListRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getFrdListRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getFrdListRestAPI
      );
      getFrdListRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "data":
            [1,2,3,4,5,6,7,8,9,10,11]

        }
      );
      getFrdListRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getFrdListRestAPI.messageId
      );
      instance.getFrdListApiCallId = getFrdListRestAPI.messageId;
      runEngine.sendMessage("Unit Test", getFrdListRestAPI);

      let plans2 = exampleBlockA.findWhere((node) => node.prop('testID') === "userFriendListID");
      plans2.props().renderItem({
        item: {
          id: 2,
          attributes: {
            id: 2,
            duration: 'Monthly',
            currency: 'USD',
            amount: '250',
            plan_name: 'Monthly'
          }
        }
      })
      plans2.props().ListEmptyComponent()

      const FlatListRenderItem = plans2.renderProp('renderItem')({
        item: {
          id: 2,
          attributes: {
            id: 2,
            duration: 'Monthly',
            currency: 'USD',
            amount: '250',
            plan_name: 'Monthly'
          }
        }, index: 0
      })
      // const onPressUser1 = FlatListRenderItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'onPressUserDetailTestID1')
      // onPressUser1.simulate("press");

      // const onPressUser2 = FlatListRenderItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'onPressUserDetailTestID2')
      // onPressUser2.simulate("press");
      //plans2.props().ListFooterComponent()
    });

    then('I can leave the screen with out errors', () => {
      instance.componentWillUnmount() 
      expect(exampleBlockA).toBeTruthy();
    });

  });

});
