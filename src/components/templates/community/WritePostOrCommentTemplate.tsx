import React, { RefObject, useCallback, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    ImageSourcePropType,
    Linking,
    ScrollView,
    TouchableOpacity,
    View,
} from 'react-native';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import { debounce } from 'lodash';
import { Asset } from 'react-native-image-picker';
import MapView, { Marker } from 'react-native-maps';
import FastImage from 'react-native-fast-image';
import { PERMISSIONS, RESULTS, checkMultiple } from 'react-native-permissions';

import Icons from '../../smallest/Icons';
import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import mapStyle from '../../../styles/mapStyle';
import NormalText from '../../smallest/NormalText';
import MediumText from '../../smallest/MediumText';
import TextButton from '../../molecules/TextButton';
import TouchButton from '../../smallest/TouchButton';
import SemiBoldText from '../../smallest/SemiBoldText';
import PhotoGallery from '../../organisms/PhotoGallery';
import MultiLineInput from '../../smallest/MultiLineInput';
import HeaderMolecule from '../../molecules/HeaderMolecule';
import SearchLocation from '../../organisms/SearchLocation';
import ModalBackground from '../../smallest/ModalBackground';
import WritePhoto from '../../organisms/cummunity/WritePhoto';
import FailPermissionModal from '../../organisms/FailPermissionModal';
import WritePostAddKeyword from '../../organisms/cummunity/WritePostAddKeyword';
import { userTokenAtom } from '../../../store/atoms';
import { screenWidth } from '../../../utils/changeStyleSize';
import { SingleLineInput } from '../../smallest/SingleLineInput';
import { writePostOrCommentTemplateStyles } from '../../../styles/styles';
import { useRootNavigation, useRootRoute } from '../../../navigations/RootStackNavigation';
import { issueKeywords, subwayKeywords, trafficKeywords } from '../../../utils/allKeywords';
import { KeywordListTypes, WritePostOrCommentTemplateProps, WritePostTypes } from '../../../types/types';
import { writeCommentAPI, writeCommentFilesAPI, writePostAPI, writePostFilesAPI } from '../../../queries/api';

