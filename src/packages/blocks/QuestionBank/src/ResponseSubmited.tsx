import React from "react";
// Customizable Area Start
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { backIcon } from "../../mobile-account-registration/src/assets";
import { congratsImage } from "./assets";
import QuestionBankController, {
  Props,
} from "./QuestionBankController";
import { scaledSize } from "framework/src/Utilities";
import { style } from "../../../components/src/CustomFonts";

export default class ResponseSubmited extends QuestionBankController {
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
        <View style={styles.mainContainer}>
          <Image
            source={congratsImage}
            resizeMode={"contain"}
            style={styles.congratsImageStyle}
          />
          <Text
            testID="labelBody" //Merge Engine::From BDS
            style={styles.headerTitle} //UI Engine::From Sketch
          >
            {"Congrats!"}
          </Text>

          <Text
            testID="labelBody" //Merge Engine::From BDS
            style={styles.subHeader} //UI Engine::From Sketch
          >
            {"Your response has been submitted."}
          </Text>
        </View>
        <TouchableOpacity
          // {...this.btnExampleProps} //Merge Engine::From BDS - {...this.testIDProps}
          testID={"btnPressOkay"}
          // {...this.btnSubmitOTPProps}
          onPress={() => this.OkayButtonPressed()}
          style={styles.viewContainer}
        >
          <Text style={styles.buttonTextStyle}>{"Okay"}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    width: "100%",
    backgroundColor: "#ffffffff",
  },
  backIconStyle: {
    width: 30,
    height: 20,
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  subHeader: {
    marginTop: scaledSize(6),
    fontSize: scaledSize(16),
    fontFamily: style.regular,
    textAlign: "center",
    color: "#000",
  },
  title: {
    fontSize: 16,
    textAlign: "center",
  },
  body: {
    marginVertical: 8,
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
  },
  bgPasswordContainer: {
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    padding: 10,
    borderWidth: 1,
    flexDirection: "row",
    backgroundColor: "#00000000",
    marginBottom: 16,
  },
  bgMobileInput: {
    flex: 1,
  },
  innerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#000",
  },
  viewContainer: {
    marginVertical: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    ...style.btnStyle,
  },
  buttonTextStyle: {
    textAlign: "center",
    ...style.btnTextStyle,
  },
  showHide: {
    alignSelf: "center",
  },
  imgShowhide: { 
    width: 30 ,
    height: 30, 
  },
  itemTextStyle: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 15,
  },
  itemContainer: {
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
  },
  congratsImageStyle: {
    height: "50%",
    width: "100%",
  },
  headerTitle: {
    marginTop: scaledSize(10),
    fontSize: scaledSize(24),
    fontFamily: style.regular,
    fontWeight: "400",
    textAlign: "center",
    color: "#000",
  },
  outrerCircle: {
    height: 18,
    width: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
});
// Customizable Area End
