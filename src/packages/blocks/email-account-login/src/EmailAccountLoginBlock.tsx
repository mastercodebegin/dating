import React from "react";
// Customizable Area Start
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  ScrollView,
} from "react-native";
import {
  brand,
  google,
  Email,
  unlock,
  imgPasswordInVisible,
  imgPasswordVisible,
} from "./assets";

//@ts-ignore
import { scaledSize } from "framework/src/Utilities";
import CustomLoader from "../../../components/src/CustomLoader";
import { style } from "../../../components/src/CustomFonts";
import { GoogleSignin } from "@react-native-community/google-signin";
// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import EmailAccountLoginController, {
  Props,
} from "./EmailAccountLoginController";

export default class EmailAccountLoginBlock extends EmailAccountLoginController {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    // Customizable Area Start
      GoogleSignin.configure({
        scopes: ["profile", "email"],
        offlineAccess: false,
        webClientId: '898208073334-er5oihu0tfce5am1hb41asi0kk8cqnhf.apps.googleusercontent.com',
      });
    // Customizable Area End
  }

  render() {
    // Customizable Area Start

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{paddingHorizontal: scaledSize(20) }}
          showsVerticalScrollIndicator={false}
          >
          <Image
            data-elementId="image_LogoImage"
            style={styles.brand}
            source={brand}
          />

          <Text style={styles.titleWelcomeBack}>Welcome Back!</Text>
          <Text style={styles.titleContinue}>Login to Continue</Text>
          <View
            style={[
              styles.bgPasswordContainer,

              {
                width: scaledSize(330),
                borderColor: this.onStyle(),
              },
            ]}
          >
            <Image
              data-elementId={"btnPasswordShowHideImage"}
              style={[styles.imgPasswordShowhide, {tintColor: this.onSyleEmailIconColour()}]}
              source={Email}
            />
            <TextInput
              onFocus={() =>
                this.setState({ isEmailFocus: true, emailError: "" })
              }
              onBlur={() => this.emailBlur()}
              data-elementId="txtInputEmail"
              style={styles.bgMobileInput}
              placeholder="Enter email id"
              onChangeText={(e) =>
                this.setState({ email: e.trim(), emailError: "" })
              }
              value={this.state.email}
            />
          </View>
          {!!this.state.emailError && (
            <Text style={styles.inputErrorTextStyle}>
              {this.state.emailError}
            </Text>
          )}

          <View
            style={[
              styles.bgPasswordContainer,
              {
                width: scaledSize(330),
                borderColor: this.onStylePassword()
              },
            ]}
          >
            <Image
              data-elementId={"btnPasswordShowHideImage"}
              style={[styles.imgPasswordShowhide, { tintColor: this.onSyleTintColour()}]}
              source={unlock}
            />
            <TextInput
              onFocus={() =>
                this.setState({ isPasswordFocus: true, errorPassword: "" })
              }
              onBlur={() => this.passwordBlur()}
              data-elementId="txtInputPassword"
              style={styles.bgPasswordInput}
              placeholder={this.state.placeHolderPassword}
              {...this.txtInputPasswordProps}
              value={this.state.password}
              secureTextEntry={Boolean(this.state.enablePasswordField)}
            />

            <TouchableOpacity
              data-elementId={"btnPasswordShowHide"}
              style={styles.passwordShowHide}
              onPress={() =>
                this.setState({
                  enablePasswordField: !this.state.enablePasswordField,
                })
              }
              {...this.btnPasswordShowHideProps}
            >
              <Image
                data-elementId={"btnPasswordShowHideImage"}
                source={
                  this.state.enablePasswordField
                    ? imgPasswordInVisible
                    : imgPasswordVisible
                }
                style={[
                  styles.imgPasswordShowhideeye,
                  {
                    tintColor: this.onSyleTintColour()
                  
                  },
                ]}
                // {...this.btnPasswordShowHideImageProps}
              />
            </TouchableOpacity>
          </View>
          {!!this.state.errorPassword && (
            <Text style={styles.inputErrorTextStyle}>
              {this.state.errorPassword}
            </Text>
          )}

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity
              style={{ marginBottom: 16, marginTop: 10 }}
              data-elementId={"btnForgotPassword"}
              onPress={this.handleforgotPass}
            >
              <Text
                // data-elementId={"btnForgotPassword"}
                style={styles.forgotPassword}

                // {...this.btnForgotPasswordProps}
              >
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            data-elementId="button_ButtonOnlyTextCopy"
            onPress={this.emailLogIn}
            style={styles.ButtonOnlyTextCopyButton}
          >
            <Text
              data-elementId="TEXTCOLORSTYLE"
              style={styles.TEXTCOLORSTYLEText}
            >
              Log In
            </Text>
          </TouchableOpacity>

          <View
            style={{
              marginTop: 20,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <View data-elementId="view_Line" style={[styles.view_Line]} />
            <Text
              data-elementId="textlabel_TermsTextCopy2"
              style={styles.titleOr}
            >
              OR
            </Text>
            <View
              data-elementId="view_LineCopy"
              style={[styles.view_LineCopy]}
            />
          </View>
          <TouchableOpacity
            data-elementId="testGoodleLoginButton"
            onPress={() => this.googleLogin()}
            style={styles.googleIconStyle} >
            <Image
              data-elementId="image_Group_group4Copy"
              style={styles.image_Group_group4CopyImage}
              source={google}
            />
          </TouchableOpacity>
          <View
            style={{
              marginTop: 15,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View>
              <Text
                data-elementId="attrbuted_textlabel_TermsTextCopy"
                style={styles.textlabel_TermsTextCopyText2}
              >
                Don’t have an account?
              </Text>
            </View>
            <TouchableOpacity
              onPress={this.navigateFunction}
              data-elementId="navigateFunction"
            >
              <Text
                data-elementId="attrbuted_textlabel_TermsTextCopy"
                style={styles.textlabel_TermsTextCopyText3}
              >
                {" "}
                Sign Up
              </Text>
              {/* </View> */}
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={()=>this.callUnusedFunctions()} data-elementId='unusedFunction'/>
        </ScrollView>
        {this.state.isLoder && <CustomLoader isLoading={this.state.isLoder} />}
      </SafeAreaView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  brand: { 
    height: scaledSize(90),
    width: scaledSize(90),
    alignSelf: "center",
    marginVertical: scaledSize(15),
    resizeMode: "contain",
    marginTop: scaledSize(70),
  },
  titleOr: {
    color: "rgba(0, 0, 0, 1)",
    textAlign: "center",
    fontFamily: style.regular,
  },
  image_Group_group4CopyImage: {
    width: 40,
    height: 40,
    alignSelf: "center",
    resizeMode: "contain",
  },
  googleIconStyle: {
    width: scaledSize(40),
    height: scaledSize(40),
    borderRadius: scaledSize(10),
    alignSelf: "center",
    marginTop: 15,
    borderWidth: 1,
    borderColor: style.gray2,
  },
  textlabel_TermsTextCopyText2: {
    position: "relative",
    opacity: 1,
    backgroundColor: "transparent",
    includeFontPadding: false,
    padding: 0,
    color: "rgba(29, 30, 44, 1)",
    textAlign: "center",
    textAlignVertical: "top",
    fontFamily: style.regular,
    fontSize: scaledSize(14),
  },
  textlabel_TermsTextCopyText3: {
    height: 19,
    opacity: 1,
    backgroundColor: "transparent",
    fontWeight: "bold",
    includeFontPadding: false,
    padding: 0,
    color: "rgba(28, 27, 31, 1)",
    textAlign: "center",
    textAlignVertical: "top",
    fontFamily: style.bold,
    fontSize: scaledSize(14),
  },
  ButtonOnlyTextCopyButton: {
  ...style.btnStyle,
  justifyContent: "center",
  alignItems: "center",
  },
  TEXTCOLORSTYLEText: {
    ...style.btnTextStyle,
    includeFontPadding: false,
    color: style.white,
    textAlign: "center",
  },
  view_Line: {
    width: 130,
    height: 1,
    opacity: 1,
    borderColor: "rgba(151, 151, 151, 1)",
    borderRadius: 0,
    borderWidth: 1,
  },
  view_LineCopy: {
    width: 130,
    height: 1,
    opacity: 1,
    borderColor: "rgba(151, 151, 151, 1)",
    borderRadius: 0,
    borderWidth: 1,
  },
  titleContinue: {
    ...style.headerStyle,
    textAlign: "center",
    marginVertical: 8,
    color: "#000000",
    fontWeight: "800",
  },
  titleWelcomeBack: {
    fontSize: scaledSize(18),
    fontFamily: style.regular,
    textAlign: "center",
    marginVertical: 8,
    color: "#000000",
  },
  bgMobileInput: {
    flexDirection: "row",
    ...style.inputTextStyle,
    textAlign: "left",
    backgroundColor: "#00000000",
    includeFontPadding: true,
    flex: 1,
    paddingRight: 10,
  },
  bgPasswordInput: {
    flex: 1,
    ...style.inputTextStyle,
    textAlign: "left",
    backgroundColor: "#00000000",
    minHeight: 40,
    includeFontPadding: true,
    color: "#000000",
  },
  passwordShowHide: {
    alignSelf: "center",
  },
  bgPasswordContainer: {
    flexDirection: "row",
    backgroundColor: "#00000000",
    alignItems: "center",
    marginTop: 20,
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 15,
    paddingLeft: 5,
    borderWidth: 1,
    alignSelf: "center",
    flex: 1,
  },
  imgPasswordShowhide: {
    width: 20,
    height: 20,
    marginHorizontal: 10,
    resizeMode: "contain",
  },
  imgPasswordShowhideeye: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginRight: 20,
  },
  forgotPassword: {
    color: "#000",
    fontSize: scaledSize(12),
    fontFamily: style.regular,
    marginBottom: 10,
    opacity: 1,
    textDecorationLine: "underline",
    textDecorationColor: "#000",
  },
  inputErrorTextStyle: {
    ...style.erroTextStyle,
    textAlign: "left",
    color: style.red,
  },
});

// Customizable Area End