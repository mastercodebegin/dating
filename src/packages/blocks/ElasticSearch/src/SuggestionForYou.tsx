import React from "react";

// Customizable Area Start
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import FastImage from "react-native-fast-image";

//@ts-ignore

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Customizable Area End
import Scale from "../../../components/src/Scale";
import { starIcon } from "./assets";
import CustomLoader from "../../../components/src/CustomLoader";
import { scaledSize } from "../../../framework/src/Utilities";
import { backIcon } from "../../mobile-account-registration/src/assets";
import SuggestionForYouController, {
  Props
} from "./SuggestionForYouController";
import { style } from "../../../components/src/CustomFonts";

export default class SuggestionForYou extends SuggestionForYouController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
     this.props.navigation.addListener(
      'didFocus',
      () => {
        this.getSuggestedFriend()
      }
    );
    // Customizable Area End
  }

  // Customizable Area Start
  renderItemSuggestedFriend(item: any) {
    return (
      <TouchableOpacity
        testID="suggestedFriendListUserId"
        onPress={() => this.onPressUser(item?.id, item?.attributes?.is_attempted)}
        style={{
          width: '46%', height: scaledSize(150), alignSelf: 'center', margin: "2%",
          marginVertical: '3%',
          justifyContent: 'space-between',
        }}>
        <FastImage source={{ uri: item?.attributes?.photo }}
          style={{ borderRadius: Scale(20), height: Scale(180), width: Scale(180) }} />
          {item?.attributes?.star && <Image source={starIcon}
            style={styles.modalStarIcon}>
          </Image>}
      </TouchableOpacity>
    )
  }
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <View style={styles.container}>
        <View style={styles.modalViewStyle}>
          <View style={styles.headerStyle}>
            <TouchableOpacity 
            testID="suggestedFriendListBackButton"
            onPress={() => this.goBackBtn()}
            >
              <Image source={backIcon}
                resizeMode="contain"
                style={{ height: Scale(20), width: Scale(30) }} />
            </TouchableOpacity>
            <Text style={styles.headerTextStyle}>Suggested For You</Text>
          </View>
          <FlatList
            testID="suggestedFriendListID"
            data={this.state.suggestedSixFriend}
            numColumns={2}
            horizontal={false}
            renderItem={({ item, index }) => this.renderItemSuggestedFriend(item)}
            showsVerticalScrollIndicator={false}
          />
        </View>
        {this.state.isLoading && <CustomLoader isLoading={this.state.isLoading} />}
      </View>
    )
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  modalViewStyle: {
    height: '100%',
    paddingHorizontal: 10,
    backgroundColor: '#fff'
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10
  },
  headerTextStyle: {
    marginLeft: scaledSize(10),
    fontSize: style.f20,
    fontWeight: '500',
    fontFamily: style.meduim,
    color: '#000'
  },
  modalStarIcon: {
    height: Scale(26),
    width: Scale(26),
    position: 'absolute',
    right: Scale(10),
    top: Scale(10),
  },
  starIconStyle: {
    height: Scale(20),
    width: Scale(20),
    position: 'absolute',
    right: Scale(10),
    top: Scale(10),
  },
});
// Customizable Area End
