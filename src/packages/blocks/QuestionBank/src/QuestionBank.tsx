import React from "react";

// Customizable Area Start
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";
import { checkCircle, circle, nextIcon } from "./assets";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
import { style } from "../../../components/src/CustomFonts";
import { scaledSize } from "framework/src/Utilities";
// Customizable Area End

import QuestionBankController, {
  Props,
  configJSON,
} from "./QuestionBankController";
import CustomLoader from "../../../components/src/CustomLoader";

export default class QuestionBank extends QuestionBankController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    Dimensions.addEventListener("change", (e) => {
      MergeEngineUtilities.init(
        artBoardHeightOrg,
        artBoardWidthOrg,
        Dimensions.get("window").height,
        Dimensions.get("window").width
      );
      this.forceUpdate();
    });
    // Customizable Area End
  }

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        <View>
          <Text
            testID="labelTitle" //Merge Engine::From BDS
            style={styles.headerTitle} //UI Engine::From Sketch
          >
            {configJSON.labelTitleText}
          </Text>
          <Text
            testID="labelBody" //Merge Engine::From BDS
            style={styles.subHeader} //UI Engine::From Sketch
          >
            {configJSON.labelBodyText}
          </Text>
    
          {this.state.apiQuestionData.map((item, index) => {
            return (
              <TouchableOpacity
                // testID={"btnQuestion" + index}
                onPress={() => this.onPressQuestion(item.id)}
                style={[
                  styles.itemContainer,
                  {
                    borderColor: this.state.selectedQuestionIds.includes(
                      item.id
                    )
                      ? "black"
                      : "gray",
                  },
                ]}
              >
                <Image
                  source={
                    this.state.selectedQuestionIds.includes(item.id)
                      ? checkCircle
                      : circle
                  }
                  style={styles.outrerCircle}
                />
                <Text style={styles.itemTextStyle}>{item?.attributes?.question}</Text>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            testID={"btnSubmitQuestion"}
            // {...this.btnSubmitOTPProps}
            onPress={() => this.questionSubmitApi()}
            style={styles.viewContainer}
          >
            <Image source={nextIcon} style={styles.nextBtnStyle} />
          </TouchableOpacity>
        </View>
       {this.state.isLoder &&<CustomLoader isLoading={this.state.isLoder} />}
      </ScrollView>
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
  headerTitle: {
    marginVertical: 15,
    fontSize: style.f22,
    fontWeight: "600",
    textAlign: "left",
    color: style.black,
  },
  subHeader: {
    marginBottom: 20,
    fontSize: style.f14,
    fontFamily: style.regular,
    textAlign: "left",
    color: style.black,
    marginTop: 5,
  },
  itemTextStyle: {
    paddingLeft: scaledSize(10),
    paddingRight: scaledSize(20),
    color: style.black,
    fontSize: scaledSize(14),
    fontFamily: style.regular,
    display: "flex",
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
    height: 28,
    width: 28,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
  },
  viewContainer: {
    borderRadius: 12,
    alignSelf: "flex-end",
    justifyContent: "center",
    height: 52,
    width: 52,
    marginBottom: 30,
  },
  nextBtnStyle: {
    height: 52,
    width: 52,
    alignSelf: "center",
  },
});
// Customizable Area End
