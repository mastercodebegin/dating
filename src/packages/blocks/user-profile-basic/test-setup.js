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
    text:jest.fn(),
    onPress:jest.fn()

};
StyleSheet={
  create:jest.fn()
}
global.FormData = class {
  append = jest.fn();
};


jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'macos',
    select: () => null
}));
jest.mock('@react-native-community/async-storage',()=>({
    AsyncStorage:jest.fn()
  }))





 jest.mock('react-native-swiper-flatlist',()=>{
  return {
      __esModule: true,
      default: jest.fn(() => 'mocked baz'),
      setAccessToken: 'mocked foo',
    };
  });
  // jest.mock('react-native-swiper-flatlist',()=>({

    
  //   autoplay:jest.fn(),
  //   autoplayDelay:jest.fn(),
  //   autoplayLoop:jest.fn(),
  //   index:jest.fn(),
  //   showPagination:jest.fn(),
  //   data:jest.fn(),
  //   renderItem:jest.fn()
  // }))

  jest.mock('@react-native-community/datetimepicker', () => jest.fn());
  DateTimePicker.mockImplementation((props) => (
    <Input testID={props.testID} onFocus={() => props.onChange} />
  ));

  jest.mock("react-native-image-crop-picker", () => ({
    ImagePicker: jest.fn(),
    ImgToBase64:jest.fn(),
    openCamera: jest.fn().mockImplementation((options) => {
        return new Promise((resolve, reject) => {
          const image = {
            path: "/path/to/image.jpg",
            mime: "image/jpeg",
            size: 1024,
            width: 1024,
            height: 1024,
          };
          resolve(image);
        });
      }),
    openPicker: jest.fn().mockImplementation((options) => {
        return new Promise((resolve, reject) => {
          const image = {
            path: "/path/to/image.jpg",
            mime: "image/jpeg",
            size: 1024,
            width: 1024,
            height: 1024,
          };
          resolve(image);
        });
      }),
    })
);
  
 
  
 
    
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

jest.mock('react-navigation', () => {
  return {
    createAppContainer: jest.fn().mockReturnValue(function NavigationContainer(props) { return null; }),
    createDrawerNavigator: jest.fn(),
    createMaterialTopTabNavigator: jest.fn(),
    createStackNavigator: jest.fn(),
    StackActions: {
      push: jest.fn().mockImplementation(x => ({ ...x, "type": "Navigation/PUSH" })),
      replace: jest.fn().mockImplementation(x => ({ ...x, "type": "Navigation/REPLACE" })),
      reset: jest.fn(),
    },
    NavigationActions: {
      navigate: jest.fn().mockImplementation(x => x),
    }
  }
})

jest.mock('@cometchat-pro/react-native-chat', () => {
  return {
    CometChat: {
      logout: jest.fn().mockImplementation(() => ({
        then: jest.fn().mockImplementation((x) => x(), (y) => y())
      }))
    }
  }
})

