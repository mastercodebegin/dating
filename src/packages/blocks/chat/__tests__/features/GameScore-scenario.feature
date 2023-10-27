Feature: GameScore

  Scenario: User can see score after game ends
    Given I am a User loading Game score
    When I navigate to Game score
    Then I can see score
