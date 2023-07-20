import { StyleSheet } from 'react-native';
import { screenFont, screenHeight, screenWidth } from '../../utils/changeStyleSize';
import colors from '../../common/constants/colors';

export const moveBackWithPageTitleStyles = StyleSheet.create({
    buttonContainer: {
        paddingTop: 30 * screenHeight,
        paddingBottom: 43 * screenHeight,
    },
});
export const reportModalStyles = StyleSheet.create({
    container: {
        paddingHorizontal: 24 * screenWidth,
        paddingTop: 32 * screenHeight,
        paddingBottom: 24 * screenHeight,
        backgroundColor: colors.WHITE,
        borderRadius: 12 * screenFont,
        marginHorizontal: 33 * screenWidth,
    },
    titleBox: {
        alignItems: 'center',
    },
    reportFinishButtonBox: {
        flexDirection: 'row',
        paddingTop: 30 * screenHeight,
    },
    reportTopicButtonBox: {
        flexDirection: 'row',
        paddingTop: 30 * screenHeight,
    },
    topicRadioButtonBox: {
        gap: 20 * screenHeight,
        paddingTop: 24 * screenHeight,
        paddingRight: 57.5 * screenWidth,
    },
    topicRadioButton: {
        flexDirection: 'row',
    },
    radio: {
        width: 22 * screenWidth,
        height: 22 * screenWidth,
        borderWidth: 1 * screenFont,
        borderRadius: 11 * screenWidth,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8 * screenWidth,
    },
    radioInnerCircle: {
        width: 12.7 * screenWidth,
        height: 12.7 * screenWidth,
        borderRadius: 6.35 * screenFont,
        backgroundColor: '#6826F5',
    },
    etcTextInputBox: {
        borderBottomWidth: 1 * screenFont,
        borderColor: colors.BORDER_GRAY,
        height: 27 * screenHeight,
        marginTop: 16 * screenHeight,
    },
});
export const photoGalleryStyles = StyleSheet.create({
    container: {
        backgroundColor: colors.WHITE,
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        zIndex: 9999,
    },
    headerBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 22 * screenWidth,
        paddingVertical: 16 * screenHeight,
        borderColor: colors.BORDER_GRAY,
    },
    perPhotoImage: {
        flexDirection: 'row',
        paddingLeft: 16 * screenWidth,
    },
    albumButtonBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    albumButtonIcon: {
        width: 12 * screenWidth,
        height: 12 * screenWidth,
    },
    imageContainer: {
        width: 118 * screenWidth,
        height: 118 * screenWidth,
        justifyContent: 'center',
    },
    cameraIcon: {
        width: 55.41 * screenWidth,
        height: 55.41 * screenWidth,
    },
    imageSize: {
        width: '100%',
        height: '100%',
    },
    imageBox: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    imageBlurBox: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    imageCheckBox: {
        width: 24 * screenWidth,
        height: 24 * screenWidth,
        borderRadius: 24 * screenFont,
        borderColor: colors.WHITE,
        position: 'absolute',
        right: 10 * screenWidth,
        top: 10 * screenWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export const serviceAgreementStyles = StyleSheet.create({
    animateInner: {
        flex: 1,
        position: 'absolute',
        height: '100%',
        width: '100%',
        borderRadius: 14 * screenFont,
        backgroundColor: colors.WHITE,
        paddingTop: 33 * screenHeight,
        paddingHorizontal: 16 * screenWidth,
    },
    allAgreeBox: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 10 * screenWidth,
        paddingVertical: 13 * screenHeight,
    },
    agreeBox: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10 * screenWidth,
        paddingVertical: 12 * screenHeight,
    },
    agreeTitleBox: {
        flexDirection: 'row',
        width: '100%',
    },
    checkBox: {
        width: 22 * screenWidth,
        height: 22 * screenWidth,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3 * screenFont,
        marginRight: 10 * screenWidth,
    },
    listBox: {
        paddingTop: 3 * screenHeight,
        paddingBottom: 158 * screenHeight,
    },
    webviewBox: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
});
export const authEmailStyles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: '#00000060',
    },
    animateInner: {
        flex: 1,
        position: 'absolute',
        height: '100%',
        width: '100%',
        borderRadius: 14 * screenFont,
        backgroundColor: colors.WHITE,
        paddingTop: 32 * screenHeight,
        paddingHorizontal: 16 * screenWidth,
    },
    backButtonBox: {
        paddingBottom: 28 * screenHeight,
    },
    inputBox: {
        height: 48 * screenHeight,
        backgroundColor: colors.LIGHTGRAY,
        borderRadius: 5 * screenFont,
        justifyContent: 'flex-start',
        paddingHorizontal: 16 * screenWidth,
        flexDirection: 'row',
    },
    inputRange: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    timerBox: {
        justifyContent: 'center',
    },
    emailErrorTextBox: {
        flexDirection: 'row',
        paddingLeft: 10 * screenWidth,
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'absolute',
        bottom: -21 * screenHeight,
    },
    retryTextBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    underBar: {
        borderBottomColor: colors.TXT_GRAY,
        borderBottomWidth: 2 * screenFont,
    },
    finishButton: {
        width: '100%',
    },
});
export const FailPermissionModalStyles = StyleSheet.create({
    container: {
        backgroundColor: colors.WHITE,
        borderRadius: 12 * screenFont,
        alignItems: 'center',
        paddingTop: 32 * screenHeight,
        paddingBottom: 24 * screenHeight,
        paddingHorizontal: 24 * screenWidth,
        marginHorizontal: 36 * screenWidth,
    },
    textBox: {
        alignItems: 'center',
        paddingHorizontal: 12 * screenWidth,
    },
    buttonBox: {
        width: '100%',
        flexDirection: 'row',
    },
});
export const keywordsListStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
    },
    itemBox: {
        marginRight: 6 * screenWidth,
        marginBottom: 12 * screenHeight,
    },
});
export const tabBarStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20 * screenWidth,
        paddingVertical: 8 * screenWidth,
        backgroundColor: colors.BACKGROUND_DEFAULT,
        borderTopWidth: 0.5 * screenFont,
        borderColor: colors.BTN_GRAY,
    },
    image: {
        width: 24 * screenWidth,
        height: 24 * screenWidth,
    },
    contentBox: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
