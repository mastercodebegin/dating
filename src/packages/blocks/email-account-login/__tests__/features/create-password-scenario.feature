Feature: Email Address Account Log In

    Scenario: User navigates to Email Log In
        Given I am a User attempting to Log In with a Email
        When I navigate to the Log In Screen
        Then I can select the back button with out errors
        Then I can change the customInputBox with out errors
        Then I can change the customInputBox two with out errors
        Then I can change the customInputBox two condition with out errors
        Then I can select the submit button with out errors
        Then I can check the reset password api with out errors
        
       