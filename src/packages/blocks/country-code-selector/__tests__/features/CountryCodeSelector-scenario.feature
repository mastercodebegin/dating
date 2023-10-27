Feature: CountryCodeSelector

    Scenario: User navigates to CountryCodeSelector
        Given I am a User loading CountryCodeSelector
        When I navigate to the CountryCodeSelector
        Then CountryCodeSelector will load with out errors
        And I can leave the screen with out errors
        Then I can click onpress button