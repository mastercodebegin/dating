Feature: Notified

  Scenario: After user end level1 game then usern can wait for friend user to end level1 game
    Given I am a User loading Notified screen
    When I see the okay button 
    Then I can go back to the main screen
