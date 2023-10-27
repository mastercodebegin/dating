import React from "react";

// Customizable Area Start
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { scaledSize, heightFromPercentage } from "../../../framework/src/Utilities";
import { winAward, user1, user2 } from "./assets"

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start

// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import GameScore2Controller, {
  Props,
  configJSON,
} from "./GameScore2Controller";

export default class GameScore2 extends GameScore2Controller {
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
    const gameScorePortraitView = (
      <SafeAreaView style={[styles.container]}>
        <ScrollView>
          <Text style={styles.level}>{configJSON.scoreTitle}</Text>
          <Image style={styles.winimg} source={winAward} />
          <Text style={styles.gameResult} numberOfLines={2}>

            {this.state.score.first_user_score >
              this.state.score.second_user_score ? `${this.state.firstUserName} ${configJSON.gameWonBy} ${this.state.secondUserName}` : this.state.score.first_user_score
                < this.state.score.second_user_score ? `${this.state.secondUserName} ${configJSON.gameWonBy} ${this.state.firstUserName}` : `${configJSON.gameResult}`}</Text>
          <View style={styles.Imagecontainer}>

            <TouchableOpacity
              onPress={this.onMyImageclick}
              style={styles.imageStyle}
              testID="myImageClickTest"
            >
              <Image
                source={user2} style={styles.userImage} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={this.onOpponentImageclick}
              style={styles.imageStyle}
              testID="opponentImageClickTest"
            >
              <Image source={user1}
                style={styles.userImage} />
            </TouchableOpacity>
          </View>
          <View style={[styles.scoreCardContainer]}>
            <View style={styles.scoreCard}>
              <Text style={styles.userScore}>
                {this.state.score.first_user_score}
              </Text>
              <Text style={styles.scoreCardText} numberOfLines={1}>
                {this.state.firstUserName}
              </Text>
            </View>
            <View style={styles.scoreCard}>
              <Text style={styles.userScore}>
                {this.state.score.second_user_score}
              </Text>
              <Text style={styles.scoreCardText} numberOfLines={1}>
                {this.state.secondUserName}
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )

