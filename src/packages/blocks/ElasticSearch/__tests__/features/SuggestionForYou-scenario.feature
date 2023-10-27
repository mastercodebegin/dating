Feature: SuggestionForYou

    Scenario: User navigates to SuggestionForYou
        Given I am a User loading SuggestionForYou
        When I navigate to the SuggestionForYou
        Then SuggestionForYou will load with out errors
        And I can check user suggested api with out errors
        And I can check user suggested api with errors
        And I can check the suggested friend flatlist
        And I can leave the screen with out errors