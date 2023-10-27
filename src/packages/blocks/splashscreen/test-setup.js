// test-setup.js
// test-setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
import { NativeModules, Alert } from "react-native";
import AsyncStorageFactory from "@react-native-community/async-storage";
import DateTimePicker from '@react-native-community/datetimepicker'


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
AsyncStorageFactory.RNCAsyncStorage = {
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




   
Alert.alert = {
  text: jest.fn(),
  onPress: jest.fn(),
};

StyleSheet = {
  create: jest.fn(),
};

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "macos",
  select: () => null,
}));
jest.mock("@react-native-community/async-storage", () => ({
  AsyncStorage: jest.fn(),
}));

jest.mock("../../framework/src/StorageProvider", () => {
  return {
    get: jest.fn(),
    remove: jest.fn(),
    set: jest.fn(),
  };
});

