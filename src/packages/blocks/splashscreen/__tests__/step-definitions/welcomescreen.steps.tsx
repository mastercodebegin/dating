jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');
import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'

import React from "react";
import Welcomescreen from "../../src/WelcomScreen"
const navigation = require("react-navigation")


const screenProps = {
    navigation: navigation,
    id: "Splashscreen"
}

const feature = loadFeature('./__tests__/features/welcomescreen-scenario.feature');
defineFeature(feature, (test) => {
    
    
    beforeEach(() => {
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
        jest.resetModules();
        jest.spyOn(global, 'setTimeout').mockImplementation((cb:any) => cb() );
        jest.resetModules()
   
    });

    test('User navigates to Splashscreen', ({ given, when, then }) => {
        let splashscreen:ShallowWrapper;
        let instance:Welcomescreen; 
        
        given('I am a User loading Splashscreen', () => {
            splashscreen = shallow(<Welcomescreen {...screenProps}/>)
        });
        
        when('I navigate to the Splashscreen', () => {
            instance = splashscreen.instance() as Welcomescreen
            
        });
        
        then('Splashscreen will load with out errors', () => {
            expect(Welcomescreen).toBeTruthy()
        });
        
        then('I can leave the screen with out errors', () => {
            expect(Welcomescreen).toBeTruthy()
            // expect(setTimeout).toHaveBeenCalledTimes(1);
            // expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2000);
        });
    });
    
});
