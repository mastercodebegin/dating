// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NativeModules } from "react-native";



configure({ adapter: new Adapter() });

NativeModules.RNCAsyncStorage = {
    FormData: jest.fn(),
    append: jest.fn(),
    AsyncStorage: jest.fn(),
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    mergeItem: jest.fn(),
    clear: jest.fn(),
    getAllKeys: jest.fn(),
    flushGetRequests: jest.fn(),
    multiGet: jest.fn(),
    multiSet: jest.fn(),
    multiRemove: jest.fn(),
    multiMerge: jest.fn(),
  };

  jest.mock('@react-native-community/google-signin', () => ({
    GoogleSignin: {
      configure: jest.fn(),
      hasPlayServices: jest.fn(),
      getTokens: jest.fn().mockImplementation(() => ({ idToken: 'dahgdhjasgdh'})),
    }
  }));
  jest.mock('@cometchat-pro/react-native-chat', () => {
    return {
      CometChat: {
        AppSettingsBuilder: jest.fn().mockImplementation(() => ({
          subscribePresenceForAllUsers: jest.fn().mockImplementation(x => ({
            setRegion: jest.fn().mockImplementation(x => ({
              build: jest.fn()
            })),
          }))
        })),
        init: jest.fn().mockImplementation((x) => ({
          then: jest.fn().mockImplementation((x) => x())
        })),
        login: jest.fn().mockImplementation(() => ({
          then: jest.fn().mockImplementation((x) => x(), (y) => y())
        }))
      }
    }
  })
jest.mock("../../framework/src/StorageProvider", () => {
  return {
    get: jest.fn(),
    remove: jest.fn(),
  };
})
