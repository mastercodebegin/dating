import { CometChat } from '@cometchat-pro/react-native-chat';
import { COMETCHAT_CONSTANTS } from './CometChatConstants';

export class CometChatManager {
  loggedInUser;

  isUserLoggedIn;

  getLoggedInUser() {
    const timerCounter = 10000;
    let timer = 0;

    return new Promise(async (resolve, reject) => {
      if (timerCounter === timer) reject(`timer reached ${timerCounter}`);

      if (this.loggedInUser) resolve(this.loggedInUser);

      // if (!CometChat.isInitialized()) {
        const appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(COMETCHAT_CONSTANTS.REGION)
      .build();
      await CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSetting);
      // }

      this.isUserLoggedIn = setInterval(() => {
        CometChat.getLoggedinUser().then(
          (user) => {
            this.loggedInUser = user;
            clearInterval(this.isUserLoggedIn);
            resolve(user);
          },
          (error) => {
            reject(error);
          },
        );

        timer += 100;
      }, 100);
    });
  }

  static blockUsers = (userList) => {
    const promise = new Promise((resolve, reject) => {
      CometChat.blockUsers(userList).then(
        (list) => resolve(list),
        (error) => reject(error),
      );
    });

    return promise;
  };

  static unblockUsers = (userList) => {
    const promise = new Promise((resolve, reject) => {
      CometChat.unblockUsers(userList).then(
        (list) => resolve(list),
        (error) => reject(error),
      );
    });

    return promise;
  };

  static call = (receiverID, receiverType, callType) => {
    const promise = new Promise((resolve, reject) => {
      const call = new CometChat.Call(receiverID, callType, receiverType);
      CometChat.initiateCall(call).then(
        (initiatedCall) => resolve(initiatedCall),
        (error) => reject(error),
      );
    });

    return promise;
  };

  static acceptCall = (sessionId) => {
    const promise = new Promise((resolve, reject) => {
      CometChat.acceptCall(sessionId).then(
        (call) => resolve(call),
        (error) => reject(error),
      );
    });

    return promise;
  };

  static rejectCall = (sessionId, rejectStatus) => {
    const promise = new Promise((resolve, reject) => {
      CometChat.rejectCall(sessionId, rejectStatus).then(
        (call) => resolve(call),
        (error) => reject(error),
      );
    });

    return promise;
  };
}

export default CometChatManager;
