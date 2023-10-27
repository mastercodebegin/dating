Feature: ElasticSearch

    Scenario: User navigates to ElasticSearch
        Given I am a User loading ElasticSearch
        When I navigate to the ElasticSearch
        Then ElasticSearch will load with out errors
        And I can search user
        And I can fetch user location
        And I can check pagination with errors
        And I can check pagination with out errors
        And I can check userList with error
        And I can check user suggested api with out errors
        And I can check userList with out errors
        And I can check the flatlist
        And I can check user suggested api with errors
        And I can check the suggested friend flatlist
        And I can check sendFriendApiCallId with errors
        And I can check sendFriendApiCallId with out errors
        And I can check frienduserList with out errors
        And I can leave the screen with out errors