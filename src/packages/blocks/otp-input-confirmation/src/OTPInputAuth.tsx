import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Platform
} from "react-native";
import { backIcon } from "../../mobile-account-registration/src/assets";
import { scaledSize } from "framework/src/Utilities";
import { style } from "../../../components/src/CustomFonts";
// Customizable Area End

import OTPInputAuthController, { Props } from "./OTPInputAuthController";

export default class OTPInputAuth extends OTPInputAuthController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderOTPContainer = () => {
    const inputs = Array(this.state.noOfOtpBoxes).fill(0);
    return (
      <View style={styles.inputBoxContainer}>
        {inputs.map((i, j) => (
          <View key={j}>
            <TextInput
              testID={"textInput" + j}
              placeholder=""
              keyboardType="numeric"
              onChangeText={v => {
                this.focusNext(j, v)
              }}
              onKeyPress={e => this.focusPrevious(e.nativeEvent.key, j)}
              ref={ref => (this.state.otpTextInput[j] = ref)}
              value={this.state.otp[j]}
              style={[styles.inputBox, {
                borderColor: this.state.otpError ? style.red : style.bColor,
              }]}
              autoFocus={this.state.otpTextInput[0]}
            />
          </View>
        ))}
      </View>
    );
  };
  // Customizable Area End
  render() {
    // Customizable Area Start
    let phone = this.full_phone_number;
    // Customizable Area End
    return (
      //Merge Engine DefaultContainer
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          {/* Customizable Area Start */}
          {/* Merge Engine UI Engine Code */}
          <View style={styles.mainContainer}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('EmailAccountLoginBlock')}
              testID="userNavigate"
            >
              <Image
                source={backIcon}
                resizeMode={"contain"}
                style={styles.backIconStyle}
              />
            </TouchableOpacity>
            <Text style={styles.titleWhySignUp}>{this.headerText}</Text>
            <Text style={styles.titleOtpInfo}>
              {this.subHeaderText}
              {"\n"}{"(+91)"}{" "}{phone}
            </Text>
            <View style={styles.areaMobileContainer}>
              <View style={{ paddingTop: 10 }}>
                {this.renderOTPContainer()}
              </View>
              <TouchableOpacity onPress={() => console.log()
              } style={{ paddingVertical: 10 }}>
                <Text style={styles.resendStyle}>{"Resend code"}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              testID={"btnSubmitOTP"}
              // disabled={this.state.otp.length != 4}
              onPress={() => this.onNext()}
              style={styles.viewContainer}
            >
              <Text style={styles.buttonTextStyle}>{"Continue"}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { this.submitOtp() }}
              testID="submitOtp" />
            <TouchableOpacity {...this.btnSubmitOTPProps} testID="btnSubmitOTPProps" />
          </View>
          {/* Customizable Area End */}
          {/* Merge Engine UI Engine Code */}
        </TouchableWithoutFeedback>
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
    backgroundColor: "#fff"
  },
  backIconStyle: {
    width: 30,
    height: 20
  },
  titleWhySignUp: {
    marginVertical: 15,
    textAlign: "center",
    ...style.header24Meduim
  },
  titleOtpInfo: {
    marginBottom: 20,
    textAlign: "center",
    marginTop: 5,
    ...style.subHeader14Reg
  },
  resendStyle: {
    paddingVertical: 5,
    fontSize: style.f12,
    fontFamily: style.regular,
    textAlign: "center",
    color: "#000",
  },
  mainContainer: {
    flex: 1,
  },
  areaMobileContainer: {
    flex: 1,
    justifyContent: "flex-start",
    height: scaledSize(420),
  },
  viewContainer: {
    marginVertical: 40,
    alignSelf: "center",
    justifyContent: "center",
    ...style.btnStyle
  },
  buttonTextStyle: {
    textAlign: "center",
    ...style.btnTextStyle
  },
  inputBoxContainer: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scaledSize(20),
    flexDirection: "row",
  },
  inputBox: {
    justifyContent: "center",
    alignSelf: "center",
    borderWidth: scaledSize(1),
    fontFamily: style.meduim,
    fontSize: scaledSize(18),
    color: style.black,
    alignItems: "center",
    marginHorizontal: scaledSize(10),
    height: scaledSize(50),
    width: scaledSize(50),
    textAlign: "center",
    borderRadius: scaledSize(12),
  },
  // container: {
  //   flex: 1,
  //   // height:scaledSize(700),
  //   // padding: 16,
  //   // width: Platform.OS === "web" ? "75%" : "100%",
  //   // marginLeft: "auto",
  //   // marginRight: "auto",
  // },
});
// Customizable Area End
