import React, { useEffect, useState } from "react";
import { Text, Image, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface InputProps {
    style?: any
    label: string;
    labelTwo?: string;
    imageSource?: any;
    imageSourceStyle?: any;
    placeholder?: string;
    onChangeText?: (text: string) => void;
    rightComponent?: React.ReactNode;
    isError?: boolean;
    keyboardType?: any;
    maxLength?: number;
    secureEntry?: boolean;
    isInputError?: string;
    labelStyle?: any;
    labelTwoStyle?: any;
    inputStyle?: any;
    isButtonMode?: boolean;
    onPress?: () => void;
    containerStyle?: any;
    value?: any;
    extraInputStyle?: any;
    multiline?: boolean;
    numberOfLines?: number;
    onFocus: any
    onBlur: any
    password:any
}

const CustTextInput = (props: InputProps) => {

    const [isFocused] = useState(false);
    const [isError, setIsError] = useState(false);
    const [value, setValue] = useState('')
    
    useEffect(()=>{
        console.log(props.password);
        
    })

    return (
        <View style={[{ marginTop: 16 }, props.containerStyle]}
            removeClippedSubviews={true}>

            {/* Label */}
            {props.label &&
                <View style={{ flexDirection: 'row' }}>

                    <Text style={[styles.inputlabalText,
                    { color: 'gray' },
                    isFocused && { color: '#000' },
                    props.isError && { color: 'red' },
                    props.labelStyle]}>{props?.label}</Text>

                    {props?.labelTwo && <Text
                        style={[{ color: 'red' },
                        props.labelTwoStyle]}>{props?.labelTwo}</Text>}
                </View>

            }

            {/* Input Container */}
            <TouchableOpacity

                disabled={props.isButtonMode ? false : true}
                onPress={props.onPress}
                activeOpacity={1}
                style={[styles.inputContainer,
                props.placeholder == 'Message....' && { height: 105, textAlignVertical: 'top' },
                { borderColor: 'gray' },
                isFocused && { borderColor: '#000' },
                isError && { borderColor: 'red' },
                props.inputStyle]}>
                <Image
                    source={props?.imageSource}
                    style={props?.imageSourceStyle}
                />
                <TextInput

                    contextMenuHidden={true}
                    style={[styles.inputText, props.extraInputStyle]}
                    placeholder={props?.placeholder}
                    onChangeText={(e) => {
                        //@ts-ignore
                        props?.onChangeText(e)
                        setValue(e)
                    }}

                    keyboardType={props.keyboardType}
                    maxLength={props.maxLength}
                    secureTextEntry={props.secureEntry}
                    onFocus={() => {
                        setIsError(false)
                        props.onFocus()
                    }
                    }
                    onBlur={() => {
                        console.log('onblur at custominput');
                        value.length < 8 ? setIsError(true) : null
                        props.onBlur()
                    }}
                    editable={!props.isButtonMode}
                    value={props.value}
                    multiline={props.multiline}
                    numberOfLines={props.numberOfLines}
                />
                {props.rightComponent}
            </TouchableOpacity>
        </View>
    )
}

export default CustTextInput;

const styles = StyleSheet.create({

    inputText: {
        width: '90%',
        paddingLeft: 10,
        color: '#000',
    },
    inputlabalText: {
        color: 'gray',
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom: 5,
    },
    inputContainer: {
        width: '90%',
        borderWidth: 1,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#fff',
        borderColor: 'gray',
        height: 45,
        paddingStart: 16,
    },
})