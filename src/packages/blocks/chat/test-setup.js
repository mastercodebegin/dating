// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'react-native-gesture-handler/jestSetup';
import React from "react";


// import CometChatConversationListWithMessages from '../../components/src/cometchat-chat-uikit-react-native/CometChatWorkspace/src/components/Chats/CometChatConversationListWithMessages';
configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'macos',
  select: () => null
}));

jest.mock('reanimated-bottom-sheet');

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

jest.mock('react-native-sound', () => 'Sound')

jest.mock("../../components/src/cometchat-chat-uikit-react-native/CometChatWorkspace/src/components/Chats/CometChatConversationListWithMessages", () => {
  return <div></div>;
})
const customFormData = () => {};
customFormData.prototype.constructor = jest.fn();
customFormData.prototype.append = jest.fn();

global.FormData = customFormData;
