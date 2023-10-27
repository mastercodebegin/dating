// App.js - WEB
import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';

import WebRoutesGenerator from '../../components/src/NativeWebRouteWrapper';
import { ModalContainer } from 'react-router-modal';
import HomeScreen from '../../components/src/HomeScreen';
import TopNav from '../../components/src/TopNav';

import InfoPage from '../../blocks/info-page/src/InfoPageBlock';
import AlertBlock from '../../blocks/alert/src/AlertBlock.web';
import SplitViewInterfaceBlock from '../../blocks/SplitViewInterface/src/SplitViewInterface.web';
import Timeclock from '../../blocks/Timeclock/src/Timeclock';
import EmailAccountLoginBlock from '../../blocks/email-account-login/src/EmailAccountLoginBlock.web';
import GameScore2Block from '../../blocks/GameScore2/src/GameScore2.web';

const routeMap = {
  Home: {
    component: HomeScreen,
    path: '/',
    exact: true
  },
  InfoPage: {
    component: InfoPage,
    path: '/InfoPage'
  },
  Timeclock: {
    component: Timeclock,
    path: '/Timeclock'
  },
  GameScore2: {
    component: GameScore2Block,
    path: '/GameScore'
  },
  EmailAccountLoginBlock: {
    component: EmailAccountLoginBlock,
    path: '/EmailAccountLogin'
  },
  SplitViewInterface: {
    component: SplitViewInterfaceBlock,
    path: '/SplitViewInterface'
  },

  AlertWeb: {
    component: AlertBlock,
    path: '*/AlertWeb',
    modal: true
  }
};

const firebaseAPI = firebase.initializeApp({
  apiKey: 'AIzaSyDgl9aTbKMdRZ9-ijSZRionh3V591gMJl4',
  authDomain: 'rnmasterapp-c11e9.firebaseapp.com',
  databaseURL: 'https://rnmasterapp-c11e9.firebaseio.com',
  projectId: 'rnmasterapp-c11e9',
  storageBucket: 'rnmasterapp-c11e9.appspot.com',
  messagingSenderId: '649592030497',
  appId: '1:649592030497:web:7728bee3f2baef208daa60',
  measurementId: 'G-FYBCF3Z2W3'
});

class App extends Component {
  render() {
    const defaultAnalytics = firebaseAPI.analytics();
    defaultAnalytics.logEvent('APP_Loaded');

    return (
      <View style={{ height: '100%', width: '100%' }}>
        <TopNav />
        {WebRoutesGenerator({ routeMap })}
        <ModalContainer />
      </View>
    );
  }
}

export default App;
