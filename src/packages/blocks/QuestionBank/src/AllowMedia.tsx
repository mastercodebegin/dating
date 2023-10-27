import React from "react";
// Customizable Area Start
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { backIcon } from "../../mobile-account-registration/src/assets";
import { allowMediaImage } from "./assets";
import QuestionBankController, {
  Props,
} from "./QuestionBankController";
import { scaledSize } from "framework/src/Utilities";
import { style } from "../../../components/src/CustomFonts";

export default class AllowMedia extends QuestionBankController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    // Customizable Area Start
    
    // Merge Engine - render - Start
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>this.goBack()}>
          <Image
            source={backIcon}
            resizeMode={"contain"}
            style={styles.backIconStyle}
          />
        </TouchableOpacity>
        <Text
            testID="labelBody" //Merge Engine::From BDS
            style={styles.headerTitle} //UI Engine::From Sketch
          >
            {"Allow your Media"}
          </Text>
          <Text
            testID="labelBody" //Merge Engine::From BDS
            style={styles.subHeader} //UI Engine::From Sketch
          >
            {"Don't worry your data is safe with us."}
          </Text>
        <View style={styles.mainContainer}>
          <Image
            source={allowMediaImage}
            resizeMode={"contain"}
            style={styles.congratsImageStyle}
          />
        </View>
        <TouchableOpacity
          // {...this.btnExampleProps} //Merge Engine::From BDS - {...this.testIDProps}
          testID={"btnAllowMedia"}
          // {...this.btnSubmitOTPProps}
          onPress={() => this.allowMedia()}
          style={styles.viewContainer}
        >
          <Text style={styles.buttonTextStyle}>
            {"Enable Access"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  viewContainer: {
    justifyContent: "center",
    marginVertical: 10,
    alignSelf: "center",
    ...style.btnStyle,
  },
  buttonTextStyle: {
    textAlign: "center",
    ...style.btnTextStyle,
  },
  container: {
    flex: 1,
    padding: 16,
    width: "100%",
    backgroundColor: "#ffffffff",
  },
  backIconStyle: {
    width: 30,
    height: 20,
    alignSelf: "flex-start",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  congratsImageStyle: {
    width: scaledSize(250),
    height: scaledSize(250),
  },
  headerTitle: {
    marginVertical: 10,
    fontSize: scaledSize(22),
    fontFamily: style.regular,
    textAlign: "center",
    color: "#000",
    marginHorizontal: 15,
  },
  subHeader: {
    color: "#000",
    marginHorizontal: 15,
    fontSize: scaledSize(16),
    fontFamily: style.regular,
    textAlign: "center",
  },
});
// Customizable Area End
