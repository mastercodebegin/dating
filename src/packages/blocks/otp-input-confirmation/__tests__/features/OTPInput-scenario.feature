Feature: OTPInput
        Scenario: User navigates to OTPInputWith
        Given I am a User loading OTPInputWith 
        When I navigate to the OTPInputWith
        Then OTPInputWith will load with out errors
        Then I can check events
        Then I can check Api with errors
        Then I can check Api with out errors
        Then I can leave the screen with out errors