const WritePostOrCommentTemplate = ({ moveToScreen, postThreadInfo }: WritePostOrCommentTemplateProps) => {
    const rootNavigation = useRootNavigation();
    const rootRoute = useRootRoute();

    const { accessToken } = useRecoilValue(userTokenAtom);

    const mapRef = useRef() as RefObject<MapView>;

    const [title, setTitle] = useState<string>('');
    const [postId, setPostId] = useState<number>(0);
    const [content, setcontent] = useState<string>('');
    const [onErrorText, setOnErrorText] = useState<string>('');
    const [keywordModal, setKeywordModal] = useState<boolean>(false);
    const [onErrorModal, setOnErrorModal] = useState<boolean>(false);
    const [loactionModal, setLoactionModal] = useState<boolean>(false);
    const [inputFocusBlur, setInputFocusBlur] = useState<boolean>(false);

    const [markerType, setMarkerType] = useState<ImageSourcePropType>();
    const [imagePermission, setImagePermission] = useState<boolean>(false);
    const [isCamAllowPermission, setIsCamAllowPermission] = useState<boolean>(false);
    const [chooseKeywords, setChooseKeywords] = useState<KeywordListTypes[]>([]);
    const [writePostData, setWritePostData] = useState<WritePostTypes>({
        dto: {
            title: '',
            placeName: '',
            content: '',
            latitude: null,
            longitude: null,
            keywordIdList: null,
            headKeywordId: null,
        },
        files: [],
        thumbnail: null,
        backgroundMap: '',
    });

    // Write post API and
    const { mutate: postMutate, isLoading: isPostLoading } = useMutation(writePostAPI, {
        onSuccess: ({ data }) => {
            const responsePostId: number = data.data;
            postUploadFilesHandler(responsePostId);
        },
        onError: error => {
            // For Debug
            console.log('(ERROR) Write post API.', error);
        },
    });
    // Post upload files API
    const { mutate: postFileMutate, isLoading: isPostFileLoading } = useMutation(writePostFilesAPI, {
        onSuccess: () => {
            moveToScreen('GO', postId);
        },
        onError: error => {
            // For Debug
            console.log('(ERROR) Upload files API.', error);
        },
    });
    // Write comment API
    const { mutate: commentMutate, isLoading: iscommentLoading } = useMutation(writeCommentAPI, {
        onSuccess: ({ data }) => {
            const responseRepostId = data.data;
            commentUploadFilesHandler(responseRepostId);
        },
        onError: error => {
            // For Debug
            console.log('(ERROR) Write comment API.', error);
        },
    });

    // Comment upload files API
    const { mutate: commentFileMutate, isLoading: iscommentFileLoading } = useMutation(writeCommentFilesAPI, {
        onSuccess: ({ data }) => {
            if (postThreadInfo) {
                moveToScreen('GO', postThreadInfo?.postId);
            }
        },
        onError: error => {
            // For Debug
            console.log('(ERROR) Comment upload files.', error);
        },
    });

    // Write post data for request API
    const getLocationHandler = (location: { lat: number; lng: number }, placeName: string) => {
        setWritePostData({
            ...writePostData,
            dto: { ...writePostData.dto, latitude: location.lat, longitude: location.lng, placeName },
        });
    };
    const getKeywordHandler = (keyword: number[]) => {
        const allKeywords = [...issueKeywords, ...trafficKeywords, ...subwayKeywords];
        let newlist = allKeywords.filter((item, index) => keyword.includes(item.id));
        if (newlist[0].id !== keyword[0]) {
            const headIndex = newlist.findIndex(item => item.id === keyword[0]);
            newlist.unshift(newlist[headIndex]);
            newlist.splice(headIndex + 1, 1);
        }
        setChooseKeywords(newlist);
        setWritePostData({
            ...writePostData,
            dto: { ...writePostData.dto, keywordIdList: keyword, headKeywordId: keyword[0] },
        });
    };
    const getImageHandler = (files: Asset[]) => {
        setWritePostData({ ...writePostData, files });
    };

    // Content input focue blur handler
    const inputFocusBlurHandler = (state: string) => {
        switch (state) {
            case 'FOCUS':
                setInputFocusBlur(true);
                break;
            case 'BLUR':
                setInputFocusBlur(false);
                break;
            default:
                // For Debug
                console.log('(ERROR) Content input focue blur handler.', state);
        }
    };

    // Check image library permission
    const checkImagePermission = async (): Promise<boolean> => {
        try {
            const check = await checkMultiple([PERMISSIONS.ANDROID.READ_MEDIA_IMAGES, PERMISSIONS.ANDROID.CAMERA]);
            const isAllow =
                check['android.permission.CAMERA'] === RESULTS.GRANTED &&
                check['android.permission.READ_MEDIA_IMAGES'] === RESULTS.GRANTED;
            return isAllow;
        } catch (error) {
            // For Debug
            console.log('(ERROR) Check image library permission');
            return false;
        }
    };

    // Get image in library
    const openGalleryHandler = async () => {
        const isAllow = await checkImagePermission();
        if (isAllow) {
            setIsCamAllowPermission(true);
        } else {
            notAllowPermission();
        }
    };

    // Close gallery button
    const closeGalleryHandling = () => {
        setIsCamAllowPermission(false);
    };

    // Check essential value of write post
    const finishWritingHandler = () => {
        const isNotEnoughLocation = !writePostData.dto.latitude || !writePostData.dto.longitude;
        const isNotEnoughKeyword = !writePostData.dto.keywordIdList || !writePostData.dto.headKeywordId;
        if (isNotEnoughLocation && isNotEnoughKeyword) {
            setOnErrorText('위치와 키워드를 설정해주세요');
            setOnErrorModal(true);
        } else if (isNotEnoughLocation) {
            setOnErrorText('위치를 설정해주세요');
            setOnErrorModal(true);
        } else if (isNotEnoughKeyword) {
            setOnErrorText('키워드를 설정해주세요');
            setOnErrorModal(true);
        } else {
            postOrCommentWriteHandler();
        }
    };
    const postOrCommentWriteHandler = () => {
        if (
            postThreadInfo &&
            writePostData.dto.latitude &&
            writePostData.dto.longitude &&
            writePostData.dto.keywordIdList
        ) {
            // comment
            commentMutate({
                accessToken,
                data: {
                    postId: postThreadInfo.postId,
                    content: writePostData.dto.content,
                    latitude: writePostData.dto.latitude,
                    longitude: writePostData.dto.longitude,
                    keywordIdList: writePostData.dto.keywordIdList,
                },
            });
        } else if (!postThreadInfo) {
            // Try map snapshot then request write post
            mapSnapshotWithWritePostHandler();
        } else {
            // For Debug
            console.log('(ERROR) Post or comment write handler. postThreadInfo:', postThreadInfo);
            console.log('(ERROR) Post or comment write handler. writePostData.dto:', writePostData.dto);
        }
    };
    const offErrorModalHandler = () => {
        setOnErrorModal(false);
    };

    // Upload post formdata
    const postUploadFilesHandler = (id: number) => {
        setPostId(id);
        const formdata = new FormData();

        if (writePostData.files[0]) {
            for (const index in writePostData.files) {
                formdata.append('files', {
                    uri: writePostData.files[index].uri,
                    type: writePostData.files[index].type,
                    name: writePostData.files[index].fileName,
                });
            }
            formdata.append('thumbnail', {
                uri: writePostData.files[0].uri,
                type: writePostData.files[0].type,
                name: writePostData.files[0].fileName,
            });
        } else {
            formdata.append('thumbnail', {
                uri: writePostData.backgroundMap,
                type: 'image/jpeg',
                name: `Thumbnail-${writePostData.dto.placeName}.jpg`,
            });
        }

        formdata.append('backgroundMap', {
            uri: writePostData.backgroundMap,
            type: 'image/jpeg',
            name: `Map-Snapshot-${writePostData.dto.placeName}.jpg`,
        });
        postFileMutate({
            accessToken,
            data: formdata,
            postId: id,
        });
    };

    // Comment upload files
    const commentUploadFilesHandler = (rePostId: number) => {
        if (writePostData.files[0]) {
            const formdata = new FormData();
            for (const index in writePostData.files) {
                formdata.append('files', {
                    uri: writePostData.files[index].uri,
                    type: writePostData.files[index].type,
                    name: writePostData.files[index].fileName,
                });
            }
            commentFileMutate({
                data: formdata,
                rePostId,
            });
        } else {
            moveToScreen('GO', postId);
        }
    };

    // Guide image library permission
    const notAllowPermission = () => {
        setImagePermission(true);
    };
    const onPressModalButton = async (state: string) => {
        switch (state) {
            case 'MOVE':
                setImagePermission(false);
                await Linking.openSettings();
                break;
            case 'CLOSE':
                setImagePermission(false);
                break;
            default:
                // For Debug
                console.log('(ERROR) Guide image library permission.', state);
        }
    };

    // Search location modal

    const locationModalHandler = (state: string) => {
        switch (state) {
            case 'OPEN':
                setLoactionModal(true);
                break;
            case 'CLOSE':
                setLoactionModal(false);
                break;
            default:
                // For Debug
                console.log('(ERROR) Search location modal.', state);
        }
    };

    // Set post keyword modal
    const keywordModalHandler = (state: string) => {
        switch (state) {
            case 'OPEN':
                setKeywordModal(true);
                break;
            case 'CLOSE':
                setKeywordModal(false);
                break;
            default:
                // For Debug
                console.log('(ERROR) Set post keyword modal.', state);
        }
    };

    // Input text title and content

    const onChangeTitleText = (text: string) => {
        setTitle(text);
        inputTitleDate(text);
    };
    const inputTitleDate = useCallback(
        debounce((text: string) => {
            setWritePostData({ ...writePostData, dto: { ...writePostData.dto, title: text } });
        }, 500),
        [writePostData],
    );
    const onChangeContentText = (text: string) => {
        setcontent(text);
        inputContentDate(text);
    };
    const inputContentDate = useCallback(
        debounce((text: string) => {
            setWritePostData({ ...writePostData, dto: { ...writePostData.dto, content: text } });
        }, 500),
        [writePostData],
    );

    // Map snapshot handler for post. map and marker
    const mapSnapshotWithWritePostHandler = () => {
        mapRef.current?.render();
        mapRef.current?.animateToRegion(
            {
                latitude: writePostData.dto.latitude!,
                longitude: writePostData.dto.longitude!,
                latitudeDelta: 0.006,
                longitudeDelta: 0.0047,
            },
            300,
        );
        setTimeout(() => {
            mapRef.current
                ?.takeSnapshot({
                    width: 300,
                    height: 300,
                    format: 'jpg',
                    quality: 0.9,
                    result: 'file',
                })
                .then(uri => {
                    setWritePostData({
                        ...writePostData,
                        backgroundMap: uri,
                    });
                    postMutate({
                        accessToken,
                        data: writePostData.dto,
                    });
                });
        }, 1500);

        switch (writePostData.dto.headKeywordId) {
            case 1:
                setMarkerType(require('../../../assets/icons/protest-marker.png'));
                break;
            case 2:
                setMarkerType(require('../../../assets/icons/delay-marker.png'));
                break;
            case 3:
                setMarkerType(require('../../../assets/icons/disaster-marker.png'));
                break;
            case 4:
                setMarkerType(require('../../../assets/icons/construction-marker.png'));
                break;
            case 5:
                setMarkerType(require('../../../assets/icons/congestion-marker.png'));
                break;
            case 6:
                setMarkerType(require('../../../assets/icons/traffic-jam-marker.png'));
                break;
            case 7:
                setMarkerType(require('../../../assets/icons/festival-marker.png'));
                break;
            case 8:
                setMarkerType(require('../../../assets/icons/etc-marker.png'));
                break;
            default:
                // For Debug
                console.log('(ERROR) Write post marker image');
                return;
        }
    };

    return (
        <>
            <MapView
                ref={mapRef}
                style={writePostOrCommentTemplateStyles.mapSize}
                customMapStyle={mapStyle}
                showsBuildings={false}>
                {writePostData.dto.latitude && writePostData.dto.longitude && (
                    <Marker
                        coordinate={{
                            latitude: writePostData.dto.latitude,
                            longitude: writePostData.dto.longitude,
                        }}
                        anchor={{ x: 0.5, y: 0.5 }}
                        style={writePostOrCommentTemplateStyles.mapMarkerPosition}>
                        <Image
                            source={markerType ? markerType : require('../../../assets/icons/protest-marker.png')}
                            style={{ width: 25 * screenWidth, height: 25 * screenWidth }}
                        />
                    </Marker>
                )}
            </MapView>
            <View style={writePostOrCommentTemplateStyles.container}>
                <View style={writePostOrCommentTemplateStyles.headerNavigateBox}>
                    <TouchButton onPress={() => moveToScreen('BACK', null)}>
                        <Icons type="ionicons" name="close-sharp" size={20} color={Colors.BLACK} />
                    </TouchButton>
                    <TouchButton onPress={finishWritingHandler}>
                        <SemiBoldText text="다음" size={16} color={Colors.TXT_GRAY} />
                    </TouchButton>
                </View>
                <ScrollView style={writePostOrCommentTemplateStyles.contentBox}>
                    <View style={writePostOrCommentTemplateStyles.settingContainer}>
                        {postThreadInfo ? (
                            <View>
                                <SemiBoldText text={postThreadInfo.title} size={20} color={Colors.BLACK} />
                                <Spacer height={4} />
                                <NormalText
                                    text={`${postThreadInfo.rePostCount} post • updated ${postThreadInfo.time}`}
                                    size={12}
                                    color={Colors.BLACK}
                                />
                            </View>
                        ) : (
                            <View style={writePostOrCommentTemplateStyles.settingBox}>
                                <TouchButton onPress={() => locationModalHandler('OPEN')}>
                                    <View style={writePostOrCommentTemplateStyles.settingButton}>
                                        {writePostData.dto.latitude && writePostData.dto.placeName ? (
                                            <>
                                                <Image
                                                    source={require('../../../assets/icons/location-pin-outline-black.png')}
                                                    style={writePostOrCommentTemplateStyles.locationIcon}
                                                />
                                                <Spacer width={5} />
                                                <MediumText
                                                    text={writePostData.dto.placeName}
                                                    size={13}
                                                    color={Colors.BLACK}
                                                />
                                            </>
                                        ) : (
                                            <MediumText text="위치설정" size={13} color={Colors.BLACK} />
                                        )}
                                        <Spacer width={4} />
                                        <Image
                                            source={require('../../../assets/icons/triangle-down.png')}
                                            style={writePostOrCommentTemplateStyles.searchToggleIcon}
                                        />
                                    </View>
                                </TouchButton>
                                <Spacer width={13} />
                                <TouchButton onPress={() => keywordModalHandler('OPEN')}>
                                    <View style={writePostOrCommentTemplateStyles.settingBox}>
                                        {writePostData.dto.headKeywordId ? (
                                            <MediumText
                                                text={issueKeywords[writePostData.dto.headKeywordId! - 1].keywordName}
                                                size={13}
                                                color={Colors.BLACK}
                                            />
                                        ) : (
                                            <MediumText text="키워드설정" size={13} color={Colors.BLACK} />
                                        )}
                                        <Spacer width={4} />
                                        <Image
                                            source={require('../../../assets/icons/triangle-down.png')}
                                            style={writePostOrCommentTemplateStyles.searchToggleIcon}
                                        />
                                    </View>
                                </TouchButton>
                            </View>
                        )}
                        {postThreadInfo && (
                            <View style={writePostOrCommentTemplateStyles.conditionSettingBox}>
                                <View style={writePostOrCommentTemplateStyles.settingBox}>
                                    <TouchButton onPress={() => locationModalHandler('OPEN')}>
                                        <View style={writePostOrCommentTemplateStyles.settingButton}>
                                            {writePostData.dto.latitude && writePostData.dto.placeName ? (
                                                <>
                                                    <Image
                                                        source={require('../../../assets/icons/location-pin-outline-black.png')}
                                                        style={writePostOrCommentTemplateStyles.locationIcon}
                                                    />
                                                    <Spacer width={5} />
                                                    <MediumText
                                                        text={writePostData.dto.placeName}
                                                        size={13}
                                                        color={Colors.BLACK}
                                                    />
                                                </>
                                            ) : (
                                                <MediumText text="위치설정" size={13} color={Colors.BLACK} />
                                            )}
                                            <Spacer width={4} />
                                            <Image
                                                source={require('../../../assets/icons/triangle-down.png')}
                                                style={writePostOrCommentTemplateStyles.searchToggleIcon}
                                            />
                                        </View>
                                    </TouchButton>
                                    <Spacer width={13} />
                                    <TouchButton onPress={() => keywordModalHandler('OPEN')}>
                                        <View style={writePostOrCommentTemplateStyles.settingBox}>
                                            {writePostData.dto.headKeywordId ? (
                                                <MediumText
                                                    text={
                                                        issueKeywords[writePostData.dto.headKeywordId! - 1].keywordName
                                                    }
                                                    size={13}
                                                    color={Colors.BLACK}
                                                />
                                            ) : (
                                                <MediumText text="키워드설정" size={13} color={Colors.BLACK} />
                                            )}
                                            <Spacer width={4} />
                                            <Image
                                                source={require('../../../assets/icons/triangle-down.png')}
                                                style={writePostOrCommentTemplateStyles.searchToggleIcon}
                                            />
                                        </View>
                                    </TouchButton>
                                </View>
                            </View>
                        )}
                    </View>
                    <View style={writePostOrCommentTemplateStyles.inputBox}>
                        {!postThreadInfo && (
                            <SingleLineInput
                                value={title}
                                onChangeText={text => onChangeTitleText(text)}
                                placeFontFamily="Pretendard-SemiBold"
                                fontFamily="Pretendard-SemiBold"
                                placeholder="제목을 입력해주세요"
                                fontSize={24}
                            />
                        )}
                        <View>
                            <MultiLineInput
                                value={content}
                                onChangeText={text => onChangeContentText(text)}
                                placeholder="무슨일이 일어나고 있나요?"
                                maxLength={300}
                                inputFocusBlur={inputFocusBlur}
                                inputFocusBlurHandler={inputFocusBlurHandler}
                            />
                        </View>
                    </View>
                    {!inputFocusBlur && (
                        <TouchableOpacity
                            style={writePostOrCommentTemplateStyles.contentInputFocus}
                            onPress={() => inputFocusBlurHandler('FOCUS')}
                        />
                    )}
                </ScrollView>

                {/* <WritePhoto getImageHandler={getImageHandler} notAllowPermission={notAllowPermission} /> */}

                {isCamAllowPermission && <PhotoGallery closeGalleryHandling={closeGalleryHandling} />}
                <View style={writePostOrCommentTemplateStyles.bottomBox}>
                    <View style={writePostOrCommentTemplateStyles.bottomKeyword}>
                        {chooseKeywords && (
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <>
                                    {chooseKeywords.map(item => (
                                        <View key={item.id} style={writePostOrCommentTemplateStyles.bottomKeywordItem}>
                                            <MediumText
                                                text={item.keywordName}
                                                size={12}
                                                color={Colors.TXT_LIGHTGRAY}
                                            />
                                        </View>
                                    ))}
                                </>
                            </ScrollView>
                        )}
                    </View>

                    <TouchButton
                        onPress={openGalleryHandler}
                        alignSelf="flex-start"
                        paddingHorizontal={16}
                        paddingVertical={11}>
                        <View style={writePostOrCommentTemplateStyles.bottomBarBotton}>
                            <View style={writePostOrCommentTemplateStyles.addPhotoBox}>
                                <FastImage
                                    source={require('../../../assets/icons/camera-outline.png')}
                                    style={writePostOrCommentTemplateStyles.cameraIcon}
                                />
                                <Spacer width={4} />
                                <MediumText text="사진추가" size={14} color="#706C76" />
                            </View>

                            <View>
                                <NormalText text={`${content.length}/300`} size={12} color="#706C76" />
                            </View>
                        </View>
                    </TouchButton>
                </View>

                {loactionModal && (
                    <View style={writePostOrCommentTemplateStyles.searchContainer}>
                        <HeaderMolecule
                            isPaddingHorizontal={true}
                            isWorkDone={writePostData.dto.latitude !== null}
                            backHandler={locationModalHandler}
                            headerFinish={true}
                            isNextStep={false}
                            title="위치 설정"
                            finishText="완료"
                            background="undefined"
                            finishFunction={() => locationModalHandler('CLOSE')}
                        />

                        <Spacer height={12} />

                        <SearchLocation
                            getLocationHandler={getLocationHandler}
                            placeholder="어디에서 일어난 일인가요?"
                            isHome={false}
                        />
                    </View>
                )}

                {keywordModal && (
                    <WritePostAddKeyword
                        keywordModalHandler={keywordModalHandler}
                        getKeywordHandler={getKeywordHandler}
                    />
                )}
                {onErrorModal && (
                    <View style={writePostOrCommentTemplateStyles.errorModalBack}>
                        <View style={writePostOrCommentTemplateStyles.errorModalBox}>
                            <SemiBoldText text={onErrorText} size={18} color={Colors.BLACK} />
                            <Spacer height={18} />
                            <TextButton
                                onPress={offErrorModalHandler}
                                text="확인"
                                textColor="#49454F"
                                fontSize={14}
                                backgroundColor={Colors.LIGHTGRAY}
                                paddingHorizontal={111}
                                paddingVertical={12}
                            />
                        </View>
                    </View>
                )}

                <ModalBackground visible={imagePermission} onRequestClose={() => setImagePermission(false)}>
                    <FailPermissionModal
                        permissionName="사진 접근 권한 허용하기"
                        contentOne="사진 업로드를 하시려면"
                        contentTwo=" 사진/카메라 권한 설정이 필요합니다"
                        onPressModalButton={onPressModalButton}
                    />
                </ModalBackground>

                {(isPostLoading || isPostFileLoading || iscommentLoading || iscommentFileLoading) && (
                    <ActivityIndicator size="large" />
                )}
            </View>
        </>
    );
};

export default WritePostOrCommentTemplate;
