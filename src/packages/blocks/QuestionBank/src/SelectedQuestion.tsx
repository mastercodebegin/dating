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
import SelectedQuestionController from "./SelectedQuestionController";
import {
  backwardArrow,
  forwardArrow,
  checkCircle,
  circle,
  qestionImgLevel2,
} from "./assets";
import CutomStepIndicator from "../../../components/src/CutomStepIndicator";
import CustomLoader from "../../../components/src/CustomLoader";
import { deviceWidth, scaledSize } from "../../../framework/src/Utilities";
import { style } from "../../../components/src/CustomFonts";
// Customizable Area End

export default class SelectedQuestion extends SelectedQuestionController {
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
              Question {index + 1} of {this.state.questionApiData.length} 
            </Text>
          </View>
          <View>
            <Text style={styles.questionText}>
               {"What would you pick?"}
            </Text>
          </View>
          {!!item &&
            item?.attributes?.option?.map((itm: any, index: any) => {
              return (
                <TouchableOpacity
                  testID="btnOption"
                  onPress={() => this.onPressOption(itm, item?.id)}
                  style={[
                    styles.optionsContainer,
                    {
                      borderColor: this.checkQueSelected(itm, item?.id)
                        ? style.black
                        : style.bColor,
                    },
                  ]}
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
                          ? style.black
                          : style.bColor,
                      },
                    ]}
                  />
                  <Text
                    style={[
                      styles.textbtn,
                      {
                        color: this.checkQueSelected(itm, item?.id)
                          ? style.black
                          : style.bColor,
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
      <View style={[styles.sectionContainer]}>
        <CutomStepIndicator itm={this.state.questionApiData} status={this.state.currentIndex + 1} />
        <View>
          <Image
            source={qestionImgLevel2}
            style={styles.questionImg}
          />
        </View>
        <FlatList
          testID="flatListSelectedQuestion"
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
        />

        <View style={styles.arrowsContainer}>
          <View>
            {this.state.currentIndex !== 0 && (
              <TouchableOpacity
                testID="btnLeftArrow"
                style={styles.leftAerrow}
                onPress={() => this.onPressLeft()}
              >
                <Image
                  source={backwardArrow}
                  style={styles.aerrowStyle}
                />
              </TouchableOpacity>
            )}
          </View>
          <View>
            <TouchableOpacity
              testID="btnRightArrow"
              style={styles.rightAerrow}
              onPress={() => this.onPressRight()}
            >
              <Image
                source={forwardArrow}
                style={styles.aerrowStyle}
              />
            </TouchableOpacity>
          </View>
        </View>
       {this.state.isLoder &&<CustomLoader isLoading={this.state.isLoder} />}
      </View>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  optionsContainer: {
    paddingVertical: scaledSize(10),
    width: deviceWidth - scaledSize(40),
    borderColor: style.bColor,
    borderWidth: scaledSize(1),
    borderRadius: scaledSize(15),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: scaledSize(15),
  },
  questionHeading: { 
    marginTop: 10, 
    marginLeft: 20, 
    fontSize: scaledSize(16),
    fontFamily: style.regular,
    color: "#000",
  },
  questionText: {
    fontSize: scaledSize(20),
    fontFamily: style.regular,
    paddingHorizontal: 20,
    marginTop: 10,
    color: "#000",
  },
  emptybtn: {
    width: scaledSize(24),
    height: scaledSize(24),
    borderWidth: scaledSize(1),
    marginLeft: scaledSize(12),
    resizeMode: "contain",
  },
  textbtn: {
    color: style.bColor,
    fontSize: scaledSize(14),
    fontFamily: style.regular,
    width: deviceWidth - scaledSize(90),
    paddingHorizontal: scaledSize(8),
    display: "flex",
  },
  sectionContainer: {
    position: "relative",
    flex: 1,
    backgroundColor: "#fff",
  },
  questionImg: {
    alignSelf: "center",
    height: scaledSize(200),
    width: scaledSize(200),
    marginVertical: scaledSize(30),
  },
  arrowsContainer: {
    width: deviceWidth - 40,
    marginVertical: scaledSize(30),
    borderRadius: 15,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftAerrow: {
    alignContent: "flex-start",
    alignSelf: "flex-start",
  },
  rightAerrow: {
    alignContent: "flex-end",
    alignSelf: "flex-end",
  },
  aerrowStyle: {
    height: 50,
    width: 50,
  },
});
// Customizable Area End

// Customizable Area End
