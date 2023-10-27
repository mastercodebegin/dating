import React, { Component } from "react";
import { Image, StyleSheet } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { downArrow } from "../../blocks/user-profile-basic/src/assets";
import Scale from "./Scale";
import { scaledSize } from "framework/src/Utilities";
import { style } from "./CustomFonts";

interface Props {
  data: any;
  textData: any
  onSelect: any
  buttonStyle: any
  value: any
  placeholder: any
  // render: any;
}

interface S {
  data: any;
  textData: any;
  onSelect: any;
  buttonStyle: any;
  value: any;
  placeholder: any;
  // render: any;
}

export default class DropDownFlatList extends Component<Props, S> {

  constructor(props: Props) {
    super(props);
    this.state = {
      data: props.data,
      buttonStyle: props.buttonStyle,
      // render: props.render,
      textData: props.textData,
      onSelect: props.onSelect,
      value: props.value,
      placeholder: props.placeholder
    };
  }

  render() {
    return (
      <Dropdown
        style={this.props.buttonStyle}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={this.props.data}
        labelField="label"
        valueField="value"
        placeholder={this.props.placeholder}
        value={this.props.value}
        onChange={(item) => {
          this.props.onSelect(item)
        }}
        itemContainerStyle={styles.itemContainerStyle}
        containerStyle={styles.containerStyle}
      />


    )
  }
}

const styles = StyleSheet.create({
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
  itemContainerStyle: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: style.black,
  },
  containerStyle: {
    borderWidth: 1,
    borderColor: style.black,
    top: scaledSize(-30),
    borderRadius: scaledSize(12),
  }
});