Feature: QuestionBank

    Scenario: User navigates to QuestionBank
        Given I am a User loading QuestionBank
        When I navigate to the QuestionBank
        Then QuestionBank will load without errors
        And I can select the 5 question without errors
        And Question selected api failed with errors
        And I can leave the screen with out errors

    Scenario: User navigates to QuestionBank with error
        Given I am a User load QuestionBank
        When I am a User navigate to the QuestionBank
        Then QuestionBank will not load 
        And Failed get question bank api
        And I can not leave the screen with out errors

    Scenario: User navigates to QuestionBank with SelectedQuestion with error
        Given I am a User load QuestionBank
        When I am a User navigate to the QuestionBank
        Then QuestionBank load without errors 
        And I can not select the 5 question
        And I can not navigate to the next screen 

    Scenario: User navigates to AllowMedia
        Given I navigate to the AllowMedia
        When AllowMedia will load without errors
        Then I can get Media access without errors
        And I can navigate to UploadImage screen without errors

    Scenario: User navigates to AllowMedia with out error
        Given I navigate to the AllowMedia screen
        When AllowMedia screen will load without errors
        Then I can not get Media access 
        And I can not navigate to UploadImage screen 

    Scenario: User navigates to ResponseSubmited
        Given I navigate to the ResponseSubmited
        When ResponseSubmited will load without errors
        Then I can navigate to the ProfileActive screen without errors

    Scenario: User navigates to ProfileActive
        Given I navigate to the ProfileActive
        When ProfileActive will load without errors
        Then I can navigate to the AllowMedia screen without errors