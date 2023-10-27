import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum"; 
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import ImagePicker from "react-native-image-crop-picker";
import { CutomAlertFail } from "../../../components/src/CustomAlert";
import { getStorageData } from "../../../framework/src/Utilities";
import {generateUniqueID} from '../../../components/src/CustomUtility'
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  userImage1: string;
  userImage2: string;
  userImage3: string;
  userImage4: string;
  isLoading: boolean;
  imageData: Array<any>;
  imageDataEdit: any;
  imageDataProfile: any;
  aboutData: string;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class UploadImageController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  userProfilePicDeleteId: any;
  userProfilePicEditId: any;
  userProfileGetApiCallId: any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.CountryCodeMessage),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      userImage1: "",
      userImage2: "",
      userImage3: "",
      userImage4: "",
      isLoading: false,
      imageData: [
        {
          id: 1,
          image: "",
          umploadImg: {},
        },
        {
          id: 2,
          image: "",
          umploadImg: {},
        },
        {
          id: 3,
          image: "",
          umploadImg: {},
        },
        {
          id: 4,
          image: "",
          umploadImg: {},
        },
        {
          id: 5,
          image: "",
          umploadImg: {},
        },
        {
          id: 6,
          image: "",
          umploadImg: {},
        },
      ],
      imageDataEdit: "",
      imageDataProfile: [],
      aboutData: "",
      // Customizable Area Start
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (!responseJson?.errors) {
        if (apiRequestCallId === this.userProfilePicDeleteId) {
          await this.userProfilePicSuccess(responseJson);
        } else if (apiRequestCallId === this.userProfileGetApiCallId) {
          await this.userProfileGetPicSuccess(responseJson);
        } else if (apiRequestCallId === this.userProfilePicEditId) {
          this.getUserProfileData();
          this.setState({ isLoading: false });
        }
      } else if (responseJson?.errors) {
        switch (apiRequestCallId) {
          case this.userProfilePicDeleteId:
            this.loderClose();
            break;
          case this.userProfilePicEditId:
            this.loderClose();
            break;
          case this.userProfileGetApiCallId:
            this.loderClose();
            break;
          default:
            break;
        }
      }
    }
    // Customizable Area Start
    // Customizable Area End
  }

  loderClose() {
    this.setState({ isLoading: false });
  }

  async userProfilePicSuccess(responseJson: any) {
    if (
      responseJson?.data?.attributes?.photos != null ||
      responseJson?.data?.attributes?.photos.length != 6
    ) {
      console.log("userProfilePicDeleteId", JSON.stringify(responseJson));
      let image = [...responseJson?.data?.attributes?.photos];
      const count = 6 - responseJson?.data?.attributes?.photos.length;
      for (let i = 0; i < count; i++) {
        image.push({
          id: generateUniqueID(),
          url: "Emptyimage",
          isStatic: true,
        });
      }
      this.setState({ isLoading: false, imageDataProfile: image });
    } else {
      this.setState(
        {
          isLoading: false,
          imageDataProfile: responseJson?.data?.attributes?.photos,
        },
        () => { }
      );
    }
  }

  async userProfileGetPicSuccess(responseJson: any) {
    if (responseJson?.data?.attributes?.photos.length != 6) {
      let image = [...responseJson?.data?.attributes?.photos];
      const count = 6 - responseJson?.data?.attributes?.photos.length;
      console.log("count>>>", count);
      for (let i = 0; i < count; i++) {
        image.push({
          id: generateUniqueID(),
          isStatic: true,
          url: "Emptyimage",
        });
      }
      this.setState({ imageDataProfile: image, isLoading: false, });
    } else {
      this.setState(
        {
          imageDataProfile: responseJson?.data?.attributes?.photos,
          isLoading: false,

        },
        () => { }
      );
    }
  }

  async componentDidMount() {
    const imageData = this.props.navigation.state.params?.ImageData;
    const aboutData = this.props.navigation.state.params?.about;
    console.log("imageData", imageData, aboutData);
    this.setState({ imageDataProfile: imageData, aboutData: aboutData });
  }

  uploadImage() {
    const filterData = this.state.imageData
      .filter((item) => item.image !== "") // Filter out objects with null images
      .map((item) => ({
        uri: item?.umploadImg?.path,
        name: item?.umploadImg?.path?.split("/").pop(),
        type: item?.umploadImg.mime,
      }));
    console.log("finalData", filterData);
    if (filterData.length < 4) {
      return CutomAlertFail("Minimum 4 and maximum 6 images are required");
    } else {
      this.props.navigation.navigate("PersonalityStatement", {
        imgData: filterData,
      });
    }
  }

  onPressContinue() {
    const filterData = this.state.imageDataProfile
      .filter((item: any) => item.image !== "") // Filter out objects with null images
      .map((item: any) => ({
        uri: item?.url,
        type: "image/jpg",
        name: "image.jpg",
      }));
    const emptyData = this.state.imageDataProfile.filter(
      (item: any) => item.isStatic !== true
    );
    if (emptyData.length < 4) {
      return CutomAlertFail("Minimum 4 and maximum 6 images are required");
    } else {
      this.props.navigation.navigate("UpdatePersonalityStatement", {
        about: this.state.aboutData,
        imgData: filterData,
      });
    }
  }

  goBack() {
    this.props.navigation.goBack();
  }

  openGallery = (id: any) => {
    ImagePicker.openPicker({
      multiple: false,
      mediaType: "photo",
    }).then((images) => {
      let abc = this.state.imageData.filter((item) => {
        if (item.id === id) {
          item.image = images.path;
          item.umploadImg = images;
        }
      });
      console.log('abc@@@@',abc)
      this.setState({ imageData: this.state.imageData });
    });
  };

  openEditGallery = (id: any, imagaData: any) => {
    ImagePicker.openPicker({
      multiple: false,
      mediaType: "photo",
    }).then((images) => {
      imagaData.filter((item: any) => {
        if (item.id === id) {
          item.url = images.path;
          item.umploadImg = images;
        }
      });
      this.setState({ imageDataEdit: images?.path }, () =>
        this.onPressEditImage(id, this.state.imageDataEdit)
      );
    });
  };

  onPressRemoveImage = (id: any) => {
  let abc =  this.state.imageData.filter((item) => {
      if (item.id === id) {
        item.image = "";
      }
    });
    console.log("abc",abc)
    this.setState({ imageData: this.state.imageData });
  };

  onPressRemove = async (id: any) => {
    this.setState({ isLoading: true });
    const res = await getStorageData("token");
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: res,
    };

    let formdata = new FormData();

    formdata.append("delete_photo_id", id);
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.userProfilePicDeleteId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_profile/profiles/delete_profile_photo?delete_photo_id=${id}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(formdata)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "PUT"
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  onPressEditImage = async (id: any, image: string) => {
    this.setState({ isLoading: true });
    const res = await getStorageData("token");
    const header = {
      token: res,
    };

    let formdata = new FormData();
    formdata.append("new_photo", {
      // @ts-ignore
      uri: image,
      type: "image/jpg",
      name: "image.jpg",
    });
    formdata.append("update_photo_id", id);

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.userProfilePicEditId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_profile/profiles/update_profile_photo`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      formdata
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "PUT"
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  // Customizable Area Start
  async getUserProfileData() {
    const res = await getStorageData("token");

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.userProfileGetApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiGetUserProfile
    );

    const header = {
      "Content-Type": configJSON.contentTypeApiGetUserProfile,
      token: res,
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.methodTypeApiGetUserProfile
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }
  // Customizable Area End
}
