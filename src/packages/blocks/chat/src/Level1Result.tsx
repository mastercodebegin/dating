import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { completeImg, lostImage, } from "./assets";
// Customizable Area End
import Level1ResultController, { Props } from "./Level1ResultController";
import { style } from "../../../components/src/CustomFonts";
import { scaledSize } from "framework/src/Utilities";
import { backIcon } from "../../mobile-account-registration/src/assets";
import CustomLoader from "../../../components/src/CustomLoader";

export default class Level1Result extends Level1ResultController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderButtonView = () => {
    if (this.state.scoreData?.status) {
      if (!this.state.is_requested) {
        return (
          <TouchableOpacity
              testID={"btnPressContinue"}
              onPress={() => this.goBackFunction()}
              style={styles.viewContainer}
            >
              <Text style={styles.buttonTextStyle}>
                {"Continue"}
              </Text>
            </TouchableOpacity>
        )
      } else {
        return (
          <View>
            <TouchableOpacity
              testID={"btnPressAccept"}
              onPress={() => this.acceptAndRejectReq("accepted")}
              style={styles.viewContainer}
            >
              <Text style={styles.buttonTextStyle}>
                {"Yes Please!"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID={"btnPressReject"}
              onPress={() => this.acceptAndRejectReq("rejected")}
              style={styles.secondBtnStyle}
            >
              <Text style={styles.secondBtnTextStyle}>
                {"No, I think we are done here"}
              </Text>
            </TouchableOpacity>
          </View>
        )
      }
    } else {
      return (
        <TouchableOpacity
          testID={"btnPressAddFrd"}
          disabled={this.state.is_requested}
          onPress={() => this.chechaddFrdStatus()}
          style={styles.viewContainer}
        >
          <Text style={styles.buttonTextStyle}>
            {this.checkaddFrdText()}
          </Text>
        </TouchableOpacity>
      )
    }
  }
  // Customizable Area End

