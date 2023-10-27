import React from "react";

// Customizable Area Start
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import FastImage from "react-native-fast-image";

//@ts-ignore

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import ElasticSearchController, {
  Props
} from "./ElasticSearchController";
import Scale from "../../../components/src/Scale";
import { SearchBar } from "react-native-elements";
import { addFriend, clear, search, starIcon } from "./assets";
import CustomLoader from "../../../components/src/CustomLoader";
import { scaledSize } from "../../../framework/src/Utilities";
import { style } from "../../../components/src/CustomFonts";

export default class ElasticSearch extends ElasticSearchController {
  didFocusListener: any;
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Dimensions.addEventListener("change", (e) => {
    //   MergeEngineUtilities.init(
    //     artBoardHeightOrg,
    //     artBoardWidthOrg,
    //     Dimensions.get("window").height,
    //     Dimensions.get("window").width,
    //   );

    this.forceUpdate();
    // });
    //@ts-ignore
    this.props.navigation.addListener(
      'didFocus',
      () => {
        this.setState({ userList: [], searchValue: '' });
        this.getSuggestedFriend()
        this.getFrdListApi()
      }
    );

    // Customizable Area End
  }

  // Customizable Area Start

  renderItemSuggestedFourFriend(item: any, index: any) {
    return (
      <TouchableOpacity
        onPress={() => this.onPressUserDetail(item?.id, item?.attributes?.is_attempted)}
        key={index}
        testID="onPressUserDetailTestID"
        style={{
          width: '30%', alignSelf: 'center', margin: 7,
          justifyContent: 'space-between'
        }}>
        <FastImage source={{ uri: item?.attributes?.photo }}
          style={{ borderRadius: Scale(10), height: Scale(120), width: Scale(120) }} />
        {item?.attributes?.star && <Image source={starIcon}
          style={styles.starIconStyle}>
        </Image>}
      </TouchableOpacity>
    )
  }

  rendrFrdListItem(item: any, index: any) {
    return (
      <View key={index} style={{
        backgroundColor: '#ffffff',
        borderBottomWidth: Scale(1),
        marginLeft: Scale(10),
        borderBottomColor: '#f7f7f7',
        paddingTop: Scale(15),
        paddingBottom: Scale(10),
        flexDirection: 'row'
      }}>
        <View style={{ borderRadius: Scale(1) }}>
          <FastImage source={{ uri: item?.attributes?.photo }} style={[{ height: Scale(44), width: Scale(44), borderRadius: Scale(22) }]} />
        </View>
        <View style={{
          marginLeft: Scale(10),
          alignItems: 'center',
        }}>
          <Text style={{
            fontWeight: '600',
            fontFamily: style.regular,
            fontSize: Scale(16), alignSelf: 'flex-start'
          }}>{item?.attributes?.full_name}</Text>
          <Text style={{
            fontFamily: style.regular,
            fontSize: Scale(12),
            alignSelf: 'flex-start',
            marginTop: Scale(1)
          }}>{"@" + item?.attributes?.user_name}</Text>
        </View>
      </View>
    )
  }

  renderItem(item: any, index: any) {
    return (<View key={index} style={[styles.userDetails]}>
      <TouchableOpacity
        testID="onPressUserDetailTestID1"
        onPress={() => this.onPressUserDetail(item?.id, item?.attributes?.is_attempted)}
      >
        <FastImage source={{ uri: item?.attributes?.photo }} style={{ height: Scale(44), width: Scale(44), borderRadius: Scale(22) }} />
      </TouchableOpacity>
      <View style={{ flex: 1, paddingHorizontal: Scale(10) }} >
        <TouchableOpacity
          testID="onPressUserDetailTestID2"
          onPress={() => this.onPressUserDetail(item?.id, item?.attributes?.is_attempted)}
          style={{ flexDirection: 'column' }}>
          <Text style={{
            fontWeight: '600',
            fontFamily: style.regular,
            fontSize: Scale(16),
          }}>{item?.attributes?.first_name}</Text>
          <Text style={{
            fontFamily: style.regular,
            fontSize: Scale(12),
            marginTop: Scale(1)
          }}>{"@" + item?.attributes?.user_name}</Text>
        </TouchableOpacity>
      </View>
      {item?.attributes?.is_added ?
        <View style={{ height: Scale(24), width: Scale(24) }} >
        </View> :
        <TouchableOpacity
          testID="sendFriendReqTestID"
          onPress={() => this.sendFriendReq(item.id)}
          style={{ justifyContent: 'center' }}>
          <Image source={addFriend} style={{ height: Scale(24), width: Scale(24) }} resizeMode="contain" />
        </TouchableOpacity>}

      {/* test */}
    </View>)
  }
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <View style={styles.container}>
        <View style={styles.searchBarOuterContainer}>
          <SearchBar
            testID="searchBar"
            onChangeText={(value) => this.onChangeText(value)}
            value={this.state.searchValue}
            containerStyle={styles.searchBarContainer}
            placeholder="Enter dahila id"
            placeholderTextColor="gray"
            inputContainerStyle={{
              backgroundColor: '#e5e5e5',
              borderRadius: Scale(12),
            }}
            inputStyle={{ fontSize: Scale(16), fontWeight: '600' }}
            searchIcon={
              <Image source={search} style={{
                height: Scale(20), width: Scale(20),
              }}

              />
            }
            clearIcon={() => 
              <TouchableOpacity
                testID="searchBarClearIcon"
                onPress={() => this .onclearData()}>

                <Image source={clear} style={{
                  height: Scale(20), width: Scale(20),
                }} />
              </TouchableOpacity>
            }
          />
        </View>
        <View style={{flex: 1}} >
          {this.state.userList.length == 0 ?
            <ScrollView><Text style={styles.heading}>Your Friends </Text>
              <FlatList
                testID="userFriendListID"
                numColumns={3}
                data={this.state.frdList}
                horizontal={false}
                renderItem={({ item, index }) => this.rendrFrdListItem(item, index)}
                ListEmptyComponent={() => {
                  return <View style={styles.nullContainer} >
                    <Text style={{
                      alignSelf: 'center',
                      fontSize: Scale(18),
                    }}>{"No Friend Found"}</Text>
                  </View>
                }
                }
              />
              <Text style={styles.heading}>Suggested For You</Text>
              <View style={{
                marginTop: Scale(10), marginLeft: Scale(6),
                marginRight: Scale(10)
              }}>
                <FlatList
                  testID="suggestedFourFriend"
                  numColumns={3}
                  data={this.state.suggestedSixFriend.slice(0, 6)}
                  horizontal={false}
                  renderItem={({ item, index }) => this.renderItemSuggestedFourFriend(item, index)}
                />

              </View>
              <View style={{ height: 150, alignItems: 'flex-end' }}>
                {this.state.suggestedSixFriend.length > 6 ?
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('SuggestionForYou')
                    } testID="suggestedFriendShowModalWindow">
                    <Text style={{ marginRight: scaledSize(20), color: '#bcbbbc' }}>Show More</Text>
                  </TouchableOpacity>
                  : null}
              </View>
            </ScrollView> :
            <FlatList
              testID="userListID"
              data={this.state.userList}
              renderItem={({ item, index }) => this.renderItem(item, index)}
              onEndReachedThreshold={0.2}
              onEndReached={() =>
                this.state.userList.length > 10 && this.onEndReach(this.state.searchValue)
              }
              showsVerticalScrollIndicator={false}
            />
          }
          {this.state.isLoading && <CustomLoader isLoading={this.state.isLoading} />}

