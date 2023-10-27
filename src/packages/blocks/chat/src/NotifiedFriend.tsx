import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import {
   notifiedImg,
} from "./assets";
// Customizable Area End

import NotifiedFriendController, {
  Props,
} from "./NotifiedFriendController";
import { style } from "../../../components/src/CustomFonts";
import { scaledSize } from "../../../framework/src/Utilities";

export default class NotifiedFriend extends NotifiedFriendController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start

    // Merge Engine - render - Start
    return (
      <View style={styles.notifiedContainer}>
        <View style={styles.notifiedBackIconStyle} >
          {/* <Image
          source={backIcon}
          resizeMode={"contain"}
          style={styles.notifiedBackIconStyle}
        /> */}
        </View>
        <View style={styles.notifiedMainContainer}>
          <Text
            testID="labelBody" //Merge Engine::From BDS
            style={styles.headerTitle} //UI Engine::From Sketch
          >
            {"You will be Notified"}
          </Text>

          <Text
            testID="labelBody" //Merge Engine::From BDS
            style={styles.subHeader} //UI Engine::From Sketch
          >
            {"You will be notified as soon as Friend responds."}
          </Text>
          <Image
            source={notifiedImg}
            resizeMode={"contain"}
            style={styles.congratsImageStyle}
          />
        </View>
        <TouchableOpacity
          testID={"btnPressOkay"}
          onPress={() => this.OkayButtonPressed()}
          style={styles.okayBtnContainer}
        >
          <Text style={styles.buttonTextStyle}>{"Okay"}</Text>
        </TouchableOpacity>
      </View>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  notifiedContainer: {
    flex: 1,
    padding: 16,
    width: "100%",
    backgroundColor: "#ffffffff",
  },
  notifiedBackIconStyle: {
    width: 30,
    height: 20,
  },
  notifiedMainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  congratsImageStyle: {
    width: "90%",
    height: "50%",
    alignSelf: "center",
    marginBottom: scaledSize(50),
    marginTop: scaledSize(20),
  },
  headerTitle: {
    marginVertical: 10,
    fontSize: style.f24,
    fontFamily: style.bold,
    alignSelf: "center",
    color: "#000",
  },
  subHeader: {
    fontSize: style.f16,
    fontFamily: style.regular,
    textAlign: "center",
    color: "#000",
  },
  okayBtnContainer: {
    margin: scaledSize(10),
    alignSelf: "center",
    justifyContent: "center",
    ...style.btnStyle
  },
  buttonTextStyle: {
    textAlign: "center",
    ...style.btnTextStyle,
  },
});
// Customizable Area End
