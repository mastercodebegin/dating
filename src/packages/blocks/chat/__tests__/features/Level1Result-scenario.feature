Feature: GameScore

  Scenario: User can see score and status of user after game ends
    Given I am a User loading Game score
    When I navigate to Game score
    Then I can see score and status of user 

  Scenario: User can goback to chat page
    Given I am a User loading Game score
    When I navigate to Game score
    Then I can check status win or lose
    Then I can not see score and status of user
    Then I can see error message
    Then I can press goback button to go back to chat page

  Scenario: User can send friend request after user lost game 
    Given I am a User loading Game score
    When I navigate to Game score
    Then I can check user is aleady send friend request or not
    Then if user is not already sent friend request then press send friend request button
    Then I can not able to send frd request
    Then I can see error message

  Scenario: User can see accept or reject request status after user win game
    Given I am a User loading Game score
    When I navigate to Game score
    Then I can check status win or lose
    Then if user is not already accept or reject friend request then press accept or reject button
    Then I can not able to accept or reject frd request 
    Then I can see error message