const NEAR_LIST_HEIGHT = 565 * screenHeight;
export const nearbyPostListModalStyles = StyleSheet.create({
    container: {
        backgroundColor: colors.BACKGROUND_DEFAULT,
        borderTopStartRadius: 14 * screenFont,
        borderTopEndRadius: 14 * screenFont,
        paddingHorizontal: 16 * screenWidth,
        zIndex: 1,
    },
    slideBarBox: {
        alignItems: 'center',
        paddingTop: 12 * screenHeight,
    },
    slideBar: {
        width: 24 * screenWidth,
        height: 4 * screenWidth,
        backgroundColor: colors.BTN_GRAY,
        borderRadius: 2 * screenFont,
    },
    titleBox: {
        paddingTop: 16 * screenHeight,
        paddingBottom: 26 * screenHeight,
    },
    grayBackground: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        position: 'absolute',
        top: 0,
    },
    listBox: {
        backgroundColor: colors.BACKGROUND_DEFAULT,
        marginTop: -1,
        height: NEAR_LIST_HEIGHT,
        zIndex: 1,
    },
    listTouchBox: {
        position: 'absolute',
        top: 20 * screenHeight,
        width: '100%',
        height: NEAR_LIST_HEIGHT,
        paddingHorizontal: 16 * screenWidth,
        marginTop: -1,
        zIndex: 1,
    },
    toggleButtonBox: {
        position: 'absolute',
        bottom: 18 * screenHeight,
        right: 16 * screenWidth,
    },

    nothingListGuideBox: {
        alignItems: 'center',
        height: '90%',
    },
});
export const mapWithMarkerStyles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
    },
    markerBox: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 103 * screenWidth,
        height: 103 * screenWidth,
    },
    markerBoxInner: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    markerRange: {
        position: 'absolute',
        width: 103 * screenWidth,
        height: 103 * screenWidth,
    },
    marker: {
        width: 27 * screenWidth,
        height: 27 * screenWidth,
    },
    issueMarker: {
        width: 25 * screenWidth,
        height: 25 * screenWidth,
    },
});
export const checkBoxBackground = (is: boolean) =>
    StyleSheet.create({
        color: {
            backgroundColor: is ? colors.BLACK : '#E3E3E3',
        },
    });
