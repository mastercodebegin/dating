Feature: WelcomScreen

    Scenario: User navigates to WelcomScreen
        Given I am a User loading WelcomScreen
        When I navigate to the WelcomScreen
        Then WelcomScreen will load with out errors
        And I can leave the screen with out errors