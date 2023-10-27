Feature: ServiceSpecificSettingsAdmin

    Scenario: User navigates to ServiceSpecificSettingsAdmin
        Given I am a User loading ServiceSpecificSettingsAdmin
        When I navigate to the ServiceSpecificSettingsAdmin
        Then ServiceSpecificSettingsAdmin will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors