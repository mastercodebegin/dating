Feature: IdentifyYourSelf

    Scenario: User navigates to IdentifyYourSelf
        Given I am a User loading IdentifyYourSelf
        When I navigate to the IdentifyYourSelf
        Then IdentifyYourSelf will load with out errors
        Then I can enter a Add Name with out errors
        And I can enter a User Name with out errors
        Then IdentifyYourSelf will load with out errors
        And I can select the male button with with out errors
        And I can select the Female button with with out errors
        And I can select the Fluid button with with out errors
        And I can select the ShowPicker Button with with out errors
        And I can select the ShowPicker month Button with with out errors
        And I can select the ShowPicker date Button with with out errors
        And I can select the  date with out errors
        And I can select the dateTimePicker In button with out errors
        Then I can upload IdentifyYourSelf
        And I can submit identifyYourSelf without error
        And I can select back with out errors
        And I can leave the screen with out errors