import { Alert } from "react-native";
import { showMessage } from "react-native-flash-message";

const CutomAlertFail = (msg: any) => {
  return showMessage({
    message: msg == undefined ? "Somthing went wrong" : msg,
    type: "none",
  });
};

const CutomAlertSuccess = (msg: any) => {
  return showMessage({
    message: msg == undefined ? "Somthing went wrong" : msg,
    type: "success",
  });
};

const showPopupWithOkAndCancel = (
  title: string,
  message: string,
  okClicked: any,
  cancelClicked: any,
  button1: string,
  button2: string
) => {
  Alert.alert(title ? title : "Dating App", message ? message : "", [
    {
      text: button1 ? button1 : "Cancel",
      onPress: () => cancelClicked && cancelClicked(),
      style: "cancel",
    },
    {
      text: button2 ? button2 : "OK",
      onPress: () => okClicked && okClicked(),
    },
  ]);
};

export { CutomAlertFail, CutomAlertSuccess, showPopupWithOkAndCancel };
