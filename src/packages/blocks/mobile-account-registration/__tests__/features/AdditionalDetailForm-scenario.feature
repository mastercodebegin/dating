Feature: Mobile Phone Account AdditionalDetailForm

    Scenario: User navigates to Mobile Phone Number AdditionalDetailForm
        Given I am a User attempting to AdditionalDetailForm with a Mobile Phone Number
        When I navigate to the AdditionalDetailForm Screen
        Then I can enter a phone number with out errors
        Then I can enter a last Name with out errors
        Then I can enter a email with out errors
        Then I can enter a password with out errors
        And I can select the Submit button with out errors
        And I can select the hide button with out errors
        And I can select the confirm passowrd button with out errors
        And I can select the confirm passowrd hide button with out errors
        And I can select the Submit button with out errors
        And I can check new validationApiCallId api with out error
        And I can check new validationApiCallId api with error
        And validating mobile on server
        And I can leave the screen with out errors
  