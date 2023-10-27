import { StyleSheet } from 'react-native';
import { widthRatio } from '../../../utils/consts';
import theme from '../../../resources/theme';
import { style } from '../../../../../../CustomFonts';
import { scaledSize } from 'framework/src/Utilities';
export default StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 74,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  avatarStyle: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: 44,
    height: 44,
    marginRight: 15 * widthRatio,
    justifyContent: 'center',
    borderWidth: 0.5,
  },
  itemDetailsContainer: {
    // borderBottomWidth: 1,
    flex: 1,
    height: '100%',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingBottom: 10,
    color: theme.color.primary,
    // flexDirection: 'row',
    // backgroundColor: 'red',
  },
  itemLastMsgTimeStyle: {
    fontSize: scaledSize(12),
    fontFamily: style.regular,
    maxWidth: '100%',
    marginLeft: 2,
    color: theme.color.helpText,
  },
  itemNameStyle: {
    fontSize: scaledSize(16),
    fontFamily: style.meduim,
    width: '60%',
    color: theme.color.primary,
    marginBottom: 2,
    marginTop: 8,
  },
  itemMsgStyle: {
    width: '80%',
  },
  itemRowStyle: {
    width: '20%',
    alignItems: 'center',
  },
  itemLastMsgStyle: {
    width: '40%',
    alignItems: 'flex-end',
  },
  itemThumbnailStyle: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: scaledSize(44),
    height: scaledSize(44),
    backgroundColor: 'rgba(51,153,255,0.25)',
    borderRadius: 25,
  },
});
