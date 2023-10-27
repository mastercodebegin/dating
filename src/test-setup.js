// test-setup.js
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NativeModules, Alert } from "react-native";

jest.mock('react-navigation', () => ({
    NavigationEvents: jest.fn(),
    route: jest.fn(),
    route: { params: { email: '' } },
    //removeEventListener: jest.fn(),
}));
NativeModules.RNCAsyncStorage = {
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
configure({adapter: new Adapter()});
