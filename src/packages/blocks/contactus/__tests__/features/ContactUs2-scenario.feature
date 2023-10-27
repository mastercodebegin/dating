Feature: contactus

    Scenario: User will be able to submit queries
        Given User will load ContactUs2
        Then If user dont enter query title and description there will be error
        Then User can enter query title and description
        Then User can submit query details
