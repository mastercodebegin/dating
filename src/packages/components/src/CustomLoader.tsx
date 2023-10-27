import { scaledSize } from "framework/src/Utilities";
import React from "react";
import { ActivityIndicator, Modal, View } from "react-native";
interface S {
  isLoading: boolean;
}
export default function CustomLoader(props: S) {
  return (
    <Modal transparent>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
            alignItems: "center",
          backgroundColor: "#00000000",
        }}
      >
        <ActivityIndicator
          size="large"
          color="green"
          animating={props.isLoading}
        />
      </View>
    </Modal>
  );
}