    const gameScoreLandscapView = (
      <SafeAreaView style={styles.landscapeContainer}>
        <Text style={styles.landscapeFinalScoreLabel}>{configJSON.scoreTitle}</Text>
        <View style={styles.ladscapeSubContainer}>
          <View style={styles.landScapeMyScoreContainer}>
            <TouchableOpacity
              onPress={this.onMyImageclick}
              style={styles.landScapeImageView}
            >
              <Image source={user2} style={styles.landScapeImage} />
            </TouchableOpacity>
            <View style={styles.landScapeMyScoreCard}>
              <Text style={styles.landScapeScoreValue}>
                {this.state.score.first_user_score}
              </Text>
              <Text style={styles.landScapeName} numberOfLines={1}>
                {this.state.firstUserName}
              </Text>
            </View>
          </View>
          <Image style={styles.landScapeTropy} source={winAward} />
          <View style={styles.landScapeOpponentScoreContainer}>
            <View style={styles.landScapeOpponentScoreCard}>
              <Text style={styles.landScapeScoreValue}>
                {this.state.score.second_user_score}
              </Text>
              <Text style={styles.landScapeName} numberOfLines={1}>
                {this.state.secondUserName}
              </Text>
            </View>
            <TouchableOpacity
              onPress={this.onOpponentImageclick}
              style={styles.landScapeImageView}
            >
              <Image source={user1} style={styles.landScapeImage} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.landScapeResultView}>
          {this.state.score.first_user_score >
            this.state.score.second_user_score ? `${this.state.firstUserName} ${configJSON.gameWonBy} ${this.state.secondUserName}` : this.state.score.first_user_score
              < this.state.score.second_user_score ? `${this.state.secondUserName} ${configJSON.gameWonBy} ${this.state.firstUserName}` : `${configJSON.gameResult}`}</Text>
      </SafeAreaView>
    )

    if (this.state.isPortrait) {
      return gameScorePortraitView;
    } else {
      return gameScoreLandscapView;
    }
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
  level: {
    textAlign: "center",
    marginTop: scaledSize(25),
    fontSize: scaledSize(30),
    fontWeight: "bold",
    color: "black",
  },
  winimg: {
    textAlign: "center",
    marginVertical: scaledSize(10),
    height: scaledSize(150),
    width: '70%',
    alignSelf: "center",
  },
  Imagecontainer: {
    paddingLeft: scaledSize(10),
    width: "95%",
    height: scaledSize(150),
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "center",
    marginTop: scaledSize(20),
  },
  scoreCardContainer: {
    width: scaledSize(330),
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: scaledSize(10),
    height: scaledSize(130),
  },
  scoreCard: {
    backgroundColor: "#ededed",
    borderRadius: 2,
    alignItems: "center",
    marginVertical: scaledSize(10),
    width: scaledSize(150),
    marginLeft: scaledSize(15),
    marginRight: scaledSize(15),
    borderColor: "lightgreen",
    borderWidth: 2,
  },
  scoreCardText: {
    fontWeight: "bold",
    fontSize: scaledSize(20),
    textAlign: "center",
    marginVertical: scaledSize(5),
    color: "#000000",
    width: scaledSize(130),
  },
  scoreText: {
    fontWeight: "bold",
    color: "#000000"
  },
  gameResult: {
    fontSize: scaledSize(20),
    textAlign: "center",
    fontWeight: "bold",
    color: "#000000",
    width: scaledSize(320),
    alignSelf: "center",
  },
  imageStyle: {
    width: "45%",
    height: scaledSize(180),
    marginHorizontal: scaledSize(5)
  },
  userImage: {
    height: scaledSize(135),
    width: scaledSize(135),
    borderRadius: scaledSize(70),
    borderWidth: scaledSize(2),
    borderColor: "lightgreen"
  },
  userScore: {
    fontSize: scaledSize(30),
    fontWeight: "bold",
    marginVertical: scaledSize(5),
    color: "#000000"
  },
  landscapeContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  landscapeFinalScoreLabel: {
    textAlign: "center",
    marginTop: scaledSize(5),
    fontSize: scaledSize(30),
    fontWeight: "bold",
    color: "black",
  },
  ladscapeSubContainer: {
    width: scaledSize(750),
    height: scaledSize(100),
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "center",
    marginTop: scaledSize(30),
    backgroundColor: "white",
  },
  landScapeMyScoreContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  landScapeOpponentScoreContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  landScapeImageView: { width: scaledSize(100), height: scaledSize(100), alignItems: "center" },
  landScapeImage: {
    height: scaledSize(100),
    width: scaledSize(100),
    borderRadius: scaledSize(50),
    borderWidth: 3,
    borderColor: "lightgreen"
  },
  landScapeMyScoreCard: {
    alignItems: "flex-start",
    height: scaledSize(100),
    width: scaledSize(170),
    marginLeft: scaledSize(20),
  },
  landScapeOpponentScoreCard: {
    alignItems: "flex-end",
    height: scaledSize(100),
    width: scaledSize(170),
    marginRight: scaledSize(20),
  },
  landScapeScoreValue: {
    fontSize: scaledSize(30),
    fontWeight: "bold",
    marginVertical: scaledSize(5),
    color: "#000000"
  },
  landScapeName: {
    fontWeight: "bold",
    fontSize: scaledSize(20),
    marginVertical: scaledSize(5),
    color: "#000000"
  },
  landScapeTropy: {
    textAlign: "center",
    marginVertical: scaledSize(10),
    height: scaledSize(120),
    width: scaledSize(70),
    alignSelf: "center",
  },
  landScapeResultView: {
    fontSize: scaledSize(25),
    textAlign: "center",
    fontWeight: "bold",
    color: "#000000",
    marginTop: scaledSize(30),
  },
});
// Customizable Area End
