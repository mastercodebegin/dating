Feature: LocationAccess

    Scenario: User navigates to LocationAccess
        Given I am a User loading LocationAccess
        When I navigate to the LocationAccess
        Then LocationAccess will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can check addlocation Api with errors
        And I can check addlocation Api with out errors
        And I can leave the screen with out errors