import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import EducationalUserProfile from "../../src/EducationalUserProfile"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "EducationalUserProfile"
  }

const feature = loadFeature('./__tests__/features/EducationalUserProfile-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to EducationalUserProfile', ({ given, when, then }) => {
        let educationalUserProfileBlock:ShallowWrapper;
        let instance:EducationalUserProfile; 

        given('I am a User loading EducationalUserProfile', () => {
            educationalUserProfileBlock = shallow(<EducationalUserProfile {...screenProps}/>);
        });

        when('I navigate to the EducationalUserProfile', () => {
             instance = educationalUserProfileBlock.instance() as EducationalUserProfile
        });

        then('EducationalUserProfile will load with out errors', () => {
            const tokenMsg: Message = new Message(
                getName(MessageEnum.SessionResponseMessage)
            );
            tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
            runEngine.sendMessage("Unit Test", tokenMsg);        
            expect(educationalUserProfileBlock).toBeTruthy();
        });
        
        then("I can click Hide onpress button", () => {


            let buttonComponent =
            educationalUserProfileBlock.findWhere(
                    (node) => node.prop("testID") === "HideKeyboard"
                );
            buttonComponent.simulate("press");  
        });


        then("I can click onpress button", () => {
            let buttonComponent =
            educationalUserProfileBlock.findWhere(
                    (node) => node.prop("testID") === "ActiveTab"
                );
            buttonComponent.simulate("press");
            let buttonComponent1 =
            educationalUserProfileBlock.findWhere(
                    (node) => node.prop("testID") === "ActiveTab2"
                );
            buttonComponent1.simulate("press");
            let buttonComponent2 =
            educationalUserProfileBlock.findWhere(
                    (node) => node.prop("testID") === "ActiveTab3"
                );
            buttonComponent2.simulate("press");

            let buttonComponent3 =
            educationalUserProfileBlock.findWhere(
                    (node) => node.prop("testID") === "HIdeMoodal"
                );
            buttonComponent3.simulate("press");
            
            
        });


        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(educationalUserProfileBlock).toBeTruthy();
        });
    });


});
