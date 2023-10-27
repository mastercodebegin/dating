Feature: GameScore2

    Scenario: User navigates to GameScore2
        Given I am a User loading GameScore2
        When I navigate to the GameScore2
        Then GameScore2 will load with out errors
        And I can click my image with out errors
        And I can click opponent image with out errors
        And I can leave the screen with out errors