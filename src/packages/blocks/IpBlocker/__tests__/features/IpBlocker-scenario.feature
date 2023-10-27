Feature: IpBlocker

    Scenario: User navigates to IpBlocker
        Given I am a User loading IpBlocker
        When I navigate to the IpBlocker
        Then IpBlocker will load with out errors
        And User get IP address from his device without errors
        And User get IP address from his device with errors
        And User can press status button and get status of Ip address access granted
        And User can press status button and get status of Ip address access denied
        And User can press status button and get status of Ip address api failed
        And I can leave the screen with out errors