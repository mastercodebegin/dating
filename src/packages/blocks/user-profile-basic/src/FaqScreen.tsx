import { SafeAreaView, Text, View, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native'
import React from 'react';
import Scale from '../../../components/src/Scale'
import FaqScreenController from "./FaqScreenController";
import Loader from '../../../components/src/Loader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { backIcon } from '../../mobile-account-registration/src/assets';
import { style } from '../../../components/src/CustomFonts';
export default class FrequentlyAskedScreen extends FaqScreenController {
    renderhader() {
        const { navigation } = this.props;

        return (
            <View style={styles.haderwork}>
                <TouchableOpacity

                    onPress={() => navigation.goBack()}
                    testID="onHeaderID"
                    style={{ height: 20, width: 30 }}>
                    <Image source={backIcon}
                        resizeMode={'contain'}
                        style={{
                            width: 30,
                            height: 20,
                        }} />
                </TouchableOpacity>
                <Text style={styles.headeTxt}>FAQ</Text>
                <View style={{ height: 20, width: 30 }}></View>
        </View>
        )
    }

    renderFaqsFlatList = () => {

        return (
            <View>
                <FlatList
                    data={this.state.faqs}
                    renderItem={({ item }) => this.renderFaqsFlatListCell(item)}
                    testID='faqsList'
                />
            </View>
        )
    }

    renderFaqsFlatListCell = (item: any) => {
        return (
            <View>
                <View style={styles.mainFrequentlyView}>
                    <TouchableOpacity
                        testID='faqTestID'
                        style={styles.unCheckedView} onPress={() => this.onPressFaq(item)}>
                        <Text style={styles.yourQuestionText}>{item?.type_of_faq}</Text>
                        {!item?.checked ?
                            <AntDesign name="down" size={20} color="#000" />
                            :
                            <AntDesign name="up" size={20} color="#000" />
                        }
                    </TouchableOpacity>
                    {item?.checked &&
                        <View>
                            <Text style={styles.loremIpsumText}>{item?.content_of_faq}</Text>
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
                {this.renderFaqsFlatList()}
            </SafeAreaView>
        )
    }

}
const styles = StyleSheet.create({
    emptyMessageStyle: {
        textAlign: 'center',
        marginTop: '50%',
    },
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


    Text1: {
        fontSize: Scale(28),
        alignItems: 'center',
        marginLeft: Scale(20),
    },


    haderwork: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: Scale(15),
        paddingTop: 20,
        paddingBottom: 10,
    },

    Image6: {
        width: Scale(20),
        height: Scale(20),
        resizeMode: "contain",
        marginRight: Scale(20),
        tintColor: '#979797',
    },

    textPasswordMain: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 15,
        padding: Scale(15),

    },


    line1: {
        width: Scale(360),
        height: Scale(1),
        marginBottom: Scale(5),
        marginTop: Scale(5),
        backgroundColor: "#979797",
        marginLeft: Scale(20)

    },

    premiumView: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginHorizontal: Scale(30),
        marginTop: Scale(15)
    },

    premiumText: {
        fontSize: Scale(16),
        color: '#6C328B',
    },

    orangeIcon: { borderRadius: Scale(5), height: Scale(10), width: Scale(10), backgroundColor: "orange", marginRight: Scale(10) },

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
    last: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        alignItems: 'flex-end',
        bottom: 10,
        margin: 30
    },
    mainContainer: {
        backgroundColor: "#fff",
        flex: 1,
    },

    linerGradient: {
        height: Scale(110),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    frequentlyAskedText: {
        marginTop: Scale(10),
        marginLeft: Scale(20),
        fontSize: Scale(24),
        fontFamily: "Montserrat-Bold",
    },

    ourFriendlyText: {
        marginTop: Scale(10),
        fontSize: Scale(14),
        marginLeft: Scale(20),

    },
    textPassword: {
        fontSize: Scale(18),
        marginLeft: Scale(10),
    },

    deactivateText: {
        fontSize: Scale(18),
        color: '#979797',
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

    dropDownImage: {
        height: Scale(20),
        resizeMode: 'contain',
        width: Scale(20),
        color: "#4A4A4A",
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
        fontSize: Scale(16),
        textAlign: "left",
        fontWeight: '400'
    },

    aboutUsView: {
        paddingHorizontal: Scale(15),
        textAlign: 'justify',
        flexWrap: "nowrap",
    },
    header: { alignItems: "center", flexDirection: "row",  justifyContent: 'space-between', },
    headeTxt: { fontSize: Scale(24), fontFamily: style.regular, color: "#000", alignSelf: 'center', paddingHorizontal: 100 },
    backArrow: {
        marginLeft: Scale(15),
    },

    editText: {
        color: "#ffffff",
        fontSize: Scale(30),
        marginRight: Scale(18)
    },

}
)