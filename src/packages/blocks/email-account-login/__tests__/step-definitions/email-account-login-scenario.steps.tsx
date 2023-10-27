import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import EmailAccountLoginBlock from "../../src/EmailAccountLoginBlock"




const screenProps = { 
  navigation: {
    navigate: jest.fn(), 
},
    id: "EmailAccountLoginBlock"
  }

const feature = loadFeature('./__tests__/features/email-account-login-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to Email Log In', ({ given, when, then }) => {
        let mobileAccountLogInWrapper:ShallowWrapper;
        let instance:EmailAccountLoginBlock; 

        given('I am a User attempting to Log In with a Email', () => {
            mobileAccountLogInWrapper = shallow(<EmailAccountLoginBlock {...screenProps}/>)
            // expect(mobileAccountLogInWrapper).toBeTruthy()  

            instance = mobileAccountLogInWrapper.instance()as EmailAccountLoginBlock;


        });

        when('I navigate to the Log In Screen', () => {
             instance = mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock
        });
        
        then('I can select the Log In button with out errors', () => {
          let textInputComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('data-elementId') === 'button_ButtonOnlyTextCopy');
          textInputComponent.simulate('press');

          let textInputComponent2 = mobileAccountLogInWrapper.findWhere((node) => node.prop('data-elementId') === 'btnPasswordShowHide');
          textInputComponent2.simulate('press',);
          
          
          let textInputComponent1 = mobileAccountLogInWrapper.findWhere((node) => node.prop('data-elementId') === 'txtInputEmail');
          textInputComponent1.simulate('changeText', 'hello@aol.com');
          textInputComponent1.simulate('focus', 'hello@aol.com');
          textInputComponent1.simulate('blur', 'hello@aol.com');

          
          let textInputComponent3 = mobileAccountLogInWrapper.findWhere((node) => node.prop('data-elementId') === 'txtInputPassword');
          textInputComponent3.simulate('focus', 'hello@aol.com');
          textInputComponent3.simulate('blur', 'hello@aol.com');
          
          textInputComponent.simulate('press');

          let textInputComponent5 = mobileAccountLogInWrapper.findWhere((node) => node.prop('data-elementId') === 'btnForgotPassword');
          textInputComponent5.simulate('press',);

          let textInputComponent6 = mobileAccountLogInWrapper.findWhere((node) => node.prop('data-elementId') === 'btnPasswordShowHide');
          textInputComponent6.simulate('press',);


          let textInputComponent7 = mobileAccountLogInWrapper.findWhere((node) => node.prop('data-elementId') === 'navigateFunction');
          textInputComponent7.simulate('press');
       
       
       
        });

        then('I can select the Forgot Password button with out errors', () => {
          let textInputComponent3 = mobileAccountLogInWrapper.findWhere((node) => node.prop('data-elementId') === 'txtInputPassword');
          textInputComponent3.simulate('changeText', '');

          let textInputComponent7 = mobileAccountLogInWrapper.findWhere((node) => node.prop('data-elementId') === 'unusedFunction');
          textInputComponent7.simulate('press');
      });

      //   const magLogInSucessRestAPI = new Message(
      //     getName(MessageEnum.RestAPIResponceMessage)
      //   );
      //   magLogInSucessRestAPI.addData(
      //     getName(MessageEnum.RestAPIResponceDataMessage),
      //     magLogInSucessRestAPI
      //   );
      //   magLogInSucessRestAPI.addData(
      //     getName(MessageEnum.RestAPIResponceSuccessMessage),
      //     {
      //       "errors": [
              
      //       ]
      //     }
      //   );
      //   magLogInSucessRestAPI.addData(
      //     getName(MessageEnum.RestAPIResponceDataMessage),
      //     magLogInSucessRestAPI.messageId
      //     );
      //     instance.resetApiCallId = magLogInSucessRestAPI.messageId;
      //     runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
          
      // });
    
      then('I can check the login api response with errors', () => {
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
             
              
               'meta': {
                  'token':'test',
                  'myself':false,
                  'identify_yourself_questions':false
                }
                
              
            
          }
        );
        magLogInSucessRestAPI.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          magLogInSucessRestAPI.messageId
          );
          instance.apiEmailLoginCallId = magLogInSucessRestAPI.messageId;
          runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);

      });

      then('I can check the login api response with out errors again', () => {
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
             
              
               'meta': {
                  'token':'test',
                  'myself':false,
                  'identify_yourself_questions':true
                }}
        );
        magLogInSucessRestAPI.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          magLogInSucessRestAPI.messageId
          );
          instance.apiEmailLoginCallId = magLogInSucessRestAPI.messageId;
          runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);

       });

       then('I can check the login api response with out errors again two', () => {
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
             
              
               'meta': {
                  'token':'test',
                  'myself':true,
                  'identify_yourself_questions':false
                }}
        );
        magLogInSucessRestAPI.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          magLogInSucessRestAPI.messageId
          );
          instance.apiEmailLoginCallId = magLogInSucessRestAPI.messageId;
          runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);

       });
       then('I can check the login api response with out errors again three', () => {
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
             
              
               'meta': {
                  'token':'test',
                  'myself':true,
                  'identify_yourself_questions':true,
                  'phone_number_verified':false
                }}
        );
        magLogInSucessRestAPI.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          magLogInSucessRestAPI.messageId
          );
          instance.apiEmailLoginCallId = magLogInSucessRestAPI.messageId;
          runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);

      //     // let textInputComponent7 = mobileAccountLogInWrapper.findWhere((node) => node.prop('data-elementId') === 'sendLoginFailMessage');
      //     // textInputComponent7.simulate('press',);
       });
       then('I can check the login api response with out errors again four', () => {
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
             
              
               'meta': {
                  'token':'test',
                  'myself':true,
                  'identify_yourself_questions':true,
                  'phone_number_verified':true,
                  'location': true,
                  'mandotry_submit_ans':false
                }}
        );
        magLogInSucessRestAPI.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          magLogInSucessRestAPI.messageId
          );
          instance.apiEmailLoginCallId = magLogInSucessRestAPI.messageId;
          runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);

      //     // let textInputComponent7 = mobileAccountLogInWrapper.findWhere((node) => node.prop('data-elementId') === 'sendLoginFailMessage');
      //     // textInputComponent7.simulate('press',);
       });
       then('I can check the login api response with out errors again five', () => {
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
             
              
               'meta': {
                  'token':'test',
                  'myself':true,
                  'identify_yourself_questions':true,
                  'phone_number_verified':true,
                  'location': true,
                  'mandotry_submit_ans':true,
                  'select_question':false
                }}
        );
        magLogInSucessRestAPI.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          magLogInSucessRestAPI.messageId
          );
          instance.apiEmailLoginCallId = magLogInSucessRestAPI.messageId;
          runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);

      //     // let textInputComponent7 = mobileAccountLogInWrapper.findWhere((node) => node.prop('data-elementId') === 'sendLoginFailMessage');
      //     // textInputComponent7.simulate('press',);
       });
       then('I can check the login api response with out errors again six', () => {
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
             
              
               'meta': {
                  'token':'test',
                  'myself':true,
                  'identify_yourself_questions':true,
                  'phone_number_verified':true,
                  'location': true,
                  'mandotry_submit_ans':true,
                  'select_question':true,
                  'select_ans_submit':false
                }}
        );
        magLogInSucessRestAPI.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          magLogInSucessRestAPI.messageId
          );
          instance.apiEmailLoginCallId = magLogInSucessRestAPI.messageId;
          runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);

      //     // let textInputComponent7 = mobileAccountLogInWrapper.findWhere((node) => node.prop('data-elementId') === 'sendLoginFailMessage');
      //     // textInputComponent7.simulate('press',);
       });
       then('I can check the login api response with out errors again seven', () => {
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
             
              
               'meta': {
                  'token':'test',
                  'myself':true,
                  'identify_yourself_questions':true,
                  'phone_number_verified':true,
                  'location': true,
                  'mandotry_submit_ans':true,
                  'select_question':true,
                  'select_ans_submit':true,
                  'media':false
                }}
        );
        magLogInSucessRestAPI.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          magLogInSucessRestAPI.messageId
          );
          instance.apiEmailLoginCallId = magLogInSucessRestAPI.messageId;
          runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
       });
       then('I can check the login api response with out errors again eight', () => {
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
             
              
               'meta': {
                  'token':'test',
                  'myself':true,
                  'identify_yourself_questions':true,
                  'location': true,
                  'phone_number_verified':true,
                  'mandotry_submit_ans':true,
                  'select_question':true,
                  'select_ans_submit':true,
                  'media':true
                }}
        );
        magLogInSucessRestAPI.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          magLogInSucessRestAPI.messageId
          );
          instance.apiEmailLoginCallId = magLogInSucessRestAPI.messageId;
          runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);

      //     // let textInputComponent7 = mobileAccountLogInWrapper.findWhere((node) => node.prop('data-elementId') === 'sendLoginFailMessage');
      //     // textInputComponent7.simulate('press',);
       });
       then('I can check the login api response with out errors again nine', () => {
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
             
              
               'meta': {
                  'token':'test',
                  'myself':true,
                  'identify_yourself_questions':true,
                  'phone_number_verified':true,
                  'location': false,
                  'mandotry_submit_ans':false
                }}
        );
        magLogInSucessRestAPI.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          magLogInSucessRestAPI.messageId
          );
          instance.apiEmailLoginCallId = magLogInSucessRestAPI.messageId;
          runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
       });


      then('I can check the login api response with out errors', () => {
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
            
               
                 'meta': {
                  'token':'test',
                  
                }
                
              
            
          }
        );
        magLogInSucessRestAPI.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          magLogInSucessRestAPI.messageId
          );
          instance.resetApiCallId = magLogInSucessRestAPI.messageId;
          runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
          
      });

      then('I can check the login api response with errors', () => {
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
             
                "meta": {
                 'token':'',
                 }}
        );
        magLogInSucessRestAPI.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          magLogInSucessRestAPI.messageId
          );
          instance.apiEmailLoginCallId = magLogInSucessRestAPI.messageId;
          runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
  
       });
      

});

  test('User Navigate to google login', ({ given, when, then }) => {
    let mobileAccountLogInWrapper:ShallowWrapper;
    let instance:EmailAccountLoginBlock; 

    given('I am a User attempting to Log In with a google', () => {
        mobileAccountLogInWrapper = shallow(<EmailAccountLoginBlock {...screenProps}/>)
        // expect(mobileAccountLogInWrapper).toBeTruthy()  

        instance = mobileAccountLogInWrapper.instance()as EmailAccountLoginBlock;


    });

    when('I navigate to the Log In Screen', () => {
        instance = mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock
    });

    then('I can select the Log In button with out errors', () => {
      let textInputComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('data-elementId') === 'testGoodleLoginButton');
      textInputComponent.simulate('press');
    });

    then('I can check the google login api response with errors', () => {
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
           
            
             'data': {
              'attributes': {
                "activated": false,
                'token':'test',
                'myself':false,
                'identify_yourself_questions':false
              }
             },
             "meta": {
              'token':'test',
              }
              
            
          
        }
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        magLogInSucessRestAPI.messageId
        );
        instance.googleLoginCallId = magLogInSucessRestAPI.messageId;
        runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);

    });

    then('I can check the google login api response with out errors again', () => {
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
           
          'data': {
            'attributes': {
              'activated': true,
                'token':'test',
                'myself':false,
                'identify_yourself_questions':true
              }},
              "meta": {
               'token':'test',
               }}
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        magLogInSucessRestAPI.messageId
        );
        instance.googleLoginCallId = magLogInSucessRestAPI.messageId;
        runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);

     });

     then('I can check the google login api response with out errors again two', () => {
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
           
          'data': {
            'attributes': {
              'activated': true,
                'token':'test',
                'myself':true,
                'identify_yourself_questions':false
              }},
              "meta": {
               'token':'test',
               }}
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        magLogInSucessRestAPI.messageId
        );
        instance.googleLoginCallId = magLogInSucessRestAPI.messageId;
        runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);

     });
     then('I can check the google login api response with out errors again three', () => {
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
           
          'data': {
            'attributes': {
              'activated': true,
                'token':'test',
                'myself':true,
                'identify_yourself_questions':true,
                'phone_number_verified':false
              }},
              "meta": {
               'token':'test',
               }}
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        magLogInSucessRestAPI.messageId
        );
        instance.googleLoginCallId = magLogInSucessRestAPI.messageId;
        runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);

    //     // let textInputComponent7 = mobileAccountLogInWrapper.findWhere((node) => node.prop('data-elementId') === 'sendLoginFailMessage');
    //     // textInputComponent7.simulate('press',);
     });
     then('I can check the google login api response with out errors again four', () => {
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
           
          'data': {
            'attributes': {
              'activated': true,
                'token':'test',
                'myself':true,
                'identify_yourself_questions':true,
                'phone_number_verified':true,
                'location': true,
                'mandotry_submit_ans':false
              }},
              "meta": {
               'token':'test',
               }}
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        magLogInSucessRestAPI.messageId
        );
        instance.googleLoginCallId = magLogInSucessRestAPI.messageId;
        runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);

    //     // let textInputComponent7 = mobileAccountLogInWrapper.findWhere((node) => node.prop('data-elementId') === 'sendLoginFailMessage');
    //     // textInputComponent7.simulate('press',);
     });
     then('I can check the google login api response with out errors again five', () => {
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
           
          'data': {
            'attributes': {
              'activated': true,
                'token':'test',
                'myself':true,
                'identify_yourself_questions':true,
                'phone_number_verified':true,
                'location': true,
                'mandotry_submit_ans':true,
                'select_question':false
              }},
              "meta": {
               'token':'test',
               }}
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        magLogInSucessRestAPI.messageId
        );
        instance.googleLoginCallId = magLogInSucessRestAPI.messageId;
        runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);

    //     // let textInputComponent7 = mobileAccountLogInWrapper.findWhere((node) => node.prop('data-elementId') === 'sendLoginFailMessage');
    //     // textInputComponent7.simulate('press',);
     });
     then('I can check the google login api response with out errors again six', () => {
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
           
          'data': {
            'attributes': {
              'activated': true,
                'token':'test',
                'myself':true,
                'identify_yourself_questions':true,
                'phone_number_verified':true,
                'location': true,
                'mandotry_submit_ans':true,
                'select_question':true,
                'select_ans_submit':false
              }},
              "meta": {
               'token':'test',
               }}
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        magLogInSucessRestAPI.messageId
        );
        instance.googleLoginCallId = magLogInSucessRestAPI.messageId;
        runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);

    //     // let textInputComponent7 = mobileAccountLogInWrapper.findWhere((node) => node.prop('data-elementId') === 'sendLoginFailMessage');
    //     // textInputComponent7.simulate('press',);
     });
     then('I can check the google login api response with out errors again seven', () => {
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
           
          'data': {
            'attributes': {
              'activated': true,
                'token':'test',
                'myself':true,
                'identify_yourself_questions':true,
                'phone_number_verified':true,
                'location': true,
                'mandotry_submit_ans':true,
                'select_question':true,
                'select_ans_submit':true,
                'media':false
              }},
              "meta": {
               'token':'test',
               }}
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        magLogInSucessRestAPI.messageId
        );
        instance.googleLoginCallId = magLogInSucessRestAPI.messageId;
        runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);

    //     // let textInputComponent7 = mobileAccountLogInWrapper.findWhere((node) => node.prop('data-elementId') === 'sendLoginFailMessage');
    //     // textInputComponent7.simulate('press',);
     });
     then('I can check the google login api response with out errors again eight', () => {
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
           
          'data': {
            'attributes': {
              'activated': true,
                'token':'test',
                'myself':true,
                'identify_yourself_questions':true,
                'location': true,
                'phone_number_verified':true,
                'mandotry_submit_ans':true,
                'select_question':true,
                'select_ans_submit':true,
                'media':true
              }},
              "meta": {
               'token':'test',
               }}
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        magLogInSucessRestAPI.messageId
        );
        instance.googleLoginCallId = magLogInSucessRestAPI.messageId;
        runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);

    //     // let textInputComponent7 = mobileAccountLogInWrapper.findWhere((node) => node.prop('data-elementId') === 'sendLoginFailMessage');
    //     // textInputComponent7.simulate('press',);
     });
     then('I can check the google login api response with out errors again nine', () => {
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
           
          'data': {
            'attributes': {
              'activated': true,
                'token':'test',
                'myself':true,
                'identify_yourself_questions':true,
                'phone_number_verified':true,
                'location': false,
                'mandotry_submit_ans':false
              }},
              "meta": {
               'token':'test',
               }}
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        magLogInSucessRestAPI.messageId
        );
        instance.googleLoginCallId = magLogInSucessRestAPI.messageId;
        runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);

    //     // let textInputComponent7 = mobileAccountLogInWrapper.findWhere((node) => node.prop('data-elementId') === 'sendLoginFailMessage');
    //     // textInputComponent7.simulate('press',);
     });

     then('I can check the google login api response with out errors again ten', () => {
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
            
           'data': {
             'attributes': {
               'activated': true,
                 'token':'test',
                 'myself':false,
                 'identify_yourself_questions':false
               }},
               "meta": {
                'token':'test',
                }}
       );
       magLogInSucessRestAPI.addData(
         getName(MessageEnum.RestAPIResponceDataMessage),
         magLogInSucessRestAPI.messageId
         );
         instance.googleLoginCallId = magLogInSucessRestAPI.messageId;
         runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
 
      });

      then('I can check the google login api response with errors', () => {
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
             
                "meta": {
                 'token':'',
                 }}
        );
        magLogInSucessRestAPI.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          magLogInSucessRestAPI.messageId
          );
          instance.googleLoginCallId = magLogInSucessRestAPI.messageId;
          runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
  
       });
  });
 
});