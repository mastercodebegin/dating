Feature: UserProfileBasicBlock

    Scenario: User navigates to UserProfileBasicBlock
        Given I am a User loading UserProfileBasicBlock
        When I navigate to the UserProfileBasicBlock
        And I call profile api
        And I call validateMobileOnServer api
        And I can check validateMobileOnServer api with error
        And I can check validateMobileOnServer api with out error
        And I can check validationApiCallId api with out error
        And I can check new validationApiCallId api with out error
        And I can check new validationApiCallId api with out error phone number
        And I can check new validationApiCallId api with out error type
        And I can check new validationApiCallId api with error
        And I can check new validationApiCallId api with error array length zero
        And I can check new apiChangePhoneValidation api with out error
        And I can check new apiChangePhoneValidation api with error
        And I can update type email
        And I can update type social
        And I can validateAndUpdateProfileTestID
        And I can leave the screen with out errors