  render() {
    // Customizable Area Start

    console.log("this.state.is_accepted", this.state.is_accepted)
    console.log("this.state.is_requested", this.state.is_requested)
    // Merge Engine - render - Start
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            testID={"btngoBack"}
            onPress={() => this.goBackFunction()}
            style={styles.backIconStyle}>
            <Image
              source={backIcon}
              resizeMode={"contain"}
              style={styles.backIconStyle}
            />
          </TouchableOpacity>
          <Text
            testID="labelBody" //Merge Engine::From BDS
            style={styles.headerTitleStyle} //UI Engine::From Sketch
          >
            {"LEVEL 1"}
          </Text>
          <View style={styles.backIconStyle} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <Text
            testID="labelBody" //Merge Engine::From BDS
            style={styles.headerTitle} //UI Engine::From Sketch
          >
            {this.state.scoreData?.status ? "COMPLETE!" : "LOST!"}
          </Text>
          <Image
            source={this.state.scoreData?.status ? completeImg : lostImage}
            resizeMode={"contain"}
            style={styles.congratsImageStyle}
          />
          <Text
            testID="labelBody" //Merge Engine::From BDS
            style={styles.subHeader} //UI Engine::From Sketch
          >
            {"You"} {this.state.scoreData?.status ? "won" : "lost"} {"the Level 1 by " + this.state.scoreData?.points + " points"}
          </Text>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: this.state.scoreData?.friends_photos }}
              resizeMode={"contain"}
              style={styles.friendImageStyle}
            />
            <Image
              source={{ uri: this.state.scoreData?.my_photos }}
              resizeMode={"contain"}
              style={styles.userImageStyle}
            />
          </View>
          <View style={styles.scoreContainer}>
            <View style={styles.scoreTextContainer}>
              <Text style={styles.scoreTextStyle}>{this.state.scoreData?.friend_score}</Text>
              <Text style={styles.userNameStyle}>
                {this.state.scoreData?.friends_name?.split(' ')?.slice(0, 2)?.map((name: string) => name.charAt(0))?.join('')?.toUpperCase()}
              </Text>
            </View>
            <View style={styles.scoreTextContainer}>
              <Text style={styles.scoreTextStyle}>{this.state.scoreData?.my_score}</Text>
              <Text style={styles.userNameStyle}>
                {this.state.scoreData?.my_name?.split(' ')?.slice(0, 2)?.map((name: string) => name.charAt(0))?.join('')?.toUpperCase()}
              </Text>
            </View>
          </View>
          <View style={styles.middleDescContainer}>
            <Text style={styles.userNameStyle}>
              {this.state.scoreData?.status ?
                `${this.state.scoreData?.friends_name?.split(' ')} can now send you a friend request. You get to accept/reject. You can also see their full profile before becoming friends.` :
                `Now You can send a friend request to ${this.state.scoreData?.friends_name?.split(' ')}. They get to accept/reject. They can also see your full profile before becoming friends`
              }
            </Text>
          </View>

          {this.renderButtonView()}
          <View style={styles.bottomDescContainer}>
            <Text style={styles.userNameStyle}>
              {"You can both chat but cannot proceed to LEVEL 2 without becoming friends with them."}
            </Text>
          </View>
        </ScrollView>
        {!!this.state.isLoader && (
          <CustomLoader isLoading={this.state.isLoader} />
        )}
      </View>
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
    width: "100%",
    backgroundColor: "#ffffffff",
  },
  backIconStyle: {
    width: 30,
    height: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: scaledSize(10),
    marginBottom: scaledSize(10),
  },
  headerTitleStyle: {
    fontSize: style.f16,
    fontFamily: style.meduim,
    alignSelf: "center",
    color: "#000",
  },
  congratsImageStyle: {
    width: scaledSize(130),
    height: scaledSize(140),
    resizeMode: "contain",
    alignSelf: "center",
    marginVertical: scaledSize(10),
  },
  headerTitle: {
    marginVertical: 10,
    fontSize: style.f26,
    fontFamily: style.bold,
    alignSelf: "center",
    color: "#000",
  },
  subHeader: {
    fontSize: style.f16,
    fontFamily: style.meduim,
    textAlign: "center",
    color: "#000",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: scaledSize(15),
  },
  friendImageStyle: {
    width: scaledSize(100),
    height: scaledSize(100),
    borderRadius: scaledSize(50),
    resizeMode: "cover",
    zIndex: 1,
  },
  userImageStyle: {
    width: scaledSize(100),
    height: scaledSize(100),
    borderRadius: scaledSize(50),
    resizeMode: "cover",
    marginLeft: scaledSize(-30),
  },
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  scoreTextContainer: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: scaledSize(15),
    width: scaledSize(40),
    height: scaledSize(60),
    backgroundColor: style.bgGray,
    marginHorizontal: scaledSize(5),
    borderRadius: scaledSize(5),
  },
  scoreTextStyle: {
    fontSize: style.f16,
    fontFamily: style.bold,
    color: "#000",
    fontWeight: "700",
    textAlign: "center",
  },
  userNameStyle: {
    fontSize: style.f14,
    fontFamily: style.regular,
    color: "#000",
    textAlign: "center",
  },
  middleDescContainer: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: scaledSize(15),
  },
  bottomDescContainer: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: scaledSize(15),
    marginTop: scaledSize(10),
  },
  viewContainer: {
    marginVertical: scaledSize(10),
    alignSelf: "center",
    justifyContent: "center",
    ...style.btnStyle,
  },
  secondBtnStyle: {
    marginBottom: scaledSize(10),
    alignSelf: "center",
    justifyContent: "center",
    ...style.btnStyle,
    backgroundColor: style.white,
    borderWidth: 1,
    borderColor: style.black,
  },
  buttonTextStyle: {
    textAlign: "center",
    ...style.btnTextStyle,
  },
  secondBtnTextStyle: {
    textAlign: "center",
    ...style.btnTextStyle,
    color: style.black,
  },
});
// Customizable Area End
