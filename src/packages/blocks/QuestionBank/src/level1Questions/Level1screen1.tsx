/* eslint-disable react-native/no-inline-styles */
// Customizable Area Start
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  // Customizable Area Start
  Image,
  TouchableOpacity,
  FlatList,
  // Customizable Area End
} from "react-native";
// Customizable Area Start
import Level1QuestionsController from "./Level1QuestionsController";
import {
  questionsImg,
  backwardArrow,
  forwardArrow,
  checkCircle,
  circle,
} from "../assets";
import CutomStepIndicator from "../../../../components/src/CutomStepIndicator";
import CustomLoader from "../../../../components/src/CustomLoader";
import { deviceWidth, scaledSize } from "../../../../framework/src/Utilities";
import { style } from "../../../../components/src/CustomFonts";
// Customizable Area End

export default class Level1screen1 extends Level1QuestionsController {
  // Customizable Area Start
  renderItem: any;
  // Customizable Area End

  render() {
    // Customizable Area Start
    this.renderItem = ({ item, index }: any) => {
      return (
        <View style={{ width: deviceWidth }}>
          <View>
            <Text style={styles.questionHeading}>
              Question {index + 1} of {this.state.questionApiData.length}{" "}
              (Level1)
            </Text>
          </View>
          <View>
            <Text style={styles.questionText}>{item?.attributes?.question}</Text>
          </View>
          {!!item &&
            item?.attributes?.option?.map((itm: any, index: number) => {
              return (
                <TouchableOpacity
                  onPress={() => this.onPressOption(itm, item?.id)
                  }
                  style={[
                    styles.optionsContainer,
                    {
                      borderColor: this.checkQueSelected(itm, item?.id)
                        ? "black"
                        : "grey",
                    },
                  ]}
                  testID={`optionSelectButton${index}`}
                >
                  <Image
                    source={
                      this.checkQueSelected(itm, item?.id)
                        ? checkCircle
                        : circle
                    }
                    style={[
                      styles.emptybtn,
                      {
                        tintColor: this.checkQueSelected(itm, item?.id)
                          ? "black"
                          : "grey",
                      },
                    ]}
                  />
                  <Text
                    style={[
                      styles.textbtn,
                      {
                        color: this.checkQueSelected(itm, item?.id)
                          ? "black"
                          : "grey",
                      },
                    ]}
                  >
                    {itm}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </View>
      );
    };
    // Customizable Area End

    return (
      // Customizable Area Start
      <View style={styles.sectionContainer}>
        <CutomStepIndicator
          itm={this.state.questionApiData}
          status={this.state.currentIndex + 1}
        />
        <View>
          <Image source={questionsImg} style={styles.questionImg} />
        </View>

        <FlatList
          data={this.state.questionApiData}
          ref={this.slideRef}
          renderItem={({ item, index }) => this.renderItem({ item, index })}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          horizontal
          onViewableItemsChanged={this._onViewableItemsChanged}
          viewabilityConfig={this._viewabilityConfig}
          pagingEnabled
          scrollEnabled={false}
          testID="questionDataList"
        />

        <View style={styles.arrowsContainer}>
          <View>
            {this.state.currentIndex !== 0 && (
              <TouchableOpacity
                style={styles.leftAerrow}
                onPress={() => this.onPressLeft()}
                testID="testLeftArrow"
              >
                <Image source={backwardArrow} style={styles.aerrowStyle} />
              </TouchableOpacity>
            )}
          </View>
          <View>
            <TouchableOpacity
              style={styles.rightAerrow}
              onPress={() => this.onPressRight()}
              testID="testRightArrow"
            >
              <Image source={forwardArrow} style={styles.aerrowStyle} />
            </TouchableOpacity>
          </View>
        </View>
        {this.state.isLoder && <CustomLoader isLoading={this.state.isLoder} />}
      </View>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  questionText: {
    fontSize: scaledSize(20),
    paddingHorizontal: 20,
    marginTop: 10,
    color: "#000",
  },
  textbtn: {
    color: "grey",
    fontSize: scaledSize(14),
    fontFamily: style.regular,
    width: deviceWidth - scaledSize(90),
    paddingHorizontal: scaledSize(8),
    display: "flex",
  },
  optionsContainer: {
    borderColor: "grey",
    borderWidth: scaledSize(1),
    alignItems: "center",
    alignSelf: "center",
    marginTop: scaledSize(15),
    borderRadius: scaledSize(15),
    display: "flex",
    flexDirection: "row",
    paddingVertical: scaledSize(10),
    width: deviceWidth - scaledSize(40),
  },
  questionHeading: {
    marginLeft: 20,
    fontSize: scaledSize(16),
    fontFamily: style.regular,
    color: "#000",
    marginTop: 10,
  },

  emptybtn: {
    borderWidth: scaledSize(1),
    marginLeft: scaledSize(12),
    resizeMode: "contain",
    width: scaledSize(24),
    height: scaledSize(24),
  },
  sectionContainer: {
    backgroundColor: "#fff",
    position: "relative",
    height: "100%",
  },
  arrowsContainer: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: deviceWidth - 40,
    marginVertical: scaledSize(30),
    borderRadius: 15,
  },
  questionImg: {
    marginVertical: scaledSize(30),
    alignSelf: "center",
    height: scaledSize(200),
    width: scaledSize(200),
  },
  rightAerrow: {
    alignSelf: "flex-end",
    alignContent: "flex-end",
  },
  leftAerrow: {
    alignSelf: "flex-start",
    alignContent: "flex-start",
  },
  aerrowStyle: {
    width: 50,   
    height: 50,
  },
});
// Customizable Area End

// Customizable Area End
