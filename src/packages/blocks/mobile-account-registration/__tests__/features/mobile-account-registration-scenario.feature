Feature: Mobile Phone Account Registration

    Scenario: User navigates to SignUp Screen
        Given I navigate to the Registration Screen
        When I am a User attempting to Register with a User Detail
        Then Registration Should Succeed
        And RestAPI will return token
    
    Scenario: Enter Empty Name
        Given I am a User attempting to Register with a User Detail
        When I Register with an empty Name
        Then I Register with an invalid Name
        Then Registration Should Fail
        And Name Validaton will return an error

    Scenario: Register Mobile Account Additional Details
        Given I am a User attempting to Register with a User Detail
        When I navigate to the Registration Screen
        Then I can enter a first name with out errors
        And I can enter a email with out errors
        And I can enter a password with out errors
        And I can toggle the Password Show/Hide with out errors
        And I can enter a confimation password with out errors
        And I can toggle the Confimation Password Show/Hide with out errors
        And I can select the Submit button with out errors
        And I can leave the screen with out errors

    Scenario: Invalid Email
    Given I am a User attempting to Register with a User Detail
    When I Register with an Invalid Email
    Then I Register with an valid Email
    Then Registration Should Fail
    And Email Validaton will return an error

    Scenario: User can signup by filling out the form
    Given the user is on the Signup screen
    When they enter their first name "John"
    Then they enter their email "john@example.com"
    And they enter their password "password"
    And they enter their password again "password"
    And they tap the Signup button
    And they should be taken to the PhoneNumberInput






