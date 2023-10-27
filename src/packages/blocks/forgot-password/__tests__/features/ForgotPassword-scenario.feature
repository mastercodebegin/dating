Feature: ForgotPassword

    Scenario: User navigates to ForgotPassword
        Given I am a User loading ForgotPassword
        When I navigate to the ForgotPassword
        Then ForgotPassword will load with out errors
        And I can call api with errors
        And I can call requestEmailOtpCallId api with out errors
        And I can call api with out errors
        And I can leave the screen with out errors
        And Click on hide keyboard button
        And Click on forForgotEmail button
        And Click on forgotPasswordSMS button
        And EnterPhoneOTP and EnterEmailOTP
        And I can call requestPhoneOtpCallId api with out errors
        And I can call requestChangePasswordCallId api with out errors



