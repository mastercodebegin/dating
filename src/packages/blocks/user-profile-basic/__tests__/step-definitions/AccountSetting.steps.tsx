//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from 'framework/src/Helpers'
import React from "react";
import AccountSetting from "../../src/AccountSetting"
import { Message } from "framework/src/Message"
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";


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
    id: "MainCustomizableScreen"
}

const feature = loadFeature('./__tests__/features/AccountSetting-scenario.feature');

defineFeature(feature, (test) => {

    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to AccountSetting', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: AccountSetting;

        given('I am a User loading AccountSetting', () => {
            exampleBlockA = shallow(<AccountSetting {...screenProps} />);
        });

        when('I navigate to the AccountSetting', () => {
            instance = exampleBlockA.instance() as AccountSetting
        });
        then('I can upload AccountSetting', () => {
            expect(exampleBlockA).toBeTruthy();

            let buttonComponent1 = exampleBlockA.findWhere((node) => node.prop('testID') === 'NEXTbtn');
            instance.logoutUserData()
            instance.getUserProfileData()
            buttonComponent1.at(0).simulate('press');
        });

        then('AccountSetting will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });
        then("I can select the button with with out errors", () => {
            let navigation = {
                navigate: jest.fn()
            }
            // navigation.navigate
            let wrapper = shallow(<AccountSetting navigation={navigation} />)
            let buttonComponent = wrapper.findWhere((node) => node.prop("testID") === "btnAddExample");
            buttonComponent.simulate("press");
            expect(navigation.navigate).toBeTruthy()
        });
        then("I can select the linence Button with with out errors", () => {
            let navigation = {
                navigate: jest.fn()
            }
            // navigation.navigate
            let wrapper = shallow(<AccountSetting navigation={navigation} />)
            let buttonComponent = wrapper.findWhere((node) => node.prop("testID") === "btnAddExample1");
            buttonComponent.simulate("press");
            expect(navigation.navigate).toBeTruthy()

        });
        then("I can select the AccountSetting Button with with out errors", () => {
            let navigation = {
                navigate: jest.fn()
            }
            // navigation.navigate
            let wrapper = shallow(<AccountSetting navigation={navigation} />)
            let buttonComponent = wrapper.findWhere((node) => node.prop("testID") === "btnAddExample2");
            buttonComponent.simulate("press");
            expect(navigation.navigate).toBeTruthy()

        });
        then("I can press the Contact Us Button", () => {
            let navigation = {
                navigate: jest.fn()
            }
            // navigation.navigate
            let wrapper = shallow(<AccountSetting navigation={navigation} />)
            let buttonComponent = wrapper.findWhere((node) => node.prop("data-testid") === "ContactUsButton");
            buttonComponent.simulate("press");
            expect(navigation.navigate).toBeTruthy()

        });
        then('Account will load with out errors', () => {
            message.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                message.messageId
            )
            instance.userProfileGetApiCallId = message.messageId
            instance.setState({
                imagePath: "",
                user_name: "",
                name:"",
                isLoading: "false"
              })
            instance.receive('test', message)
        });

        let message: Message = new Message(
            getName(MessageEnum.RestAPIResponceMessage)
        )

        message.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            {
                data: []
            }

        )
        // then("I can select the Shuttle Button with with out errors", () => {
        //     let navigation = {
        //         navigate: jest.fn()
        //     }
        //     // navigation.navigate
        //     let wrapper = shallow(<AccountSetting navigation={navigation} />)
        //     let buttonComponent = wrapper.findWhere((node) => node.prop("testID") === "btnAddExample3");
        //     buttonComponent.simulate("press");
        //     expect(navigation.navigate).toBeTruthy()

        // });
        // then("I can select the PromoScreen Button with with out errors", () => {
        //     let navigation = {
        //         navigate: jest.fn()
        //     }
        //     // navigation.navigate
        //     let wrapper = shallow(<AccountSetting navigation={navigation} />)
        //     let buttonComponent = wrapper.findWhere((node) => node.prop("testID") === "btnAddExample4");
        //     buttonComponent.simulate("press");
        //     expect(navigation.navigate).toBeTruthy()

        // });

        // then("I can select the FrequentlyAskedScreen Button with with out errors", () => {
            
        //     let navigation = {
        //         navigate: jest.fn()
        //     }
        //     // navigation.navigate
        //     let wrapper = shallow(<AccountSetting navigation={navigation} />)
        //     let buttonComponent = wrapper.findWhere((node) => node.prop("testID") === "btnAddExample5");
        //     buttonComponent.simulate("press");
        //     expect(navigation.navigate).toBeTruthy()

        // });



       
        then("I can select back with out errors", () => {

            let navigation = {
                navigate: jest.fn(),
                goBack: jest.fn()
            }
            // navigation.navigate
            let wrapper = shallow(<AccountSetting navigation={navigation} />)
            let buttonComponent = wrapper.findWhere((node) => node.prop("testID") === 'onGoBack');
            buttonComponent.simulate("press");
            expect(navigation.navigate).toBeTruthy()

            // goBackBtn.simulate("press");

        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
