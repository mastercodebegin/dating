import React from "react";

// Customizable Area Start
import {
  SafeAreaView,
  Dimensions,
  PixelRatio,
  View,
  Text,
  FlatList,
  SectionList,
  StyleSheet,
  Button,
  TouchableOpacity,
  CheckBox,
  Switch,
  Platform,
  Image,
  TextInput,
  Picker,
  ActivityIndicator,
  Alert,
  ImageBackground,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
} from "react-native-simple-radio-button";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";

//@ts-ignore
import CustomCheckBox from "../../../components/src/CustomCheckBox";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import TermsAndConditions3Controller, {
  Props,
  configJSON,
} from "./TermsAndConditions3Controller";
import Scale from "../../../components/src/Scale";
import { backIcon } from "../../mobile-account-registration/src/assets";

export default class TermsAndConditions3 extends TermsAndConditions3Controller {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    Dimensions.addEventListener("change", (e) => {
      MergeEngineUtilities.init(
        artBoardHeightOrg,
        artBoardWidthOrg,
        Dimensions.get("window").height,
        Dimensions.get("window").width
      );
      this.forceUpdate();
    });
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    const { navigation } = this.props;
    // Merge Engine - render - Start
    return (
      <SafeAreaView style={styles.mainContainer}>
        
          <View style={styles.header}>
            <View>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                testID="onHeaderID"
                style={{ height: 20, width: 30 }}>
                <Image source={backIcon}
                  resizeMode={'contain'}
                  style={{
                    width: 30,
                    height: 20,
                  }} />
              </TouchableOpacity>
            </View>
            <View>
            <Text style={styles.headeTxt}>Terms And Conditions </Text>
            </View>
            <View style={{ height: 20, width: 20 }}></View>
          </View>
       
        <Text
          testID="labelBody" //Merge Engine::From BDS
          style={styles.body} //UI Engine::From Sketch
        >
          {"Comming soon..."}
        </Text>
      </SafeAreaView>
      // <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
      //   <TouchableWithoutFeedback
      //     onPress={() => {
      //       this.hideKeyboard();
      //     }}
      //   >
      //     <View>
      //       {/* {this.isPlatformWeb() ? (
      //         <Text
      //           testID="labelTitle" //Merge Engine::From BDS
      //           style={styles.title} //UI Engine::From Sketch
      //         >
      //           {configJSON.labelTitleText}
      //         </Text> //UI Engine::From Sketch
      //       ) : null} */}

      //       <Text
      //         testID="labelBody" //Merge Engine::From BDS
      //         style={styles.body} //UI Engine::From Sketch
      //       >
      //         {" "}
      //         {/* UI Engine::From Sketch */}
      //         {/* {configJSON.labelBodyText} */}
      //         {"Comming soon..."}
      //          {/* UI Engine::From Sketch */}
      //       </Text>

      //       {/* <Text testID="txtSaved">
      //         This is the reviced value:
      //         {this.state.txtSavedValue}{" "}
      //         {/* Merge Engine::From BDS - {...this.testIDValue} */}
      //       {/* </Text>  */}
      //       {/* */}

      //       {/* <View style={styles.bgPasswordContainer}>
      //         <TextInput
      //           testID="txtInput" //Merge Engine::From BDS
      //           style={styles.bgMobileInput} //UI Engine::From Sketch
      //           placeholder={configJSON.txtInputPlaceholder} //UI Engine::From Sketch
      //           {...this.txtInputProps} //Merge Engine::From BDS - {...this.testIDProps}
      //         />

      //         <TouchableOpacity
      //           testID={"btnShowHide"} //Merge Engine::From BDS
      //           style={styles.showHide} //UI Engine::From Sketch
      //           {...this.btnShowHideProps} //Merge Engine::From BDS - {...this.testIDProps}
      //         >
      //           <Image
      //             testID={"btnShowHideImage"} //Merge Engine::From BDS - testIDImage
      //             style={styles.imgShowhide} //UI Engine::From Sketch
      //             {...this.btnShowHideImageProps} //Merge Engine::From BDS - {...this.testIDProps}
      //           />
      //         </TouchableOpacity>
      //       </View> */}

      //       {/* <Button
      //         testID={"btnExample"} //Merge Engine::From BDS
      //         title={configJSON.btnExampleTitle} //UI Engine::From Sketch
      //         {...this.btnExampleProps} //Merge Engine::From BDS - {...this.testIDProps}
      //       /> */}
      //     </View>
      //   </TouchableWithoutFeedback>
      // </ScrollView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  title: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },
  body: {
    marginTop: 32,
    fontSize: 16,
    textAlign: "center",
    marginVertical: 8,
  },
  bgPasswordContainer: {
    flexDirection: "row",
    backgroundColor: "#00000000",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    padding: 10,
    borderWidth: Platform.OS === "web" ? 0 : 1,
  },
  bgMobileInput: {
    flex: 1,
  },
  showHide: {
    alignSelf: "center",
  },
  haderwork: {
    flexDirection: "row",
    alignItems: "center",
    margin: Scale(20),
  },
  mainContainer: {
    backgroundColor: "#fff",
    flex: 1,
  },
  imgShowhide: Platform.OS === "web" ? { height: 30, width: 30 } : {},
  headeTxt: {
    fontSize: 25, fontWeight: "bold", color: "#000", alignSelf: 'center',
    textAlign: 'center',
    // marginLeft: Scale(10),
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 10, 
    paddingHorizontal: 10 ,
    marginTop: Scale(15),
  },
});
// Customizable Area End