        </View>
        <TouchableOpacity testID="btnPress" {...this.btnShowHideProps} />
        <TouchableOpacity testID="btnPress1" {...this.btnExampleProps} />
        <TouchableOpacity testID="sendFriendReq" onPress={() => this.sendFriendReq(0)} />
      </View>
    )
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  title: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },
  body: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },
  bgPasswordContainer: {
    flexDirection: "row",
    backgroundColor: "#00000000",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    padding: 10,
    borderWidth: 1,
  },
  bgMobileInput: {
    flex: 1,
  },
  showHide: {
    alignSelf: "center",
  },

  searchBarOuterContainer: {
    height: Scale(80),
    marginTop: Scale(20),
    justifyContent: 'center',
    alignItems: 'center'
  },

  searchBarContainer: {
    backgroundColor: 'white',
    borderWidth: 0,
    width: Scale(400),
    borderColor: 'red',
    borderTopColor: 'white',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },

  heading: {
    fontWeight: '400',
    fontFamily: style.regular,
    fontSize: Scale(20),
    marginTop: Scale(15),
    marginLeft: Scale(10)
  },

  userDetails: {
    backgroundColor: '#ffffff',
    borderBottomWidth: Scale(1),
    paddingHorizontal: Scale(20),
    borderBottomColor: '#f7f7f7',
    paddingTop: Scale(15),
    paddingBottom: Scale(10),
    flexDirection: 'row',
    justifyContent: "space-between"

  },
  nullContainer: {
    marginTop: Scale(40),
    marginVertical: Scale(20),
    justifyContent: 'center',
    alignItems: 'center'
  },

  userProfile: {
    height: Scale(40),
    width: Scale(30),
    //borderRadius: Scale(50) 
  },
  modalViewStyle: {
    height: '90%',
    paddingHorizontal: 10,
    backgroundColor: '#fff'
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10
  },
  headerTextStyle: {
    marginLeft: scaledSize(10),
    fontSize: scaledSize(16),
    color: '#000'
  },
  modalStarIcon: {
    height: Scale(26),
    width: Scale(26),
    alignSelf: 'flex-end',
    margin: Scale(10)
  },
  starIconStyle: {
    height: Scale(20),
    width: Scale(20),
    position: 'absolute',
    right: Scale(10),
    top: Scale(10),
  },

});
// Customizable Area End
