import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
    getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { getStorageData } from "framework/src/Utilities";
import { CutomAlertFail } from "../../../components/src/CustomAlert";
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
    // Customizable Area Start
    searchValue: string
    imageData: any
    isLoading: boolean
    check: any
    userQuestion: any
    suggestFrdDetail: any
    userId: number
    compatability: number
    intimacy: number
    frdImage: Array<any>
    isSubscribed: string

    // Customizable Area End
}

interface SS {
    id: any;
    // Customizable Area Start
    // Customizable Area End
}

export default class InsightsScreenController extends BlockComponent<
    Props,
    S,
    SS
> {
    // Customizable Area Start
    getQuestionCallId: string
    questionAnswerCallId: string
    suggestFriendDetailCallId: string

    // Customizable Area End

    constructor(props: Props) {
        super(props);
        this.receive = this.receive.bind(this);

        // Customizable Area Start
        this.getQuestionCallId = ''
        this.questionAnswerCallId = ''
        this.suggestFriendDetailCallId = ''

        this.subScribedMessages = [
            getName(MessageEnum.AccoutLoginSuccess),
            // Customizable Area Start
            getName(MessageEnum.RestAPIResponceMessage),

            // Customizable Area End
        ];

        this.state = {
            txtInputValue: "",
            txtSavedValue: "A",
            enableField: false,
            // Customizable Area Start
            searchValue: '',
            imageData: [{
                id: 1,
                url: "https://source.unsplash.com/user/c_v_r/100x100"
            },
            {
                id: 2,
                url: "https://picsum.photos/200/300"
            }


            ],
            isLoading: false,
            check: '',
            userQuestion: {},
            suggestFrdDetail: {},
            userId: 0,
            compatability: 0,
            intimacy: 0,
            frdImage: [],
            isSubscribed: ''

            // Customizable Area End
        };
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

        // Customizable Area Start
        // Customizable Area End
    }
    async receive(_from: string, message: Message) {
        runEngine.debugLog("Message Recived", message);
        // Customizable Area Start

        const apiRequestCallId = message.getData(
            getName(MessageEnum.RestAPIResponceDataMessage),
        )
        if (apiRequestCallId == this.getQuestionCallId) {
            let responseJson = message.getData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
            )

            console.log("getQuestion>>>", JSON.stringify(responseJson));
            this.setState({ userQuestion: responseJson })
            if (responseJson.errors) {
                //CutomAlertFail(responseJson.errors[0].message)
                console.log("Something went wrong------------", responseJson.errors);
                this.setState({ isLoading: false, searchValue: '' })
                // CutomAlertFail('No User Found')
            }
            else {
                console.log('else----', responseJson);
                this.setState({ isLoading: false })
                //   //return this.props.navigation.navigate('identifyYourSelf')
            }
        }
        if (apiRequestCallId == this.questionAnswerCallId) {
            let responseJson = message.getData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
            )
            let errorResponse = message.getData(
                getName(MessageEnum.RestAPIResponceErrorMessage),
            )

            console.log("Something went wrong90------------", JSON.stringify(responseJson));
            console.log("Something ", errorResponse);
            if (errorResponse) {
                CutomAlertFail(errorResponse)
            } else if (responseJson?.errors) {
                console.log("Something went wrong------------", responseJson.errors);
                this.setState({ isLoading: false, searchValue: '' })
                CutomAlertFail('No User Found')
            }
            else {
                console.log("message>>>", responseJson);
                this.setState({ check: '', isLoading: false })
                this.props.navigation.goBack();
            }
        }
        if (apiRequestCallId == this.suggestFriendDetailCallId) {
            let responseJson = message.getData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
            )
            console.log("suggestFriendDetailCallId", JSON.stringify(responseJson));
            if (responseJson.errors) {
                // CutomAlertFail(responseJson.errors[0].message)
                console.log("Something went wrong------------", responseJson.errors);
                this.setState({ isLoading: false })
            }
            else {
                console.log("suggestFriendDetailCallId>>>", responseJson);
                const imgUrl = responseJson?.data?.attributes?.photo?.map((item: any) => {
                    return item?.url;
                });
                console.log("imgUrl>>>", imgUrl);
                this.setState({ frdImage: imgUrl })
                this.setState({ suggestFrdDetail: responseJson?.data })
                this.setState({ compatability: responseJson?.data?.attributes?.comtability })
                this.setState({ intimacy: responseJson?.data?.attributes?.intemancy })
                console.log('else----', responseJson);
            }
        }
        this.setState({ isLoading: false })
        // Customizable Area End
    }

    txtInputWebProps = {
        onChangeText: (text: string) => {
            this.setState({ txtInputValue: text });
        },
        secureTextEntry: false,
    };

    txtInputMobileProps = {
        ...this.txtInputWebProps,
        autoCompleteType: "email",
        keyboardType: "email-address",
    };

    txtInputProps = this.isPlatformWeb()
        ? this.txtInputWebProps
        : this.txtInputMobileProps;

    doButtonPressed() {
        let msg = new Message(getName(MessageEnum.AccoutLoginSuccess));
        msg.addData(
            getName(MessageEnum.AuthTokenDataMessage),
            this.state.txtInputValue
        );
        this.send(msg);
    }

    // web events
    setInputValue = (text: string) => {
        this.setState({ txtInputValue: text });
    };

    setEnableField = () => {
        this.setState({ enableField: !this.state.enableField });
    };

    // Customizable Area Start

    onChangeText(v: any) {

        this.setState({ searchValue: v, isLoading: true })

    }

    imgBlurCondition(_indx: number) {
        if (this.state.isSubscribed === "true") {
            return 0
        } else {
            return _indx > 1 ? 5 : 0
        }
    }

    async getQuestion(id: any) {
        this.setState({ isLoading: true })
        const token = await getStorageData('token');
        const header = {
            'token': token
        };
        console.log('header', header);

        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.getQuestionCallId = requestMessage.messageId;
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.suggestFriendAccountData + id
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            configJSON.validationApiMethodType
        );

        runEngine.sendMessage(requestMessage.id, requestMessage);

        return true;
    }

    async suggestUserDetail(id: any) {
        console.log('suggestUserDetail', id);
        this.setState({ isLoading: true })
        const token = await getStorageData('token');
        const header = {
            'token': token
        };

        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.suggestFriendDetailCallId = requestMessage.messageId;
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.getUserDetail + id
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            configJSON.validationApiMethodType
        );

        runEngine.sendMessage(requestMessage.id, requestMessage);

        return true;
    }

    async questionAnswer() {
        this.setState({ isLoading: true })
        const token = await getStorageData('token');
        const header = {
            "Content-Type": configJSON.validationApiContentType,
            'token': token
        };

        const httpBody = {
            "question": {
                "account_id": this.state.userId,
                "option": this.state.check,
                "question_bank_id": this.state.userQuestion?.data?.id
            }
        }
        console.log('anwBody>>>', httpBody);
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        )

        this.questionAnswerCallId = requestMessage.messageId;
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.getQuestionEndPoint
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestBodyMessage),
            JSON.stringify(httpBody)
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            configJSON.postMethodType
        );

        runEngine.sendMessage(requestMessage.id, requestMessage);

        return true;
    }

    async componentDidMount() {
        const userId = this.props.navigation?.state?.params?.userId
        this.setState({ userId: userId })
        await this.suggestUserDetail(userId)
        await this.getQuestion(userId)
        const isSubscribed = await getStorageData("isSubscribed")
        this.setState({ isSubscribed: isSubscribed })
    }
    // Customizable Area End
}
