// Customizable Area Start
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    // Customizable Area Start
    Image,
    TouchableOpacity    // Customizable Area End
} from 'react-native';
// Customizable Area Start
import LocationAccessController from './LocationAccessController';
import { locationImg } from "./assets";
import { backIcon } from '../../mobile-account-registration/src/assets';
import { style } from '../../../components/src/CustomFonts';
import { scaledSize } from 'framework/src/Utilities';
// Customizable Area End

export default class LocationAccess extends LocationAccessController {
    // Customizable Area Start
    // Customizable Area End

    render() {
        // Customizable Area Start
        // Customizable Area End

        return (
            // Customizable Area Start
            <View style={styles.sectionContainer}>
                <View >
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: 50 }}>
                        <TouchableOpacity style={{ marginLeft: 20 }}
                            onPress={() => this.props.navigation.navigate('EmailAccountLoginBlock')}
                        >
                            <Image source={backIcon} style={styles.backIconStyle} />
                        </TouchableOpacity>
                        <View>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: '#000', fontSize: scaledSize(24), fontFamily: style.regular, marginTop: scaledSize(18) }}>Allow Your Location</Text>
                        <Text style={{ color: '#000', fontSize: scaledSize(16), fontFamily: style.regular, marginTop: scaledSize(14) }}>We'll use your location to show you</Text>
                        <Text style={{ color: '#000', fontSize: scaledSize(16), fontFamily: style.regular }}>matches near you</Text>
                    </View>
                </View>
                <View>
                    <Image source={locationImg} style={styles.imgStyle} />
                </View>
                <TouchableOpacity style={styles.contactBtn} onPress={() => this.fetchLocationRequest()} testID='fetchLocation'>
                    <Text style={styles.btnTextStyle}>
                        Enable Access</Text>
                </TouchableOpacity>
            </View>
            // Customizable Area End
        )
    }
}

// Customizable Area Start
const styles = StyleSheet.create({
    sectionContainer: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    imgStyle: {
        width: scaledSize(250),
        height: scaledSize(250),
        resizeMode: 'cover',
        alignSelf: 'center',
    },
    contactBtn: {
        ...style.btnStyle,
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: scaledSize(20),
    },
    btnTextStyle: {
        ...style.btnTextStyle,
    },
    backIconStyle: {
        width: 30,
        height: 20,
        alignSelf: "flex-start",
        resizeMode: 'contain'
    },
});
// Customizable Area End

// Customizable Area End
