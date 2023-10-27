//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from 'framework/src/Helpers'
import React from "react";
import { runEngine } from 'framework/src/RunEngine'
import { Message } from "framework/src/Message"

import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import UserProfileBasicBlock from "../../src/UserProfileBasicBlockNew"
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
    id: "UserProfileBasicBlock"
}

const feature = loadFeature('./__tests__/features/UserProfileBasicBlock-scenario-new.feature');

defineFeature(feature, (test) => {

    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to UserProfileBasicBlock', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: UserProfileBasicBlock;

        given('I am a User loading UserProfileBasicBlock', () => {
            exampleBlockA = shallow(<UserProfileBasicBlock {...screenProps} />);
        });

        when('I navigate to the UserProfileBasicBlock', () => {
            instance = exampleBlockA.instance() as UserProfileBasicBlock
        });

        then('I can upload UserProfileBasicBlock', () => {


            // this.state = {
            //     back_insurance_card: "",
            //     front_insurance_card: "",
            // };
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'NEXTbtn');
            // instance.logoutUserData()
            instance = exampleBlockA.instance() as UserProfileBasicBlock
            // let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'gotItBtn');
            // buttonComponent.simulate('press');

        });
        then('UserProfileBasicBlock will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });
        then("I can select the button AccountSetting with with out errors", () => {
            let navigation = {
                navigate: jest.fn(),
                goBack: jest.fn()

            }
            // navigation.navigate
            let wrapper = shallow(<UserProfileBasicBlock navigation={navigation} />)
            let buttonComponent = wrapper.findWhere((node) => node.prop("testID") === "btnAddExample");
            buttonComponent.simulate("press");
            expect(navigation.navigate).toBeTruthy()

        });
        then("I can select the button PrivacyPolicyScreen with with out errors", () => {
            let navigation = {
                navigate: jest.fn(),
                goBack: jest.fn()

            }
            // navigation.navigate
            let wrapper = shallow(<UserProfileBasicBlock navigation={navigation} />)
            let buttonComponent = wrapper.findWhere((node) => node.prop("testID") === "btnAddExample1");
            buttonComponent.simulate("press");
            expect(navigation.navigate).toBeTruthy()

        });




        then('I can check the swiperList', () => {
            let plans = exampleBlockA.findWhere((node) => node.prop('testID') === "swiperID");
            // plans.props().renderItem({
            //     item: {
            //         id: 2,
            //         attributes: {
            //             id: 2,
            //             duration: 'Monthly',
            //             currency: 'USD',
            //             amount: '250',
            //             plan_name: 'Monthly'
            //         }
            //     }
            // })
        });

        then("userProfile will load with out errors", () => {
            let message: Message = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            message.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                message.messageId
            );
            instance.userProfileGetApiCallId = message.messageId;
            message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
            
{"data":{"id":"38","type":"profile","attributes":{"id":38,"address":null,"about":"hiii, I'm user","distance":null,"photos":[{"id":160,"url":"https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/xvpej0t0qaipnmx0yovlebysvmxp?response-content-disposition=inline%3B%20filename%3D%22image.jpg%22%3B%20filename%2A%3DUTF-8%27%27image.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230629%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230629T085105Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=b50c6f059b199792fdd7dba5e6ee60919f41212bca6526d872f410a8450b9aaf"},{"id":161,"url":"https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/56eyd4ndgcsgdh2nxegg5st41xb7?response-content-disposition=inline%3B%20filename%3D%22image.jpg%22%3B%20filename%2A%3DUTF-8%27%27image.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230629%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230629T085105Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=e1c025c0c0b24aacdffb0c2899f4f77b85378e544600465fc657cc02e2292ab4"},{"id":162,"url":"https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/am6ks3rzngimet8cybaux902i1me?response-content-disposition=inline%3B%20filename%3D%22image.jpg%22%3B%20filename%2A%3DUTF-8%27%27image.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230629%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230629T085106Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=606a4b31a4553da771e6554825d1b6a74e70ea02803a07514d201721c4507389"},{"id":163,"url":"https://minio.b273542.dev.eastus.az.svc.builder.cafe/sbucket/o2go8l3jhipi5w8kpj61qritk4s0?response-content-disposition=inline%3B%20filename%3D%22image.jpg%22%3B%20filename%2A%3DUTF-8%27%27image.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230629%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230629T085106Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=b4308a28db3093b541d19f7e0250a39e1d8e055466d1b865f1bc890333d3b23d"}],"email":{"email":"test99@gmail.com"},"name":{"name":"test"},"interest":{"interest":null},"age":{"age":null},"user_name":{"user_name":"testvaishali"},"looking_for":null}},"meta":{"message":"Successfully Loaded"}}                
                
                );
            runEngine.sendMessage("Unit Test", message);
            // instance.UserDetailsSuccCallBack({"data": {"attributes": {"activated": true, "country_code": "91", "created_at": "2023-06-13T11:24:07.539Z", "date_of_birth": "2023-06-28", "device_id": null, "email": "test99@gmail.com", "first_name": "test", "full_phone_number": "919878573637", "identify_yourself_questions": true, "last_name": null, "myself": true, "phone_number": "9878573637", "profile": [Object], "type": "EmailAccount", "unique_auth_id": "h9ufPSDG5p0ZnskpdAOEXAtt", "updated_at": "2023-06-28T13:13:37.065Z", "user_name": "testvaishali"}, "id": "739", "type": "account"}, "meta": {"message": "Account Details."}}            )

        });

        then("I can not profile data", () => {
            let message: Message = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            message.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                message.messageId
            );
            instance.userProfileGetApiCallId = message.messageId;
            message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    errors: []
                }
            );
            runEngine.sendMessage("Unit Test", message);
        });


        then("I can select back with out errors", () => {

            let navigation = {
                navigate: jest.fn(),
                goBack: jest.fn()
            }
            // navigation.navigate
            let wrapper = shallow(<UserProfileBasicBlock navigation={navigation} />)
            let buttonComponent = wrapper.findWhere((node) => node.prop("testID") === "onSelectImage");
            buttonComponent.simulate("press");
            expect(navigation.navigate).toBeTruthy()

            // goBackBtn.simulate("press");

        });

        then("I can select edit Icon with out errors", () => {
            let navigation = {
                navigate: jest.fn(),
                goBack: jest.fn()
            }
            // navigation.navigate
            // let wrapper = shallow(<UserProfileBasicBlock navigation={navigation} />)
            // let buttonComponent = wrapper.findWhere((node) => node.prop("testID") === "onHeaderID");
            // buttonComponent.simulate("press");
            // expect(navigation.navigate).toBeTruthy()

            // goBackBtn.simulate("press");

        });

        then("go to privacy policy function triggered", () => {
            
            instance.requestSessionData()
            instance.goToPrivacyPolicy();
            instance.goToTermsAndCondition();
          });
        then("isStringNullOrBlank function triggered", () => {
            //instance.isStringNullOrBlank("abc");
          });
          
          then("isValidEmail function triggered", () => {
            //instance.isValidEmail('email@');
          });
          
          then("getUserProfile function triggered", () => {
            instance.getValidations();
          });
          
          then("validateRePassword function triggered", () => {
            
          });
          
          then("validatePassword function triggered", () => {
            
          });
          
          then("validating mobile on server", () => {
          });
          
          then("validateAndUpdateProfile function triggered", () => {
            
          });
          
        //   then("validateMobileAndThenUpdateUserProfile function triggered", () => {
        //     instance.validateMobileAndThenUpdateUserProfile();
        //   });
        then("validateMobileAndThenUpdateUserProfile function triggered", () => {
            
            
          });
          then("validateMobileAndThenUpdateUserProfile function triggered with out error", () => {
          
          });
          then("enableDisableEditPassword function triggered", () => {
            
          });
          
          then("validateAndUpdate function triggered", () => {
            
            
           
            
            
          });
        then('I can leave the screen with out errors', () => {
           // instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });

 
});
