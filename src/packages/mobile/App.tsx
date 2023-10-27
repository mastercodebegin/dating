import React, { useEffect } from 'react';
import {
  NavigationContainer,
} from '@react-navigation/native';
console.disableYellowBox = true;
import FlashMessage from 'react-native-flash-message';
//@ts-ignore
import { CometChat } from '@cometchat-pro/react-native-chat';
import messaging from '@react-native-firebase/messaging';
import { getStorageData, setStorageData } from '../framework/src/Utilities';

import HomeScreen from '../components/src/HomeScreen';
import InfoPage from '../blocks/info-page/src/InfoPageBlock';
import VisualAnalytics from '../blocks/visualanalytics/src/VisualAnalytics';
import SocialMediaAccountLoginScreen from '../blocks/social-media-account-login/src/SocialMediaAccountLoginScreen';
import QuestionBank from '../blocks/QuestionBank/src/QuestionBank';
import Level1screen1 from '../blocks/QuestionBank/src/level1Questions/Level1screen1';
import Leaderboard from '../blocks/Leaderboard/src/Leaderboard';
import MobileAccountLoginBlock from '../blocks/mobile-account-login/src/MobileAccountLoginBlock';
import IpBlocker from '../blocks/IpBlocker/src/IpBlocker';
import SplitViewInterface from '../blocks/SplitViewInterface/src/SplitViewInterface';
import OTPInputAuth from '../blocks/otp-input-confirmation/src/OTPInputAuth';
import LocationAccess from '../blocks/LocationbasedAlerts/src/LocationAccess';
import LocationAccessSuccess from '../blocks/LocationbasedAlerts/src/LocationAccessSuccess';
import AccountScoreranking from '../blocks/AccountScoreranking/src/AccountScoreranking';
import GameScore2 from '../blocks/GameScore2/src/GameScore2';
import Gallery from '../blocks/Gallery/src/Gallery';
import Pushnotifications from '../blocks/pushnotifications/src/Pushnotifications';
import ForgotPassword from '../blocks/forgot-password/src/ForgotPassword';
import ForgotPasswordOTP from '../blocks/forgot-password/src/ForgotPasswordOTP';
import NewPassword from '../blocks/forgot-password/src/NewPassword';
import Notifications from '../blocks/notifications/src/Notifications';
import ServiceSpecificSettingsAdmin from '../blocks/ServiceSpecificSettingsAdmin/src/ServiceSpecificSettingsAdmin';
import BulkUploading from '../blocks/bulkuploading/src/BulkUploading';
import ContentModeration from '../blocks/ContentModeration/src/ContentModeration';
import Analytics from '../blocks/analytics/src/Analytics';
import Referrals from '../blocks/Referrals/src/Referrals';
import Settings5 from '../blocks/Settings5/src/Settings5';
import identifyYourSelf from '../blocks/user-profile-basic/src/IdentifyYourSelf';
import IdentifyScreen1 from '../blocks/user-profile-basic/src/IdentifyScreen1';
import UserProfileBasicBlock from '../blocks/user-profile-basic/src/UserProfileBasicBlock';
import UserProfileBasicBlockNew from '../blocks/user-profile-basic/src/UserProfileBasicBlockNew';

