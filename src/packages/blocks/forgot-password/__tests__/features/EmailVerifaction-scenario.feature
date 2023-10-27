Feature: EmailVerifaction

    Scenario: User navigates to EmailVerifaction
        Given I am a User loading EmailVerifaction
        When I navigate to the EmailVerifaction
        Then EmailVerifaction will load with out errors
        And I can enter text with out errors
        And I can enter email out errors
        And I can call emailVerificationApi with out errors
        And I can call emailVerificationApi with errors
        And I can leave the screen with out errors