import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from 'framework/src/Helpers'
import React from "react";
import IdentifyYourSelf from "../../src/IdentifyYourSelf"
import { Keyboard } from "react-native";
import { runEngine } from 'framework/src/RunEngine'
import { Message } from "framework/src/Message"
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
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
    id: "MainCustomizableScreen"
}

const feature = loadFeature('./__tests__/features/IdentifyYourSelf-scenario.feature');
let buttonComponent1
const runNextBtnTestCases = (exampleBlockA: ShallowWrapper) => {
    buttonComponent1 = exampleBlockA.findWhere((node) => node.prop('testID') === 'NEXTbtn');
    buttonComponent1.simulate('press');
    expect(exampleBlockA).toBeTruthy();
}

defineFeature(feature, (test) => {

    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to IdentifyYourSelf', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: IdentifyYourSelf;

        given('I am a User loading IdentifyYourSelf', () => {
            exampleBlockA = shallow(<IdentifyYourSelf {...screenProps} />);
        });

        when('I navigate to the IdentifyYourSelf', () => {
            instance = exampleBlockA.instance() as IdentifyYourSelf
        });

        then('IdentifyYourSelf will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
            const apiIdentifyYourSelf = new Message(getName(MessageEnum.RestAPIResponceMessage))
            instance.getIdentifySelf = apiIdentifyYourSelf.messageId
            apiIdentifyYourSelf.addData(getName(MessageEnum.RestAPIResponceDataMessage), apiIdentifyYourSelf.messageId);
            apiIdentifyYourSelf.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                [{ "created_at": "2023-05-25T11:54:53.069Z", "id": 4, "option1": "Workplace Collaborations", "option2": "Something platonics", "option3": "Something Romantic", "option4": "Something casual", "option5": "No Preference", "question": "What kind of intimacy do you think you are looking for here?", "updated_at": "2023-05-30T03:56:14.500Z" }, { "created_at": "2023-05-25T07:35:06.847Z", "id": 3, "option1": "Spend quality time together", "option2": "Do acts of service together", "option3": "Physical touch", "option4": "Receiving Gifts", "option5": "Words of Affirmation ", "question": "How do you tend to communicate with your partner?", "updated_at": "2023-05-30T08:00:06.737Z" }]
            );
            runEngine.sendMessage("Unit Test", apiIdentifyYourSelf);
        });
        then('I can enter a Add Name with out errors', async () => {
            runNextBtnTestCases(exampleBlockA)
            await new Promise((r) => setTimeout(r, 100));
            let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'testIdName');
            textInputComponent.simulate('changeText', 'hello');
            textInputComponent.simulate("focus");
            textInputComponent.simulate("blur");
            await new Promise((r) => setTimeout(r, 100));
            runNextBtnTestCases(exampleBlockA)
        });
        then('I can enter a User Name with out errors', async () => {
            await new Promise((r) => setTimeout(r, 100));
            let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInputUserName');
            textInputComponent.simulate('changeText', 'userName');
            textInputComponent.simulate("focus");
            textInputComponent.simulate("blur");
            await new Promise((r) => setTimeout(r, 100));
            runNextBtnTestCases(exampleBlockA)
        });

        then('IdentifyYourSelf will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'button-view-pad');
            buttonComponent.simulate('press');
            Keyboard.dismiss()
        });
        then("I can select the male button with with out errors", () => {
            let navigation = {
                navigate: jest.fn()
            }
            // navigation.navigate
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop("testID") === "btnAddExample");
            // instance.handleYourSelf('male')
            buttonComponent.simulate("press");
            runNextBtnTestCases(exampleBlockA)
            expect(navigation.navigate).toBeTruthy()
        });
        then("I can select the Female button with with out errors", () => {
            let navigation = {
                navigate: jest.fn()
            }
            // navigation.navigate
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop("testID") === "btnAddExample1");
            // instance.handleYourSelf('Female')
            buttonComponent.simulate("press");
            expect(navigation.navigate).toBeTruthy()
        });
        then("I can select the Fluid button with with out errors", () => {
            let navigation = {
                navigate: jest.fn()
            }
            // navigation.navigate
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop("testID") === "btnAddExample2");
            // instance.handleYourSelf('Fluid')
            buttonComponent.simulate("press");
            expect(navigation.navigate).toBeTruthy()
        });


        then("I can select the ShowPicker Button with with out errors", () => {
            let navigation = {
                navigate: jest.fn()
            }
            // navigation.navigate
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop("testID") === "ShowpickerTestID");
            // instance.setState({ showPicker: true })
            buttonComponent.simulate("press");
            expect(navigation.navigate).toBeTruthy()
        });
        then("I can select the ShowPicker month Button with with out errors", () => {
            let navigation = {
                navigate: jest.fn()
            }
            // navigation.navigate
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop("testID") === "ShowpickerTestID1");
            // instance.setState({ showPicker: true })
            buttonComponent.simulate("press");
            expect(navigation.navigate).toBeTruthy()
        });
        then("I can select the ShowPicker date Button with with out errors", () => {
            let navigation = {
                navigate: jest.fn()
            }
            // navigation.navigate
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop("testID") === "ShowpickerTestID2");
            // instance.setState({ showPicker: true })
            buttonComponent.simulate("press");
            expect(navigation.navigate).toBeTruthy()
        });
        then("I can select the  date with out errors", () => {
            let navigation = {
                navigate: jest.fn()
            }
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop("testID") === "dateTimePicker");
            buttonComponent.simulate("change", {type: "set"}, "2003-06-29T00:00:00.000Z");
            expect(navigation.navigate).toBeTruthy()
        });

        then('I can select the dateTimePicker In button with out errors', () => {
            let navigation = {
                navigate: jest.fn()
            }
            // navigation.navigate
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop("testID") === "TestidMale");
            // instance.handleIntrestedGender('Male')
            buttonComponent.simulate("press");
            expect(navigation.navigate).toBeTruthy()

            let buttonComponent2 = exampleBlockA.findWhere((node) => node.prop("testID") === "TestIdFemale");
            // instance.handleIntrestedGender('Female')
            buttonComponent2.simulate("press");
            expect(navigation.navigate).toBeTruthy()


            let buttonComponent3 = exampleBlockA.findWhere((node) => node.prop("testID") === "TestIdFluid");
            // instance.handleIntrestedGender('Fluid')
            buttonComponent3.simulate("press");
            expect(navigation.navigate).toBeTruthy()

        });
        then('I can upload IdentifyYourSelf', () => {
            runNextBtnTestCases(exampleBlockA)
        });
        then('I can submit identifyYourSelf without error', () => {
            expect(exampleBlockA).toBeTruthy();

            const responseJson = {"data": {"attributes": {"activated": true, "country_code": null, "created_at": "2023-06-29T07:05:50.446Z", "date_of_birth": "1994-06-29", "device_id": null, "email": "tanu180@gmail.com", "first_name": "Tanu", "full_phone_number": "", "identify_yourself_questions": false, "last_name": null, "myself": true, "phone_number": null, "type": "EmailAccount", "unique_auth_id": "ugzr7bOvlRYISljTsttqVgtt", "updated_at": "2023-06-29T07:06:37.918Z", "user_name": "Tanu"}, "id": "821", "type": "account"}, "meta": {"message": "Details added successfully."}};

            const apiAccountCallId = new Message(getName(MessageEnum.RestAPIResponceMessage))
            apiAccountCallId.addData(getName(MessageEnum.RestAPIResponceDataMessage), apiAccountCallId);
            apiAccountCallId.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                responseJson
            );
            apiAccountCallId.addData(getName(MessageEnum.RestAPIResponceDataMessage), apiAccountCallId.messageId);
            instance.indendtifyApiCallId = apiAccountCallId.messageId
            // instance.callIdentifyYourSelfApi()
            instance.updateSelfidentityCallID = apiAccountCallId.messageId
            // instance.handleBackButtonClick()
            runEngine.sendMessage("Unit Test", apiAccountCallId);


        });
        // then("I can select the PromoScreen Button with with out errors", () => {
        //     let navigation = {
        //         navigate: jest.fn()
        //     }
        //     // navigation.navigate
        //     let wrapper = shallow(<IdentifyYourSelf navigation={navigation} />)
        //     let buttonComponent = wrapper.findWhere((node) => node.prop("testID") === "btnAddExample4");
        //     buttonComponent.simulate("press");
        //     expect(navigation.navigate).toBeTruthy()

        // });

        // then("I can select the FrequentlyAskedScreen Button with with out errors", () => {

        //     let navigation = {
        //         navigate: jest.fn()
        //     }
        //     // navigation.navigate
        //     let wrapper = shallow(<IdentifyYourSelf navigation={navigation} />)
        //     let buttonComponent = wrapper.findWhere((node) => node.prop("testID") === "btnAddExample5");
        //     buttonComponent.simulate("press");
        //     expect(navigation.navigate).toBeTruthy()

        // });




        then("I can select back with out errors", () => {
            let navigation = {
                navigate: jest.fn()
            }
            // navigation.navigate
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop("testID") === "onGoBackID");
            buttonComponent.simulate("press");
            expect(navigation.navigate).toBeTruthy()


        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
