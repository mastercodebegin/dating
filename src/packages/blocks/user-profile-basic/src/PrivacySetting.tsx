// Customizable Area Start
import React from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Image
} from 'react-native'
import PrivacySettingController, {
    Props
} from './PrivacySettingController';
// Customizable Area End
import { backIcon } from "../../mobile-account-registration/src/assets";
import DateTimePicker from '@react-native-community/datetimepicker'
import DropDownFlatList from "../../../components/src/DropDown";
import { scaledSize } from "../../../framework/src/Utilities";
import { style } from "../../../components/src/CustomFonts";

export default class PrivacySetting extends PrivacySettingController {
    constructor(props: Props) {
        // Customizable Area Start
        super(props);
        // Customizable Area End
    }

    // Customizable Area Start
    borderColor = (item: boolean, itmLength: any) => {
        let borderclr = itmLength ? style.black : style.bColor;
        return item ? style.black : borderclr;
    }
    // Customizable Area End
    userprofile() {

        const { firstNameFocus, emailFocus, userNameFocus } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        testID="onGoBack"
                        style={{ width: 30, height: 20 }}
                        onPress={() => this.props.navigation.goBack()}>
                        <Image source={backIcon}
                            resizeMode={'contain'}
                            style={{
                                width: 30,
                                height: 20,
                            }} />
                    </TouchableOpacity>

                    <Text style={styles.headeTxt}>Profile Setting</Text>
                    <View style={{ width: 30, height: 20 }} />
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <TouchableWithoutFeedback
                        onPress={() => Keyboard.dismiss()}
                        testID="button-view-pad">
                        <View>
                            <View style={styles.input}>
                                <Text style={styles.inputTxt}>Name</Text>
                                <TextInput
                                    testID="txtInputFirstName"
                                    onChangeText={(text) =>
                                        this.changeState("txtInputFirstName", text)
                                    }
                                    onBlur={() => this.onBlur("firstNameFocuse")}
                                    onFocus={() => this.onFocus("firstNameFocuse")}
                                    // onChangeText={(firstName) => this.setState({ firstName: firstName })}
                                    value={this.state.firstName}
                                    placeholder={'Enter your Name'}
                                    style={[styles.inputField, { borderColor: this.state.firstNameError ? "red" : this.borderColor(firstNameFocus, this.state.firstName.length) }]}
                                />
                                {this.onCheckError()}

                            </View>

                            <View style={styles.input}>
                                <Text style={styles.inputTxt}>Email Address</Text>

                                <TextInput
                                    testID="txtInputEmail"
                                    onChangeText={(text) => this.changeState("txtInputEmail", text)}
                                    keyboardType="email-address"
                                    value={this.state.email}
                                    editable={false}
                                    onBlur={() => this.onBlur("emailFocuse")}
                                    onFocus={() => this.onFocus("emailFocuse")}
                                    placeholder={'Enter your Email Address'}
                                    style={[styles.inputField, { borderColor: this.state.emailError ? "red" : this.borderColor(emailFocus, this.state.email.length) }]}
                                />
                                {!!this.state.emailError && <Text style={styles.inputErrorTextStyle} >{this.state.emailError}</Text>}

                            
                            </View>
                            <View style={styles.input}>
                                <Text style={styles.inputTxt}>Username</Text>
                                <TextInput
                                    testID="txtInputUserName"
                                    onBlur={() => this.onBlur("UserNameFocuse")}
                                    onFocus={() => this.onFocus("UserNameFocuse")}
                                    onChangeText={(text) => this.changeState("txtInputUserName", text)}
                                    value={this.state.userName}
                                    placeholder={'Enter Username'}
                                    maxLength={20}
                                    style={[styles.inputField, { borderColor: this.state.usernameError ? "red" : this.borderColor(userNameFocus, this.state.userName.length) }]}
                                />
                                {this.onCheckErrorUserName()}
                            </View>

                            <View style={styles.input}>
                                <Text style={styles.inputTxt}>Phone No</Text>
                                <TextInput
                                    testID="testIdFullName"
                                    onChangeText={(phoneNumber) => this.setState({
                                        phoneNumber: phoneNumber
                                    })}
                                    editable={false}
                                    value={"+" + 91 + " " + this.state.phoneNumber}
                                    placeholder={'Enter your PhoneNumber'}
                                    style={[styles.inputField, { borderColor: style.black }]}
                                    keyboardType={"numeric"}
                                // maxLength={10}
                                />
                            </View>
                            <View style={styles.input}>
                                <Text style={styles.inputTxt}>DOB</Text>
                                <TouchableOpacity
                                    testID='ShowPicker'
                                    style={styles.datePickerStyle}
                                    onPress={this.showDatepicker}
                                >
                                    <Text
                                        style={styles.dateTextStyle}
                                    >
                                        {this.state.dob ? this.state.dob : 'DD/MM/YY'}
                                    </Text>
                                </TouchableOpacity>
                                {this.oncheckErrorDob()}
                                {this.state.show && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        //@ts-ignore
                                        value={this.state.date}
                                        placeholderText="Enter your Dob"
                                        mode={this.state.mode}
                                        is24Hour={false}
                                        onChange={(event: any, selectedDateTime: any) => this.onChangeDate(event, selectedDateTime)}
                                    />
                                )}
                            </View>

