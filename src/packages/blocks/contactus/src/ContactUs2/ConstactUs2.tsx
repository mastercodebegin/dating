import React from "react";

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

import { backIcon } from "../assets";

import ContactUs2Controller, { Props } from "./ContactUs2Controller";
import CustomLoader from "../../../../components/src/CustomLoader";
import { COLORS } from "framework/src/Globals";
import { scaledSize } from "framework/src/Utilities";
import { style } from "../../../../components/src/CustomFonts";

export default class ContactUs2 extends ContactUs2Controller {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { queryTitleFocus, queryDescriptionFocus } = this.state;
    return (
      <KeyboardAvoidingView
        behavior={this.isPlatformiOS() ? "padding" : undefined}
        style={styles.container}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
        >
          <TouchableWithoutFeedback
            data-testid={"background"}
            onPress={() => {
              this.hideKeyboard();
            }}
          >
            <View style={styles.innerView}>
              <View style={styles.header}>
                <TouchableOpacity
                  data-testid="backButton"
                  onPress={() => this.props.navigation.goBack()}
                >
                  <Image
                    source={backIcon}
                    resizeMode={"contain"}
                    style={styles.backIconStyle}
                  />
                </TouchableOpacity>
                <Text style={styles.headeTxt}>Contact Us</Text>
              </View>
              <Text style={styles.instructionsTextStyle}>
                Facing any problem!
              </Text>
              <Text style={styles.instructionsTextStyle1}>
                Create New Query
              </Text>
              <View
                style={[
                  styles.inputContainerStyle,
                  {
                    borderColor: this.state.queryTitleError
                      ? style.red
                      : this.decideBorderColor(
                        queryTitleFocus,
                        this.state.queryTitle?.length
                      ),
                  },
                ]}
              >
                {/* <Image
                  source={profileIcon}
                  resizeMode={"contain"}
                  style={[
                    styles.inputIconStye,
                    {
                      tintColor: this.decideBorderColor(
                        queryTitleFocus,
                        this.state.queryTitle?.length
                      ),
                    },
                  ]}
                /> */}
                <TextInput
                  data-testid="queryTitle"
                  style={styles.inputStyle}
                  placeholder="Enter query title"
                  onChangeText={(text) => this.changeState("queryTitle", text)}
                  onBlur={() => this.onBlur("queryTitleFocus")}
                  onFocus={() => this.onFocus("queryTitleFocus")}
                  value={this.state.queryTitle}
                />
              </View>
              {!!this.state.queryTitleError && (
                <Text style={styles.inputErrorTextStyle}>
                  {this.state.queryTitleError}
                </Text>
              )}
              <View
                style={[
                  styles.inputContainerStyle,
                  {
                    borderColor: this.state.queryDescriptionError
                      ? style.red
                      : this.decideBorderColor(
                        queryDescriptionFocus,
                        this.state.queryDescription?.length
                      ),
                  },
                ]}
              >
                {/* <Image
                  source={emailIcon}
                  resizeMode={"contain"}
                  style={[
                    styles.inputIconStye,
                    {
                      tintColor: this.decideBorderColor(
                        queryDescriptionFocus,
                        this.state.queryDescription?.length
                      ),
                    },
                  ]}
                /> */}
                <TextInput
                  data-testid="queryDescription"
                  style={styles.inputStyle}
                  placeholder="Enter query description"
                  multiline={true}
                  numberOfLines={4}
                  onChangeText={(text) =>
                    this.changeState("queryDescription", text)
                  }
                  // textAlignVertical="top"
                  onBlur={() => this.onBlur("queryDescriptionFocus")}
                  onFocus={() => this.onFocus("queryDescriptionFocus")}
                  value={this.state.queryDescription}
                />
              </View>
              {!!this.state.queryDescriptionError && (
                <Text style={styles.inputErrorTextStyle}>
                  {this.state.queryDescriptionError}
                </Text>
              )}
              <TouchableOpacity
                data-testid="submitButton"
                onPress={() => this.submitQuery()}
                style={styles.submitButton}
              >
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
        {this.state.isLoading && (
          <CustomLoader isLoading={this.state.isLoading} />
        )}
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    // backgroundColor: "red",
  },
  innerView: {
    padding: 16 // This is given separately so that keyboardAvoidnigView will not be compressed container
  },
  header: {
    paddingVertical: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  headeTxt: {
    flex: 1,
    textAlign: "center",
    fontSize: style.f24,
    fontFamily: style.meduim,
    color: style.black,
  },
  backIconStyle: {
    width: 30,
    height: 20,
  },
  // logoImageStyle: {
  //   height: scaledSize(90),
  //   width: scaledSize(90),
  //   alignSelf: "center",
  //   marginVertical: scaledSize(15),
  // },
  instructionsTextStyle: {
    fontSize: scaledSize(18),
    fontFamily: style.regular,
    textAlign: "center",
    marginVertical: 8,
    color: "#000000",
  },
  instructionsTextStyle1: {
    ...style.headerStyle,
    textAlign: "center",
    marginVertical: 8,
    color: "#000000",
    fontWeight: "800",
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
  inputStyle: {
    ...style.inputTextStyle,
    flex: 1,
    textAlign: "left",
    backgroundColor: "#00000000",
    minHeight: 40,
    maxHeight: 100,
    includeFontPadding: true,
  },
  inputErrorTextStyle: {
    ...style.erroTextStyle,
    textAlign: "left",
    color: style.red,
    fontFamily: style.regular,
  },
  submitButton: {
    ...style.btnStyle,
    marginTop: scaledSize(60),
  },
  submitText: {
    ...style.btnTextStyle,
    color: COLORS.white,
    alignSelf: "center",
    padding: 12,
  },
});
