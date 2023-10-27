Feature: ChatView

  Scenario: User navigates to ChatView
    Given I am a User loading ChatView
    When I navigate to ChatView
    Then ChatView will load

    And a call to retrieve the chatData will be made
    And I will see the messages in the chat

    And the read messages will be updated

    And I can enter a message
    Then I can hide keyboard
    When I press on the btnSendMessage button
    Then a call to send the message will be made

    When I press on the btnInsertImage button
    Then I can press on the btnClosePreviewModal button
    When I press on the btnInsertImage button
    Then I can enter a message
    Then I press on the btnSendImageMessage button
    Then a call to send the message will be made

    And a call to retrieve the chatData will be made
    And I will see the messages in the chat

    When I press on the addAccount button
    When I press on the btnCloseModal button

    When I press on the addAccount button
    Then I can enter the account id
    When I press on the addAccountSubmit button
    Then a call to add the account will be made

    And a call to retrieve the chatData will be made
    And I will see the messages in the chat

    When I press on the mute button
    Then a call to mute the chat room will be made

    When I press on the leaveChat button
    Then a call to leave the chat room will be made

    And I can leave the screen