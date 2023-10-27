/* eslint-disable react-native/no-inline-styles */
import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  TextInput
} from "react-native";
import { backIcon } from "../../mobile-account-registration/src/assets";
// Customizable Area End

import EmailOTPInputController, { Props } from "./EmailOTPInputController";
import CustomLoader from "../../../components/src/CustomLoader";
import { style } from "../../../components/src/CustomFonts";
import { scaledSize } from "framework/src/Utilities";

export default class EmailOTPInput extends EmailOTPInputController {
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
              placeholder=""
              testID="otpEnter"
              keyboardType="numeric"
              onChangeText={v => this.focusNext(j, v)}
              onKeyPress={e => this.focusPrevious(e.nativeEvent.key, j)}
              ref={ref => (this.state.otpTextInput[j] = ref)}
              value={this.state.otp[j]}
              style={[
                styles.inputBox,
                { borderColor: this.state.otpError ? style.red : style.bColor }
              ]}
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
    // Customizable Area End
    return (
      //Merge Engine DefaultContainer
      // Customizable Area Start
      <View style={styles.containerMobile}>
        <TouchableWithoutFeedback
          style={styles.mainContainer}
          testID="Background"
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          <View style={styles.mainContainer}>
            <TouchableOpacity onPress={() => this.onBack()}
            testID="goBack">
              <Image
                source={backIcon}
                resizeMode={"contain"}
                style={styles.backIconStyle}
              />
            </TouchableOpacity>
            <Text style={styles.titleWhySignUp}>{"Verify Your Email"}</Text>
            <Text style={styles.titleOtpInfo}>
              {`Please enter the 4 digit code sent to ${this.props.navigation?.state?.params?.email}`}
            </Text>
            <View style={styles.areaMobileContainer}>
              <View style={{ paddingTop: 10 }}>
                {this.renderOTPContainer()}
              </View>
              <TouchableOpacity onPress={() => console.log()
              } style={{ paddingVertical: 10 }} testID="resendOTP">
                <Text style={styles.resendStyle}>{"Resend code"}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              testID={"btnSubmitOTP"}
              // disabled={this.state.otp.length != 4}
              onPress={() => this.onPressContinue()}
              style={styles.viewContainer}
            >
              <Text style={styles.buttonTextStyle}>{"Continue"}</Text>
            </TouchableOpacity>
          </View>
          {/* Merge Engine UI Engine Code */}
        </TouchableWithoutFeedback>
        {!!this.state.isLoder && <CustomLoader isLoading={this.state.isLoder} />}
        <TouchableOpacity onPress={()=>this.focusNext(11,'2')} testID="focusNext"/>
      </View>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  containerMobile: {
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
    marginVertical: scaledSize(20),
    textAlign: "center",
    ...style.header24Meduim
  },
  titleOtpInfo: {
    marginBottom: scaledSize(20),
    marginHorizontal: scaledSize(30),
    textAlign: "center",
    ...style.subHeader14Reg
  },
  resendStyle: {
    paddingVertical: 5,
    fontSize: style.f12,
    fontFamily: style.regular,
    textAlign: "center",
    color: "#000"
  },
  mainContainer: {
    flex: 1
  },
  areaMobileContainer: {
    flex: 1,
    justifyContent: "flex-start"
  },
  viewContainer: {
    marginVertical: 10,
    alignSelf: "center",
    justifyContent: "center",
    ...style.btnStyle
  },
  buttonTextStyle: {
    textAlign: "center",
    ...style.btnTextStyle,
  },
  otpInputStyle: {
    height: 50,
    alignSelf: "center",
    marginTop: 20
  },
  inputBoxContainer: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scaledSize(20),
    flexDirection: "row"
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
});
// Customizable Area End
