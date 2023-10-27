import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { scaledSize } from "../../../framework/src/Utilities";
import { style } from "../../../components/src/CustomFonts";

// Customizable Area End

import GameScoreController, { Props, configJSON } from "./GameScoreController";

export default class GameScore extends GameScoreController {
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
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={styles.container}
      >
        <View style={{alignItems: "center"}}>
        <Text style={styles.levelHeading}>LEVEL 1</Text>
        <Text style={styles.resultText}>LOST!</Text>
        <Image
          style={styles.resultImage}
          source={{
            uri:
              "https://scontent.fpnq7-4.fna.fbcdn.net/v/t39.30808-6/355712910_647406340748444_3799364959751113534_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=0FSRuALNdz4AX_F8i5v&_nc_ht=scontent.fpnq7-4.fna&oh=00_AfAPlIApWYC_eiwbq_37sCxNnHPnZv13TTnrLxWJUCN-Rg&oe=64C6FC57",
          }}
        />
        <Text style={styles.resultDescription}>
          You lost level 1 by 3 points
        </Text>
        <View style={styles.profilePicturesView}>
          <Image
            style={styles.profilepicture}
            source={{
              uri:
                "https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            }}
          />
          <Image
            style={styles.profilepicture1}
            source={{
              uri:
                "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            }}
          />
        </View>
        <View style={styles.scoreBoxView}>
          <View style={styles.scoreBox}>
            <Text style={styles.scoreBoxText}>2</Text>
            <Text style={styles.scoreBoxText}>RK</Text>
          </View>
          <View style={styles.scoreBox}>
            <Text style={styles.scoreBoxText}>4</Text>
            <Text style={styles.scoreBoxText}>AB</Text>
          </View>
        </View>
        <Text style={styles.instructionText}>
        {configJSON.level1Instruction}
        </Text>
        <TouchableOpacity
            data-elementId="button_ButtonOnlyTextCopy"
            // onPress={this.emailLogIn}
            style={styles.ButtonOnlyTextCopyButton}
          >
            <Text
              data-elementId="TEXTCOLORSTYLE"
              style={styles.TEXTCOLORSTYLEText}
            >
              Add Friiend
            </Text>
          </TouchableOpacity>
        <Text style={styles.instructionText}>
          {configJSON.level1Instruction1}
        </Text>
        </View>
      </ScrollView>
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
    // alignItems: "center",
  },

  // New Matches CSS ---------------------------------------
  levelHeading: {
    color: "black",
    fontSize: scaledSize(14),
    marginBottom: scaledSize(10),
  },
  resultText: {
    fontSize: scaledSize(22),
    color: "black",
    marginBottom: scaledSize(26),
    fontWeight: "bold"
  },
  resultImage : {
    height: scaledSize(120),
    width: scaledSize(120),
    borderRadius: scaledSize(14),
    marginBottom: scaledSize(26),
  },
  resultDescription: {
    fontSize: scaledSize(15),
    fontWeight: "bold",
    color: "black",
    marginBottom: scaledSize(26),
  },
  profilePicturesView: {
    flexDirection: "row",
    marginBottom: scaledSize(20),  
  },
  profilepicture: {
    left: 15,
    height: scaledSize(105),
    width: scaledSize(105),
    borderRadius: scaledSize(60),
    zIndex: 2000
  },
  profilepicture1: {
    right: 15,
    height: scaledSize(105),
    width: scaledSize(105),
    borderRadius: scaledSize(60),
    zIndex: 1000
  },
  scoreBoxView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: scaledSize(20),
  },
  scoreBox: {
    marginHorizontal: scaledSize(3),
    height: scaledSize(60),
    width: scaledSize(40),
    borderRadius: scaledSize(4),
    backgroundColor: "#e6e6e6",
    justifyContent: "center",
    alignItems: "center",
  },
  scoreBoxText: {
    fontSize: scaledSize(15),
    color: "black",
  },
  instructionText: {
    textAlign: "center",
    fontSize: scaledSize(13),
    color: "black",
    marginBottom: scaledSize(26),
  },
  ButtonOnlyTextCopyButton: {
    ...style.btnStyle,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: scaledSize(26),
  },
  TEXTCOLORSTYLEText: {
    ...style.btnTextStyle,
    includeFontPadding: false,
    color: style.white,
    textAlign: "center",
  },
});
// Customizable Area End
