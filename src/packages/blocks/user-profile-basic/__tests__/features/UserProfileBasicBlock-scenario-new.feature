Feature: UserProfileBasicBlock

    Scenario: User navigates to UserProfileBasicBlock
        Given I am a User loading UserProfileBasicBlock
        When I navigate to the UserProfileBasicBlock
        Then I can upload UserProfileBasicBlock
        Then UserProfileBasicBlock will load with out errors
        And I can select the button AccountSetting with with out errors
        And I can select the button PrivacyPolicyScreen with with out errors
        And I can check the swiperList
        And userProfile will load with out errors
        And I can not profile data
        And I can select back with out errors
        And I can select edit Icon with out errors
        And go to privacy policy function triggered
        And isStringNullOrBlank function triggered
        And isValidEmail function triggered
        And getUserProfile function triggered
        And validateRePassword function triggered
        And validatePassword function triggered
        And validating mobile on server
        And validateAndUpdateProfile function triggered
        And validateMobileAndThenUpdateUserProfile function triggered
        And validateMobileAndThenUpdateUserProfile function triggered with out error
        And enableDisableEditPassword function triggered
        And validateAndUpdate function triggered
        And I can leave the screen with out errors

        