import Scheduling from '../blocks/scheduling/src/Scheduling';
import UserStatus from '../blocks/userstatus/src/UserStatus';
import TermsAndConditions3 from '../blocks/TermsAndConditions3/src/TermsAndConditions3';
import CountryCodeSelector from '../blocks/country-code-selector/src/CountryCodeSelector';
import CountryCodeSelectorTable from '../blocks/country-code-selector/src/CountryCodeSelectorTable';
import MatchAlgorithm from '../blocks/MatchAlgorithm/src/MatchAlgorithm';
import CvresumeCandidateManagement2 from '../blocks/CvresumeCandidateManagement2/src/CvresumeCandidateManagement2';
import PhoneNumberInput from '../blocks/mobile-account-registration/src/PhoneNumberInput';
import AdditionalDetailForm from '../blocks/mobile-account-registration/src/AdditionalDetailForm';
import SocialMediaAccountRegistrationScreen from '../blocks/social-media-account-registration/src/SocialMediaAccountRegistrationScreen';
import MultipageForms2 from '../blocks/MultipageForms2/src/MultipageForms2';
import AdminConsole from '../blocks/AdminConsole/src/AdminConsole';
import ApiIntegration from '../blocks/apiintegration/src/ApiIntegration';
import Contactus from '../blocks/contactus/src/Contactus';
import AddContactus from '../blocks/contactus/src/AddContactus';
import NearbyFriends from '../blocks/NearbyFriends/src/NearbyFriends';
import EducationalUserProfile from '../blocks/educational-user-profile/src/EducationalUserProfile';
import Notificationsettings from '../blocks/notificationsettings/src/Notificationsettings';
import EmailAccountRegistration from '../blocks/email-account-registration/src/EmailAccountRegistration';
import Dashboard from '../blocks/dashboard/src/Dashboard';
import Splashscreen from '../blocks/splashscreen/src/Splashscreen';
import EmailNotifications2 from '../blocks/EmailNotifications2/src/EmailNotifications2';
import ElasticSearch from '../blocks/ElasticSearch/src/ElasticSearch';
import EmailAccountLoginBlock from '../blocks/email-account-login/src/EmailAccountLoginBlock';
import CreatePassword from '../blocks/email-account-login/src/CreatePassword';
import PayRozerIntegration from '../blocks/PayRozerIntegration/src/PayRozerIntegration';
import Chat from '../blocks/chat/src/Chat';
import ChatView from '../blocks/chat/src/ChatView';
import LandingPage from '../blocks/landingpage/src/LandingPage';
import Timeclock from '../blocks/Timeclock/src/Timeclock';
import PhotoLibrary3 from '../blocks/PhotoLibrary3/src/PhotoLibrary3';
import SignupRegistrationForm from '../blocks/mobile-account-registration/src/SignupRegistrationForm/SignupRegistrationForm';
import ResponseSubmited from '../blocks/QuestionBank/src/ResponseSubmited';
import ProfileActive from '../blocks/QuestionBank/src/ProfileActive';
import AllowMedia from '../blocks/QuestionBank/src/AllowMedia';
import PersonalityStatement from '../blocks/QuestionBank/src/PersonalityStatement';
import UploadImage from '../blocks/QuestionBank/src/UploadImage';
import AccountSetting from '../blocks/user-profile-basic/src/AccountSetting';
import PrivacySetting from '../blocks/user-profile-basic/src/PrivacySetting';
import FrequentlyAskedScreen from '../blocks/user-profile-basic/src/FaqScreen';
import PrivacyPolicyScreen from '../blocks/user-profile-basic/src/PrivacyPolicyScreen';
import WelcomeScreen from '../blocks/splashscreen/src/WelcomScreen';
import EmailVerifaction from '../blocks/forgot-password/src/EmailVerifaction';
import EmailOTPInput from '../blocks/forgot-password/src/EmailOTPInput';
import SelectedQuestion from '../blocks/QuestionBank/src/SelectedQuestion';
import UploadImageEdit from '../blocks/QuestionBank/src/UploadImageEdit';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Platform, View, Image, Text, StyleSheet } from 'react-native';
import Scale, { verticalScale } from '../components/src/Scale';
import { home, homeLight, message, messageLight, people, peopleLight, profile, profileLight } from './assets/assets';
import { scaledSize } from '../framework/src/Utilities';
import InsightsScreen from '../blocks/ElasticSearch/src/InsightsScreen';
import UpdateIdentifyScreen1 from '../blocks/user-profile-basic/src/UpdateidentifyYourSelf1';
import CustomForgotPassword from '../blocks/forgot-password/src/CustomForgotPassword';
import Level1Result from '../blocks/chat/src/Level1Result';
import NotifiedFriend from '../blocks/chat/src/NotifiedFriend';
import SuggestionForYou from '../blocks/ElasticSearch/src/SuggestionForYou';
import ContactUs2 from '../blocks/contactus/src/ContactUs2/ConstactUs2';
//@ts-ignore
import { CometChatMessages } from '../components/src/cometchat-chat-uikit-react-native/CometChatWorkspace/src/index'
import { style } from '../components/src/CustomFonts';
import { fcmService } from '../components/src/FCMService';
import { localNotificationService } from '../components/src/LocalNotificationService';
import StorageProvider from '../framework/src/StorageProvider';
import { LogLevel, OneSignal } from 'react-native-onesignal';

