Feature: UpdateIdentifyYourSelf1

    Scenario: User navigates to UpdateIdentifyYourSelf1
        Given I am a User loading UpdateIdentifyYourSelf1
        When I navigate to the UpdateIdentifyYourSelf1
        Then UpdateIdentifyYourSelf1 will load with out errors
        And I can select the no preference option
        And I can click continue button
        And I can click back button
        And I can select the option 1
        And I can select the option 2
        And I can select the option 3
        And I can select the option 4
        And I can click continue button again
        And I can leave the screen with out errors