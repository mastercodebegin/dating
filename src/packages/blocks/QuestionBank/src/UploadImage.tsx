import React from "react";
// Customizable Area Start
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { backIcon } from "../../mobile-account-registration/src/assets";
import {
  addIcon,
  deleteIcon,
  editIcon,
} from "./assets";
import { scaledSize } from "framework/src/Utilities";
import UploadImageController, {
  Props,
} from "./UploadImageController";
import { style } from "../../../components/src/CustomFonts";

export default class UploadImage extends UploadImageController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
        <TouchableOpacity
          testID="btnBack"
          onPress={()=>this.goBack()}
        >
          <Image
            source={backIcon}
            resizeMode={"contain"}
            style={styles.backIconStyle}
          />
        </TouchableOpacity>
        <Text
          testID="labelBody" //Merge Engine::From BDS
          style={styles.headerTitle} //UI Engine::From Sketch
        >
          {"Upload your images"}
        </Text>
        <View></View>
        </View>
        <Text
          testID="labelBody" //Merge Engine::From BDS
          style={styles.subHeader} //UI Engine::From Sketch
        >
          {
            "We don't show all your pictures to your matches until they become your friends."
          }
        </Text>
        <View style={styles.mainContainer}>
          <FlatList
          testID="flatlistUploadImage"
            data={this.state.imageData}
            renderItem={({ item }) => (
              <TouchableOpacity
                testID="btnOpenGallery"
                onPress={() => this.openGallery(item.id)}
                style={[
                  styles.nullImageContainer,
                  item?.image== "" && { borderWidth: 4 },
                ]}
              >
                {!!item?.image && (
                  <Image
                    source={{ uri: item?.image }}
                    style={styles.imageStyle}
                  />
                 )} 
                <Image
                  source={item.image == "" ? addIcon : editIcon}
                  resizeMode={"contain"}
                  style={[styles.iconImageStyle, 
                    item?.image !== "" && { borderRadius: scaledSize(13) },
                  ]}
                />
                 {!!item?.image && (
                  <TouchableOpacity 
                  testID="btnRemoveImage"
                  style={styles.deleteContainerStyle} onPress={() => this.onPressRemoveImage(item.id)} >
                 <Image
                  source={deleteIcon}
                  resizeMode={"contain"}
                 style={styles.deleteImageStyle}
                />
                 </TouchableOpacity>
                 )}
              </TouchableOpacity>
            )}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <TouchableOpacity
          // {...this.btnExampleProps} //Merge Engine::From BDS - {...this.testIDProps}
          testID={"btnUploadImage"}
          // {...this.btnSubmitOTPProps}
          onPress={() => this.uploadImage()}
          style={styles.viewContainer}
        >
          <Text style={styles.buttonTextStyle}>{"Submit"}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    width: "100%",
    backgroundColor: "#ffffffff",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backIconStyle: {
    width: 30,
    height: 20,
    alignSelf: "flex-start",
  },
  mainContainer: {
    flex: 1,
    marginTop: 15,
    position: "relative",
    paddingHorizontal: 10,
  },
  nullImageContainer: {
    marginHorizontal: "3%",
    marginVertical: "4%",
    height: scaledSize(150),
    width: "43%",
    borderColor: "#D8D8D8",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
  },
  imageStyle: {
    width: "100%",
    height: scaledSize(150),
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "cover",
  },
  iconImageStyle: {
    width: scaledSize(30),
    height: scaledSize(30),
    position: "absolute",
    bottom: -scaledSize(7),
    right: -scaledSize(9),
    zIndex: 10,
  },
  deleteImageStyle: {
    width: scaledSize(28),
    height: scaledSize(28),
    zIndex: 10,
    resizeMode: "contain",
  },
  deleteContainerStyle: {
    position: "absolute",
    top: -scaledSize(9),
    right: -scaledSize(9),
  },
  headerTitle: {
    marginVertical: 10,
    fontSize: scaledSize(22),
    fontFamily: style.regular,
    textAlign: "center",
    color: "#000",
    marginHorizontal: 15,
  },
  subHeader: {
    fontSize: scaledSize(14),
    fontFamily: style.regular,
    textAlign: "center",
    color: "#000",
    marginHorizontal: 15,
    marginTop: 10,
  },
  title: {
    fontSize: scaledSize(16),
    textAlign: "center",
  },
  body: {
    marginBottom: 32,
    fontSize: scaledSize(16),
    textAlign: "left",
    marginVertical: 8,
  },
  viewContainer: {
    marginVertical: 10,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    ...style.btnStyle,
  },
  buttonTextStyle: {
    textAlign: "center",
    ...style.btnTextStyle,
  },
});
// Customizable Area End
