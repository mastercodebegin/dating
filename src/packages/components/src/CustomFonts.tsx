import { scaledSize } from "framework/src/Utilities";

 const FONTSFAMILY = {
    bold: 'DMSans-Bold',
    meduim : 'DMSans-Medium',
    regular: 'DMSans-Regular',
};

const COLORS = {
    black: "#000000",   
    white: "#FFFFFF",
    // red: "#FF0000",
    red: 'red',
    gray: "#808080",
    lightGray: "#D3D3D3",
    darkGray: "#A9A9A9",
    gray1: "#979797",
    gray2: "#D8D8D8",
    gray3: "#949494",
    bColor: '#999A9B',
    bgGray: '#EDEDED',
    descColor: '#6D7278',
}

const FONTSIZE = {
    f10: scaledSize(10),
    f12: scaledSize(12),
    f14: scaledSize(14),
    f16: scaledSize(16),
    f18: scaledSize(18),
    f20: scaledSize(20),
    f22: scaledSize(22),
    f24: scaledSize(24),
    f26: scaledSize(26),
    f28: scaledSize(28),
    f30: scaledSize(30),
    f32: scaledSize(32),
    f34: scaledSize(34),
    f36: scaledSize(36),
    f38: scaledSize(38),
    f40: scaledSize(40),
}

const COMMONSTYLES = {
    btnTextStyle: {
        fontFamily: FONTSFAMILY.meduim,
        fontSize: scaledSize(16),
        color: COLORS.white,
    },
    headerStyle: {
        fontFamily: FONTSFAMILY.bold,
        fontSize: scaledSize(24),
    },
    subHeaderStyle: {
        fontFamily: FONTSFAMILY.bold,
        fontSize: scaledSize(20),
    },
    inputTextStyle: {
        fontFamily: FONTSFAMILY.meduim,
        fontSize: scaledSize(16),
    },
    erroTextStyle: {
        fontFamily: FONTSFAMILY.regular,
        fontSize: scaledSize(14),
    },
    btnStyle: {
        width: "100%",
        height: scaledSize(45),
        borderRadius: scaledSize(10),
        backgroundColor: COLORS.black,
    },
    header24Meduim: {
        fontFamily: FONTSFAMILY.meduim,
        fontSize: scaledSize(24),
        color: COLORS.black,
    },
    subHeader14Reg: {
        fontFamily: FONTSFAMILY.regular,
        fontSize: scaledSize(14),
        color: COLORS.black,
    },


}

export const style = {
    ...COMMONSTYLES,
    ...FONTSIZE,
    ...FONTSFAMILY,
    ...COLORS,
}