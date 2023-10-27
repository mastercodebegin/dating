import { StyleSheet } from 'react-native';
import theme from '../../../resources/theme';
import { scaledSize } from 'framework/src/Utilities'
import { style } from "../../../../../../../src/CustomFonts";

export default StyleSheet.create({
  callMessageStyle: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    textAlign: 'center',
  },
  callMessageTxtStyle: {
    alignSelf: 'center',
    fontSize: 12,
    fontWeight: '500',
    margin: 0,
  },
  headerContainer: {
    flexDirection: 'row',
    height: scaledSize(75),
    paddingRight: 12,
    elevation: 5,
    backgroundColor: '#fff',
    zIndex: 5,
    alignItems: 'center',
  },
  backButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: scaledSize(30)
  },
  backText: {
    fontSize: 20,
    color: theme.color.blue,
  },
  headerDetailContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  audioCallContainer: {
    paddingHorizontal: 8,
  },
  videoCallContainer: {
    paddingHorizontal: 8,
  },
  callIcon: {
    height: 24,
    width: 24,
  },
  videoIcon: { width: 34, height: 24, resizeMode: 'contain' },
  itemDetailContainer: {
    flex: 1,
  },
  itemNameText: {
    fontSize: style.f18,
    fontFamily: style.meduim,
    lineHeight: scaledSize(24),
  },
  statusText: {
    fontSize: style.f16,
    fontFamily: style.regular,
    color: "#999A9B",
  },
  avatarContainer: {
    height: scaledSize(50),
    width: scaledSize(50),
    borderRadius: scaledSize(25),
    marginRight: scaledSize(12),
  },
  arrowLeftIcon: {
    height: scaledSize(32),
    width: scaledSize(25),
    resizeMode: 'contain'
  },
  scoreBoxView: {
    flexDirection: "row",
    width: "28%",
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  scoreBox: {
    marginLeft: scaledSize(5),
    alignItems: "center",
    justifyContent: "center",
    width: scaledSize(42),
    height: scaledSize(62),
    backgroundColor: style.bgGray,
    borderRadius: scaledSize(5),
  },
  scoreTextStyle: {
    fontSize: style.f16,
    fontFamily: style.bold,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
  },
  userNameStyle: {
    fontSize: style.f14,
    fontFamily: style.regular,
    color: "#000",
    textAlign: "center",
  },
});
