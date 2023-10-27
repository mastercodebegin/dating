import { SafeAreaView, Text, View, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native'
import React from 'react';
import Scale from '../../../components/src/Scale'
import PrivacyPolicyController, {
} from "./PrivacyPolicyController";
import Loader from '../../../components/src/Loader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { backIcon } from '../../mobile-account-registration/src/assets';
import { style } from '../../../components/src/CustomFonts';
export default class PrivacyPolicyScreen extends PrivacyPolicyController {
    renderhader() {
        const { navigation } = this.props;
        return (
            <View style={styles.haderwork}>
                <View style={styles.header}>


                    <TouchableOpacity

                        onPress={() => navigation.goBack()}
                        testID="onHeaderID"
                        style={{ height: Scale(20), width: Scale(30) }}>
                        <Image source={backIcon}
                            resizeMode={'contain'}
                            style={{
                                width: Scale(30),
                                height: Scale(20),
                            }} />
                    </TouchableOpacity>

                    <Text style={styles.headeTxt}>Privacy Policy</Text>
                </View>
            </View>
        )
    }

    renderpolicyAllFlatList = () => {
        return (
            <View>
                <FlatList
                    testID='faqsList'
                    data={this.state.privacyPolicy}
                    renderItem={({ item }) => this.renderpolicyAllFlatListCell(item)}
                />
            </View>
        )
    }

    renderpolicyAllFlatListCell = (item: any) => {
        return (
            <View>
                <View style={styles.mainFrequentlyView}>
                    <TouchableOpacity
                        testID='faqTestID'
                        style={styles.unCheckedView} onPress={() => this.onPressFaq(item)}>
                        <Text style={styles.yourQuestionText}>{item?.type_of_privacy_policy}</Text>
                        {!item?.checked ?
                            <AntDesign name="down" size={Scale(20)} color="#000" />
                            :
                            <AntDesign name="up" size={Scale(20)} color="#000" />
                        }
                    </TouchableOpacity>
                    {item?.checked &&
                        <View>
                            <Text style={styles.loremIpsumText}>{item?.content_of_privacy_policy}</Text>
                        </View>
                    }
                </View>
            </View>
        )
    }

    render = () => {
        return (
            <SafeAreaView style={styles.mainContainer}>

                {this.renderhader()}
                <Loader loading={this.state.isLoading} />

                {this.renderpolicyAllFlatList()}

            </SafeAreaView>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },

    Text: {
        fontSize: Scale(14),
        color: '#838383',
    },

    hader: {
        flexDirection: "row",
        alignItems: "center",
    },

    haderwork: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: Scale(10),
    },

    Image6: {
        width: Scale(20),
        height: Scale(20),
        resizeMode: "contain",
        marginRight: Scale(20),
        tintColor: '#979797',
    },

    premiumView: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginHorizontal: Scale(30),
        marginTop: Scale(15)
    },

    textPasswordMain: {
        marginLeft: Scale(15),
        padding: Scale(15),
        flexDirection: "row",
        justifyContent: "space-between",

    },

    textPassword: {
        fontSize: Scale(18),
        marginLeft: Scale(10),
    },

    deactivateText: {
        fontSize: Scale(18),
        color: '#979797',

    },

    line1: {
        width: Scale(360),
        height: Scale(1),
        backgroundColor: "#979797",
        marginBottom: Scale(5),
        marginTop: Scale(5),
        marginLeft: Scale(20)

    },



    premiumText: {
        fontSize: Scale(16),
        color: '#6C328B',
    },

    orangeIcon: { height: Scale(10), backgroundColor: "orange", width: Scale(10), borderRadius: Scale(5), marginRight: Scale(10) },

    mainTextHader: {
        marginLeft: Scale(20),
        marginRight: Scale(20),
    },

    textPasswordMainLast: {
        flexDirection: "row",
    },
    signout: {
        color: "#FE655C",
        fontSize: Scale(19),
    },
    linerGradient: {
        height: Scale(110),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    last: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        bottom: Scale(10),
        flex: 1,
        margin: Scale(30)
    },
    mainContainer: {
        backgroundColor: "#fff",
        flex: 1,
    },
    backArrow: {
        marginLeft: Scale(15),
    },

    editText: {
        fontSize: Scale(30),
        color: "#ffffff",
        marginRight: Scale(18)
    },

    frequentlyAskedText: {
        marginTop: Scale(10),
        marginLeft: Scale(20),
        fontSize: Scale(24),
    },

    ourFriendlyText: {
        marginTop: Scale(10),
        marginLeft: Scale(20),
        fontSize: Scale(14),
    },

    mainFrequentlyView: {
        borderBottomWidth: 1.5,
        alignSelf: "center",
        marginTop: Scale(10),
        borderColor: '#eee',
        paddingVertical: Scale(20),
        width: '90%',
    },

    unCheckedView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },


    dropDownImage: {
        height: Scale(20),
        width: Scale(20),
        color: "#4A4A4A",
        resizeMode: 'contain',
    },
    yourQuestionText: {
        fontSize: Scale(18),
        fontFamily: style.regular,
        color: '#000',
        width: '95%',
        lineHeight: Scale(20),
        textAlign: 'justify',
    },

    unCheackedImage: {
        height: Scale(20),
        width: Scale(10),
        color: "#4A4A4A",
        resizeMode: 'contain',
    },


    loremIpsumText: {
        fontSize: Scale(14),
        fontFamily: style.regular,
        marginTop: Scale(10),
        textAlign: 'justify',
        color: '#000',
    },
    MainContainer: {
        justifyContent: 'center',
        marginTop: Scale(15)
    },

    aboutUsText: {
        textAlign: "left",
        fontSize: Scale(16),
        fontFamily: style.regular,
        fontWeight: '400'
    },

    aboutUsView: {
        paddingHorizontal: Scale(15),
        textAlign: 'justify',
        flexWrap: "nowrap",
    },
    header: { alignItems: "center", flexDirection: "row", paddingTop: Scale(20),paddingBottom: Scale(10), justifyContent: 'space-between', },
    headeTxt: { fontSize: Scale(24), fontFamily: style.regular, color: "#000", alignSelf: 'center', paddingHorizontal: Scale(60) },

}
)