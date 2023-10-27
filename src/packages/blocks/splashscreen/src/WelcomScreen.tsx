import React, { Component } from "react";
// Customizable Area Start
import { 
  StyleSheet,  
  Image, 
  View, 
} from "react-native";
// Customizable Area End

import { Props } from "./SplashscreenController";

import { getStorageData } from "../../../framework/src/Utilities";
import { scaledSize } from "framework/src/Utilities";
import { logo } from "./assets";

export default class WelcomeScreen extends Component<Props> {
    constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    const res = await getStorageData('token');
    console.log("res3523",res)
        const token = await getStorageData('logintoken');
    
        setTimeout(() => {      
       
        if (token!= null ) {
          console.log('else part098',token);
          this.props.navigation.navigate("Footer");
          //this.props.navigation.navigate('UserProfileBasicBlock')
        } 
        else {
          console.log('else part');
          this.props.navigation.navigate('Splashscreen')
        }
      
    }, 2000)
     }
  
  // Customizable Area End

  render() {
    return (
      <View style={styles.main}>
          {/* <Image source={imgSplash} style={{ width: 150, height: 150, resizeMode: "contain" }} /> */}
          <Image data-elementId='image_LogoImage'
            style={{height:scaledSize(160),width:scaledSize(200)}}
            source={logo}
          resizeMode="contain"/>
          {/* <Text style={styles.head}>dahlia</Text> */}
        </View>
    );
  }
}




// Customizable Area Start
const styles = StyleSheet.create({
    main: { flex: 1, justifyContent: "center", alignItems: "center" },
    head: { fontSize: 100, fontWeight: "bold", color: "#000" },
  });
// Customizable Area End
