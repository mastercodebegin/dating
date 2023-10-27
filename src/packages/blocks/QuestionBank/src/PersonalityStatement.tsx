import React from "react";
// Customizable Area Start
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import { backIcon } from "../../mobile-account-registration/src/assets";
import PersonalityStatementController, {
  Props,
} from "./PersonalityStatementController";
import { deviceWidth, scaledSize } from "framework/src/Utilities";
//@ts-ignore
import { SliderBox } from "react-native-image-slider-box";
import CustomLoader from "../../../components/src/CustomLoader";
import { style } from "../../../components/src/CustomFonts";

export default class PersonalityStatement extends PersonalityStatementController {
  imgData: any[] = [];
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    // Customizable Area Start
    this.imgData = this.props.navigation.state.params.imgData;
    const imgUrls = this.imgData.filter((data: any) => data.uri !== "Emptyimage")
      .map((data: any) => data.uri);
    console.log("imgUrls", imgUrls);
    // Merge Engine - render - Start
    return (
      <KeyboardAvoidingView
        behavior={"padding"}
        keyboardVerticalOffset={this.isPlatformiOS() ? 50 : -scaledSize(55)}
        style={styles.keyboardPadding}
      >
        <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
          <TouchableWithoutFeedback
            testID={"Background"}
            onPress={() => {
              this.hideKeyboard();
            }}
          >
            <View style={styles.keyboardPadding}>
              <TouchableOpacity testID="btnBack" onPress={() => this.goBack()}>
                <Image
                  source={backIcon}
                  resizeMode={"contain"}
                  style={styles.backIconStyle}
                />
              </TouchableOpacity>
              <View style={styles.mainContainer}>
                <Text
                  testID="labelBody" //Merge Engine::From BDS
                  style={styles.headerTitle} //UI Engine::From Sketch
                >
                  {"Your Personality \nStatement"}
                </Text>
                <View style={styles.flatlistContainer}>
                  <SliderBox
                    images={imgUrls}
                    testID="imageSlider"
                    autoplay
                    dotColor="#FFF"
                    inactiveDotColor="#90A4AE"
                    autoplayInterval={3000}
                    circleLoop
                    ImageComponentStyle={styles.imageStyle}
                  />
                </View>
                <TextInput
                  testID="txtInputBio" //Merge Engine::From BDS
                  value={this.state.userInfo}
                  onChangeText={(text) => this.setUserInputValue(text)}
                  style={styles.subHeader}
                  placeholder="write here about you"
                  multiline={true}
                  maxLength={200}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
        <View style={styles.btnBgStyle}>
          <TouchableOpacity
            testID={"btnSubmitOTP"}
            // {...this.btnSubmitOTPProps}
            onPress={() => this.doButtonPressed(this.imgData)}
            style={styles.viewContainer}
          >
            <Text style={styles.buttonTextStyle}>{"Share"}</Text>
          </TouchableOpacity>
        </View>
        {this.state.isLoder && <CustomLoader isLoading={this.state.isLoder} />}
      </KeyboardAvoidingView>
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
  keyboardPadding: { flex: 1 },
  backIconStyle: {
    width: 30,
    height: 20,
    alignSelf: "flex-start",
  },
  congratsImageStyle: {
    width: "100%",
    height: scaledSize(220),
    resizeMode: "cover",
    borderRadius: 12,
    alignSelf: "center",
  },
  headerTitle: {
    marginVertical: 10,
    fontSize: scaledSize(22),
    fontFamily: style.regular,
    textAlign: "center",
    color: "#000",
  },
  subHeader: {
    fontSize: scaledSize(18),
    color: "#000",
    marginVertical: 20,
    height: scaledSize(120),
    padding: 15,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderWidth: 1,
    borderRadius: 12,
    textAlignVertical: "top",
  },
  mainContainer: {
    paddingHorizontal: 15,
  },
  imageStyle: {
    width: deviceWidth - 64,
    height: scaledSize(220),
    resizeMode: "cover",
    borderRadius: 12,
    alignSelf: "center",
    paddingHorizontal: 10,
  },
  btnBgStyle: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingBottom: 15,
    paddingTop: 10,
  },
  viewContainer: {
    marginVertical: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    ...style.btnStyle
  },
  buttonTextStyle: {
    textAlign: "center",
    ...style.btnTextStyle
  },
  flatlistContainer: {
    height: scaledSize(220),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    width: deviceWidth - 64,
  },
  child: {
    width: deviceWidth - 64,
    height: scaledSize(220),
  },
});
// Customizable Area End
