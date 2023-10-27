Feature:  PrivacySetting

    Scenario: User navigates to PrivacySetting
        Given I am a User loading PrivacySetting
        When I navigate to the PrivacySetting
        Then  PrivacySetting will load with out errors
        And I can select button with out errors
        And I can leave the screen with out errors

Scenario: User can upload image
        Given I am a User want to upload image 
        When I navigate to the PrivacySetting
        Then I can select back with out errors
        Then I can enter Name
        And I can enter a Make Name with out errors
        And I can enter a Modal Number with out errors
        And I can enter a Modal Number with  errors
        And I can enter a Year with out errors
        And I can enter a username with  errors
        And I can enter a color with out errors
        And I can click show picker userProfile
        And I can enter a ShowPicker with out errors
        And PrivacySetting will load with out error
        And I can not get User profile data
        And I can not get userProfileGetApiCallId api data
        And I can enter Name for submit button
        And I can enter a email for submit button
        And I can enter a username for submit button
        And I can Update getuserProfile
        And I can leave the screen with out errors