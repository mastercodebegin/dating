Feature: SelectedQuestion

    Scenario: User navigates to SelectedQuestion
        Given I am a User loading SelectedQuestion
        When I navigate to the SelectedQuestion
        Then SelectedQuestion will load without errors
        And I can select the 5 question without errors
        And I can leave the screen with out errors

