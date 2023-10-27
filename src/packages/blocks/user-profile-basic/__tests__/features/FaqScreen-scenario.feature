Feature: FaqScreen

    Scenario: User navigates to FaqScreen
        Given I am a User loading FaqScreen
        When I navigate to the FaqScreen
        Then FaqScreen will load with out errors
        And FaqScreen will load faqs with out errors
        And I can select the button with with out errors
        And I can Click FAQ Button
        And I can leave the screen with out errors