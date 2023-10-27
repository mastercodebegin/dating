import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
//@ts-ignore
import { SliderBox } from "react-native-image-slider-box";
import { deviceWidth, scaledSize } from "framework/src/Utilities";
import { nullImage } from "../../QuestionBank/src/assets";
import { style } from "../../../components/src/CustomFonts";
// Customizable Area End

import UserProfileBasicControllerNew, {
  Props
} from "./UserProfileBasicControllerNew";

export default class UserProfileBasicBlockNew extends UserProfileBasicControllerNew {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderOnboardingItem = ({ item }: any) => {
    return (
      <View style={styles.child}>
        <ImageBackground source={{ uri: item.url }} style={styles.imageStyle} />
      </View>
    );
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    const imgUrls = this.state.imageData.map((data: any) => data.url);
    return (
      <KeyboardAvoidingView
        behavior={this.isPlatformiOS() ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        {/* Required for all blocks */}
        <ScrollView 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always" style={styles.container}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.hideKeyboard();
            }}
          >

            {/* Customizable Area Start */}
            {/* Merge Engine UI Engine Code */}
            <View>
              <View style={styles.main}>
                <View style={styles.flatlistContainer}>
                  <View style={styles.imageHead}>
                    <TouchableOpacity
                      testID="onSelectImage"
                      onPress={() => this.onClickEditIcon()}>
                      <View style={styles.imageIcon}>
                        <AntDesign name="edit" size={20} color="#fff" />
                      </View>
                    </TouchableOpacity>
                  </View>
                  {imgUrls.length == null ?
                    <Image
                      source={nullImage}
                      resizeMode={"cover"}
                      style={styles.imageStyle}
                    />:
                    <SliderBox
                      images={imgUrls}
                      testID="swiperID"
                      autoplay
                      dotColor="#FFF"
                      inactiveDotColor="#90A4AE"
                      autoplayInterval={4000}
                      circleLoop
                      ImageComponentStyle={styles.imageStyle}
                      resizeMode={"cover"}
                    />
                  }
                </View>
                <View style={styles.title}>
                  <Text style={styles.name}>{
                    this.state.isFistName?.name ? this.state.isFistName.name : "N/A"
                  }</Text>
                  <Text style={styles.username}>{
                    this.state.user_name?.user_name ? this.state.user_name?.user_name : "N/A"
                  }</Text>
                </View>
                <View>
                  <Text style={styles.about}>About</Text>
                  <Text numberOfLines={3} style={styles.details}>
                    {!!this.state.data && this.state.data.about ? this.state.data.about : "N/A"}
                  </Text>
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text style={styles.prefrenceTextStyle}>
                    Profile preferences
                  </Text>
                  <View style={styles.prefrenceContainer}>
                    <View style={styles.content}>
                      <Text style={styles.text}>Show me</Text>
                      <Text style={styles.text}>
                        {this.state.data?.interest?.interest ?
                          this.state.data?.interest?.interest : "N/A"}
                      </Text>
                    </View>
                    <View style={styles.content}>
                      <Text style={styles.text}>Distance</Text>
                      <Text style={styles.text}>{
                      this.onCheckValue()
                    }</Text>
                    </View>
                    <View style={styles.content}>
                      <Text style={styles.text}>Age between</Text>
                     <View style={{flexDirection:'row'}}>
                     <Text style={styles.text}>{
                      this.onCheckValue()
                      }</Text>
                        <Text style={styles.text}>{
                        this.state.data?.age_between?.age_between  ? " yrs"   : "" 
                      }</Text>
                     </View>
                      