export const postListItemStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16 * screenWidth,
        flexDirection: 'row',
    },
    textBox: {
        flex: 1,
    },
    postImageBox: {
        marginLeft: 22 * screenWidth,
    },
    postImage: {
        width: 77 * screenWidth,
        height: 77 * screenWidth,
        borderRadius: 5 * screenFont,
    },
});
export const searchLocationStyles = StyleSheet.create({
    container: { flex: 1 },
    inputContainer: {
        paddingHorizontal: 16 * screenWidth,
    },
    inputBox: {
        width: '100%',
        borderWidth: 1 * screenFont,
        borderColor: '#D4D4D4',
        borderRadius: 28 * screenFont,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20 * screenWidth,
        paddingVertical: 12 * screenHeight,
    },
    listItemBox: {
        flexDirection: 'row',
    },

    resultIcon: {
        width: 25 * screenWidth,
        height: 25 * screenWidth,
        marginRight: 9.5 * screenWidth,
    },
    historyIcons: {
        marginRight: 9.5 * screenWidth,
        paddingTop: 1.5 * screenHeight,
    },
    resultTextBox: {
        flex: 1,
    },
    resultAddress: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});
export const addKeywordInWriteStyles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: colors.BACKGROUND_DEFAULT,
        paddingHorizontal: 16 * screenWidth,
        zIndex: 9999,
    },
    upLinear: {
        width: '100%',
        height: 32 * screenHeight,
        position: 'absolute',
        top: 0 * screenHeight,
        zIndex: 1,
    },
    downLinear: {
        width: '100%',
        height: 32 * screenHeight,
        position: 'absolute',
        top: -32 * screenHeight,
        zIndex: 1,
    },
    headerBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 17 * screenHeight,
        paddingBottom: 42 * screenHeight,
    },
    titleBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    keywordListBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nextBottonBox: {
        width: '100%',
        height: 84,
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        backgroundColor: colors.BACKGROUND_DEFAULT,
    },
    bottomBox: {
        position: 'absolute',
        bottom: 34 * screenHeight,
        marginHorizontal: 16 * screenWidth,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    borderLine: {
        borderBottomWidth: 1.5 * screenFont,
        borderColor: colors.TXT_GRAY,
    },
});
export const editMyKeywordStyles = StyleSheet.create({
    mainContainer: {
        paddingBottom: 90 * screenHeight,
    },
    upLinear: {
        width: '100%',
        height: 32 * screenHeight,
        position: 'absolute',
        top: 0 * screenHeight,
        zIndex: 1,
    },
    downLinear: {
        width: '100%',
        height: 32 * screenHeight,
        position: 'absolute',
        top: -32 * screenHeight,
        zIndex: 1,
    },
    keywordListBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    resetText: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomBox: {
        position: 'absolute',
        bottom: 34 * screenHeight,
        marginHorizontal: 16 * screenWidth,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    borderLine: {
        borderBottomWidth: 1.5 * screenFont,
        borderColor: colors.TXT_GRAY,
    },
});
export const webViewComponentStyles = StyleSheet.create({
    container: {
        height: '100%',
    },
    webview: {
        width: '100%',
        height: '95%',
    },
    headerBox: {
        paddingBottom: 10 * screenHeight,
        paddingTop: 13 * screenHeight,
        paddingLeft: 16 * screenWidth,
    },
});
