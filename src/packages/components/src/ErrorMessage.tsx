import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  Platform,
  Image,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ImageBackground,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { BlockComponent } from "../../framework/src/BlockComponent";

interface Props {
  onPress: any;
  content: string;
  showErrorModal: boolean;
}

interface S { }

interface SS { }

export default class ErrorMessage extends BlockComponent<Props, S, SS> {
  static propTypes = {
    content: PropTypes.string.isRequired,
  };

  render() {
    return (
      <Modal visible={this.props.showErrorModal} transparent>
        <View style={styles.modalWapper}>
          <View style={styles.St_termsandcondiotionView}>
            {/* <Image
              source={errorImage}
              style={{ position: "absolute", top: -40, alignSelf: "center" }}
            /> */}
            <Text style={styles.textlabel_TermsandConditionsText}>ERROR!</Text>
            <Text
              style={{
                paddingHorizontal: 15,
                paddingVertical: 10,
                fontSize: 15,
                color: "#000",
                textAlign: "center",
                alignSelf: "center",
                width: "90%",
                fontFamily: "Montserrat-Medium",
              }}
            >
              {this.props.content}
            </Text>

            <TouchableOpacity
              data-elementId="button_back"
              onPress={() => {
                this.props.onPress();
              }}
              style={[
                styles.btnStyle,
                {
                  marginBottom: 20,
                  borderRadius:15,
                  // width: "90%",
                  alignSelf: "center",
                }
              ]}
            >
              <Text data-elementId="TEXTCOLORSTYLE" style={styles.btnTextStyle}>
                TRY AGAIN
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#00000000",
    padding: 18,
    color: "black",
    fontSize: 18,
    fontFamily: "Montserrat-Bold",
    flex: 1,
    flexDirection: "row",
  },
  seprator: {
    backgroundColor: "#6200EE",
    color: "#6200EE",
    height: 1,
  },
  btnStyle: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 15,
    width: 159,
    height: 36,
    backgroundColor:'#F1405D'
  },
  btnTextStyle: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
  },
  St_termsandcondiotionView: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 15,
    alignItems: "flex-start",
    marginHorizontal: 5,
    width: "95%",
    alignSelf: "center",
  },
  textlabel_TermsandConditionsText: {
    alignSelf: "center",
    marginTop: 30,
    opacity: 1,
    backgroundColor: "transparent",
    includeFontPadding: false,
    padding: 0,
    color: "rgba(26, 26, 26, 1)",
    textAlign: "center",
    textAlignVertical: "top",
    fontFamily: "Montserrat-Bold",
    fontSize: 18,
  },

  textlabel_1Text: {
    paddingVertical: 10,
    marginLeft: 20,
    opacity: 1,
    backgroundColor: "transparent",

    includeFontPadding: false,
    padding: 0,
    color: "rgba(26, 26, 26, 1)",
    textAlign: "left",
    textAlignVertical: "top",
    fontFamily: "Montserrat-Medium",
    fontSize: 13,
  },

  textlabel_AtveroeosetaccusText: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    opacity: 1,
    backgroundColor: "transparent",
    includeFontPadding: false,
    padding: 0,
    color: "rgba(26, 26, 26, 1)",
    textAlign: "left",
    textAlignVertical: "top",
    fontFamily: "Montserrat-Medium",
    fontSize: 12,
  },

  modalView: {
    backgroundColor: " rgba(0,0,0,0)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 18,
  },
  modalWapper: {
    backgroundColor: " rgba(0,0,0,0.6)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 18,
  },
});
