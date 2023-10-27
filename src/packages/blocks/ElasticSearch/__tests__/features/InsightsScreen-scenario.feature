Feature: InsightsScreen

    Scenario: User navigates to InsightsScreen
        Given I am a User loading InsightsScreen
        When I navigate to the InsightsScreen
        Then InsightsScreen will load with out errors
        And I can increase check count
        And I can check userList with error
        And I can check userList without error
        And I can check questions with error
        And I can check questions without error
        And I can check questions and answer api with error
        And questionAnswerCallId api will return success
        And I can leave the screen with out errors
      