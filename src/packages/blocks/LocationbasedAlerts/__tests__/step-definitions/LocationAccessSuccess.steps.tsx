import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import LocationAccessSuccess from "../../src/LocationAccessSuccess"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "LocationAccessSuccess"
  }

const feature = loadFeature('./__tests__/features/LocationAccessSuccess-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to LocationAccessSuccess', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:LocationAccessSuccess; 

        given('I am a User loading LocationAccessSuccess', () => {
            exampleBlockA = shallow(<LocationAccessSuccess {...screenProps}/>);
        });

        when('I navigate to the LocationAccessSuccess', () => {
             instance = exampleBlockA.instance() as LocationAccessSuccess
        });

        then('LocationAccessSuccess will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can enter text with out errors', () => {
            // let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInput');
            // textInputComponent.simulate('changeText', 'hello@aol.com');
        });

        then('I can select the button with with out errors', () => {
            // let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnExample');
            // buttonComponent.simulate('press');
            // expect(instance.state.txtSavedValue).toEqual("hello@aol.com");
        });

        then('I can leave the screen with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