                            <View style={styles.input}>
                                <Text style={styles.inputTxt}>Gender</Text>
                                <DropDownFlatList
                                    data={this.state.data}

                                    textData={this.state.gender}
                                    onSelect={(item: any, index: any) => {
                                        this.setState({ gender: item.value });
                                    }}
                                    buttonStyle={styles.dropDown}
                                    value={this.state.gender}
                                    placeholder={this.state.gender ?? 'Select gender'} />

                            </View>

                            <View style={styles.input}>
                                <Text style={styles.inputTxt}>Gender Interested in</Text>
                                <DropDownFlatList
                                    data={this.state.data}
                                    textData={this.state.interest}
                                    onSelect={(item: any) => {
                                        this.setState({ interest: item.value });
                                    }}
                                    buttonStyle={styles.dropDown}
                                    placeholder={this.state.interest ?? 'Select interest'}
                                    value={this.state.interest} />
                            </View>
                            <View style={styles.input}>
                                <Text style={styles.inputTxt}>Relationship Type</Text>
                                <DropDownFlatList
                                    data={this.state.Relationship}
                                    placeholder={this.state.relationship_type ?? 'Select relationship type'}
                                    textData={this.state.relationship_type}
                                    onSelect={(item: any) => {
                                        this.setState({ relationship_type: item.value });
                                    }} buttonStyle={styles.dropDown}
                                    value={this.state.relationship_type} />
                            </View>
                            <View style={{}}>
                                <Text style={[styles.inputTxt, { marginLeft: 20, marginTop: 15 }]}>Age Range</Text>
                                <View style={{ flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-between', }}>

                                    <DropDownFlatList
                                        placeholder={this.checkMinAge()}
                                        data={this.state.minRange}
                                        
                                        buttonStyle={styles.minAge}
                                        textData={this.state.min_age_between ?? 'Min Age'}
                                        onSelect={(item: any) => {
                                            this.setState({ min_age_between: item.value });
                                        }} value={this.state.min_age_between} />


                                    <DropDownFlatList
                                        placeholder={this.checkMaxAge()}
                                        data={this.state.minRange}
                                        textData={this.state.max_age_between ?? 'Max Age'}
                                        onSelect={(item: any, index: any) => {
                                            this.setState({ max_age_between: item.value });
                                        }}
                                        buttonStyle={styles.minAge} value={this.state.max_age_between ?? 'min Age'} />
                                </View>
                            </View>
                            <View style={styles.input}>
                                <TouchableOpacity
                                    testID="gotUpdateBtn"
                                    onPress={() => this.getUpdateProfile()}
                                    style={styles.buttonField}>
                                    <Text style={styles.inputTxt1}>Save & Continue</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>

                </ScrollView>

            </View>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {this.userprofile()}
                </ScrollView>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    header: { paddingHorizontal: 20, paddingVertical: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    headeTxt: { flex: 1, fontSize: style.f24, fontFamily: style.meduim, color: style.black, textAlign: "center" },
    input: { paddingHorizontal: 20, marginTop: 20 },
    inputTxt: {
        fontSize: style.f16,
        fontFamily: style.meduim,
        color: style.black,
        paddingBottom: 10
    },
    inputTxt1: {
        textAlign: 'center',
        alignItems: 'center',
        ...style.btnTextStyle,
    },
    backIconStyle: {
        width: 30,
        height: 20,
    },
    buttonField: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginVertical: 20,
        marginTop: 55,
        ...style.btnStyle,
    },
    datePickerStyle: {
        flex: 1,
        textAlign: "left",
        color: style.black,
        includeFontPadding: true,
        paddingLeft: 12,
        borderWidth: 1,
        borderRadius: scaledSize(12),
        height: scaledSize(48),
        width: "100%",
        borderColor: style.black,
        paddingHorizontal: 20,
        alignContent: 'flex-start',
        justifyContent: 'center'
    },
    dateTextStyle: {
        textAlign: "left",
        color: style.black,
        ...style.inputTextStyle,
    },
    inputField: {
        flex: 1,
        textAlign: "left",
        color: style.black,
        includeFontPadding: true,
        paddingLeft: 12,
        borderWidth: 1,
        borderRadius: scaledSize(12),
        height: scaledSize(48),
        width: "100%",
        borderColor: style.black,
        ...style.inputTextStyle,
    },
    inputErrorTextStyle: {
        textAlign: "left",
        color: style.red,
        ...style.erroTextStyle,
    },
    minAge: {
        paddingLeft: 12,
        borderWidth: 1,
        borderRadius: scaledSize(12),
        height: scaledSize(48),
        width: "45%",
        borderColor: style.black,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        ...style.inputTextStyle,
    },
    dropDown: {
        paddingLeft: 12,
        borderWidth: 1,
        borderRadius: scaledSize(12),
        height: scaledSize(48),
        width: "100%",
        paddingHorizontal: 20,
        borderColor: style.black,
        justifyContent: 'center',
    },
    placeholderStyle: {
        fontSize: 16,
        color: 'black'
    },
    selectedTextStyle: {
        fontSize: 16,
        color: 'black'
    },
    iconStyle: {
        width: 20,
        height: 20,
    },

});

