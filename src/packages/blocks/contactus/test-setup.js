// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock("../../framework/src/StorageProvider", () => {
  return {
    get: jest.fn(),
    remove: jest.fn(),
  };
})  