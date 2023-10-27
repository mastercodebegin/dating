import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import FastImage from "react-native-fast-image";
import CustomLoader from "../../../components/src/CustomLoader";
import { style } from "../../../components/src/CustomFonts";
import { scaledSize } from "framework/src/Utilities";
//@ts-ignore
import CometChatConversationListWithMessages from "../../../components/src/cometchat-chat-uikit-react-native/CometChatWorkspace/src/components/Chats/CometChatConversationListWithMessages";
// Customizable Area End

import ChatController, { Props, configJSON, IChat } from "./ChatController";

export default class Chat extends ChatController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    this.props.navigation.addListener(
      "didFocus",
      () => {
        this.getChatableUsers();
        this.getNewMatches();
      }
    );
    // Customizable Area End
  }

  // Customizable Area Start
  renderItem: any;

  renderNewMatch = ({
    item,
  }: {
    item: {
      attributes: {
        compatibility: number;
        first_name: string;
        is_attempted: boolean;
        last_name: string;
        photo: string;
        profile_id: number;
        star: boolean;
        user_name: string;
      };
      id: string;
      type: string;
    };
  }) => (
    <TouchableOpacity
      data-testid="newMatch"
      style={styles.newMatchBox}
      onPress={() => this.handleNewMatchPress(item?.id, item.attributes.is_attempted)}
    >
      <FastImage
        source={{ uri: item.attributes.photo }}
        style={styles.profilepic}
      />
      <Text style={styles.newMatchName} numberOfLines={2}>
        {item.attributes.first_name}
      </Text>
      <View style={styles.row}>
        <Text style={styles.compatibilityText}>Compatibility </Text>
        <Text style={styles.compatibilityNumber}>
          {item.attributes.compatibility}%
        </Text>
      </View>
    </TouchableOpacity>
  );
  // Customizable Area End

  render() {
    // Customizable Area Start
    // console.log("this.state.suggestedFriend", this.state.suggestedFriend);
    // this.renderItem = ({ item, index }: any) => {
    //   return (
    //     <TouchableOpacity
    //       key={index}
    //       onPress={() => this.onPressUserChat(item?.attributes)}
    //       style={[
    //         styles.userDetails,
    //         {
    //           borderBottomWidth:
    //             index === this.state.suggestedFriend.length - 1
    //               ? 0
    //               : scaledSize(1),
    //         },
    //       ]}
    //     >
    //       <Image
    //         source={{ uri: item?.attributes?.photo }}
    //         style={styles.userImageStyle}
    //       />
    //       <View style={{ marginLeft: scaledSize(10), flex: 1 }}>
    //         <Text numberOfLines={1} style={styles.userNameTextStyle}>
    //           {item?.attributes?.full_name}
    //         </Text>
    //         <Text numberOfLines={1} style={{ marginTop: scaledSize(5) }}>
    //           {item?.attributes?.user_name}
    //         </Text>
    //       </View>
    //     </TouchableOpacity>
    //   );
    // };
    // Merge Engine - render - Start
    return (
      <>
        <View style={styles.container}>
          <View
            style={this.state.newMatches.length !== 0 && styles.cometChatListView}
          >
            <CometChatConversationListWithMessages
              data-testid="CometChatConversationListWithMessages"
              suggestedUsers={this.state.suggestedFriend}
              startChatListLoading={this.onCometChatChatListLoadingStart}
              stopChatListLoading={this.onCometChatChatListLoadingStop}
              startUserListLoading={this.onCometChatUserListLoadingStart}
              stopUserListLoading={this.onCometChatUserListLoadingStop}
              navigation={this.props.navigation}
            />
          </View>
          {/* <CometChatUserListWithMessages
             suggestedUsers={this.state.suggestedFriend}
             navigation={this.props.navigation}
           /> */}
          {(this.state.newMatches.length !== 0 && !this.state.newMatchesLoading) && (
            <View style={styles.newMatchesContainer}>
              <Text style={styles.newMatchHeading}>New Matches</Text>
              <FlatList
                data-testid="newMatchFlatList"
                data={this.state.newMatches}
                renderItem={this.renderNewMatch}
                horizontal
                showsHorizontalScrollIndicator={false}
              // style={{backgroundColor: 'blue'}}
              />
            </View>
          )}
        </View>

        {(this.state.isLoading ||
          this.state.newMatchesLoading ||
          this.state.cometChatChatListLoading ||
          this.state.cometChatUserListLoading) && (
            <CustomLoader isLoading={true} />
          )}
      </>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
    justifyContent: "space-between",
  },
  cometChatListView: {
    height: scaledSize(354),
  },

  // New Matches CSS ---------------------------------------
  newMatchesContainer: {
    bottom: scaledSize(4),
  },
  newMatchHeading: {
    color: "black",
    fontSize: scaledSize(16),
    fontFamily: style.meduim,
    marginVertical: scaledSize(16), // If you want to change this then you have to change height of cometChatListView also
  },
  newMatchBox: {
    // backgroundColor: "red",
    width: scaledSize(122),
    justifyContent: "space-between",
    marginRight: scaledSize(15),
  },
  profilepic: {
    height: scaledSize(152),
    width: scaledSize(122),
    borderRadius: scaledSize(14),
    marginBottom: scaledSize(4),
  },
  newMatchName: {
    fontSize: scaledSize(14),
    fontFamily: style.meduim,
    color: "black",
  },
  row: {
    flexDirection: "row",
  },
  compatibilityText: {
    fontSize: scaledSize(12),
    fontFamily: style.meduim,
    color: "black",
  },
  compatibilityNumber: {
    fontSize: scaledSize(12),
    fontFamily: style.bold,
    color: "black",
  },
  userDetails: {
    backgroundColor: style.white,
    borderBottomWidth: scaledSize(1),
    borderBottomColor: style.gray2,
    paddingTop: scaledSize(15),
    paddingBottom: scaledSize(10),
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  userNameTextStyle: {
    fontSize: scaledSize(16),
    fontFamily: style.meduim,
    color: style.black,
    textAlign: "left",
  },
  userImageStyle: {
    borderRadius: scaledSize(22),
    height: scaledSize(44),
    width: scaledSize(44),
    resizeMode: "cover",
  },
});
// Customizable Area End
