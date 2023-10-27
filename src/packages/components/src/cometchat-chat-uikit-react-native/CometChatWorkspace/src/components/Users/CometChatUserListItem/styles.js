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
    paddingVertical: 8,
    height: 74,
    // backgroundColor: 'lightgrey'
  },
  avatarStyle: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: scaledSize(44),
    height: scaledSize(44),
    backgroundColor: 'rgba(51,153,255,0.25)',
    marginRight: 15 * widthRatio,
  },
  userNameStyle: {
    width: '100%',
    justifyContent: 'center',
  },
  userNameText: {
    fontSize: scaledSize(16),
    fontFamily: style.meduim,
    maxWidth: '80%',
    color: theme.color.primary,
  },
});
