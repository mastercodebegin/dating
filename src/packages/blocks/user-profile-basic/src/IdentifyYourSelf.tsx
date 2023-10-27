// Customizable Area Start
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  Keyboard,
  ScrollView,
} from "react-native";
import { profile, leftbutton } from "./assets";
import DateTimePicker from "@react-native-community/datetimepicker";
// Customizable Area End
import { showMessage } from "react-native-flash-message";

import identifyYourSelfController, {
  Props
} from "./IdentifyYourSelfController";
import moment from "moment";
import { getStorageData, scaledSize } from "../../../framework/src/Utilities";
import { style } from "../../../components/src/CustomFonts";

export default class IdentifyYourSelf extends identifyYourSelfController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  // Customizable Area End

  render() {
    const { navigation } = this.props;
    const borderColor = (item: boolean, itmLength: any) => this.onItemClick(item, itmLength)

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback
          testID="button-view-pad"
          onPress={() => Keyboard.dismiss()}
        >
          <SafeAreaView style={{ flex: 1, paddingHorizontal: 25 }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                height: 50,
              }}
            >
              <TouchableOpacity
                testID="onGoBackID"
                onPress={() => navigation.navigate("EmailAccountLoginBlock")}
              >
                <Image source={leftbutton} style={{ height: 19, width: 11 }} />
              </TouchableOpacity>
              <View></View>
            </View>
            <View>
              <Text style={styles.IdentifyText}>Identify Yourself</Text>
              <Text style={styles.IdentifySubText}>
                Lorem ipsum dolor sit amet,consectetur elit.Nam accumsan
                hendrerit
              </Text>
            </View>
            <View style={styles.myselfContainer}>
              <Text style={styles.myselfText}>My Self</Text>
            </View>
            {this.firstName(borderColor)}
            <View style={styles.myselfContainer}>
              <Text style={styles.myselfText}>UserName</Text>
            </View>
            {this.userName(borderColor)}
            <View>
              <Text style={styles.myselfText}>I am a</Text>
            </View>
            {this.showGender()}
            <View>
              <Text style={styles.dateText}>My Date of Birth is</Text>
            </View>
            {this.showDatePicker()}
            <View>
              <Text style={styles.interestedText}>I am interested in</Text>
            </View>
            <View style={styles.InterestedContainer}>
              <TouchableOpacity
                testID="TestidMale"
                onPress={() => this.handleIntrestedGender("Male")}
                style={[
                  this.state.intrestedGender == "Male" &&
                  styles.genderBackgroundColor,
                  styles.genderContainer,
                ]}
              >
                <Text
                  style={[
                    this.state.intrestedGender?.includes("Male")
                      ? styles.IamTextFocused
                      : styles.IamText,
                  ]}
                >
                  Male
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="TestIdFemale"
                onPress={() => this.handleIntrestedGender("Female")}
                style={[
                  this.state.intrestedGender == "Female" &&
                  styles.genderBackgroundColor,
                  styles.genderContainer,
                ]}
              >
                <Text
                  style={[
                    this.state.intrestedGender?.includes("Female")
                      ? styles.IamTextFocused
                      : styles.IamText,
                  ]}
                >
                  Female
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="TestIdFluid"
                onPress={() => this.handleIntrestedGender("Fluid")}
                style={[
                  this.state.intrestedGender == "Fluid" &&
                  styles.genderBackgroundColor,
                  styles.genderContainer,
                ]}
              >
                <Text
                  style={[
                    this.state.intrestedGender?.includes("Fluid")
                      ? styles.IamTextFocused
                      : styles.IamText,
                  ]}
                >
                  Fluid
                </Text>
              </TouchableOpacity>
            </View>

            <View></View>

            <TouchableOpacity
              testID="NEXTbtn"
              style={styles.continueBtn}
              onPress={() => this.callIdentifyYourSelfApi()}
            >
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
  }

  firstName = (borderColor: any) => {
    return(
    <>
    <View
      style={[
        styles.nameContianer,
        {
          borderColor: this.state.firstNameError
            ? style.red
            : borderColor(
              this.state.mySelfFocus,
              this.state.addName.length
            ),
        },
      ]}
    >
      <Image
        style={[
          styles.profileImg,
          {
            tintColor: borderColor(
              this.state.mySelfFocus,
              this.state.addName.length
            ),
          },
        ]}
        source={profile}
      />
      <TextInput
        testID="testIdName"
        style={styles.MySelfBtn}
        //multiline={true}
        placeholder="Add Your Name"
        onChangeText={(text: string) => this.changeAddName(text)}
        maxLength={40}
        onBlur={() => this.onBlurName()}
        onFocus={() => this.onFocusName()}
        value={this.state.addName}
      />
    </View>
    {
      !!this.state.firstNameError && (
        <Text style={styles.inputErrorTextStyle}>
          {this.state.firstNameError}
        </Text>
      )
    }
</>
)
  }
  userName = (borderColor: Function) => {
return(
  <>
    <View
      style={[
        styles.nameContianer,
        {
          borderColor: this.state.firstNameError
            ? style.red
            : borderColor(this.state.userNameFocus, this.state.userName.length),
        },
      ]}
    >
      <Image style={[styles.profileImg, {
        tintColor: borderColor(
          this.state.userNameFocus,
          this.state.userName.length
        ),
      },]} source={profile} />
      <TextInput
        testID="txtInputUserName"
        onBlur={() => this.onBlurUserName()}
        onFocus={() => this.onFocusUserName()}
        onChangeText={(text: string) => this.changeState(text)}
        value={this.state.userName}
        placeholder={"Enter Username"}
        maxLength={20}
        style={styles.MySelfBtn}

      />
    </View>
    {
      !!this.state.usernameError && (
        <Text style={styles.inputErrorTextStyle}>
          {this.state.usernameError}
        </Text>
      )
    }
    </>
)
  }
  showGender = () => {
    return(
    <View style={styles.IamContainer}>
      <TouchableOpacity
        testID="btnAddExample"
        onPress={() => this.handleYourSelf("Male")}
        style={[
          this.state.activeGender == "Male" &&
          styles.genderBackgroundColor,
          styles.genderContainer,
        ]}
      >
        <Text
          style={[
            this.state.activeGender?.includes("Male")
              ? styles.IamTextFocused
              : styles.IamText,
          ]}
        >
          Male
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        testID="btnAddExample1"
        onPress={() => this.handleYourSelf("Female")}
        style={[
          this.state.activeGender == "Female" &&
          styles.genderBackgroundColor,
          styles.genderContainer,
        ]}
      >
        <Text
          style={[
            this.state.activeGender?.includes("Female")
              ? styles.IamTextFocused
              : styles.IamText,
          ]}
        >
          Female
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        testID="btnAddExample2"
        onPress={() => this.handleYourSelf("Fluid")}
        style={[
          this.state.activeGender == "Fluid" &&
          styles.genderBackgroundColor,
          styles.genderContainer,
        ]}
      >
        <Text
          style={[
            this.state.activeGender?.includes("Fluid")
              ? styles.IamTextFocused
              : styles.IamText,
          ]}
        >
          Fluid
        </Text>
      </TouchableOpacity>
    </View>
    )
  }
  showDatePicker = () => {
    return(
      <> 
    <View style={styles.dateContainer}>
      <TouchableOpacity
        testID="ShowpickerTestID"
        onPress={() => this.setState({ showPicker: true })}
        style={styles.genderContainer}
      >
        <Text style={styles.IamText}>
          {this.state.month ? this.state.month : "MM"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        testID="ShowpickerTestID1"
        onPress={() => this.setState({ showPicker: true })}
        style={styles.genderContainer}
      >
        <Text style={styles.IamText}>
          {this.state.date ? this.state.date : "DD"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        testID="ShowpickerTestID2"
        onPress={() => this.setState({ showPicker: true })}
        style={styles.genderContainer}
      >
        <Text style={styles.IamText}>
          {this.state.year ? this.state.year : "YYYY"}
        </Text>
      </TouchableOpacity>
    </View>

    {
      this.state.showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={this.state.dateTime}
          maximumDate={new Date()}
          is24Hour={true}
          display="default"
          onChange={(event, selectedDateTime) => {
            if (event?.type === "set") {
              // @ts-ignore
              const selectedDate = new Date(selectedDateTime);
              const currentDate = new Date();
              const minDate = new Date();
              minDate.setFullYear(currentDate.getFullYear() - 18);

              if (selectedDate < minDate) {
                // Valid date, continue with the logic
                const formattedDate = moment(selectedDateTime).format(
                  "DD-MM-YYYY"
                );
                this.setState({
                  dateTime: selectedDateTime
                    ? selectedDateTime
                    : this.state.dateTime,
                  month: formattedDate?.split("-")[1],
                  date: formattedDate?.split("-")[0],
                  year: formattedDate?.split("-")[2],
                  showPicker: false,
                  dateofbirth: formattedDate,
                });
              } else {
                // Invalid date, handle the error
                showMessage({
                  message: "Age Should Be  18 Years OR More",
                  type: "none",
                });
                return false;
              }
            } else {
              this.setState({
                showPicker: false,
              });
            }
          }}
        />
      )
    }
    </>
    )
  }
  async componentDidMount() {
    // Customizable Area Start
    const nameData: any = await getStorageData("FIRSTNAME");
    if (nameData) {
      this.setState({ addName: nameData });
    }
    // Customizable Area End
  }
}
// Customizable Area Start
const styles = StyleSheet.create({
  dateBtn: {
    borderWidth: 2,
    borderColor: "#Cf3435",
    marginTop: 55,
  },
  continueBtn: {
    marginVertical: scaledSize(25),
    justifyContent: "center",
    alignItems: "center",
    ...style.btnStyle,
  },
  continueText: {
    textAlign: "center",
    ...style.btnTextStyle,
  },
  IdentifyText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: scaledSize(24),
    color: "#000",
    fontFamily: style.meduim,
  },
  IdentifySubText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: scaledSize(14),
    color: "#000",
    fontFamily: style.meduim,
  },
  MySelfBtn: {
    flexDirection: "row",
    textAlign: "left",
    backgroundColor: "#00000000",
    includeFontPadding: true,
    padding: 10,
    marginLeft: 10,
    color: "#000",
    width: "80%",
    ...style.inputTextStyle,
  },
  myselfText: {
    fontSize: scaledSize(16),
    color: "#000",
    fontWeight: "bold",
  },
  nameContianer: {
    flexDirection: "row",
    // backgroundColor: "#000",
    marginBottom: 16,
    // borderBottom: 1,
    // borderColor: "#000",
    borderRadius: 10,
    paddingLeft: 5,
    borderWidth: 1,
    width: "100%",
    marginTop: 12,
  },
  myselfContainer: {
    marginTop: 10,
  },
  profileImg: {
    height: 20,
    width: 20,
    marginTop: 13,
    marginLeft: 10,
    tintColor: "black",
  },
  IamText: {
    fontSize: scaledSize(16),
    color: style.black,
    textAlign: "center",
    padding: 2,
    fontFamily: style.regular,
  },
  IamTextFocused: {
    fontSize: scaledSize(16),
    color: style.white,
    textAlign: "center",
    padding: 2,
    fontFamily: style.regular,
  },
  genderBackgroundColor: {
    backgroundColor: "#000",
  },
  genderContainer: {
    width: scaledSize(85),
    height: scaledSize(48),
    opacity: 1,
    borderRadius: 10,
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#000",
  },
  IamContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scaledSize(12),
  },
  InterestedContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scaledSize(12),
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scaledSize(12),
  },
  interestedText: {
    fontSize: scaledSize(16),
    fontFamily: style.bold,
    color: style.black,
    marginTop: scaledSize(10),
  },
  dateText: {
    fontSize: scaledSize(16),
    fontFamily: style.bold,
    color: style.black,
    marginTop: scaledSize(10),
  },
  inputErrorTextStyle: {
    fontSize: scaledSize(14),
    textAlign: "left",
    bottom: 10,
    color: style.red,
  },
});
// Customizable Area End
