import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
  Image
} from "react-native";
import { bellIcon,  } from "./assets";
import Scale from "../../../components/src/Scale";
import Feather from "react-native-vector-icons/Feather";
const data = [{
  name: 'Riya', level: 'Leval3', intimacy: '85% + 4%', compatibility: '+72%',
  image: "https://source.unsplash.com/user/c_v_r/100×100", description: 'chaerly wants to die old age '
},
{
  name: 'Riya', level: 'Leval3', intimacy: '85%', compatibility: '+72%',
  image: "https://source.unsplash.com/user/c_v_r/100×100", description: 'chaerly wants to die old age '
},
{
  name: 'Riya', level: 'Leval3', intimacy: '85%', compatibility: '+72%',
  image: "https://source.unsplash.com/user/c_v_r/100×100", description: 'chaerly wants to die old age '
}]
// Customizable Area End
import DashboardController, { Props } from "./DashboardController";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import moment from "moment";
export default class Dashboard extends DashboardController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start
  renderDashboardItems = ({ item }: any) => {
    return (
      <View style={styles.dashboardItemView}>
        <TouchableOpacity
          style={{ flex: 1, flexDirection: "row", height: hp("7%") }}
        >
          <View
            style={{
              flex: 2,
              marginLeft: wp("6%"),
              justifyContent: "space-evenly",
              alignItems: "flex-start"
            }}
          >
            <Text style={{ fontSize:  18, textAlign: "center" }}>
              {item.attributes.title}
            </Text>
            <Text style={{ fontSize:  12 , textAlign: "center" }}>
              {moment(item.attributes.created_at).format("DD MMM YYYY")}
            </Text>
          </View>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontSize:  14, textAlign: "center" }}>
              {item.attributes.value}/-
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  // Customizable Area End
    
  render() {
    // Customizable Area Start
    return (
      //Merge Engine DefaultContainer
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={styles.container}
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          {/* Customizable Area Start */}
          {/* Merge Engine UI Engine Code */}
          <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <TouchableOpacity style={{ justifyContent: 'flex-end', padding: 10, flexDirection: 'row', }} onPress={() => this.props.navigation.navigate("Notifications")}>
              <Image source={bellIcon} style={{ height: 20, width: 20, tintColor: 'grey', marginTop: 10 ,marginRight:Scale(10)}} />
            </TouchableOpacity>

              <View style={{ height:Scale(90), borderWidth:0.5, borderColor: '000' ,margin: 15, borderRadius: 8, padding: 10, }}>
                <View style={{  flexDirection: 'row', justifyContent: 'space-between', }} >
                  <Text style={{fontWeight:'bold',color:'#000'}}>Question of the day</Text>
                  <Feather name="chevron-right" size={25} color="#000" />
                </View>
                  <Text style={{color:'#9e9e9e'}}>
                    Lorem p sipsum dolor sit amet consectetur adipisicing elit. Eum asperiores consequatur
                  </Text>
              </View>

              <View style={{  width: '80%', marginLeft: '10%', marginBottom: 5 }}>
                <View style={{  justifyContent: 'center', alignItems: 'center', marginLeft: 15 }}>
                  <Text style={{color:'black',fontWeight:'200',}}>"Lorem ipsum dolor sit amet consectetur {"\n"} adipisicing elit Quae"</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <Text style={{fontWeight:'200',color:'#000'}}>Lorem ipsum dolor sit</Text>
                </View>

              </View>
            <Text style={{ fontWeight: 'bold', marginLeft: 10,marginTop:10,marginBottom:5,color:'#000' }}>People Status</Text>

            {data?.map((item,index)=>{
              return(
              <View style={{height:Scale(120), margin:10 ,borderRadius:8, backgroundColor: '#eeeeee', padding: 10 }}>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <View style={{ flexDirection: 'row',justifyContent:'space-between',backgroundColor:'#eeeeee', }}>
                <View>               
                  <Image source={{uri:item.image}} style={{ height: 45, width: 60,}} />
                </View>
 
                <View style={{ flexDirection: 'column',paddingLeft:10 ,backgroundColor:'#eeeeee'}}>

                  <Text style={{fontWeight:'bold',color:'#000'}}>
                    {item.name}
                  </Text>
                  <Text style={{fontWeight:'500',color:'#000'}}>
                    {item.level}
                  </Text>
                </View>
                </View>
              <View style={{backgroundColor:'#eeeeee',alignItems:'flex-end'}}>                
                  <View style={{paddingLeft:5}}>
                  <Text style={{color:'#9e9e9e'}}>Intimacy {item.intimacy}</Text>
                </View>

                <View>
                <Text style={{color:'#9e9e9e'}}>Compatability {item.compatibility}</Text>
                </View>
                </View>
            </View>
            <View style={{borderWidth:0.5,flex:.0001,marginTop:15,borderColor:'#9e9e9e',height:1}}/>
            <View style={{flex:.5,backgroundColor:'#eeeeee',marginTop:8}}>
              <Text style={{color:'#9e9e9e'}}>
                {item.description}
              </Text>
            </View>
            </View>
           ) })}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
          </View>
          {/* Merge Engine UI Engine Code */}
          {/* Customizable Area End */}
        </TouchableWithoutFeedback>
      </ScrollView>
      //Merge Engine End DefaultContainer
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#ffffff"
  },
  dashboardItemView: {
    flex: 1,
    marginHorizontal: 5,
    marginVertical: hp("2%"),
    width: Platform.OS === "web" ? "80vw" : wp("90%"),
    maxWidth: Platform.OS === "web" ? 600 : wp("90%"),
    borderRadius: hp("3%"),
    backgroundColor: "#ffffff",
    shadowColor: "#c3c3c3",
    shadowOffset: {
      width: 2,
      height: 3
    },
    shadowOpacity: 0.6,
    shadowRadius: 5.62,
    elevation: 6
  },
  title: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },
  body: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },
  bgPasswordContainer: {
    flexDirection: "row",
    backgroundColor: "#00000000",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    padding: 10,
    borderWidth: Platform.OS === "web" ? 0 : 1
  },
  bgMobileInput: {
    flex: 1
  },
  showHide: {
    alignSelf: "center"
  },
  imgShowhide: Platform.OS === "web" ? { height: 30, width: 30 } : {}
});
// Customizable Area End
