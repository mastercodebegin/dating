Feature: Chat

  Scenario: User can see chatable users and new matches
    Given I am a User loading Chat screen
    When I will see chatable users and new matches
    Then User clicks on a new match
    Then If there are no new matches, newMatches array will be empty 
