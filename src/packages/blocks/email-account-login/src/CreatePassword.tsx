// Customizable Area Start
//@ts-nocheck
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    // Customizable Area Start
    Image,
    TouchableOpacity,
    // Customizable Area End
} from 'react-native';
// Customizable Area Start
import CreatePasswordController from './CreatePasswordController';
import { leftbutton,eyeClosed,unlock, Eye,changepassword } from "./assets";
import CustTextInput from '../../../components/src/CustomInputBox';
// Customizable Area End

export default class CreatePassword extends CreatePasswordController {
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
                         onPress={() => this.props.navigation.goBack()}
                         testID='goBackTestID'
                         >
                         <Image source={leftbutton} style={{ height: 19, width: 11 }} />
                        </TouchableOpacity>
                        <View>
                        </View>
                    </View>
                </View>
                            {/* <Image source={backArrow} style={{ height: 19, width: 11 }} /> */}

                <View>
                    <Image source={changepassword} style={{
                        marginLeft:100,
                        alignItems:'center',
                        height:220,
                        width:220,
                    }} />
                </View>

                <View style={{ padding: 16 }}>
                    <Text style={{ color: '#000',fontWeight: 'bold',fontFamily: 'DMSans-Bold', fontSize: 21, textAlign: 'center', marginBottom: 10 }}>Create New Password</Text>
                    <Text style={{ textAlign: 'center',fontWeight: 'normal',fontFamily: 'DMSans-Regular',fontSize: 14 }}>Your password must be different</Text>
                    <Text style={{ textAlign: 'center' }}>from previous password</Text>

                    <Text style={{ fontFamily: 'DMSans-Bold',fontWeight: 'bold', color: '#000', fontSize: 16, textAlign: 'left', marginTop: 20 }}>New Password</Text>

                    <View style={styles.boxSizes}>
                        <CustTextInput
                        testID='custTextInputTestID'
                            placeholder="Enter new password"
                            maxLength={20}
                            style={{fontFamily: 'DMSans-Medium',fontSize:16}}
                            imageSource={unlock}
                            isInputError={'Please use at least one upper case letter, one lower case letter, one number, one special character and minimum 8 characters'}
                            onChangeText={(text: string) => {
                                this.setState({ password: text.replace(/ /g, '') });
                                if (text === ' ' || text?.length === 0) {
                                    this.setState({ isValidPassword: false });
                                } else if (!this.checkPasswordStrong(text)) {
                                    this.setState({ isValidPassword: true });
                                } else {
                                    this.setState({ isValidPassword: false });
                                }
                            } }
                            isError={this.state.isValidPassword}
                            value={this.state.password}
                            rightComponent={<TouchableOpacity
                                style={styles.eyeTouchStyle}
                                onPress={() => { this.setState({ isSecurePassword: !this.state.isSecurePassword }); } }>
                                <Image
                                    source={this.state.isSecurePassword ? eyeClosed : Eye}
                                    style={styles.passwordEyeStyle} />
                            </TouchableOpacity>}
                            secureEntry={this.state.isSecurePassword}                      />

                        <CustTextInput
                            placeholder="Confirm new password"
                            testID='custTextInputTwoTestID'
                            maxLength={20}
                            imageSource={unlock}
                            isInputError={'Confirm new password should match with new password!'}
                            onChangeText={(text: string) => {
                                this.setState({ confirmpassword: text.replace(/ /g, '') });
                                if (text === ' ' || text?.length === 0) {
                                    this.setState({ isValidCPassword: false });
                                } else if (this.state.password != text) {
                                    this.setState({ isValidCPassword: true });
                                } else {
                                    this.setState({ isValidCPassword: false });
                                }
                            } }
                            isError={this.state.isValidCPassword}
                            value={this.state.confirmpassword}
                            rightComponent={<TouchableOpacity
                                style={styles.eyeTouchStyle}
                                onPress={() => { this.setState({ isSecureCPassword: !this.state.isSecureCPassword }); } }>
                                <Image
                                    source={this.state.isSecureCPassword ? eyeClosed : Eye}
                                    style={styles.passwordEyeStyle} />
                            </TouchableOpacity>}
                            secureEntry={this.state.isSecureCPassword}                     />

                    </View>
                </View>


                <View style={styles.contactContainerStyle}>
                    <TouchableOpacity style={styles.contactBtn}
                     onPress={() => this.contactusTest()}
                     testID='contactusTestFunTestID'
                     >
                        <Text style={{ textAlign: 'center',fontFamily: 'DMSans-Medium', color: '#fff', fontSize: 16 }}>Continue</Text>
                    </TouchableOpacity>
                </View>

            </View>
            // Customizable Area End
        )
    }
}

// Customizable Area Start
const styles = StyleSheet.create({
    contactBtn: {
        // position: 'absolute', 
        // bottom: 20,
        backgroundColor: '#000',
        width: '90%',
        padding: 10,
        borderRadius: 6
    },
    inputStyles: {
        borderWidth: 1,
        width: '90%',
        marginLeft: 20,
        marginBottom: 14,
        height: 45,
        paddingLeft: 18,
        borderColor: 'gray', borderRadius: 10,
    },
    sectionContainer: {
        // marginTop: 32,
        // paddingHorizontal: 24,
        position: 'relative',
        height: '100%',
        backgroundColor: '#fff',
    },
    eyeTouchStyle: {
        padding: 9,
        zIndex: 2,
        right: 22,
    },
    contactContainerStyle: {
        marginTop: 52,
        position: 'relative',
        // flexGrow:1, 
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    passwordEyeStyle: {
        height: 24,
        alignItems: 'center',
        right: 0,
        tintColor: 'gray',
        width: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    boxSizes: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // marginTop: 10
    },
    sectionDescription: {
        fontSize: 18,
        fontWeight: '400',
        marginTop: 8,
    },
    LoginText: {
        marginLeft: 100,
        // textAlign:'center',
        fontWeight: 'bold',
        color: '#696565',
        fontSize: 24,
    },
    highlight: {
        fontWeight: '700',
    },
});
// Customizable Area End

// Customizable Area End
