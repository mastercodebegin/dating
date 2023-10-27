import React from "react";

// Customizable Area Start
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { imgCircle, imgCheckedCircle, userAvatar } from "./assets";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import SplitViewInterfaceController, {
  Props, configJSON,
} from "./SplitViewInterfaceController";

export default class SplitViewInterface extends SplitViewInterfaceController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container} >         
        <View>
          <View style={{...styles.rowView, paddingHorizontal: 30}}>
          <TouchableOpacity data-testid="" onPress={this.handleProfileImageClick}>
            <Image
              style={styles.profilePic}
              resizeMode="cover"
              source={userAvatar}
            />
            </TouchableOpacity>
            <Text style={styles.userScore}>
              {this.state.myInfo.attributes.score}
            </Text>
            <Text style={styles.userScore}>vs</Text>
            <Text style={styles.userScore}>
              {this.state.opponentsInfo.attributes.score}
            </Text>
            <TouchableOpacity data-testid="" onPress={this.handleProfileImageClick}>
            <Image
              style={styles.profilePic}
              resizeMode="cover"
              source={userAvatar}
            />
            </TouchableOpacity>
          </View>
          <View style={{...styles.rowView, paddingHorizontal: 10}}>
            <View style={styles.nameContainer}>
              <Text style={styles.userName} numberOfLines={2}>
                {this.state.myInfo.attributes.user_name}
              </Text>
            </View>
            <View style={styles.nameContainer}>
              <Text
                style={{ ...styles.userName, textAlign: "right" }}
                numberOfLines={2}
              >
                {this.state.opponentsInfo.attributes.user_name}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.bottomView}>
          <Text style={styles.bottomViewTitle}>{`Question ${
            this.state.questionIndex + 1
          } of ${this.state.questionData.length} (Level ${configJSON.gameLevel})`}</Text>
          <Text style={styles.questionText}>
            {this.state.currentQuestion.attributes.question}
          </Text>
          {this.state.options.map((option, index) => (
            <TouchableOpacity
              data-testid={`radioButton${index}`}
              key={index}
              style={styles.optionView}
              onPress={() => {
                this.onRadioBtnClick(option);
              }}
            >
              {option === this.state.selectedOption ? (
                <Image source={imgCheckedCircle} style={styles.imageIcons} />
              ) : (
                <Image source={imgCircle} style={styles.imageIcons} />
              )}
              <Text style={styles.selectedOption}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {this.state.gameMessage !== "" && (
          <View style={styles.toastContainer}>
            <Text style={styles.toastText}>{this.state.gameMessage}</Text>
          </View>
        )}
      </ScrollView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    justifyContent: "space-between",
    backgroundColor: "#ffffffff",
  },
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameContainer: {
    justifyContent: "center",
    width: "46%",
  },
  profilePic: {
    height: Dimensions.get("screen").width * 0.15,
    width: Dimensions.get("screen").width * 0.15,
    borderRadius: 12,
    borderWidth: 4,
    borderColor: "orange",
  },
  userName: {
    fontSize: 20,
    color: "black",
  },
  userScore: {
    fontSize: 40,
    color: "black",
  },
  button: {
    height: 40,
    alignSelf: "center",
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
  },

  //  BottomView CSS --------------------------
  bottomView: {
    width: "100%",
    backgroundColor: "#ffd280",
    padding: 16,
    borderRadius: 12,
  },
  bottomViewTitle: {
    fontSize: 16,
    color: "black",
  },
  questionText: {
    fontSize: 20,
    color: "black",
  },

  //  Option CSS --------------------------
  optionView: {
    padding: 12,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  imageIcons: {
    height: 24,
    width: 24,
  },
  selectedOption: {
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 15,
    color: "#000",
  },
  unSelectedOption: {
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 15,
    color: "grey",
  },

  //  Toast CSS --------------------------
  toastContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderRadius: 30,
    position: "absolute",
    bottom: 60,
    alignSelf: "center",
  },
  toastText: {
    color: "#fff",
    fontSize: 25
  },
});
// Customizable Area End
