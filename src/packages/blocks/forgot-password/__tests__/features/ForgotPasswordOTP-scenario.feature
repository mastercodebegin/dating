Feature: ForgotPasswordOTP

    Scenario: User navigates to ForgotPasswordOTP
        Given I am a User loading ForgotPasswordOTP
        When I navigate to the ForgotPasswordOTP
        Then ForgotPasswordOTP will load with out errors
        And I can call api with errors
        And I can enter text with out errors
        And I can leave the screen with out errors