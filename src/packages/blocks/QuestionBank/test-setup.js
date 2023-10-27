// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'macos',
    select: () => null
}));

jest.mock('react-native-image-crop-picker', () => {
    return {
      openPicker: jest.fn().mockImplementation(() => Promise.resolve()),
      openCamera: jest.fn().mockImplementation(() => Promise.resolve()),
    };
  });

  jest.mock('react-native-image-slider-box',()=>{
    return {
        __esModule: true,
        default: jest.fn(() => 'mocked baz'),
        setAccessToken: 'mocked foo',
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
          User: jest.fn().mockImplementation(x => ({
            setName: jest.fn(),
            setAvatar: jest.fn(),
            setMetadata: jest.fn(),
          })),
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
          createUser: jest.fn().mockImplementation(() => ({
            then: jest.fn().mockImplementation((x) => x(), (y) => y())
          }))
        }
      }
    })
            
    global.FormData = require("react-native/Libraries/Network/FormData");
    global.window = {}