//@ts-nocheck
// Customizable Area Start
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  BackHandler
} from "react-native";
import { leftbutton } from "./assets";
import identifyYourSelfController, {
  Props
} from "./IdentifyYourSelfController";
import { scaledSize } from "framework/src/Utilities";
import CustomLoader from "../../../components/src/CustomLoader";
import { verticalScale } from "../../../components/src/Scale";
import { style } from "../../../components/src/CustomFonts";
// Customizable Area End

export default class UpdateIdentifyScreen1 extends identifyYourSelfController {
  constructor(props: Props) {
    // Customizable Area Start
    super(props);
    // Customizable Area End
  }

  async componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  async componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  componentDidMount() {
    this.UpdateUserIdentifyYourSelf()
  }
  handleBackButtonClick() {
    this.props.navigation.goBack()

    return true;
  }
  render() {
    const found1 = this.state.currentAns.some(el => el.option === this.state.currentQuestion?.questions?.option1);
    const found2 = this.state.currentAns.some(el => el.option === this.state.currentQuestion?.questions?.option2);
    const found3 = this.state.currentAns.some(el => el.option === this.state.currentQuestion?.questions?.option3);
    const found4 = this.state.currentAns.some(el => el.option === this.state.currentQuestion?.questions?.option4);
    
    // Customizable Area Start
    return (
      //Required for all blocks
      <>
        <SafeAreaView style={{ "flex": 1 }}>
          <ScrollView
            style={{ "flex": 1 }}
            showsVerticalScrollIndicator={false}
            bounces={false}>
          {this.state.count ? <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginVertical: verticalScale(10) }}>
            <TouchableOpacity 
            testID="onPrivousFun"
            style={{ marginLeft: 30 }}
              onPress={() => this.priousUpdateFunction(this.state.currentQuestion?.questions)}>
              <Image source={leftbutton} style={{ height: 19, width: 11 }} />
            </TouchableOpacity>

            <View>
            </View>
          </View> : null}
            <View>
              <Text style={styles.IdentifyText}>
                Identify Yourself
              </Text>
              <Text style={styles.IdentifySubText}>Lorem ipsum dolor sit amet,consectetur</Text>
              <Text style={styles.IdentifySubText2}>elit.Nam accumsan hendrerit</Text>
            </View>

