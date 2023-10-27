Feature: CustomForgotPassword

    Scenario: User navigates to CustomForgotPassword
        Given I am a User loading CustomForgotPassword
        When I navigate to the CustomForgotPassword
        Then CustomForgotPassword will load with out errors
        And I can call api with errors
        And I can enter text with out errors
        And I can check passwordError and confirmPasswordError
        And I can check password and confirm password not match
        And I can leave the screen with out errors