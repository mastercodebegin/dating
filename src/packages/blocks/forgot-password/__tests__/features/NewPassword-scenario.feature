Feature: NewPassword

    Scenario: User navigates to NewPassword
        Given I am a User loading NewPassword
        When I navigate to the NewPassword
        Then NewPassword will load with out errors
        And I can call api with errors
        And api will return success
        And I can enter text with out errors
        And I can leave the screen with out errors