//@ts-nocheck
// Customizable Area Start
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { leftbutton } from "./assets";
import identifyYourSelfController, {
  Props
} from "./IdentifyYourSelfController";
import { scaledSize } from "framework/src/Utilities";
import CustomLoader from "../../../components/src/CustomLoader";
import { verticalScale } from "../../../components/src/Scale";
import { style } from "../../../components/src/CustomFonts";
// Customizable Area End

export default class IdentifyScreen1 extends identifyYourSelfController {
  constructor(props: Props) {
    // Customizable Area Start
    super(props);
    // Customizable Area End
  }

  render() {
    const found1 = this.state.currentAns.some(
      (el) => el.option === this.state.currentQuestion?.option1
    );
    const found2 = this.state.currentAns.some(
      (el) => el.option === this.state.currentQuestion?.option2
    );
    const found3 = this.state.currentAns.some(
      (el) => el.option === this.state.currentQuestion?.option3
    );
    const found4 = this.state.currentAns.some(
      (el) => el.option === this.state.currentQuestion?.option4
    ); 

    // Customizable Area Start
    

    return (
      //Required for all blocks
      <>
        <SafeAreaView style={{ flex: 1 }}>
          {this.state.count ? (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: verticalScale(10),
              }}
            >
              <TouchableOpacity
                testID="onPrivousFunCall"
                style={{ marginLeft: 30 }}
                onPress={() => this.priousFunction(this.state.currentQuestion)}
              >
                <Image source={leftbutton} style={{ height: 19, width: 11 }} />
              </TouchableOpacity>

              <View></View>
            </View>
          ) :
            <TouchableOpacity
              testID="onPrivousFun"
              style={{ marginLeft: 30, marginVertical: scaledSize(10), }}
              onPress={() => this.props.navigation.goBack()}
            >
              <Image source={leftbutton} style={{ height: 19, width: 11 }} />
            </TouchableOpacity>}
          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
            <View>
              <Text style={styles.IdentifyText}>Identify Yourself</Text>
              <Text style={styles.IdentifySubText}>
                Lorem ipsum dolor sit amet,consectetur elit.Nam accumsan
                hendrerit
              </Text>
            </View>

            <View>
              <View style={styles.myselfContainer}>
                <Text style={styles.myselfText}>
                  {this.state.currentQuestion?.question}
                </Text>
              </View>
              <TouchableOpacity
                testID="option1"
                onPress={() =>
                  this.handleCheckOptions(this.state.currentQuestion?.option1)
                }
                style={[
                  found1 ? styles.selectedOpContainer : styles.optionsContainer,
                ]}
              >
                <View style={[found1 ? styles.selectedEmt : styles.emptybtn]}>
                  <Text style={styles.circleTextStyle}>
                     {this.getCurrentAns("get1")}
                  </Text>
                </View>