            <View>
              <View style={styles.myselfContainer}>
                <Text style={styles.myselfText}>{this.state.currentQuestion?.questions?.question}</Text>
              </View>
              <TouchableOpacity 
              testID="option1"
              onPress={() => this.handleCheckOptions(this.state.currentQuestion?.questions?.option1)}
                style={[found1 ? styles.selectedOpContainer : styles.optionsContainer, { width: scaledSize(320) }]}>
                <View style={[ found1 ?  styles.selectedEmt : styles.emptybtn]}>
                  <Text style={{
                    color: '#000', textAlign: 'center',
                  }}>
                     {this.getCurrentAns("get1")}
                  </Text>
                </View>
                <Text style={[styles.selectedBtn , {color:this.getColor(found1)} ]}>{this.state.currentQuestion?.questions?.option1}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.handleCheckOptions(this.state.currentQuestion?.questions?.option2)}
                style={[found2 ? styles.selectedOpContainer : styles.optionsContainer, { width: scaledSize(320) }]} testID="option2">
                <View style={[found2 ? styles.selectedEmt : styles.emptybtn]}>
                  <Text style={{ color: '#000', textAlign: 'center' }}>
                  {this.getCurrentAns("get2")}
                   </Text>
                </View>
                <Text  style={[styles.selectedBtn , {color:this.getColor(found2)} ]}>{this.state.currentQuestion?.questions?.option2}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.handleCheckOptions(this.state.currentQuestion?.questions?.option3)}
                style={[found3 ? styles.selectedOpContainer : styles.optionsContainer, { width: scaledSize(320) }]} testID="option3">
                <View style={[found3 ? styles.selectedEmt : styles.emptybtn]}>
                  <Text style={{ color: '#000', textAlign: 'center' }}>
                  {this.getCurrentAns("get3")}
                  </Text>
                </View>
                <Text   style={[styles.selectedBtn , {color:this.getColor(found3)} ]}>{this.state.currentQuestion?.questions?.option3}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.handleCheckOptions(this.state.currentQuestion?.questions?.option4)}
                style={[found4 ? styles.selectedOpContainer : styles.optionsContainer, { width: scaledSize(320) }]} testID="option4">
                <View style={[found4 ? styles.selectedEmt : styles.emptybtn]}>
                  <Text style={{ color: '#000', textAlign: 'center' }}>
                  {this.getCurrentAns("get4")}
                   </Text>
                </View>
                <Text  style={[styles.selectedBtn , {color:this.getColor(found4)} ]}>{this.state.currentQuestion?.questions?.option4}</Text>
              </TouchableOpacity>
              <View
                style={{
                  marginTop: 20,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <View data-elementId="view_Line" style={styles.view_Line} />
                <Text
                  data-elementId="textlabel_TermsTextCopy2"
                  style={styles.titleOr}
                >
                  OR
                </Text>
                <View
                  data-elementId="view_LineCopy"
                  style={styles.view_LineCopy}
                />
              </View>
              <TouchableOpacity onPress={() => this.handleNoPreference1()} testID="noPreference"
                style={[this.state.noPreference1 ? styles.selectedOpContainer : styles.optionsContainer, { width: scaledSize(320) }]}>
                <View style={[this.state.noPreference1 ? styles.selectedEmt : styles.emptybtn]}>
                  <Text style={{ color: '#000', textAlign: 'center' }}>
                    {this.state.noPreference1 ? '✔' : ''}
                  </Text>
                </View>
                <Text style={[styles.selectedBtn , {color:this.getColor(this.state.noPreference1)} ]}>No Preference</Text>
              </TouchableOpacity>
              {this.onCheckCount()}
            </View>
          </ScrollView>
            <TouchableOpacity 
            testID="onContinue"
            style={styles.continueBtn} 
            onPress={() => {
              this.countFunctionUpdateIdentify()
            
            }}>
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
          {this.state.isLoading && <CustomLoader />}

        </SafeAreaView>

      </>
    );
    // Customizable Area End
  }
}
// Customizable Area Start
const styles = StyleSheet.create({
  continueBtn: {
    margin: scaledSize(20),
    opacity: 1,
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    justifyContent: 'center',
    height: scaledSize(45),
    borderRadius: scaledSize(10),
    backgroundColor: style.black,
  },
  continueText: {
    includeFontPadding: false,
    padding: 2,
    color: style.white,
    textAlign: 'center',
    ...style.btnTextStyle,
  },
  IdentifyText: {
    position: 'relative',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'DMSans-Medium',
  },
  IdentifySubText: {
    position: 'relative',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
    color: '#000',
    fontFamily: 'DMSans-Regular',
  },
  IdentifySubText1: {
    position: 'relative',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
    color: 'grey',
    fontFamily: 'DMSans-Regular',
  },
  IdentifySubText2: {
    textAlign: 'center',
    fontSize: 14,
    color: '#000',
  },
  MySelfBtn: {
    flexDirection: "row",
    fontSize: 16,
    textAlign: "left",
    backgroundColor: "#00000000",
    includeFontPadding: true,
    padding: 10,
    marginLeft: 17,
    color: '#000',
  },
  myselfText: {
    marginLeft: 25,
    fontSize: 15,
    color: '#000',
    letterSpacing: 0.5,
    fontWeight: 'bold',
  },
  myselfText1: {
    marginLeft: 25,
    fontSize: 15,
    color: '#000',
    letterSpacing: 0.5,
    fontWeight: 'bold',
  },
  myselfContainer: {
    marginTop: 15,
  },
  selectedEmt: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 50,
    marginTop: 8,
    marginLeft: 20,
   // backgroundColor: '#000',
  },
  emptybtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 50,
    marginTop: 8,
    marginLeft: 20,
  },
  selectedOpContainer: {
    height: 50,
    width: 350,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 15,
    marginLeft: 20,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
  },
  optionsContainer: {
    height: 50,
    width: 350,
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 15,
    marginLeft: 20,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
  },
  textbtn: {
    color: 'grey',
    fontSize: 15,
    marginTop: 10,
    marginLeft: 20,
  },
  selectedBtn: {
    fontSize: 15,
    marginTop: 10,
    marginLeft: 20,
    fontWeight:'bold'
  },
  view_Line: {
    width: 130,
    height: 1,
    opacity: 1,
    borderColor: "rgba(151, 151, 151, 1)",
    borderRadius: 0,
    borderWidth: 1,
  },
  view_LineCopy: {
    width: 130,
    height: 1,
    opacity: 1,
    borderColor: "rgba(151, 151, 151, 1)",
    borderRadius: 0,
    borderWidth: 1,
  },
  titleOr: {
    color: "rgba(0, 0, 0, 1)",
    textAlign: "center",
    fontFamily: "DMSans-Regular",
  },
});
// Customizable Area End
