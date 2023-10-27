Feature: PhotoLibrary3

    Scenario: User navigates to PhotoLibrary3
        Given I am a User loading PhotoLibrary3
        When I navigate to the PhotoLibrary3
        Then PhotoLibrary3 will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors