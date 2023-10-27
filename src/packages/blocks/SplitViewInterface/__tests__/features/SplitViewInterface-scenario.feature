Feature: SplitViewInterface

    Scenario: User can see questions submit answers and check game score
        Given user can see questions
        When user submits answer
        Then user can see score

    Scenario: User get question not answered message
        Given user can see question
        When user submits answer for question that has not answered by opponent
        Then it will show message for same
        