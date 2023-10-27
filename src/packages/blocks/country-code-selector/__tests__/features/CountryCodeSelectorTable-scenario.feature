Feature: CountryCodeSelectorTable

    Scenario: User navigates to CountryCodeSelectorTable
        Given I am a User loading CountryCodeSelectorTable
        When I navigate to the CountryCodeSelectorTable
        Then CountryCodeSelectorTable will load with out errors
        And I can leave the screen with out errors
        Then I can click action button
        Then I can change search data
        Then countryCodeApiCallId api will return error
        Then countryCodeApiCallId api will return success