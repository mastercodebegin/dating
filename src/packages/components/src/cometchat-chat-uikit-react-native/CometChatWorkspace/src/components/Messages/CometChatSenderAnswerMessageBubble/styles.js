import { StyleSheet } from 'react-native';
import { heightRatio, widthRatio } from '../../../utils/consts';
import { scaledSize } from 'framework/src/Utilities';
import { style } from "../../../../../../../src/CustomFonts";

export default StyleSheet.create({
  container: { marginBottom: 16, marginRight: 8 },
  linkTitle: { fontWeight: '700' },
  linkDescription: {
    fontStyle: 'italic',
    fontSize: 13,
  },
  autoLinkStyle: { color: 'black', fontSize: style.f16, fontFamily: style.meduim, lineHeight: scaledSize(21) },
  chatView: { flexDirection: 'row', alignSelf: 'flex-end', justifyContent: 'space-between', alignItems: 'center' },
  greenRoundedStyle: {
    // backgroundColor: '#33A300',
    height: scaledSize(30),
    width: scaledSize(30),
    marginBottom: scaledSize(4),
    borderRadius: scaledSize(12),
    left: scaledSize(5),
    position: 'relative',
    zIndex: 2000
  },
  redRoundedStyle: {
    // backgroundColor: 'red',
    height: scaledSize(30),
    width: scaledSize(30),
    marginBottom: scaledSize(4),
    borderRadius: scaledSize(12),
    left: scaledSize(5),
    position: 'relative',
    zIndex: 2000
  },
  previewAutoLinkStyle: { textAlign: 'center' },
  linkStyle: { textDecorationLine: 'underline', fontSize: 15 },
  linkTextStyle: { fontWeight: '700' },
  messageWrapperStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEDED',

    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    maxWidth: '65%',
    borderRadius: 10,
    marginBottom: 4,
  },
  messageInfoWrapperStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  messagePreviewContainerStyle: {
    borderRadius: 12,
    flex: 1,
  },
  previewImageStyle: {
    height: 150,
    marginVertical: 12,
  },
  previewImageIconStyle: {
    height: 50,
    marginVertical: 12,
  },
  previewDataStyle: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewTitleStyle: {
    flexWrap: 'wrap',
    textAlign: 'left',
    marginBottom: 8,
  },
  previewDescStyle: {
    textAlign: 'left',
    paddingVertical: 8,
  },
  previewTextStyle: {
    paddingHorizontal: 5,
    textAlign: 'left',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 8,
  },
  previewLinkStyle: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