                    </View>
                    <View style={styles.lookingForStyle}>
                      <Text style={styles.text}>Looking for</Text>
                      <Text style={styles.text}>{
                        this.state.data?.relationship_type?.relationship_type ? this.state.data?.relationship_type?.relationship_type : "N/A"}</Text>
                    </View>
                  </View>
                </View>
                <View style={{ marginVertical: 20 }}>
                  <Text style={styles.prefrenceTextStyle}>
                    Others
                  </Text>
                  <View style={styles.othersContainer}>
                    <TouchableOpacity
                      testID="btnAddExample"
                      onPress={() =>
                        this.props.navigation.navigate("AccountSetting", {
                          dataUser: this.state.data
                        })
                      }
                      style={styles.content}
                    >
                      <Text style={styles.text}>Account settings</Text>
                      <Feather name="chevron-right" size={20} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      testID="btnAddExample1"
                      onPress={() =>
                        this.props.navigation.navigate("PrivacyPolicyScreen")
                      }
                      style={styles.lookingForStyle}
                    >
                      <Text style={styles.text}>Privacy settings</Text>
                      <Feather name="chevron-right" size={20} color="#000" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.footer}>
                <Text style={styles.qestionOfTextStyle}>
                  Question of the day
                </Text>
                <View style={{ paddingHorizontal: scaledSize(35), paddingBottom: scaledSize(55) }}>
                  <Text style={{ fontSize: style.f16, fontWeight: "500", color: "#fff" }}>
                    What would you Pick?
                  </Text>
                  <View style={styles.footerView}>
                    <TouchableOpacity onPress={() => this.setState({ check: 0 })}>
                      {this.state.check == 0 ? (
                        <AntDesign name="checkcircle" size={scaledSize(20)} color="#fff" />
                      ) : (
                        <Entypo name="circle" size={scaledSize(20)} color="#fff" />
                      )}
                    </TouchableOpacity>
                    <Text style={styles.footerText}>
                      vibrant nightlife but poor air quality.
                    </Text>
                  </View>
                  <View style={styles.footerView}>
                    <TouchableOpacity onPress={() => this.setState({ check: 1 })}>
                      {this.state.check == 1 ? (
                        <AntDesign name="checkcircle" size={scaledSize(20)} color="#fff" />
                      ) : (
                        <Entypo name="circle" size={scaledSize(20)} color="#fff" />
                      )}
                    </TouchableOpacity>
                    <Text style={styles.footerText}>
                      a city with clean air but a dull nightlife.
                    </Text>
                  </View>
                </View>

              </View>
            </View>


            {/* Customizable Area End */}
            {/* Merge Engine UI Engine Code */}
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    );
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    this.getValidations();
    this.requestSessionData();
    this.getUserProfileData()
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.getUserProfileData();
      }
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
    backgroundColor: "#fff"
  },
  main: {
    paddingTop: 10,
    paddingHorizontal: 15
  },
  image: {
    height: 300
  },
  imageHead: {
    top: 20,
    position: 'absolute',
    zIndex: 10,
    right: 10,
    // paddingHorizontal: 15,
  },
  backIcon: {
    backgroundColor: "#000",
    borderRadius: 10,
    padding: 10
  },
  imageIcon: {
    backgroundColor: "#000",
    borderRadius: 10,
    padding: 10
  },
  title: {
    paddingTop: scaledSize(15),
    paddingBottom: scaledSize(20),
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
  prefrenceTextStyle: { 
    fontSize: style.f16, 
    fontFamily: style.meduim,
    color: style.black,
    fontWeight: "500" 
  },
  text: {
    fontSize: scaledSize(14),
    fontFamily: style.regular,
    color: style.black,
  },
  prefrenceContainer: {
    backgroundColor: style.white,
    borderRadius: scaledSize(12),
    paddingHorizontal: scaledSize(10),
    paddingVertical: scaledSize(7),
    shadowColor: style.white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    marginTop: scaledSize(10),
  },
  othersContainer: {
    paddingHorizontal: scaledSize(10),
    marginVertical: scaledSize(10),
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: scaledSize(1),
    borderBottomColor: style.gray2,
    paddingVertical: scaledSize(10),
  },
  lookingForStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: scaledSize(10),
  },
  footer: {
    backgroundColor: "#3d3d3d"
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
    marginBottom: scaledSize(30),
},
footerView: {
  flexDirection: "row",
  borderWidth: scaledSize(1),
  borderColor: "#fff",
  borderRadius: scaledSize(10),
  padding: scaledSize(12),
  marginTop: scaledSize(10),
  alignItems: "center",
  flex: 1,
},
footerText: {
  flex: 1,
  fontSize: scaledSize(14),
  fontWeight: "500",
  color: "#fff",
  marginLeft: scaledSize(10),
},
  flatlistContainer: {
    height: scaledSize(220),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    width: deviceWidth - 20,
    alignSelf: "center",
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
});
// Customizable Area End
