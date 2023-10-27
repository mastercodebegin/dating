import { scaledSize } from 'framework/src/Utilities';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  statueIndicatorStyle: {
    width: scaledSize(10),
    height: scaledSize(10),
    top: scaledSize(35),
    right: 0,
    borderColor: '#fff',
    borderWidth: 1,
    position: 'absolute',
  },
});
