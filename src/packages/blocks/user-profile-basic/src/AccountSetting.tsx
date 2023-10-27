//@ts-nocheck

// Customizable Area Start
import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { backIcon } from "../../mobile-account-registration/src/assets";
import AccountSettingController, {
    Props
} from "./AccountSettingController";
import { style } from "../../../components/src/CustomFonts";
import { scaledSize } from "framework/src/Utilities";
import { profileEdit } from "./assets";
// Customizable Area End

export default class AccountSetting extends AccountSettingController {
    constructor(props: Props) {
        // Customizable Area Start
        super(props);
        // Customizable Area End
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        testID="onGoBack"
                        onPress={() => this.props.navigation.goBack()}>
                        <Image source={backIcon}
                            resizeMode={'contain'}
                            style={{
                                width: 30,
                                height: 20,
                            }} />
                    </TouchableOpacity>
                    <Text style={styles.headeTxt}>Account Setting</Text>
                </View>
                <View style={{ alignItems: "center", }}>
                    <Image style={styles.userImageStyle} source={{ uri: this.state.imagePath?.url }} />
                    <Text style={styles.userFullNameStyle}>{this.state.name?.name}</Text>
                    <Text style={styles.userNameStyle}>{this.state.user_name?.user_name}</Text>
                </View>
                <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
                    <TouchableOpacity
                        testID="btnAddExample"
                        onPress={() => navigation.navigate('PrivacySetting', { "AccountUserProfile": navigation?.state?.params?.dataUser })}
                        style={styles.box}>
                        <View style={styles.content}>
                            <Image style={styles.img} source={profileEdit} />
                            <Text style={styles.text}>Profile Setting</Text>
                        </View>
                        <AntDesign name="right" size={scaledSize(20)} color="#000" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        testID="btnAddExample1"
                        onPress={() => navigation.navigate('PrivacyPolicyScreen')}
                        style={styles.box}>
                        <View style={styles.content}>
                            <Image style={styles.img} source={require("../assets/privacy.png")} />
                            <Text style={styles.text}>Privacy Policy</Text>
                        </View>
                        <AntDesign name="right" size={scaledSize(20)} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        testID='btnAddExample2'
                        onPress={() => navigation.navigate('FrequentlyAskedScreen')}
                        style={styles.box}>
                        <View style={styles.content}>
                            <Image style={styles.img} source={require("../assets/faq.png")} />
                            <Text style={styles.text}>FAQ</Text>
                        </View>
                        <AntDesign name="right" size={scaledSize(20)} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        data-testid="ContactUsButton"
                        onPress={() => navigation.navigate('ContactUs2')}
                        style={styles.box}>
                        <View style={styles.content}>
                            <Image style={styles.img} source={require("../assets/contact_support.png")} />
                            <Text style={styles.text}>Contact Us</Text>
                        </View>
                        <AntDesign name="right" size={scaledSize(20)} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        testID="NEXTbtn"
                        onPress={() => this.logoutUserData()}
                        style={styles.box}>
                        <View style={styles.content}>
                            <Image style={styles.img} source={require("../assets/logout.png")} />
                            <Text style={styles.text}>Logout</Text>
                        </View>
                        <AntDesign name="right" size={scaledSize(20)} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
// Customizable Area Start
const styles = StyleSheet.create({

    // Customizable Area Start
    container: { backgroundColor: "#fff", flex: 1 },
    header: { paddingHorizontal: 20, paddingVertical: 30, flexDirection: 'row', alignItems: "center" },
    headeTxt: { flex: 1, fontSize: style.f24, fontFamily: style.meduim, color: style.black, textAlign: "center" },
    box: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: scaledSize(10) },
    content: { flexDirection: "row", alignItems: "center", justifyContent: "flex-start" },
    img: { width: scaledSize(20), height: scaledSize(22), resizeMode: "contain" },
    text: { fontSize: style.f16, fontFamily: style.regular, color: style.black, marginLeft: 15 },
    userImageStyle: {
        width: scaledSize(85),
        height: scaledSize(85),
        borderRadius: scaledSize(85) / 2,
    },
    userFullNameStyle: {
        fontSize: style.f16,
        fontWeight: "500",
        fontFamily: style.meduim,
        color: style.black,
        lineHeight: 40
    },
    userNameStyle: {
        fontSize: style.f14,
        fontFamily: style.meduim,
        color: style.gray1,
    }
    // Customizable Area End

});
// Customizable Area End

