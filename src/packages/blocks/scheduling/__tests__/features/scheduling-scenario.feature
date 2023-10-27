Feature: scheduling

    Scenario: User navigates to scheduling
        Given I am a User loading scheduling
        When I navigate to the scheduling
        Then scheduling will load with out errors
        And scheduling will load calendar with out errors
        And scheduling will load availabilty generic card with out errors
        Then I can check api with out errors
        Then I can check api with errors
        Then I can check api with null
        Then I can check events
        And I can leave the screen with out errors