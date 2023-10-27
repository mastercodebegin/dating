Feature: Level1Question

    Scenario: User navigates to Level1Question
        Given I am a User loading Level1Question
        When I navigate to the Level1Question
        Then Level1Question will load without errors
        And Get question api with error
        And Render flatlist component
        And I can press the right arrow button
        And I can press the left arrow button
        And I can select the option and click right arrow button
        And I can select the option and submit answer
        And Submit answer with error