                <Text 
                 style={[styles.selectedBtn , {color:this.getColor(found1)} ]}
                >
                  {this.state.currentQuestion?.option1}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.handleCheckOptions(this.state.currentQuestion?.option2)
                }
                style={[
                  found2 ? styles.selectedOpContainer : styles.optionsContainer,
                ]}
                testID="option2"
              >
                <View style={[found2 ? styles.selectedEmt : styles.emptybtn]}>
                  <Text style={styles.circleTextStyle}>
                     { this.getCurrentAns("get2")}
                  </Text>
                </View>

                <Text style={[styles.selectedBtn , {color:this.getColor(found2)} ]}>
                  {this.state.currentQuestion?.option2}
                </Text>

              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.handleCheckOptions(this.state.currentQuestion?.option3)
                }
                style={[
                  found3 ? styles.selectedOpContainer : styles.optionsContainer,
                ]}
                testID="option3"
              >
                <View style={[found3 ? styles.selectedEmt : styles.emptybtn]}>
                  <Text style={styles.circleTextStyle}>
                     {this.getCurrentAns("get3")}
                  </Text>
                </View>

                <Text style={[styles.selectedBtn , {color:this.getColor(found3)} ]}>
                  {this.state.currentQuestion?.option3}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.handleCheckOptions(this.state.currentQuestion?.option4)
                }
                style={[
                  found4 ? styles.selectedOpContainer : styles.optionsContainer,
                ]}
                testID="option4"
              >
                <View style={[found4 ? styles.selectedEmt : styles.emptybtn]}>
                  <Text style={styles.circleTextStyle}>
                     {this.getCurrentAns("get4")}
                  </Text>
                </View>

                <Text style={[styles.selectedBtn , {color:this.getColor(found4)} ]}>
                  {this.state.currentQuestion?.option4}
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  marginTop: 20,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  alignSelf: "center",
                  width: "90%",
                }}
              >
                <View data-elementId="view_Line" style={styles.view_Line} />
                <Text
                  data-elementId="textlabel_TermsTextCopy2"
                  style={styles.titleOr}
                >
                  OR
                </Text>
                <View
                  data-elementId="view_LineCopy"
                  style={styles.view_LineCopy}
                />
              </View>
              <TouchableOpacity
                onPress={() => this.handleNoPreference1()}
                testID="noPreference"
                style={[
                  this.state.noPreference1
                    ? styles.selectedOpContainer
                    : styles.optionsContainer,
                ]}
              >
                <View
                  style={[
                    this.state.noPreference1
                      ? styles.selectedEmt
                      : styles.emptybtn,
                  ]}
                >
                  <Text style={styles.circleTextStyle}>
                    {this.state.noPreference1 ? "✔" : ""}
                  </Text>
                </View>

                <Text
                  style={[styles.selectedBtn , {color:this.getColor(this.state.noPreference1)} ]}
                >
                  No Preference
                </Text>
              </TouchableOpacity>

              {this.state.count + 1 == 2 ? (
                <Text style={styles.IdentifySubText1}>
                  Don't Know about your primary love languages? {"\n"} Just
                  choose your top 3.
                </Text>
              ) : null}
            </View>
          </ScrollView>
          <TouchableOpacity
            testID="onContinue"
            style={styles.continueBtn}
            onPress={() => {
              this.countFunction();
            }}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
          {this.state.isLoading && <CustomLoader />}
        </SafeAreaView>
      </>
    );
    // Customizable Area End
  }
}
// Customizable Area Start
const styles = StyleSheet.create({
  continueBtn: {
    width: "90%",
    bottom: 30,
    justifyContent: "center",
    alignItems: "center",
    height: scaledSize(45),
    borderRadius: scaledSize(10),
    backgroundColor: style.black,
    alignSelf: "center",
  },
  continueText: {
    textAlign: "center",
    ...style.btnTextStyle,
  },
  IdentifyText: {
    textAlign: "center",
    marginTop: scaledSize(20),
    fontSize: scaledSize(24),
    color: "#000",
    fontFamily: style.meduim,
  },
  IdentifySubText: {
    textAlign: "center",
    marginTop: scaledSize(10),
    marginHorizontal: scaledSize(25),
    fontSize: scaledSize(14),
    color: "#000",
    fontFamily: style.meduim,
  },
  IdentifySubText1: {
    textAlign: "center",
    marginTop: 10,
    fontSize: scaledSize(14),
    color: style.gray,
    fontFamily: style.meduim,
  },
  myselfText: {
    marginLeft: 25,
    fontSize: scaledSize(16),
    fontFamily: style.meduim,
    color: style.black,
  },
  myselfContainer: {
    marginTop: 15,
  },
  selectedEmt: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: scaledSize(20),
    height: scaledSize(20),
    borderRadius: scaledSize(10),
    borderWidth: scaledSize(1),
    borderColor: style.black,
    marginLeft: scaledSize(20),
  },
  emptybtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: scaledSize(20),
    height: scaledSize(20),
    borderRadius: scaledSize(10),
    borderWidth: scaledSize(1),
    borderColor: style.gray,
    marginLeft: scaledSize(20),
    // marginTop: 8,
  },
  circleTextStyle: {
    fontSize: scaledSize(10),
    color: style.black,
    fontFamily: style.meduim,
    alignSelf: "center",
  },
  selectedOpContainer: {
    height: scaledSize(45),
    width: "90%",
    borderColor: style.black,
    borderWidth: 2,
    borderRadius: scaledSize(15),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: scaledSize(15),
  },
  optionsContainer: {
    height: scaledSize(45),
    width: "90%",
    borderColor: style.gray,
    borderWidth: 2,
    borderRadius: scaledSize(15),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: scaledSize(15),
  },
  textbtn: {
    color: style.gray,
    fontSize: scaledSize(16),
    fontFamily: style.meduim,
    marginLeft: scaledSize(15),
  },
  selectedBtn: {
    fontSize: scaledSize(16),
    fontFamily: style.meduim,
    marginLeft: scaledSize(15),
  },
  view_Line: {
    width: "42%",
    height: 1,
    borderColor: "rgba(151, 151, 151, 1)",
    borderWidth: 1,
  },
  view_LineCopy: {
    width: "42%",
    height: 1,
    borderColor: "rgba(151, 151, 151, 1)",
    borderWidth: 1,
  },
  titleOr: {
    fontSize: scaledSize(12),
    fontFamily: style.regular,
    color: "rgba(0, 0, 0, 1)",
    textAlign: "center",
  },
});
// Customizable Area End
