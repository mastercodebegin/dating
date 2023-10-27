import React from "react";

//Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import EmailVerificationController, {
  Props,
} from "./EmailVerificationController";
import {
  backIcon,
  emailIcon,
  logoImage,
} from "../../mobile-account-registration/src/assets";
import { scaledSize } from "framework/src/Utilities";
import { style } from "../../../components/src/CustomFonts";
//Customizable Area End

export default class EmailVerifaction extends EmailVerificationController {
  constructor(props: Props) {
    super(props);
    //Customizable Area Start
    //Customizable Area End
  }

  render() {
    const borderColor = (item: boolean, itmLength: any) =>
      this.onItemClick(item,itmLength)

    return (
      /* Customizable Area Start */
      <View style={styles.containerMobile}>
        <TouchableWithoutFeedback
          style={styles.mainContainer}
          testID="Background"
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          <View style={styles.mainContainer}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
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

              <Text style={styles.createAccTextStyle}>
                {"Reset your password"}
              </Text>
              <Text style={styles.welcomeTextStyle}>
                {
                  "Enter your email address and we will send you instructions to reset your password"
                }
              </Text>
              <View
                style={[
                  styles.inputContainerStyle,
                  {
                    borderColor: this.state.emailError
                      ? style.red
                      : borderColor(
                          this.state.isEmailFocus,
                          this.state.email.length
                        ),
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
                        this.state.isEmailFocus,
                        this.state.email.length
                      ),
                    },
                  ]}
                />
                <TextInput
                  testID={"txtInputEmail"}
                  style={styles.bgPasswordInput}
                  placeholder={"Enter email id"}
                  onChangeText={(text) => this.setState({ email: text })}
                  keyboardType="email-address"
                  value={this.state.email}
                  onBlur={() => this.emailBlur()}
                  onFocus={() => this.onEmailFocus()}
                />
              </View>
              {!!this.state.emailError && (
                <Text style={styles.inputErrorTextStyle}>
                  {this.state.emailError}
                </Text>
              )}
            </View>
            <TouchableOpacity
              testID="btnSignUp"
              onPress={() => this.onPressContinue()}
              style={styles.signUpButton}
            >
              <Text style={styles.signupText}>{"Continue"}</Text>
            </TouchableOpacity>
          </View>
          {/* Merge Engine UI Engine Code */}
        </TouchableWithoutFeedback>
      </View>
      /* Customizable Area End */
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  containerMobile: {
    flex: 1,
    padding: 16,
    width: "100%",
    backgroundColor: "#fff",
  },
  inputErrorTextStyle: {
    color: style.red,
    marginLeft: scaledSize(8),
    marginTop: scaledSize(4),
  },
  mainContainer: {
    flex: 1,
  },
  backIconStyle: {
    width: 30,
    height: 20,
  },
  titleOtpInfo: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },
  logoImageStyle: {
    height: 100,
    width: 100,
    alignSelf: "center",
    marginVertical: 15,
  },
  welcomeTextStyle: {
    fontSize: style.f18,
    fontFamily: style.regular,
    textAlign: "center",
    marginVertical: 8,
    color: style.black,
  },
  createAccTextStyle: {
    fontSize: style.f24,
    fontFamily: style.meduim,
    textAlign: "center",
    marginVertical: 8,
    color: style.black,
  },
  inputContainerStyle: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 15,
    zIndex: -1,
    alignItems: "center",
    paddingHorizontal: 15,
    marginTop: 20,
  },
  inputIconStye: {
    width: 20,
    height: 20,
    marginRight: 15,
  },
  keyboardPadding: { flex: 1 },
  bgPasswordInput: {
    flex: 1,
    textAlign: "left",
    backgroundColor: "#00000000",
    minHeight: 40,
    includeFontPadding: true,
    ...style.inputTextStyle,
  },
  signUpButton: {
    marginTop: 70,
    ...style.btnStyle,
    justifyContent: "center",
    alignSelf: "center",
  },
  signupText: {
    alignSelf: "center",
    ...style.btnTextStyle,
  },
});
// Customizable Area End