console.disableYellowBox = true;
const Footer = createBottomTabNavigator(
  {
    Dashboard: {
      screen: Dashboard,
      navigationOptions: { header: null, title: 'Dashboard' },
    },
    ElasticSearch: {
      screen: ElasticSearch,
      navigationOptions: { header: null, title: 'ElasticSearch', gesturesEnabled: false },
    },

    Chat: {
      screen: Chat,
      navigationOptions: { header: null, title: 'PersonalityStatement' },
    },

    UserProfileBasicBlockNew: {
      screen: UserProfileBasicBlockNew,
      navigationOptions: { title: 'UserProfileBasicBlockNew', header: null, gesturesEnabled: false },
    },

  },


  {
    initialRouteName: 'Dashboard',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
    navigationOptions: ({ navigation }: any) => ({

      tabBarIcon: ({ tintColor, focused, iconIndex }: any) => {
        const { routeName } = navigation.state;
        if (routeName === 'Dashboard') {
          return (
            <View>

              <View style={{ alignItems: 'center' }}>
                <Image source={focused ? homeLight : home} style={styles.iconSize} />
                <Text style={{ color: focused ? '#ccc' : '#fff', ...styles.textSizes }}>Home </Text>
              </View>
            </View>
          )
        } else if (routeName === 'ElasticSearch') {
          return (
            <View>
              <View style={{ alignItems: 'center' }}>
                <Image source={focused ? peopleLight : people} style={styles.iconSize} />
                <Text style={{ color: focused ? '#ccc' : '#fff', ...styles.textSizes }}>Friends </Text>
              </View>
            </View>
          )
        } else if (routeName === 'Chat') {
          return (
            <View style={{ alignItems: 'center' }}>
              <Image source={focused ? messageLight : message} style={styles.iconSize} />
              <Text style={{ color: focused ? '#ccc' : '#fff', ...styles.textSizes }}>Chat </Text>
            </View>
          )
        } else if (routeName === 'UserProfileBasicBlockNew') {
          return (
            <View>
              <View style={{ alignItems: 'center' }}>
                <Image source={focused ? profileLight : profile} style={styles.iconSize} resizeMode='center' />
                <Text style={{ color: focused ? '#ccc' : '#fff', ...styles.textSizes }}>Profile </Text>
              </View>
            </View>

          )
        }
      },
    }),
    tabBarOptions: {
      style: {
        backgroundColor: "#3E3E40",
        borderColor: '#3e3e40',
        height: Platform.OS == 'android' ? verticalScale(80) : verticalScale(70),
        shadowColor: "#3e3e40",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.55,
        elevation: 2,
      },
      showLabel: false,
      activeTintColor: '#000',
      inactiveTintColor: '#ccc',

    },

    testUSer: {
      fontSize: 10, color: '#', alignSelf: 'center', marginTop: Scale(2), fontFamily: "Montserrat-Bold"
    }
  }
);

