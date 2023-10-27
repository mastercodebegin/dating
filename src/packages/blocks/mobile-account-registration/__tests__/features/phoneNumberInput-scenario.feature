Feature: Mobile Phone Account Registration

    Scenario: User navigates to Mobile Phone Number Registration
        Given I am a User attempting to Register with a Mobile Phone Number
        When I navigate to the Registration Screen
        Then I can enter a phone number with out errors
        And I can select the Submit button with out errors
        Then I can click on back btn
        And I can leave the screen with out errors
        
    Scenario: Empty Mobile Phone Number
        Given I am a User attempting to Register with a Mobile Phone
        When I Register with an empty Mobile Phone Number
        Then Registration Should Fail
        And Phone Number Validaton will return an error

    Scenario: Enter Valid Mobile Phone Number 
        Given I am User attempting to Register with a Mobile Phone
        When I Registration with Mobile Phone Number 
        Then Registration Should Succeed
        And RestAPI will return token
        And to check mobile number error