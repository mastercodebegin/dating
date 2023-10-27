Feature: PersonalityStatement

    Scenario: User navigates to PersonalityStatement
        Given I am a User loading PersonalityStatement
        When I navigate to the PersonalityStatement
        Then PersonalityStatement will load without errors
        And I can add bio without errors
        And I can leave the screen with out errors

    Scenario: User navigates to PersonalityStatement screen
        Given I am a User loading PersonalityStatement screen
        When I navigate to the PersonalityStatement screen
        Then PersonalityStatement screen will load without errors
        And I can update bio without errors
        And I can leave screen with out errors
