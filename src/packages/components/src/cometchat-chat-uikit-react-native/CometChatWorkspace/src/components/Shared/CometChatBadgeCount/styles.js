import { StyleSheet } from 'react-native';
import { style } from '../../../../../../CustomFonts';
import { scaledSize } from 'framework/src/Utilities';

export default StyleSheet.create({
  badgeStyle: {
    aspectRatio: 1,
    height: 24,
    borderRadius: 900,
    marginLeft: 4,
    marginRight: 2,
    opacity: 1,
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: scaledSize(11),
    fontFamily:  style.regular,
    overflow: 'hidden',
    textAlign: 'center',
    opacity: 1,
  },
});
