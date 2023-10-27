// Customizable Area Start
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  // Customizable Area Start
  Image,
  TouchableOpacity,
  // Customizable Area End
} from "react-native";
// Customizable Area Start
import LocationAccessController from "./LocationAccessController";
import { congratsImg } from "./assets";
import { backIcon } from "../../mobile-account-registration/src/assets";
import { scaledSize } from "framework/src/Utilities";
import { style } from "../../../components/src/CustomFonts";
// Customizable Area End

export default class LocationAccessSuccess extends LocationAccessController {
  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Customizable Area End

    return (
      // Customizable Area Start
      <View style={styles.sectionContainer}>
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
            onPress={() =>
              this.props.navigation.navigate("EmailAccountLoginBlock")
            }
          >
            <Image source={backIcon} style={styles.backIconStyle} />
          </TouchableOpacity>
          <View />
        </View>
        <View style={styles.mainContainer}>
          <Image
            source={congratsImg}
            resizeMode={"contain"}
            style={styles.congratsImageStyle}
          />

          <Text
          style={styles.headerTitle}
          >
            Congrats!
          </Text>

          <Text style={styles.subHeader}>
            You are all set to Proceed
          </Text>
        </View>

        <TouchableOpacity
          style={styles.contactBtn}
          testID="contactUs"
          onPress={() => this.contactusTest()}
        >
          <Text
            style={styles.btnTextStyle}
          >
            Proceed
          </Text>
        </TouchableOpacity>
      </View>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  sectionContainer: {
    position: "relative",
    height: "100%",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "space-between",
  },
  contactContainerStyle: {
    flexDirection: "row",
    justifyContent: "center",
  },
  contactBtn: {
    marginBottom: scaledSize(20),
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    ...style.btnStyle,
    width: "90%",
  },
  btnTextStyle: {
      textAlign: "center",
      ...style.btnTextStyle,
    },
  backIconStyle: {
    width: 30,
    height: 20,
    resizeMode: "contain",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  congratsImageStyle: {
    width: "100%",
    height: "50%",
  },
  headerTitle: {
    marginTop: scaledSize(10),
    fontSize: scaledSize(24),
    fontFamily: style.regular,
    fontWeight: "400",
    textAlign: "center",
    color: "#000",
  },
  subHeader: {
    marginTop: scaledSize(6),
    fontSize: scaledSize(16),
    fontFamily: style.regular,
    textAlign: "center",
    color: "#000",
  },
});
// Customizable Area End

// Customizable Area End
