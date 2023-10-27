// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'macos',
  select: () => null
}));

jest.mock('react-native-swiper-flatlist', () => {
  return {
    __esModule: true,
    default: jest.fn(() => 'mocked baz'),
    setAccessToken: 'mocked foo',
  };
});

jest.mock('react-native//Libraries/PermissionsAndroid/PermissionsAndroid', () => {
  const PermissionsAndroid = jest.requireActual(
    'react-native//Libraries/PermissionsAndroid/PermissionsAndroid',
  );
  console.log("PermissionsAndroid>>>>>", PermissionsAndroid);
  return {
    ...PermissionsAndroid,
    check: jest.fn(() => new Promise(resolve => resolve(true))),
    request: jest.fn((permission, options) => {
      if (permission === 'android.permission.ACCESS_FINE_LOCATION') {
        if (options) {
          console.log("options>>>>>", options);
          const { buttonPositive, buttonNegative } = options;
          if (buttonPositive) {
            console.log("buttonPositive>>>>>", buttonPositive, buttonNegative);
            // Simulate user granting permission
            return Promise.resolve('granted');
          } else if (buttonNegative) {
            // Simulate user denying permission
            return Promise.resolve('denied');
          }
        }
      } 
    }),
    RESULTS: {
      GRANTED: 'granted',
      DENIED: 'denied',
    },
  };
});

jest.mock('react-native-geolocation-service', () => {
  return {
    getCurrentPosition: jest.fn().mockImplementation(successCallback => {
      const position = {
        coords: {
          latitude: 57.7,
          longitude: 11.93,
        },
      }
      successCallback(position)
    }),
  };
}
);