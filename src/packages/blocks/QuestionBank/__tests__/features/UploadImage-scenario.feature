Feature: UploadImage

    Scenario: User navigates to UploadImage
        Given I am a User loading UploadImage
        When I navigate to the UploadImage
        Then I can select the 6 Image without errors
        Then I can leave the screen with out errors

    Scenario: User navigates to UploadImageEdit
        Given I am a User loading UploadImageEdit
        When I navigate to the UploadImageEdit
        Then I can edit image without errors
        Then userProfilePicDeleteId api will return success with else
        Then userProfileGetApiCallId api will return success
        Then userProfileGetApiCallId api will return success with else
        Then userProfileGetApiCallId api will return error
        Then I can not edit image
        Then I can leave the screen with out errors

    Scenario: User navigates to UploadImageEdit screen
        Given I am a User loading UploadImageEdit screen
        When I navigate to the UploadImageEdit screen
        Then I can remove image without errors
        Then I can not remove image
        Then I can leave the UploadImageEdit screen with out errors
          