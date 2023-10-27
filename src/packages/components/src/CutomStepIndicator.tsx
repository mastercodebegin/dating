import { StyleSheet, View } from 'react-native'
import React from 'react'
import { deviceWidth, scaledSize } from 'framework/src/Utilities';

export default function CutomStepIndicator({status, itm}: any) {
  return (
    <View
    style={styles.container}
  >
    {itm.map((item: any, index:any) => {
      return (
        <View
          style={{
            height: scaledSize(5),
            width: deviceWidth / scaledSize(itm.length) - scaledSize(10),
            backgroundColor: index == status -1  ? "black" : "grey",
            marginHorizontal: scaledSize(5),
            borderRadius: scaledSize(2.5),
          }}
        />
      );
    })}
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scaledSize(10),
    paddingVertical: scaledSize(15)

  }
})