import { StyleSheet } from 'react-native';
import { screenFont, screenHeight, screenWidth } from '../../utils/changeStyleSize';
import colors from '../../common/constants/colors';

export const inputNicknameTemplateStyles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        paddingTop: 51 * screenHeight,
    },
    mainContentBox: {
        flex: 1,
    },
    inputBox: {
        flexDirection: 'row',
        borderRadius: 5 * screenWidth,
        height: 48 * screenHeight,
        backgroundColor: colors.LIGHTGRAY,
        paddingHorizontal: 16 * screenWidth,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    emailErrorTextBox: {
        flexDirection: 'row',
        paddingLeft: 10 * screenWidth,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    bottomButton: {
        paddingBottom: 41 * screenHeight,
    },
});
export const inputEmailTemplateStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 51 * screenHeight,
    },
    mainContent: {
        flexGrow: 1,
    },
    emailErrorTextBox: {
        flexDirection: 'row',
        paddingLeft: 10 * screenWidth,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    resendMailButtonBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 24 * screenHeight,
        paddingBottom: 36 * screenHeight,
        justifyContent: 'center',
    },
    resendButton: {
        borderBottomWidth: 1.5 * screenFont,
        borderColor: colors.TXT_GRAY,
        marginLeft: 8 * screenWidth,
    },
});
export const inputPasswordTemplateStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 51 * screenHeight,
    },
    inputBox: {
        flex: 1,
    },
    emainTextBox: {
        height: 48 * screenHeight,
        paddingLeft: 16 * screenWidth,
        backgroundColor: colors.LIGHTGRAY,
        borderRadius: 5 * screenFont,
        justifyContent: 'center',
    },
    emailErrorTextBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10 * screenWidth,
    },
    bottomButton: {
        paddingBottom: 41 * screenHeight,
    },
});
export const notLoginTemplateStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 99 * screenHeight,
    },
    buttonBox: {
        paddingBottom: 70 * screenHeight,
    },
    imageBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageSize: {
        width: 244 * screenWidth,
        height: 222 * screenHeight,
    },
});
export const requestPemissionTemplateStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    choicePermission: {
        paddingBottom: 17 * screenHeight,
    },
    lineBar: {
        borderTopWidth: 1 * screenFont,
        borderColor: colors.BORDER_GRAY,
    },
    buttonBox: {
        position: 'absolute',
        bottom: 42 * screenHeight,
        width: '100%',
    },
});
export const emailLoginTemplateStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainContent: {
        flexGrow: 1,
    },
    underBar: {
        borderBottomColor: colors.TXT_GRAY,
        borderBottomWidth: 2 * screenFont,
    },
    emailErrorTextBox: {
        flexDirection: 'row',
        paddingLeft: 10 * screenWidth,
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'absolute',
        bottom: -21 * screenHeight,
    },
    bottomBox: {
        paddingBottom: 37 * screenHeight,
    },
    bottomContain: {
        flexShrink: 1,
    },
});
export const initLikeKeywordTemplateStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    skipBox: {
        position: 'absolute',
        top: 30 * screenHeight,
        right: 0,
    },
    headerBox: {
        zIndex: 1,
    },
    upLinear: {
        width: '100%',
        height: 32 * screenHeight,
        position: 'absolute',
        bottom: -32 * screenHeight,
    },
    scrollBox: {
        paddingTop: 35 * screenHeight,
        paddingBottom: 168 * screenHeight,
    },
    downLinearBox: {
        height: 84 * screenHeight,
    },
    downLinear: {
        width: '100%',
        height: 32 * screenHeight,
        position: 'absolute',
        top: -32 * screenHeight,
    },
    button: {
        width: '100%',
        position: 'absolute',
        bottom: 42 * screenHeight,
    },
    androidShadow: {
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 4 * screenHeight,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4 * screenFont,
    },
});
export const completedJoinTemplateStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16 * screenWidth,
    },
    titleBox: {
        paddingTop: 97 * screenHeight,
    },
    imageBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageSize: {
        width: 328 * screenWidth,
        height: 342 * screenHeight,
    },
    button: {
        paddingBottom: 42 * screenHeight,
    },
});
export const mapHomeTemplateStyles = StyleSheet.create({
    searchLayout: {
        position: 'absolute',
        top: 16 * screenHeight,
        width: '100%',
        height: 44 * screenHeight,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16 * screenWidth,
    },
    dropshadow: {
        flex: 1,
        shadowColor: '#1C0B22',
        shadowOffset: {
            width: 0,
            height: 4 * screenHeight,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10 * screenFont,
    },
    inputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.BACKGROUND_DEFAULT,
        borderRadius: 28 * screenFont,
        paddingHorizontal: 19 * screenWidth,
        paddingVertical: 12 * screenHeight,
    },
    searchIcon: {
        width: 24 * screenWidth,
        height: 24 * screenWidth,
        marginRight: 16 * screenWidth,
    },
    bellIcon: {
        width: 30 * screenWidth,
        height: 30 * screenWidth,
        marginLeft: 8 * screenWidth,
    },
    zoomWarning: {
        paddingHorizontal: 38 * screenWidth,
        paddingVertical: 9 * screenHeight,
        backgroundColor: '#00000099',
        borderRadius: 25 * screenFont,
        position: 'absolute',
        top: 300 * screenHeight,
        alignSelf: 'center',
    },
    mapMoveSearch: {
        position: 'absolute',
        top: 86 * screenHeight,
        alignSelf: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: -4 * screenHeight,
        },
        shadowOpacity: 0.05,
        shadowRadius: 34 * screenFont,
    },
    searchModalBox: {
        backgroundColor: colors.WHITE,
        paddingTop: 16 * screenHeight,
        flex: 1,
    },
});
export const writePostTemplateStyles = StyleSheet.create({
    container: {
        backgroundColor: colors.WHITE,
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    headerNavigateBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16 * screenWidth,
        paddingVertical: 16 * screenHeight,
    },
    contentBox: {
        flex: 1,
    },
    settingContainer: {
        borderBottomWidth: 1 * screenFont,
        borderColor: colors.BORDER_GRAY,
        paddingHorizontal: 16 * screenWidth,
        paddingBottom: 12 * screenHeight,
    },
    contentInputFocus: { height: 400 * screenHeight },
    settingBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationSearchModal: {
        flex: 1,
        backgroundColor: colors.BACKGROUND_DEFAULT,
    },
    searchToggleIcon: {
        width: 10 * screenWidth,
        height: 10 * screenWidth,
    },
    locationIcon: {
        width: 16 * screenWidth,
        height: 16 * screenWidth,
    },
    inputBox: {
        paddingHorizontal: 16 * screenWidth,
        paddingTop: 10 * screenHeight,
    },
    errorModalBox: {
        backgroundColor: colors.WHITE,
        alignItems: 'center',
        padding: 24 * screenWidth,
        borderRadius: 12 * screenFont,
    },
    mapSize: {
        width: '100%',
        height: '50%',
    },
    mapMarkerPosition: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomBox: {
        flexShrink: 1,
        backgroundColor: colors.BACKGROUND_DEFAULT,
    },
    bottomBarBotton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    addPhotoBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cameraIcon: {
        width: 24 * screenWidth,
        height: 24 * screenWidth,
    },
    bottomKeyword: {
        paddingHorizontal: 16 * screenWidth,
        paddingTop: 8 * screenHeight,
        paddingBottom: 13 * screenHeight,
        backgroundColor: colors.WHITE,
    },
    bottomKeywordItem: {
        borderColor: colors.TXT_LIGHTGRAY,
        borderWidth: 0.8 * screenFont,
        borderRadius: 21.57 * screenFont,
        paddingHorizontal: 10 * screenWidth,
        paddingVertical: 5 * screenHeight,
        marginRight: 3 * screenWidth,
    },
    bottomImageBox: {
        position: 'relative',
        marginRight: 8 * screenWidth,
        width: 66 * screenWidth,
        height: 70 * screenWidth,
    },
    bottomImageInnerBox: {
        width: '100%',
        height: 66 * screenWidth,
        position: 'absolute',
        bottom: 0,
    },
    bottomImageSize: {
        width: '100%',
        height: '100%',
        borderRadius: 10 * screenFont,
        borderWidth: 1 * screenFont,
        borderColor: '#E3E3E3',
    },
    bottomImageDelButton: {
        position: 'absolute',
        height: 25 * screenHeight,
        top: -2 * screenWidth,
        right: -4 * screenWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomImageDelIconBack: {
        position: 'absolute',
        width: '40%',
        height: '40%',
        backgroundColor: colors.WHITE,
    },
});
export const writeCommentTemplateStyles = StyleSheet.create({
    container: {
        backgroundColor: colors.WHITE,
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    headerNavigateBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16 * screenWidth,
        paddingVertical: 16 * screenHeight,
    },
    contentBox: {
        flex: 1,
    },
    settingContainer: {
        borderBottomWidth: 1 * screenFont,
        borderColor: colors.BORDER_GRAY,
        paddingHorizontal: 16 * screenWidth,
        paddingBottom: 12 * screenHeight,
    },
    contentInputFocus: {
        height: 400 * screenHeight,
    },
    settingBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationSearchModal: {
        flex: 1,
        backgroundColor: colors.BACKGROUND_DEFAULT,
    },
    searchToggleIcon: {
        width: 10 * screenWidth,
        height: 10 * screenWidth,
    },
    locationIcon: {
        width: 16 * screenWidth,
        height: 16 * screenWidth,
    },
    inputBox: {
        paddingHorizontal: 16 * screenWidth,
        paddingTop: 10 * screenHeight,
    },
    errorModalBox: {
        backgroundColor: colors.WHITE,
        alignItems: 'center',
        padding: 24 * screenWidth,
        borderRadius: 12 * screenFont,
    },
    conditionSettingBox: {
        paddingTop: 14 * screenHeight,
    },
    bottomBox: {
        flexShrink: 1,
        backgroundColor: colors.BACKGROUND_DEFAULT,
    },
    bottomBarBotton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    addPhotoBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cameraIcon: {
        width: 24 * screenWidth,
        height: 24 * screenWidth,
    },
    bottomKeyword: {
        paddingHorizontal: 16 * screenWidth,
        paddingTop: 8 * screenHeight,
        paddingBottom: 13 * screenHeight,
        backgroundColor: colors.WHITE,
    },
    bottomKeywordItem: {
        borderColor: colors.TXT_LIGHTGRAY,
        borderWidth: 0.8 * screenFont,
        borderRadius: 21.57 * screenFont,
        paddingHorizontal: 10 * screenWidth,
        paddingVertical: 5 * screenHeight,
        marginRight: 3 * screenWidth,
    },
    bottomImageBox: {
        position: 'relative',
        marginRight: 8 * screenWidth,
        width: 66 * screenWidth,
        height: 70 * screenWidth,
    },
    bottomImageInnerBox: {
        width: '100%',
        height: 66 * screenWidth,
        position: 'absolute',
        bottom: 0,
    },
    bottomImageSize: {
        width: '100%',
        height: '100%',
        borderRadius: 10 * screenFont,
        borderWidth: 1 * screenFont,
        borderColor: '#E3E3E3',
    },
    bottomImageDelButton: {
        position: 'absolute',
        height: 25 * screenHeight,
        top: -2 * screenWidth,
        right: -4 * screenWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomImageDelIconBack: {
        position: 'absolute',
        width: '40%',
        height: '40%',
        backgroundColor: colors.WHITE,
    },
});
export const myPageTemplateStyles = StyleSheet.create({
    container: {
        backgroundColor: colors.WHITE,
        flex: 1,
    },
    profileBox: {
        backgroundColor: '#2B2B2B',
        paddingHorizontal: 16 * screenWidth,
        paddingTop: 43 * screenHeight,
        paddingBottom: 27 * screenHeight,
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileCameraBox: {
        backgroundColor: '#5A5A5ACC',
        width: 20 * screenWidth,
        height: 20 * screenWidth,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20 * screenFont,
        bottom: 0,
        right: 0,
    },
    profileTextBox: {
        paddingLeft: 16 * screenWidth,
    },
    profileNameBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 1 * screenHeight,
    },
    penIcon: {
        width: 12 * screenWidth,
        height: 12 * screenWidth,
        marginLeft: 4 * screenWidth,
    },
    tabListBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    tabTitleBox: {
        backgroundColor: colors.BACKGROUND_DEFAULT,
        paddingVertical: 10 * screenHeight,
        paddingHorizontal: 16 * screenWidth,
    },
    versionBox: {
        borderBottomWidth: 1 * screenFont,
        borderColor: colors.BORDER_GRAY,
        paddingHorizontal: 16 * screenWidth,
        paddingVertical: 16 * screenWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    tabRightIcon: {
        width: 8 * screenWidth,
        height: 14 * screenHeight,
    },
    sectionItem: {
        paddingHorizontal: 16 * screenWidth,
        paddingVertical: 16 * screenHeight,
        borderColor: colors.BORDER_GRAY,
    },
});
export const keywordAlarmTemplateStyles = StyleSheet.create({
    headerBox: {
        flexDirection: 'row',
        paddingTop: 14 * screenHeight,
        paddingBottom: 13 * screenHeight,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.WHITE,
        zIndex: 1,
    },
    historyItemButton: {
        paddingVertical: 18 * screenHeight,
        flexDirection: 'row',
    },
    alarmIcon: {
        borderWidth: 1 * screenFont,
        borderRadius: 12 * screenFont,
        borderColor: colors.BLACK,
        width: 24 * screenWidth,
        height: 24 * screenWidth,
        alignItems: 'center',
        justifyContent: 'center',
    },
    hisrotyItemTextBox: {
        flex: 1,
        marginLeft: 16 * screenWidth,
    },
});
export const editNicknameTemplateStyles = StyleSheet.create({
    templateContent: {
        paddingHorizontal: 16 * screenWidth,
        paddingTop: 34 * screenHeight,
    },
    inputBox: {
        backgroundColor: colors.WHITE,
        borderColor: '#D4D4D4',
        borderWidth: 1 * screenFont,
        borderRadius: 5 * screenFont,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16 * screenWidth,
        paddingVertical: 15 * screenHeight,
        flexDirection: 'row',
    },
    validationText: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 9 * screenWidth,
        paddingTop: 8 * screenHeight,
    },
});
export const threadItemTemplateStyles = StyleSheet.create({
    backButtonBox: {
        position: 'absolute',
        left: 16 * screenWidth,
        zIndex: 1,
    },
    ButtonShadow: {
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 4 * screenHeight,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4 * screenFont,
    },
    mapImgBox: {
        height: 150 * screenHeight,
    },
    mapImg: { width: '100%', height: '100%' },
    main: {
        paddingHorizontal: 16 * screenWidth,
    },
    headerBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 13 * screenHeight,
        borderBottomWidth: 1 * screenFont,
        borderColor: colors.BORDER_GRAY,
    },
    headerTitleBox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    shareIcon: {
        width: 24 * screenWidth,
        height: 24 * screenWidth,
    },
    commentBox: {
        position: 'relative',
        height: '100%',
        overflow: 'hidden',
    },
    commentBoxBar: {
        borderLeftWidth: 1 * screenFont,
        borderColor: colors.BORDER_GRAY,
        position: 'absolute',
        top: 42 * screenHeight,
        left: 2.8 * screenWidth,
        width: 1 * screenWidth,
        height: '100%',
    },
    commentListBox: {
        marginTop: 24 * screenHeight,
        paddingBottom: 370 * screenHeight,
    },
    writeCommentBox: {
        position: 'absolute',
        right: 16 * screenWidth,
        bottom: 43 * screenHeight,
    },
    writeCommentButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
export const myPostCommentTemplateStyles = StyleSheet.create({
    headerBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 16 * screenHeight,
        paddingTop: 17 * screenHeight,
        paddingHorizontal: 16 * screenWidth,
    },
    headerIcon: {
        width: 9 * screenWidth,
        height: 16 * screenHeight,
    },
    tabBox: {
        flexDirection: 'row',
    },
    tabButton: {
        width: '50%',
        paddingBottom: 7 * screenHeight,
        paddingTop: 12 * screenHeight,
        borderBottomWidth: 1.5 * screenFont,
    },
    commentItem: {
        borderColor: colors.BORDER_GRAY,
        borderBottomWidth: 1 * screenFont,
        paddingVertical: 12 * screenHeight,
        paddingHorizontal: 16 * screenWidth,
    },
});
export const AccountManagementTemplateStyles = StyleSheet.create({
    headerBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 16 * screenHeight,
        paddingTop: 17 * screenHeight,
        paddingLeft: 22 * screenWidth,
        paddingRight: 16 * screenWidth,
        borderBottomWidth: 1 * screenFont,
        borderColor: colors.BORDER_GRAY,
    },
    headerIcon: {
        width: 9 * screenWidth,
        height: 16 * screenHeight,
    },
    tabBox: {
        width: '100%',
        height: 52 * screenHeight,
        borderColor: colors.BORDER_GRAY,
        borderBottomWidth: 1 * screenFont,
        paddingHorizontal: 16 * screenWidth,
    },
    buttonBox: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
});
export const PoliciesTemplateStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 16 * screenHeight,
        paddingTop: 17 * screenHeight,
        paddingLeft: 22 * screenWidth,
        paddingRight: 16 * screenWidth,
        borderBottomWidth: 1 * screenFont,
        borderColor: colors.BORDER_GRAY,
    },
    headerIcon: {
        width: 9 * screenWidth,
        height: 16 * screenHeight,
    },
    tabBox: {
        width: '100%',
        height: 52 * screenHeight,
        borderColor: colors.BORDER_GRAY,
        borderBottomWidth: 1 * screenFont,
        paddingHorizontal: 16 * screenWidth,
    },
    buttonBox: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    webviewBox: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
});
export const allBoardTemplateStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 16 * screenHeight,
        paddingTop: 25 * screenHeight,
        paddingHorizontal: 16 * screenWidth,
    },
    tabBox: {
        flexDirection: 'row',
    },
    tabButton: {
        width: '50%',
        paddingBottom: 7 * screenHeight,
        paddingTop: 13 * screenHeight,
        borderBottomWidth: 1.5 * screenFont,
    },
    contentBox: {
        flex: 1,
    },
    nothingBox: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    nothingIcon: {
        width: 88 * screenWidth,
        height: 88 * screenWidth,
    },
    emptyKeywordBox: {
        flex: 1,
        position: 'relative',
    },
    emptyButtonBox: {
        paddingTop: 16 * screenHeight,
        paddingLeft: 16 * screenWidth,
    },
    addKeywordButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16 * screenWidth,
        paddingVertical: 4 * screenHeight,
        borderColor: colors.VIOLET,
        borderRadius: 16 * screenFont,
        borderWidth: 1 * screenFont,
        alignSelf: 'flex-start',
    },
    tooltipBox: {
        position: 'absolute',
        top: 51 * screenHeight,
        left: 16 * screenWidth,
    },
    tooltipImg: {
        width: 246 * screenWidth,
        height: 42 * screenHeight,
    },
    tooltipTextBox: {
        position: 'absolute',
        width: 246 * screenWidth,
        height: 34 * screenHeight,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    myKeywordScrollBox: {
        width: '100%',
        height: 47 * screenHeight,
        paddingLeft: 16 * screenWidth,
        paddingTop: 17 * screenHeight,
    },
});
export const likeKeywordBoardTemplateStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 16 * screenHeight,
        paddingTop: 25 * screenHeight,
        paddingHorizontal: 16 * screenWidth,
    },
    tabBox: {
        flexDirection: 'row',
    },
    tabButton: {
        width: '50%',
        paddingBottom: 7 * screenHeight,
        paddingTop: 13 * screenHeight,
        borderBottomWidth: 1.5 * screenFont,
    },
    contentBox: {
        flex: 1,
        overflow: 'hidden',
    },
    nothingBox: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    nothingIcon: {
        width: 88 * screenWidth,
        height: 88 * screenWidth,
    },
    emptyKeywordBox: {
        flex: 1,
        position: 'relative',
    },
    emptyButtonBox: {
        paddingTop: 16 * screenHeight,
        paddingLeft: 16 * screenWidth,
    },
    addKeywordButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16 * screenWidth,
        paddingVertical: 4 * screenHeight,
        borderColor: colors.VIOLET,
        borderRadius: 16 * screenFont,
        borderWidth: 1 * screenFont,
        alignSelf: 'flex-start',
    },
    tooltipBox: {
        position: 'absolute',
        top: 51 * screenHeight,
        left: 16 * screenWidth,
    },
    tooltipImg: {
        width: 246 * screenWidth,
        height: 42 * screenHeight,
    },
    tooltipTextBox: {
        position: 'absolute',
        width: 246 * screenWidth,
        height: 34 * screenHeight,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    myKeywordScrollBox: {
        width: '100%',
        height: 47 * screenHeight,
        paddingLeft: 16 * screenWidth,
        paddingTop: 17 * screenHeight,
    },
});
export const DeleteMemberTemplateStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16 * screenWidth,
        position: 'relative',
    },
    headerBox: {
        paddingBottom: 49 * screenHeight,
        paddingTop: 20 * screenHeight,
    },
    headerIcon: {
        width: 9 * screenWidth,
        height: 16 * screenHeight,
    },
    explainBox: {
        paddingTop: 20 * screenHeight,
    },
    explainList: {
        flexDirection: 'row',
        position: 'relative',
    },
    explainDot: {
        position: 'absolute',
        left: 5 * screenWidth,
        top: -1 * screenHeight,
    },
    explainMiddle: {
        flexDirection: 'row',
        position: 'relative',
        marginVertical: 13 * screenHeight,
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
export const changePasswordTemplateStyles = StyleSheet.create({
    emailErrorTextBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10 * screenWidth,
        paddingBottom: 7 * screenHeight,
    },
    inputBox: {
        borderRadius: 5 * screenFont,
        height: 48 * screenHeight,
        backgroundColor: colors.LIGHTGRAY,
        justifyContent: 'center',
        paddingHorizontal: 16 * screenWidth,
        marginTop: 8 * screenHeight,
    },
    twoPasswordError: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 8 * screenHeight,
    },
});
export const likeKeywordSettingTemplateStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 16 * screenHeight,
        paddingTop: 17 * screenHeight,
        paddingLeft: 22 * screenWidth,
        paddingRight: 16 * screenWidth,
        borderBottomWidth: 1 * screenFont,
        borderColor: colors.BORDER_GRAY,
        width: '100%',
    },
    headerIcon: {
        width: 9 * screenWidth,
        height: 16 * screenHeight,
    },
    headerTextBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contentBox: {
        paddingHorizontal: 16 * screenWidth,
        flex: 1,
    },
    contentTitleBox: {
        paddingBottom: 12 * screenHeight,
        paddingTop: 26 * screenHeight,
    },
    nothingBox: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.8,
    },
    nothingIcon: {
        width: 88 * screenWidth,
        height: 88 * screenWidth,
    },
    myKeywordBox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    myKeywordList: {
        paddingHorizontal: 14 * screenWidth,
        paddingVertical: 8 * screenHeight,
        backgroundColor: '#F1E9FF',
        borderColor: '#6826F5',
        borderRadius: 30 * screenFont,
        borderWidth: 1 * screenFont,
        marginRight: 5 * screenWidth,
        marginBottom: 10 * screenHeight,
    },
});
