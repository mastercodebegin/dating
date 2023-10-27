/* eslint-disable react-native/no-inline-styles */
import React from "react";

//Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import CustomForgotPasswordController, {
  Props,
} from "./CustomForgotPasswordController";
import { changepassword, imgPasswordInVisible } from "./assets";
import CustomLoader from "../../../components/src/CustomLoader";
import {
  backIcon,
  imgPasswordVisible,
  unlockIcon,
} from "../../mobile-account-registration/src/assets";
import { style } from "../../../components/src/CustomFonts";
import { scaledSize } from "framework/src/Utilities";
//Customizable Area End

export default class CustomForgotPassword extends CustomForgotPasswordController {
  constructor(props: Props) {
    super(props);
    //Customizable Area Start
    //Customizable Area End
  }

  render() {
    // Customizable Area Start
    const { passwordFocus, reTypePasswordFocus } = this.state;
    const borderColor = (item: boolean, itmLength: any) =>this.onItemClick(item,itmLength)
     
    // Customizable Area End
    return (
      /* Customizable Area Start */
      <View style={styles.sectionContainer}>
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              height: 50,
            }}
          >
            <TouchableOpacity
              style={{ marginLeft: 20 }}
              onPress={() => this.props.navigation.navigate("EmailVerifaction")}
            >
              <Image source={backIcon} style={{ height: 19, width: 11 }} />
            </TouchableOpacity>
            <View />
          </View>
        </View>
        <Image
          source={changepassword}
          style={{
            alignSelf: "center",
            height: scaledSize(200),
            width: scaledSize(200),
          }}
        />

        <View style={{ padding: 16 }}>
          <Text
            style={{
              color: style.black,
              fontFamily: style.bold,
              fontSize: style.f22,
              textAlign: "center",
              marginBottom: scaledSize(10),
            }}
          >
            Create New Password
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "normal",
              fontFamily: style.regular,
              fontSize: style.f14,
              marginHorizontal: scaledSize(30),
              color: style.black,
            }}
          >
            Your password must be different from previous password
          </Text>

          <Text
            style={{
              fontFamily: style.bold,
              fontSize: style.f16,
              color: style.black,
              textAlign: "left",
              marginTop: scaledSize(20),
            }}
          >
            New Password
          </Text>

          <View
            style={[
              styles.bgPasswordContainer,
              {
                borderColor: this.state.passwordError
                  ? style.red
                  : borderColor(passwordFocus, this.state.password.length),
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
                    passwordFocus,
                    this.state.password.length
                  ),
                },
              ]}
            />
            <TextInput
              testID={"txtInputPassword"}
              style={styles.bgPasswordInput}
              value={this.state.password}
              placeholder="Enter new password"
              onBlur={() => this.passwordFocus()}
              onFocus={(e) =>
                this.setState({ passwordFocus: true, passwordError: "" })
              }
              onChangeText={(text: string) => {
                this.setState({ password: text.replace(/ /g, "") });
              }}
              secureTextEntry={this.state.isSecurePassword}
            />
            <TouchableOpacity
              testID={"btnPasswordShowHide"}
              style={styles.passwordShowHide}
              onPress={() => {
                this.setState({
                  isSecurePassword: !this.state.isSecurePassword,
                });
              }}
            >
              <Image
                testID={"imgEnablePasswordField"}
                source={
                  !this.state.isSecurePassword
                    ? imgPasswordVisible 
                    : imgPasswordInVisible
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
            <Text style={[styles.inputErrorTextStyle]}>
              {this.state.passwordError}
            </Text>
          )}

          <View
            style={[
              styles.bgPasswordContainer,
              {
                borderColor: !this.state.confirmPasswordError
                  ? borderColor(
                    reTypePasswordFocus,
                    this.state.reTypePassword.length
                  )
                  : style.red
              },
            ]}
          >
            <Image
              resizeMode="contain"
              source={unlockIcon}
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
              style={styles.bgPasswordInput}
              testID={"txtInputConfirmPassword"}
              placeholder="Confirm new password"
              value={this.state.reTypePassword}
              onBlur={() => this.confirmPasswordFocus()}
              onChangeText={(text: string) => {
                this.setState({ reTypePassword: text });
              }}
              onFocus={() =>
                this.setState({
                  reTypePasswordFocus: true,
                  confirmPasswordError: "",
                })
              }
              secureTextEntry={this.state.isSecureCPassword}
            />

            <TouchableOpacity
              testID={"btnConfirmPasswordShowHide"}
              style={styles.passwordShowHide}
              onPress={() => {
                this.setState({
                  isSecureCPassword: !this.state.isSecureCPassword,
                });
              }}
            >
              <Image
                testID={"imgEnableRePasswordField"}
                source={
                  this.state.isSecureCPassword
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

          <TouchableOpacity
            testID="btnSignUp"
            onPress={() => this.forgotPasswordSubmit()}
            style={styles.signUpButton}
          >
            <Text style={styles.signupText}>{"Continue"}</Text>
          </TouchableOpacity>
        </View>

        {!!this.state.isLoder && (
          <CustomLoader isLoading={this.state.isLoder} />
        )}
        <TouchableOpacity onPress={()=>this.onPressLogin()} testID="loginTestID"/>
      </View>
      /* Customizable Area End */
    );
  }

}

// Customizable Area Start
const styles = StyleSheet.create({
  sectionContainer: {
    position: "relative",
    height: "100%",
    backgroundColor: "#fff",
  },
  bgPasswordContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 15,
    zIndex: -1,
    alignItems: "center",
    marginTop: scaledSize(15),
  },
  inputIconStye: {
    width: 20,
    height: 20,
    marginRight: 15,
  },
  bgPasswordInput: {
    flex: 1,
    textAlign: "left",
    backgroundColor: "#00000000",
    minHeight: 40,
    ...style.inputTextStyle,
  },
  passwordShowHide: {
    alignSelf: "center",
  },
  passwordIconStyle: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  inputErrorTextStyle: {
    textAlign: "left",
    color: style.red,
    ...style.erroTextStyle,
  },
  signUpButton: {
    marginTop: 50,
    ...style.btnStyle,
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    alignSelf: "center",
    fontWeight: "600",
    ...style.btnTextStyle,
  },
});
// Customizable Area End
