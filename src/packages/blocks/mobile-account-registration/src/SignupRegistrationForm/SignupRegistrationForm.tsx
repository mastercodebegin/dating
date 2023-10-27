import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";

import {
  backIcon,
  checkBox,
  emailIcon,
  imgPasswordInVisible,
  imgPasswordVisible,
  logoImage,
  profileIcon,
  unCheckBox,
  unlockIcon,
} from "../assets";
// Customizable Area End

import SignupRegistrationController, {
  Props,
} from "./SignupRegistrationController";
import CustomLoader from "../../../../components/src/CustomLoader";
import { COLORS } from "framework/src/Globals";
import { scaledSize } from "framework/src/Utilities";
import { style } from "../../../../components/src/CustomFonts";

export default class SignupRegistrationForm extends SignupRegistrationController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    const { firstNameFocus, emailFocus, passwordFocus, reTypePasswordFocus } =
    this.state;
    const borderColor = (item: boolean, itmLength: any) =>
     this.onItemClick(item,itmLength)
    // Customizable Area Start
    return (
      <KeyboardAvoidingView
        behavior={this.isPlatformiOS() ? "padding" : undefined}
        style={styles.keyboardPadding}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          style={styles.container}
        >
          <TouchableWithoutFeedback
            testID={"Background"}
            onPress={() => {
              this.hideKeyboard();
            }}
          >
            <View style={{ padding: 16 }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Splashscreen")}
              >
                <Image
                  source={backIcon}
                  resizeMode={"contain"}
                  style={styles.backIconStyle}
                />
              </TouchableOpacity>
              <Image
                source={logoImage}
                resizeMode={"contain"}
                style={styles.logoImageStyle}
              />

              <Text style={styles.welcomeTextStyle}>{this.welcomeText}</Text>
              <Text style={styles.createAccTextStyle}>{this.creatAccText}</Text>

              <View
                style={[
                  styles.inputContainerStyle,
                  {
                    borderColor: this.state.firstNameError
                      ? style.red
                      : borderColor(
                          firstNameFocus,
                          this.state.firstName.length
                        ),
                  },
                ]}
              >
                <Image
                  source={profileIcon}
                  resizeMode={"contain"}
                  style={[
                    styles.inputIconStye,
                    {
                      tintColor: borderColor(
                        firstNameFocus,
                        this.state.firstName.length
                      ),
                    },
                  ]}
                />
                <TextInput
                  testID={"txtInputFirstName"}
                  style={styles.bgPasswordInput}
                  placeholder={this.labelFirstName}
                  onChangeText={(text) =>
                    this.changeState("txtInputFirstName", text)
                  }
                  onBlur={() => this.onBlur("firstNameFocuse")}
                  onFocus={() => this.onFocus("firstNameFocuse")}
                  value={this.state.firstName}
                  // secureTextEntry={Boolean(this.getState("txtInputFirstName"))}

                />
              </View>
              {!!this.state.firstNameError && (
                <Text style={styles.inputErrorTextStyle}>
                  {this.state.firstNameError}
                </Text>
              )}

              <View
                style={[
                  styles.inputContainerStyle,
                  {
                    borderColor: this.state.emailError
                      ? style.red
                      : borderColor(emailFocus, this.state.email.length),
                  },
                ]}
              >
                <Image
                  source={emailIcon}
                  resizeMode={"contain"}
                  style={[
                    styles.inputIconStye,
                    {
                      tintColor: borderColor(
                        emailFocus,
                        this.state.email.length
                      ),
                    },
                  ]}
                />
                <TextInput
                  testID={"txtInputEmail"}
                  style={styles.bgPasswordInput}
                  placeholder={this.labelEmail}
                  onChangeText={(text) =>
                    this.changeState("txtInputEmail", text)
                  }
                  keyboardType="email-address"
                  value={this.state.email}
                  onBlur={() => this.onBlur("emailFocuse")}
                  onFocus={() => this.onFocus("emailFocuse")}
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
                    borderColor: this.state.passwordError
                      ? style.red
                      : borderColor(
                          passwordFocus,
                          this.state.password.length
                        ),
                  },
                ]}
              >
                <Image
                  style={[
                    styles.inputIconStye,
                    {
                      tintColor: borderColor(
                        passwordFocus,
                        this.state.password.length
                      ),
                    },
                  ]}
                  source={unlockIcon}
                  resizeMode="contain"
                />
                <TextInput
                  testID={"txtInputPassword"}
                  onChangeText={(text) =>
                    this.changeState("txtInputPassword", text)
                  }
                  style={styles.bgPasswordInput}
                  value={this.state.password}
                  placeholder={this.labelPassword}
                  secureTextEntry={Boolean(this.getState("txtInputPassword"))}
                  onBlur={() => this.onBlur("passwordFocus")}
                  onFocus={() => this.onFocus("passwordFocus")}
                />
                <TouchableOpacity
                  testID={"btnPasswordShowHide"}
                  style={styles.passwordShowHide}
                  onPress={() => {
                    this.toggleState("btnPasswordShowHide");
                  }}
                >
                  <Image
                    testID={"imgEnablePasswordField"}
                    source={
                      this.getState("imgEnablePasswordField")
                        ? imgPasswordInVisible
                        : imgPasswordVisible
                    }
                    style={[
                      styles.passwordIconStyle,
                      {
                        tintColor: borderColor(
                          passwordFocus,
                          this.state.password.length
                        ),
                      },
                    ]}
                  />
                </TouchableOpacity>
              </View>
              {!!this.state.passwordError && (
                <Text style={styles.inputErrorTextStyle}>
                  {this.state.passwordError}
                </Text>
              )}

              <View
                style={[
                  styles.bgPasswordContainer,
                  {
                    borderColor: this.state.confirmPasswordError
                      ? style.red
                      : borderColor(
                          reTypePasswordFocus,
                          this.state.reTypePassword.length
                        ),
                  },
                ]}
              >
                <Image
                  source={unlockIcon}
                  resizeMode={"contain"}
                  style={[
                    styles.inputIconStye,
                    {
                      tintColor: borderColor(
                        reTypePasswordFocus,
                        this.state.reTypePassword.length
                      ),
                    },
                  ]}
                />
                <TextInput
                  testID={"txtInputConfirmPassword"}
                  style={styles.bgPasswordInput}
                  placeholder={this.labelRePassword}
                  onChangeText={(text) =>
                    this.changeState("txtInputConfirmPassword", text)
                  }
                  secureTextEntry={Boolean(
                    this.getState("txtInputConfirmPassword")
                  )}
                  onBlur={() => this.onBlur("reTypePasswordFocus")}
                  onFocus={() => this.onFocus("reTypePasswordFocus")}
                  value={this.state.reTypePassword}
                />

                <TouchableOpacity
                  testID={"btnConfirmPasswordShowHide"}
                  style={styles.passwordShowHide}
                  onPress={() => {
                    this.toggleState("btnConfirmPasswordShowHide");
                  }}
                >
                  <Image
                    testID={"imgEnableRePasswordField"}
                    source={
                      this.getState("imgEnableRePasswordField")
                        ? imgPasswordInVisible
                        : imgPasswordVisible
                    }
                    style={[
                      styles.passwordIconStyle,
                      {
                        tintColor: borderColor(
                          reTypePasswordFocus,
                          this.state.reTypePassword.length
                        ),
                      },
                    ]}
                  />
                </TouchableOpacity>
              </View>
              {!!this.state.confirmPasswordError && (
                <Text style={styles.inputErrorTextStyle}>
                  {this.state.confirmPasswordError}
                </Text>
              )}
              <View style={styles.policyContainer}>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({ isCheck: !this.state.isCheck })
                  }
                >
                  <Image
                    source={this.state.isCheck ? checkBox : unCheckBox}
                    style={styles.checkBoxStyle}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 8,
                    flex: 1,
                  }}
                >
                  <Text style={styles.privacytextStyle}>
                    {"Please accept our "}
                    <Text
                      onPress={() =>
                        this.props.navigation.navigate("PrivacyPolicyScreen")
                      }
                      style={styles.termsAndTextStyle}
                    >
                      {"Privacy policy "}
                    </Text>
                    <Text style={styles.privacytextStyle}>{"and "}</Text>
                    <Text
                      onPress={() =>
                        this.props.navigation.navigate("TermsAndConditions3")
                      }
                      style={styles.termsAndTextStyle}
                    >
                      {"Terms and Conditions"}
                    </Text>
                  </Text>
                </View>
              </View>
              {!!this.state.isCheckError && (
                <Text style={styles.inputErrorTextStyle}>
                  {this.state.isCheckError}
                </Text>
              )}
              <TouchableOpacity
                testID="btnSignUp"
                onPress={() => this.processOnClickMessage("btnSignUp")}
                style={styles.signUpButton}
              >
                <Text style={styles.signupText}>{this.btnTextSignUp}</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
        {!!this.state.isLoder && (
          <CustomLoader isLoading={this.state.isLoder} />
        )}
      </KeyboardAvoidingView>
    );
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    this.getValidations();
    this.setState({
      email: "",
      password: "",
      reTypePassword: "",
      firstName: "",
    });
    // Customizable Area End
  }
}
const styles = StyleSheet.create({
  // Customizable Area Start
  container: {
    backgroundColor: "#fff",
    width: "100%",
  },
  backIconStyle: {
    width: 30,
    height: 20,
  },
  logoImageStyle: {
    height: scaledSize(90),
    width: scaledSize(90),
    alignSelf: "center",
    marginVertical: scaledSize(15),
  },
  welcomeTextStyle: {
    fontSize: scaledSize(18),
    fontFamily: style.regular,
    textAlign: "center",
    marginVertical: 8,
    color: "#000000",
  },
  createAccTextStyle: {
    ...style.headerStyle,
    textAlign: "center",
    marginVertical: 8,
    color: "#000000",
    fontWeight: "800",
  },
  bgPasswordInput: {
    ...style.inputTextStyle,
    flex: 1,
    textAlign: "left",
    backgroundColor: "#00000000",
    minHeight: 40,
    includeFontPadding: true,
  },
  passwordShowHide: {
    alignSelf: "center",
  },
  passwordIconStyle: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  bgPasswordContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: style.bColor,
    borderRadius: 15,
    paddingHorizontal: 15,
    zIndex: -1,
    alignItems: "center",
    marginTop: 20,
  },
  inputContainerStyle: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: style.bColor,
    borderRadius: 15,
    zIndex: -1,
    alignItems: "center",
    paddingHorizontal: 15,
    marginTop: 20,
  },
  inputIconStye: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  keyboardPadding: { flex: 1 },
  signUpButton: {
    ...style.btnStyle,
    marginTop: scaledSize(60),
  },
  signupText: {
    ...style.btnTextStyle,
    color: COLORS.white,
    alignSelf: "center",
    padding: 12,
  },
  policyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  privacytextStyle: {
    color: COLORS.black,
    fontSize: scaledSize(14),
    fontFamily: style.regular,
  },
  termsAndTextStyle: {
    color: COLORS.black,
    fontSize: scaledSize(14),
    fontFamily: style.bold,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  checkBoxStyle: {
    height: scaledSize(20),
    width: scaledSize(20),
    resizeMode: "contain",
  },
  inputErrorTextStyle: {
    ...style.erroTextStyle,
    textAlign: "left",
    color: style.red,
    fontFamily: style.regular,
  },
  // Customizable Area End
});
