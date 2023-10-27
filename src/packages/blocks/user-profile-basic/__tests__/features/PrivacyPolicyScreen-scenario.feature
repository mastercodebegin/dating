Feature: PrivacyPolicy

    Scenario: User navigates to PrivacyPolicy
        Given I am a User loading PrivacyPolicy
        When I navigate to the PrivacyPolicy
        Then PrivacyPolicy will load with out errors
        And PrivacyPolicy will load faqs with out errors
        And I can select the button with with out errors
        And I can Click FAQ Button
        And I can leave the screen with out errors