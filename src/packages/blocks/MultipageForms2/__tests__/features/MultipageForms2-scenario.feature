Feature: MultipageForms2

    Scenario: User navigates to MultipageForms2
        Given I am a User loading MultipageForms2
        When I navigate to the MultipageForms2
        Then MultipageForms2 will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors