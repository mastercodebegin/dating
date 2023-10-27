//@ts-nocheck
import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
import ProgressCircle from "react-native-progress-circle";
import ImageSlider from 'react-native-image-slider';
import { style } from "../../../components/src/CustomFonts";
// Customizable Area End
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
//@ts-nocheck
import { backIcon } from "../../mobile-account-registration/src/assets";
import InsightsScreenController, { Props } from "./InsightsScreenController";
import { deviceWidth, scaledSize } from "framework/src/Utilities";
import Scale from "../../../components/src/Scale";
import { hearts1, hearts2 } from "./assets";
import CustomLoader from "../../../components/src/CustomLoader";

export default class InsightsScreen extends InsightsScreenController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End
  herOrHim = () => this.state.suggestFrdDetail?.attributes?.gender == "Female" ? "her" : "him"

  renderUserQuestionItem = (item, index) => (
    <TouchableOpacity
      testID="optionBtnID"
      onPress={() => this.setState({ check: item })}
      style={styles.footerView}
    >
      <View>
        {this.state.check == item ? (
          <AntDesign name="checkcircle" size={scaledSize(20)} color="#fff" />
        ) : (
          <Entypo name="circle" size={scaledSize(20)} color="#fff" />
        )}
      </View>
      <Text style={styles.footerText}>
        {item}
      </Text>
    </TouchableOpacity>
  )

  renderQuestionComponent = () => (
    <View style={styles.footer}>
      <Text
        style={styles.qestionOfTextStyle}
      >
        {`${this.state.suggestFrdDetail?.attributes?.user_name} 's question of the day`}
      </Text>
      <Text
        style={styles.quetionDescStyle}
      >
        {`Guess ${this.herOrHim()} response to invite ${this.herOrHim()} to play`}
      </Text>
      <View style={{ paddingHorizontal: scaledSize(35), paddingBottom: scaledSize(55) }}>
        <Text
          style={{ fontSize: style.f16, fontWeight: "500", color: "#fff" }}
        >
          {`${this.state.userQuestion?.data?.attributes?.question}`}
        </Text>
        <FlatList
        testID="flatListID"
          data={this.state.userQuestion?.data?.attributes?.option}
          renderItem={({ item, index }) => this.renderUserQuestionItem(item, index)}
        />

        {this.state.check.length ? (<TouchableOpacity
          testID="gotUpdateBtn"
          onPress={() => this.questionAnswer()}
          style={styles.buttonField}
        >
          <Text style={styles.inputTxt1}>
            Continue
          </Text>
        </TouchableOpacity>) : null
        }
      </View>
    </View>
  )

  render() {
    // Customizable Area Start
    const isAttempted = this.props.navigation?.state?.params?.is_attempted
    const suggested_friends = this.state.suggestFrdDetail?.attributes?.suggested_friends
    const question_hide = this.state.suggestFrdDetail?.attributes?.question_hide
    console.log("isAttempted", isAttempted)
    console.log("suggested_friends", suggested_friends)
    console.log("question_hide", question_hide)

    const renderQuestionWithCondition = () => {
      if (suggested_friends) {
        if (!isAttempted) return this.renderQuestionComponent();
        return null;
      } else {
        if (!question_hide) return this.renderQuestionComponent();
        return null;
      }
    }

    return (
      <KeyboardAvoidingView

        style={{ flex: 1 }}
      >
        {/* Required for all blocks */}
        <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
          <TouchableWithoutFeedback

          >
            {/* Customizable Area Start */}
            {/* Merge Engine UI Engine Code */}
            <View>
              <View style={styles.imageHead}>
                <TouchableOpacity
                  testID="onHeaderID"
                  onPress={() => this.props.navigation.goBack()}
                >
                  <Image
                    source={backIcon}
                    resizeMode={"contain"}
                    style={{
                      width: 30,
                      height: 20,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.main}>
                <ImageSlider
                testID="swiperID"
                  autoPlayWithInterval={4000}
                  images={this.state.frdImage}
                  customSlide={({ index, item, style, width }) => (
                    <View key={index} style={[style, styles.flatlistContainer]}>
                      <Image source={{ uri: item }}
                      blurRadius={this.imgBlurCondition(index)}
                       style={styles.imageStyle} />
                    </View>
                  )}
                />
                <View style={styles.title}>
                  <Text style={styles.name}>
                    {this.state.suggestFrdDetail?.attributes?.first_name || "N/A"}
                  </Text>
                  <Text style={styles.username}>
                    {this.state.suggestFrdDetail?.attributes?.user_name || "N/A"}
                  </Text>
                </View>
                <View style={styles.aboutContainer} >
                  <Text style={styles.about}>About</Text>
                  <Text numberOfLines={3} style={styles.details}>
                    {this.state.suggestFrdDetail?.attributes?.about || "N/A"}
                  </Text>
                </View>

                <View style={styles.BetTheTwoMainView}>
                  <Text style={styles.txtHeadingMain}>
                    Between the two of you
                  </Text>
                  <View style={styles.CompatabilityMainView}>
                    <View style={styles.Compatability}>
                      <ProgressCircle
                        percent={this.state.compatability}
                        radius={scaledSize(33)}
                        borderWidth={scaledSize(4)}
                        shadowColor="#f2f2f2"
                        color="#999"
                        bgColor="#fff"
                      >
                        <Image style={styles.HeartImg} source={hearts2} />
                      </ProgressCircle>
                      <Text style={styles.txtCompatabilityHeart}>
                        Compatability
                      </Text>
                      <Text style={styles.txtPercentage}>
                        {"+" + this.state.suggestFrdDetail?.attributes?.comtability + "%"}
                      </Text>
                    </View>
                    <View style={styles.Compatability}>
                      <ProgressCircle
                        percent={this.state.intimacy}
                        radius={scaledSize(33)}
                        borderWidth={scaledSize(4)}
                        shadowColor="#f2f2f2"
                        color="#999"
                        bgColor="#fff"
                      >
                        <Image style={styles.HeartImg} source={hearts1} />
                      </ProgressCircle>
                      <Text style={styles.txtCompatabilityHeart}>
                        Intimacy
                      </Text>
                      <Text style={styles.txtPercentage}>
                        {"+" + this.state.suggestFrdDetail?.attributes?.intemancy + "%"}
                      </Text>
                    </View>
                  </View>
                </View>

                {renderQuestionWithCondition()}
              </View>
            </View>

            {/* Customizable Area End */}
            {/* Merge Engine UI Engine Code */}
          </TouchableWithoutFeedback>
        </ScrollView>
        {this.state.isLoading && <CustomLoader isLoading={this.state.isLoading} />}
      </KeyboardAvoidingView>
    );
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End
}
// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  main: {
    paddingTop: 20,
  },
  image: {
    height: 300,
  },
  imageHead: {
    marginTop: 15,
    paddingHorizontal: 15,
    alignItems: "flex-start",
  },
  imageIcon: {
    backgroundColor: "#000",
    borderRadius: 10,
    padding: 10,
  },
  inputTxt1: {
    fontSize: 20,
    color: "#000",
    textAlign: "center",
    alignItems: "center",
  },
  userImagestyle: {
    width: deviceWidth - 20,
    height: scaledSize(220),
    resizeMode: "cover",
    borderRadius: 12,
    alignSelf: "center",
    paddingHorizontal: 10,
  },
  title: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 15,
  },
  aboutContainer: {
    paddingHorizontal: 15,
  },
  name: {
    fontSize: style.f22,
    fontFamily: style.bold,
    color: style.black,
    fontWeight: "800",
  },
  username: {
    fontSize: style.f14,
    fontFamily: style.meduim,
    color: style.gray1,
    fontWeight: "400",
  },
  about: {
    fontSize: style.f16,
    fontFamily: style.meduim,
    color: style.black,
  },
  details: {
    fontSize: style.f12,
    marginTop: scaledSize(4),
    color: style.descColor,
  },
  footer: {
    marginTop: 10,
    backgroundColor: "#3d3d3d",
  },
  qestionOfTextStyle: {
    paddingTop: 20,
    fontSize: style.f14,
    fontFamily: style.meduim,
    fontWeight: "800",
    borderBottomColor: "#fff",
    borderBottomWidth: 2,
    alignSelf: "center",
    color: "#fff",
  },
  quetionDescStyle: {
    marginTop: scaledSize(8),
    marginBottom: scaledSize(30),
    fontSize: style.f14,
    fontFamily: style.meduim,
    alignSelf: "center",
    color: style.bgGray,
    fontWeight: "bold",
  },
  footerView: {
    flexDirection: "row",
    borderWidth: scaledSize(1),
    borderColor: "#fff",
    borderRadius: scaledSize(10),
    padding: scaledSize(12),
    marginTop: scaledSize(10),
    alignItems: "center",
  },
  footerText: {
    fontSize: scaledSize(14),
    fontWeight: "500",
    color: "#fff",
    marginLeft: scaledSize(10),
  },
  flatlistContainer: {
    height: scaledSize(220),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  child: {
    width: deviceWidth - 84,
    height: scaledSize(220),
  },
  imageStyle: {
    width: deviceWidth - 20,
    height: scaledSize(220),
    resizeMode: "cover",
    borderRadius: 12,
    alignSelf: "center",
    paddingHorizontal: 10,
  },
  BetTheTwoMainView: {
    paddingVertical: 20,
    marginHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  txtHeadingMain: {
    marginBottom: 15,
    fontWeight: "600",
    color: style.black,
    fontSize: style.f16,
    fontFamily: style.meduim,
    alignSelf: 'flex-start'
  },
  CompatabilityMainView: {
    width: "100%",
    paddingVertical: 20,
    backgroundColor: "white",
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
  },
  Compatability: {
    justifyContent: "center",
    alignItems: "center",
  },
  HeartImg: {
    height: Scale(45),
    width: Scale(45),
    resizeMode: "contain",
  },
  txtCompatabilityHeart: {
    fontSize: style.f12,
    fontFamily: style.meduim,
    marginTop: Scale(5),
    fontWeight: "600",
    color: '#000'
  },
  txtPercentage: {
    fontSize: style.f16,
    fontFamily: style.meduim,
    marginTop: Scale(3),
    fontWeight: "700",
    color: style.gray3,
  },
  buttonField: {
    justifyContent: "center",
    borderRadius: 13,
    paddingHorizontal: 20,
    paddingVertical: 14,
    fontSize: 16,
    marginVertical: 20,
    backgroundColor: "#fff",
  },
});

// Customizable Area End
