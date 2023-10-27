Feature: EmailOTPInput

    Scenario: User navigates to EmailOTPInput
        Given I am a User loading EmailOTPInput
        When I navigate to the EmailOTPInput
        Then EmailOTPInput will load with out errors
        And I press submit button with empty otp
        And I press submit with signUp true props
        And I can call signUpEmailOtpCallId with undefined
        And I can enter text with out errors
        And I can call addAdditionalDetailApiCallId with out errors
        And I can call emailOtpApiCallId with out errors
        And I can call signUpEmailOtpCallId with errors
        And I can call signUpEmailOtpCallId with out errors

        Scenario: User navigates to EmailOTPInputWithFalse
        Given I am a User loading EmailOTPInputFalse
        When I navigate to the EmailOTPInputFalse
        Then EmailOTPInput will load with out errorsFalse
        Then I can leave the screen with out errorsFalse