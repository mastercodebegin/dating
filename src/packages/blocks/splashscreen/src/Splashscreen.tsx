import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  Image,
  View,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import { logo } from "./assets";
import { scaledSize } from "framework/src/Utilities";
import { style } from "../../../components/src/CustomFonts";
// Customizable Area End

import SplashscreenController, { Props } from "./SplashscreenController";

import { imgSplash } from "./assets";

export default class Splashscreen extends SplashscreenController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        {/* Customizable Area Start */}
        <View style={styles.container}>
          <View style={styles.main}>
            <Image source={logo} style={{ width: scaledSize(200), height: scaledSize(200), resizeMode: "contain" }} />
            {/* <Text style={styles.head}>dahlia</Text> */}
          </View>
          <View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('EmailAccountLoginBlock',)}
              style={styles.btn}>
              <Text style={styles.btnTxt}>Log in</Text>
            </TouchableOpacity>
            <View style={styles.signUpTextStyle} >
              <Text style={styles.footer}>{"Don't have an account?"} </Text>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('SignupRegistrationForm')}>
                <Text style={{
                  fontSize: scaledSize(18),
                  fontFamily: style.bold,
                  fontWeight: "700", color: "#000"
                }}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Customizable Area End */}
      </SafeAreaView>
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  logoView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logoText: {
    fontSize: 42,
    letterSpacing: 2,
    fontWeight: "bold",
    color: "#323441",
    marginTop: 15
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  container: { flex: 1, paddingHorizontal: 20, paddingVertical: 50 },
  main: { flex: 1, justifyContent: "center", alignItems: "center" },
  head: { fontSize: 100, fontWeight: "bold", color: "#000" },
  btn: { backgroundColor: "#000", borderRadius: 10, padding: 14, width: 320 },
  btnTxt: {
    fontSize: scaledSize(18),
    fontFamily: style.meduim,
    color: "#fff",
    textAlign: "center"

  },
  footer: {
    fontSize: scaledSize(18),
    fontFamily: style.meduim,
    textAlign: "center",
  },
  signUpTextStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30
  }
});
// Customizable Area End
