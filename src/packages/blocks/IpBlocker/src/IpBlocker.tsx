import React from "react";

// Customizable Area Start
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";


// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import IpBlockerController, {
  Props,
  configJSON
} from "./IpBlockerController";
import { scaledSize } from "../../../framework/src/Utilities";

export default class IpBlocker extends IpBlockerController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    const accessStatusColor = () => {
      if (this.state.accessStatus === "Access Granted") {
        return {
          color: "#008000"
        }
      } else {
        return {
          color: "red"
        }
      }
    }

    const statusMessageView = () => {
      if (this.state.messageLoading) {
        return <ActivityIndicator style={styles.messageLoader} color="primary" size="large" />
      } else {
        return <Text style={[styles.accessStatusText, accessStatusColor()]}>{this.state.accessStatus}</Text>
      }
    }

    const LoaderView = (
      <ActivityIndicator color="primary" size="large" />
    )

    const IpAddressView = (
      <View style={styles.ipAddressContainer}>
        <Text style={styles.ipAddressText}>
          {configJSON.ipAddressLabel}
        </Text>
        <Text style={styles.ipAddressValue}>{this.state.ipAddress}</Text>
        <TouchableOpacity style={styles.ipAddressTouchable} onPress={this.getIpAddressStatus} testID="testStatusButton">
          <Text style={styles.iPAddressTouchableText}>{configJSON.getButtonText}</Text>
        </TouchableOpacity>
        {statusMessageView()}
      </View>
    )

    const mainView = () => {
      if (this.state.loading) {
        return LoaderView
      } else {
        return IpAddressView
      }
    }
    // Merge Engine - render - Start
    return (
      <View style={styles.container}>
        {mainView()}
      </View>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
    alignItems: "center",
    justifyContent: "center"
  },
  ipAddressText: {
    fontSize: scaledSize(30),
    fontWeight: "bold",
    color: "black",
    marginVertical: scaledSize(10)
  },
  ipAddressValue: {
    fontSize: scaledSize(20),
    fontWeight: "bold",
    marginVertical: scaledSize(10)
  },
  ipAddressContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  ipAddressTouchable: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e90ff",
    borderRadius: scaledSize(10),
    height: scaledSize(40),
    paddingHorizontal: scaledSize(10),
    marginVertical: scaledSize(10)
  },
  iPAddressTouchableText: {
    fontSize: scaledSize(22),
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  accessStatusText: {
    fontSize: scaledSize(30),
    fontWeight: "bold",
    marginVertical: scaledSize(10)
  },
  messageLoader: {
    marginVertical: scaledSize(13)
  },
});
// Customizable Area End
