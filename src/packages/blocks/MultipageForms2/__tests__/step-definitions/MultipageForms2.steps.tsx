import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import MultipageForms2 from "../../src/MultipageForms2"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "MultipageForms2"
  }

const feature = loadFeature('./__tests__/features/MultipageForms2-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to MultipageForms2', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:MultipageForms2; 

        given('I am a User loading MultipageForms2', () => {
            exampleBlockA = shallow(<MultipageForms2 {...screenProps}/>);
        });

        when('I navigate to the MultipageForms2', () => {
             instance = exampleBlockA.instance() as MultipageForms2
        });

        then('MultipageForms2 will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can enter text with out errors', () => {
            let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInput');
            textInputComponent.simulate('changeText', 'hello@aol.com');
        });

        then('I can select the button with with out errors', () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnExample');
            buttonComponent.simulate('press'); 
            expect(instance.state.txtSavedValue).toEqual("hello@aol.com");
            let buttonComponent1 = exampleBlockA.findWhere((node) => node.prop('testID') === 'Background');
            buttonComponent1.simulate('press');
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
