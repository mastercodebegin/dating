import React from "react";
// Customizable Area Start
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { nextIcon, profileComplete } from "./assets";
import QuestionBankController, {
  Props,
} from "./QuestionBankController";
import { scaledSize } from "framework/src/Utilities";
import { style } from "../../../components/src/CustomFonts";

export default class ProfileActive extends QuestionBankController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    // Customizable Area Start

    // Merge Engine - render - Start
    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <Text
            testID="labelBody" //Merge Engine::From BDS
            style={styles.subHeader} //UI Engine::From Sketch
          >
            {"Congratulations on completing"}
          </Text>
          <Image
            source={profileComplete}
            resizeMode={"contain"}
            style={styles.congratsImageStyle}
          />
          <Text
            testID="labelBody" //Merge Engine::From BDS
            style={styles.headerTitle} //UI Engine::From Sketch
          >
            {this.props.navigation.state?.params?.isLevel1
              ? "Now, you get to choose! Select the questions you want to answer"
              : "Your Profile is active, upload your pictures next to view your personality statement"}
              
          </Text>
        </View>
        <TouchableOpacity
          // {...this.btnExampleProps} //Merge Engine::From BDS - {...this.testIDProps}
          testID={"btnPressNext"}
          // {...this.btnSubmitOTPProps}
          onPress={() => {this.props.navigation.state?.params?.isLevel1 ? this.goToQuestionBanck() :  this.ProfileActiveOk()}}
          style={styles.viewContainer}
        >
          <Image source={nextIcon} style={styles.nextBtnStyle} />
        </TouchableOpacity>
      </View>
    );
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
  mainContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  congratsImageStyle: {
    width: "100%",
    height: 250,
  },
  headerTitle: {
    marginVertical: 10,
    fontSize: scaledSize(20),
    fontFamily: style.regular,
    textAlign: "center",
    color: "#000",
    marginHorizontal: 15,
  },
  subHeader: {
    marginVertical: 10,
    fontSize: scaledSize(16),
    fontFamily: style.regular,
    textAlign: "center",
    color: "#000",
    marginHorizontal: 15,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
  },
  body: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },
  bgPasswordContainer: {
    flexDirection: "row",
    backgroundColor: "#00000000",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    padding: 10,
    borderWidth: 1,
  },
  bgMobileInput: {
    flex: 1,
  },
  showHide: {
    alignSelf: "center",
  },
  imgShowhide: { height: 30, width: 30 },
  itemTextStyle: {
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 15,
    color: "#000",
  },
  itemContainer: {
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  outrerCircle: {
    height: 18,
    width: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  innerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#000",
  },
  viewContainer: {
    backgroundColor: "#000",
    borderRadius: 12,
    alignSelf: "flex-end",
    justifyContent: "center",
    height: 52,
    width: 52,
    marginBottom: 30,
  },
  buttonTextStyle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
  nextBtnStyle: {
    height: 52,
    width: 52,
    alignSelf: "center",
  },
});
// Customizable Area End
