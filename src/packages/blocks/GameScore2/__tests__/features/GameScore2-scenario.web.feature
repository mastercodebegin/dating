Feature: GameScore2

    Scenario: User navigates to GameScore2
        Given I am a User loading GameScore2
        When I navigate to the GameScore2
        Then renders the correct game result when Game is Tied
        Then renders tiny current player name
        Then renders tiny oppoent player name

    Scenario: Current user won
        Given I am a User loading GameScore2
        When I navigate to the GameScore2
        Then renders the correct game result when A has won by B
    
    Scenario: Opponent user won
        Given I am a User loading GameScore2
        When I navigate to the GameScore2
        Then renders the correct game result when B has won by A
