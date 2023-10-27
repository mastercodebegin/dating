Feature: IpBlocker

    Scenario: User navigates to IpBlocker
        Given I am a User loading IpBlocker
        When I navigate to the IpBlocker
        Then IpBlocker will load with out errors
        And I can leave the screen with out errors