const HomeStack = createStackNavigator({
  WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: { title: '', header: null },
  },

  Dashboard: { screen: Dashboard, navigationOptions: { title: 'Dashboard' } },

  Splashscreen: {
    screen: Splashscreen,
    navigationOptions: { title: '', header: null },
  },
  Footer: { screen: Footer, navigationOptions: { header: null } },
  EmailAccountLoginBlock: {
    screen: EmailAccountLoginBlock,
    navigationOptions: { title: 'EmailAccountLoginBlock', header: null },
  },

  EmailOTPInput: {
    screen: EmailOTPInput,
    navigationOptions: { title: 'EmailOTPInput', header: null },
  },
  EmailVerifaction: {
    screen: EmailVerifaction,
    navigationOptions: { title: 'EmailVerifaction', header: null },
  },
  //  ForgotPassword: { screen: ForgotPassword, navigationOptions: { title: "ForgotPassword" } },

  SignupRegistrationForm: {
    screen: SignupRegistrationForm,
    navigationOptions: { title: 'EmailAccountLoginBlock', header: null },
  },

  CreatePassword: {
    screen: CreatePassword,
    navigationOptions: { title: 'CreatePassword', header: null },
  },

  identifyYourSelf: {
    screen: identifyYourSelf,
    navigationOptions: { title: '', header: null },
  },

  IdentifyScreen1: {
    screen: IdentifyScreen1,
    navigationOptions: { title: 'IdentifyScreen1', header: null },
  },
  // IdentifyScreen2: {
  //   screen: IdentifyScreen2,
  //   navigationOptions: {title: 'UserProfileBasicBlock', header: null},
  // },
  CustomForgotPassword: {
    screen: CustomForgotPassword,
    navigationOptions: { title: 'CustomForgotPassword', header: null },
  },

  UpdateIdentifyScreen1: {
    screen: UpdateIdentifyScreen1,
    navigationOptions: { title: '', header: null },
  },

  UserProfileBasicBlock: {
    screen: UserProfileBasicBlock,
    navigationOptions: { title: 'UserProfileBasicBlock', header: null },
  },

  LocationbasedAlerts: {
    screen: LocationAccess,
    navigationOptions: { title: 'LocationbasedAlerts', header: null },
  },
  LocationConfirmation: {
    screen: LocationAccessSuccess,
    navigationOptions: { title: 'LocationbasedAlerts', header: null },
  },
  QuestionBank1: {
    screen: Level1screen1,
    navigationOptions: { title: 'QuestionBank', header: null },
  },
  QuestionBank: { screen: QuestionBank, navigationOptions: { title: "QuestionBank", header: null } },
  // QuestionBank: {
  //   screen: level1EndScreen,
  //   navigationOptions: { title: 'QuestionBank', header: null },
  // },
  PrivacyPolicyScreen: {
    screen: PrivacyPolicyScreen,
    navigationOptions: { title: '', header: null },
  },
  PrivacySetting: {
    screen: PrivacySetting,
    navigationOptions: { title: '', header: null },
  },
  FrequentlyAskedScreen: {
    screen: FrequentlyAskedScreen,
    navigationOptions: { title: '', header: null },
  },
  AccountSetting: {
    screen: AccountSetting,
    navigationOptions: { title: '', header: null },
  },
  // Home: { screen: ApiIntegration, navigationOptions: { header: null, title: "Home" } },
  VisualAnalytics: {
    screen: VisualAnalytics,
    navigationOptions: { title: 'VisualAnalytics' },
  },
  SocialMediaAccountLoginScreen: {
    screen: SocialMediaAccountLoginScreen,
    navigationOptions: { title: 'SocialMediaAccountLoginScreen' },
  },
  Leaderboard: { screen: Leaderboard, navigationOptions: { title: 'Leaderboard' } },
  MobileAccountLoginBlock: {
    screen: MobileAccountLoginBlock,
    navigationOptions: { title: 'MobileAccountLoginBlock' },
  },
  IpBlocker: { screen: IpBlocker, navigationOptions: { title: 'IpBlocker' } },
  SplitViewInterface: {
    screen: SplitViewInterface,
    navigationOptions: { title: 'SplitViewInterface' },
  },
  OTPInputAuth: {
    screen: OTPInputAuth,
    navigationOptions: { title: '', header: null },
  },
  // LocationbasedAlerts:{ screen:LocationbasedAlerts,navigationOptions:{ title:"LocationbasedAlerts"}},
  AccountScoreranking: {
    screen: AccountScoreranking,
    navigationOptions: { title: 'AccountScoreranking' },
  },
  GameScore2: { screen: GameScore2, navigationOptions: { title: 'GameScore2' } },
  Gallery: { screen: Gallery, navigationOptions: { title: 'Gallery' } },
  Pushnotifications: {
    screen: Pushnotifications,
    navigationOptions: { title: 'Pushnotifications' },
  },
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: { title: 'ForgotPassword', header: null },
  },
  ForgotPasswordOTP: {
    screen: ForgotPasswordOTP,
    navigationOptions: { title: 'ForgotPasswordOTP' },
  },
  NewPassword: { screen: NewPassword, navigationOptions: { title: 'NewPassword' } },
  Notifications: {
    screen: Notifications,
    navigationOptions: { title: 'Notifications' },
  },
  ServiceSpecificSettingsAdmin: {
    screen: ServiceSpecificSettingsAdmin,
    navigationOptions: { title: 'ServiceSpecificSettingsAdmin' },
  },
  BulkUploading: {
    screen: BulkUploading,
    navigationOptions: { title: 'BulkUploading' },
  },
  ContentModeration: {
    screen: ContentModeration,
    navigationOptions: { title: 'ContentModeration' },
  },
  Analytics: { screen: Analytics, navigationOptions: { title: 'Analytics' } },
  Referrals: { screen: Referrals, navigationOptions: { title: 'Referrals' } },
  Settings5: { screen: Settings5, navigationOptions: { title: 'Settings5' } },
  // UserProfileBasicBlock:{ screen:UserProfileBasicBlock,navigationOptions:{ title:"UserProfileBasicBlock"}},
  Scheduling: { screen: Scheduling, navigationOptions: { title: 'Scheduling' } },
  UserStatus: { screen: UserStatus, navigationOptions: { title: 'UserStatus' } },
  TermsAndConditions3: {
    screen: TermsAndConditions3,
    navigationOptions: { title: 'TermsAndConditions', header: null },
  },
  CountryCodeSelector: {
    screen: CountryCodeSelector,
    navigationOptions: { title: 'CountryCodeSelector' },
  },
  CountryCodeSelectorTable: {
    screen: CountryCodeSelectorTable,
    navigationOptions: { title: 'CountryCodeSelectorTable' },
  },
  MatchAlgorithm: {
    screen: MatchAlgorithm,
    navigationOptions: { title: 'MatchAlgorithm' },
  },
  CvresumeCandidateManagement2: {
    screen: CvresumeCandidateManagement2,
    navigationOptions: { title: 'CvresumeCandidateManagement2' },
  },
  PhoneNumberInput: {
    screen: PhoneNumberInput,
    navigationOptions: { title: '', header: null },
  },
  AdditionalDetailForm: {
    screen: AdditionalDetailForm,
    navigationOptions: { title: 'AdditionalDetailForm' },
  },
  SocialMediaAccountRegistrationScreen: {
    screen: SocialMediaAccountRegistrationScreen,
    navigationOptions: { title: 'SocialMediaAccountRegistrationScreen' },
  },
  MultipageForms2: {
    screen: MultipageForms2,
    navigationOptions: { title: 'MultipageForms2' },
  },
  AdminConsole: {
    screen: AdminConsole,
    navigationOptions: { title: 'AdminConsole' },
  },
  ApiIntegration: {
    screen: ApiIntegration,
    navigationOptions: { title: 'ApiIntegration' },
  },
  Contactus: { screen: Contactus, navigationOptions: { title: 'Contactus' } },
  AddContactus: {
    screen: AddContactus,
    navigationOptions: { title: 'AddContactus' },
  },
  NearbyFriends: {
    screen: NearbyFriends,
    navigationOptions: { title: 'NearbyFriends' },
  },
  EducationalUserProfile: {
    screen: EducationalUserProfile,
    navigationOptions: { title: 'EducationalUserProfile' },
  },
  Notificationsettings: {
    screen: Notificationsettings,
    navigationOptions: { title: 'Notificationsettings' },
  },
  EmailAccountRegistration: {
    screen: EmailAccountRegistration,
    navigationOptions: { title: 'EmailAccountRegistration' },
  },
  EmailNotifications2: {
    screen: EmailNotifications2,
    navigationOptions: { title: 'EmailNotifications2' },
  },
  ElasticSearch: {
    screen: ElasticSearch,
    navigationOptions: { title: 'ElasticSearch' },
  },
  InsightsScreen: {
    screen: InsightsScreen,
    navigationOptions: { title: 'InsightsScreen', header: null, },
  },
  // EmailAccountLoginBlock:{ screen:EmailAccountLoginBlock,navigationOptions:{ title:"EmailAccountLoginBlock"}},
  PayRozerIntegration: {
    screen: PayRozerIntegration,
    navigationOptions: { title: 'PayRozerIntegration' },
  },
  Chat: { screen: Chat, navigationOptions: { title: 'Chat' } },
  ChatView: { screen: ChatView, navigationOptions: { title: 'ChatView', header: null } },
  CometChatMessages: { screen: CometChatMessages, navigationOptions: { title: 'CometChatMessages', header: null } },
  LandingPage: { screen: LandingPage, navigationOptions: { title: 'LandingPage' } },
  Timeclock: { screen: Timeclock, navigationOptions: { title: 'Timeclock' } },
  PhotoLibrary3: {
    screen: PhotoLibrary3,
    navigationOptions: { title: 'PhotoLibrary3' },
  },

  InfoPage: { screen: InfoPage, navigationOptions: { title: 'Info' } },
  UploadImage: {
    screen: UploadImage,
    navigationOptions: { header: null, title: 'UploadImage' },
  },
  UploadImageEdit: {
    screen: UploadImageEdit,
    navigationOptions: { header: null, title: 'UploadImageEdit' },
  },

  ResponseSubmited: {
    screen: ResponseSubmited,
    navigationOptions: { header: null, title: 'ResponseSubmited' },
  },
  PersonalityStatement: {
    screen: PersonalityStatement,
    navigationOptions: { header: null, title: 'PersonalityStatement' },
  },
  UpdatePersonalityStatement: {
    screen: PersonalityStatement,
    navigationOptions: { header: null, title: 'UpdatePersonalityStatement' },
  },
  AllowMedia: {
    screen: AllowMedia,
    navigationOptions: { header: null, title: 'AllowMedia' },
  },
  ProfileActive: {
    screen: ProfileActive,
    navigationOptions: { header: null, title: 'ProfileActive' },
  },
  SelectedQuestion: {
    screen: SelectedQuestion,
    navigationOptions: { header: null, title: 'SelectedQuestion' },
  },
  Level1Result: {
    screen: Level1Result,
    navigationOptions: { header: null, title: 'Level1Result' },
  },
  NotifiedFriend: {
    screen: NotifiedFriend,
    navigationOptions: { header: null, title: 'NotifiedFriend' },
  },
  SuggestionForYou: {
    screen: SuggestionForYou,
    navigationOptions: { header: null, title: 'SuggestionForYou' },
  },
  ContactUs2: {
    screen: ContactUs2,
    navigationOptions: { title: 'ContactUs2', header: null },
  },
});



