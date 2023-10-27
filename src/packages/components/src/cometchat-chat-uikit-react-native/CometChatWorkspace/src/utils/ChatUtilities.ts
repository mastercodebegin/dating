import { CometChat } from '@cometchat-pro/react-native-chat';
import { COMETCHAT_CONSTANTS } from './CometChatConstants';

export const createNewCometChatUser = async (uid: string, name: string) => {
  let uuid = '1234';
  let uname = 'Kevin';
  console.log('xconstant', COMETCHAT_CONSTANTS);

  let user = new CometChat.User(uuid);

  user.setName(uname);

  CometChat.createUser(user, '1b4e5dfe785d766be0fcafaeaf579a6757bb8b56').then(
    (user: CometChat.User) => {
      console.log('user created', user);
    },
    (error: CometChat.CometChatException) => {
      console.log('error', error);
    },
  );
  console.log('InCreateUserFunction', typeof uid, typeof name);
};

export const loginCometChatUser = () => {
  var UID: string = 'superhero1',
    authKey: string = '1b4e5dfe785d766be0fcafaeaf579a6757bb8b56';

    console.log("InLoginFunction")
  CometChat.getLoggedinUser().then(
    (user) => {
      if (!user) {
        CometChat.login(UID, authKey).then(
          (user: CometChat.User) => {
            console.log('Login Successful:', { user });
          },
          (error: CometChat.CometChatException) => {
            console.log('Login failed with exception:', { error });
          },
        );
      }
    },
    (error: CometChat.CometChatException) => {
      console.log('Some Error Occured', { error });
    },
  );
  console.log("EndOfLoginFunction")
};


export const initAndRegister = (uid: string, name: string) => {
    console.log("RegisterFunction")
    const appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(COMETCHAT_CONSTANTS.REGION)
      .build();
    CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSetting).then(
        () => {
          console.log("Initialization completed successfully");
          let newUser = new CometChat.User(uid);
          newUser.setName(name);
  
          CometChat.createUser(newUser, COMETCHAT_CONSTANTS.AUTH_KEY).then(
            (user) => console.log("User created successfully", user),
            (error) => console.log("Error in creating user", error)
          );
        },
        (error) => {
          console.log("Initialization failed with error:", error);
        }
      );
}

export const initAndLogin = (uid: string) => {
    console.log("LoginFunction")
    const appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(COMETCHAT_CONSTANTS.REGION)
      .build();
    CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSetting).then(
        () => {
          console.log("Initialization completed successfully while Logging in");
  
          CometChat.login(uid, COMETCHAT_CONSTANTS.AUTH_KEY).then(
            (user) => {
              console.log('Login Successful:', { user });
            },
            (error) => {
              console.log('Login failed with exception:', { error });
            },
          );
        },
        (error) => {
          console.log("Initialization failed while logging in with error:", error);
        }
      );
}