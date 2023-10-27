// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'macos',
    select: () => null
}));

jest.mock("react-native-geolocation-service", () => ({
    getCurrentPosition: jest.fn((success, error, options) => {
      const position = {
        coords: {
          latitude: 37.0212,
          longitude: -122.0914,
        },
      };
      success(position);
    }),
    watchPosition: jest.fn((success, error, options) => {
      const position = {
        coords: {
          latitude: 37.7749,
          longitude: -122.4194,
        },
      };
      success(position);
    }),
  }));