if (!HomeScreen.instance) {
  const defaultProps = {
    navigation: null,
    id: 'HomeScreen',
  };
  const homeScreen = new HomeScreen(defaultProps);
}


const setupNotification = async () => {

  let accessToken: any = await getStorageData('token');
  
      console.log('@@@ FCM Try Log ==========');
      fcmService.register(
        (token: any) => onRegister(token),
        (notify: any) => onNotification(notify),
        (notify: any) => onOpenNotification(notify),
      );
      localNotificationService.configure((notify: any) =>
        onOpenNotification(notify),
      )
  }




const onOpenNotification = async (notify: any) => {
  console.log('on open ==========', notify);
};

const onRegister = async (token: any) => {
  alert(token)
  console.log('@@@ FCM Registeration Token ==========', token);
};

const onNotification = (notify: any) => {
  console.log(
    '@@@ FCM Show Notification onNotification ==========APP',
    notify,
  );
  let uniquedNotifId = Math.floor(Math.random() * 1000 + 1);
  const options = {
    soundName: 'default',
    playSound: true,
  };
  localNotificationService.showNotification(
    uniquedNotifId,
    notify.message,
    notify.title,
    notify,
    options,
  );
};
export function App() {
  useEffect(() => {
    const appID = '2426296473f8ee62';
    const region = 'us';
    const appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(region)
      .build();
    CometChat.init(appID, appSetting).then(
      async () => {
      await setupNotification()
        console.log('Initialization completed successfully');
        // You can now call login function.
      },
      (error) => {
        console.log('Initialization failed with error:', error);
        // Check the reason for error and take appropriate action.
      },
    );

  }, [])
  return (
    <NavigationContainer>
      <HomeStack />
      {/* <TahaStackNavigator /> */}
      <FlashMessage position="bottom" />
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  iconSize: {
    height: scaledSize(24),
    width: scaledSize(24),
  },
  textSizes: {
    fontSize: scaledSize(14),
    fontFamily: style.regular,
    alignSelf: 'center',
    marginTop: scaledSize(2),
  },
})
