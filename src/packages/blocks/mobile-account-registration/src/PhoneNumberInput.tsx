import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from "react-native";

import { backIcon } from "./assets";
import CustomLoader from "../../../components/src/CustomLoader";
import { style } from "../../../components/src/CustomFonts";
import { scaledSize } from "framework/src/Utilities";
// Customizable Area End

import PhoneNumberInputController, {
  Props,
} from "./PhoneNumberInputController";

export default class PhoneNumberInput extends PhoneNumberInputController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    // Customizable Area Start
    const borderColor = (item: boolean, itmLength: any) =>
      this.onItemClick(item, itmLength)

    return (
      <View style={styles.containerMobile}>
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          testID="Background"
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          <View style={styles.mainContainer}>
            <TouchableOpacity testID="backBtn"
              onPress={() => this.backBtnClick()}>
              <Image
                source={backIcon}
                resizeMode={"contain"}
                style={styles.backIconStyle}
              />
            </TouchableOpacity>
            <Text style={styles.titleWhySignUp}>{this.bodyText}</Text>
            <Text style={styles.titleOtpInfo}>{this.labelInfo}</Text>

            <View style={styles.areaMobileContainer}>
              {/* <View style={styles.scrollViewContainer}>
                <CountryCodeSelector
                  navigation={this.isPlatformWeb() ? null : navigation}
                  id={"CountryCodeSelector"}
                  placeHolder={this.placeHolderSelectCountry}
                  style={styles.bgRectBorder}
                  disable={false}
                  value={this.getState("CountryCodeSelector")}
                />
              </View> */}
              <Text style={styles.mobileLabelStyle}>{"Mobile Number"}</Text>
              <View
                style={[
                  styles.bgMobileInputContainer,
                  {
                    borderColor: this.state.mobileNoError
                      ? style.red
                      : borderColor(
                        this.state.isFocused,
                        this.state.mobileNo.length
                      ),
                  },
                ]}
              >
                <Text
                  style={[
                    styles.conuntryCodeStyle,
                    {
                      color: borderColor(
                        this.state.isFocused,
                        this.state.mobileNo.length
                      ),
                    },
                  ]}
                >
                  {"+91 | "}
                </Text>
                <TextInput
                  testID="txtInputPhoneNumber"
                  placeholder={this.placeHolderMobile}
                  style={styles.bgMobileInput}
                  onChangeText={(text) =>
                    this.changeState("txtInputPhoneNumber", text)
                  }
                  autoCompleteType="tel"
                  keyboardType="phone-pad"
                  value={String(this.getState("txtInputPhoneNumber"))}
                  onBlur={() => this.onBlur()}
                  onFocus={() => this.onFocus()}
                  maxLength={10}
                />
              </View>
              {!!this.state.mobileNoError && (
                <Text style={styles.inputErrorTextStyle}>
                  {this.state.mobileNoError}
                </Text>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity
          testID={"btnSendOtp"}
          onPress={() => this.processOnClickMessage("btnSendOtp")}
          style={styles.viewContainer}
        >
          <Text style={styles.buttonTextStyle}>{this.btnTxtSendOtp}</Text>
        </TouchableOpacity>
        {!!this.state.isLoder && (
          <CustomLoader isLoading={this.state.isLoder} />
        )}
      </View>
    );
    // Customizable Area End
  }
}

const styles = StyleSheet.create(
  {
    // Customizable Area Start
    containerMobile: {
      flex: 1,
      padding: 16,
      width: "100%",
      backgroundColor: "#fff",
    },
    backIconStyle: {
      width: 30,
      height: 20,
    },
    titleWhySignUp: {
      marginVertical: 15,
      textAlign: "center",
      ...style.header24Meduim,
    },
    titleOtpInfo: {
      marginBottom: 20,
      textAlign: "center",
      marginTop: 5,
      ...style.subHeader14Reg,
    },
    inputErrorTextStyle: {
      color: style.red,
      marginLeft: scaledSize(8),
      marginTop: scaledSize(4),
    },
    mainContainer: {
      flex: 1,
    },
    mobileLabelStyle: {
      fontSize: style.f16,
      fontFamily: style.meduim,
      color: style.black,
      marginBottom: 10,
    },
    conuntryCodeStyle: {
      fontFamily: style.meduim,
      fontSize: scaledSize(16),
      paddingLeft: 15,
      color: "#000",
    },
    bgMobileInput: {
      width: "88%",
      ...style.inputTextStyle,
    },
    bgMobileInputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderRadius: scaledSize(12),
      height: scaledSize(48),
      width: "100%",
    },
    bgRectBorder: {
      borderWidth: 1,
      borderColor: "#767676",
      borderRadius: 2,
      marginBottom: 10,
      padding: 10,
      zIndex: 999,
    },
    viewContainer: {
      marginVertical: scaledSize(10),
      alignSelf: "center",
      justifyContent: "center",
      ...style.btnStyle,
    },
    buttonTextStyle: {
      textAlign: "center",
      ...style.btnTextStyle,
    },
    scrollViewContainer: {
      flex: 1,
    },
    areaMobileContainer: {
      flex: 1,
      justifyContent: "flex-start",
    },
  }
  // Customizable Area End
);
