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
  editIcon,
  deleteIcon
} from "./assets";
import { scaledSize } from "framework/src/Utilities";
import UploadImageController, {
  Props,
} from "./UploadImageController";
import CustomLoader from "../../../components/src/CustomLoader";
import { style } from "../../../components/src/CustomFonts";

export default class UploadImageEdit extends UploadImageController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }


  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    console.log("this.state", this.state.imageDataProfile);
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            testID="btnBack"
            onPress={() => this.goBack()}
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
          style={[styles.subHeader]} //UI Engine::From Sketch
        >
            We don't show all your pictures to your matches until they become your friends.
        </Text>
        <View style={styles.flatListMainContainer}>
          <FlatList
            testID="flatlistimageDataProfile"
            data={this.state.imageDataProfile}
            renderItem={({ item }: any) => (
              <TouchableOpacity
                testID="btnEditGallery"
                onPress={() => this.openEditGallery(item?.id, this.state.imageDataProfile)}
                style={[
                  styles.nullImageContainer,
                  { borderWidth: item?.isStatic ? 4 : 0 },
                ]}
              >
                {!!item?.url && (
                  <Image
                    source={{ uri: item?.url }}
                    style={styles.imageStyle}
                  />
                )}
                <Image
                  source={item?.url == "" ? addIcon : editIcon}
                  resizeMode={"contain"}
                  style={[styles.iconImageStyle,
                  item?.image !== "" && { borderRadius: scaledSize(13) }]}
                />
                {!!item?.url && (

                  <TouchableOpacity
                    testID="btnDeleteGallery"
                    style={styles.deleteContainerStyle} onPress={() => this.onPressRemove(item?.id)} >
                    {item?.id >= 1 && <Image
                      source={deleteIcon}
                      resizeMode={"contain"}
                      style={styles.deleteImageStyle}
                    />}
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
          testID={"btnContinue"}
          // {...this.btnSubmitOTPProps}
          onPress={() => this.onPressContinue()}
          style={styles.viewContainer}
        >
          <Text style={styles.buttonTextStyle}>{"Continue"}</Text>
        </TouchableOpacity>
        {this.state.isLoading && <CustomLoader isLoading={this.state.isLoading} />}
      </View>
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
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

  flatListMainContainer: {
    flex: 1,
    marginTop: 15,
    position: "relative",
    paddingHorizontal: 10,
  },
  nullImageContainer: {
    borderColor: "#D8D8D8",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
    marginHorizontal: "3%",
    marginVertical: "4%",
    height: scaledSize(150),
    width: "43%",
  },
  imageStyle: {
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "cover",
    width: "100%",
    height: scaledSize(150),
    borderRadius: 12,
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
