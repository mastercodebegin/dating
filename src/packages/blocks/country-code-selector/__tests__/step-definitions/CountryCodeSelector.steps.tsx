import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'

import React from "react";
import CountryCodeSelector from "../../src/CountryCodeSelector";
const navigation = require("react-navigation")

const screenProps = {
    navigation: {
        navigate: jest.fn()
    },
    id: "CountryCodeSelector",
    placeHolder: "",
    style: "",
    disable: false,
    allowPropChange: false,
    value: "",
}

const feature = loadFeature('./__tests__/features/CountryCodeSelector-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to CountryCodeSelector', ({ given, when, then }) => {
        let countryCodeSelector: ShallowWrapper;
        let instance: CountryCodeSelector;

        given('I am a User loading CountryCodeSelector', () => {
            countryCodeSelector = shallow(<CountryCodeSelector {...screenProps} />)
        });

        when('I navigate to the CountryCodeSelector', () => {
            instance = countryCodeSelector.instance() as CountryCodeSelector
        });

        then('CountryCodeSelector will load with out errors', () => {
            expect(CountryCodeSelector).toBeTruthy()
        });

        then('I can leave the screen with out errors', () => {
            expect(CountryCodeSelector).toBeTruthy()
        });

        then("I can click onpress button", () => {
            let buttonComponent =
                countryCodeSelector.findWhere(
                    (node) => node.prop("testID") === "onPressNavigation"
                );
            buttonComponent.simulate("press");
        });
    });

});
