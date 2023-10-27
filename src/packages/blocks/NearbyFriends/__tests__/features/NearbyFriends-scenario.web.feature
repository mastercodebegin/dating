Feature: NearbyFriends

    Scenario: User navigates to NearbyFriends
        Given I am a User loading NearbyFriends
        When I navigate to the NearbyFriends
        Then NearbyFriends will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors