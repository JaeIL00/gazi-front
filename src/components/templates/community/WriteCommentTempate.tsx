import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { ActivityIndicator, Image, Linking, Modal, ScrollView, TouchableOpacity, View } from 'react-native';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import { PERMISSIONS, RESULTS, check, checkMultiple } from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { debounce } from 'lodash';

import Icons from '../../smallest/Icons';
import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import FastImage from 'react-native-fast-image';
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
import FailPermissionModal from '../../organisms/FailPermissionModal';
import AddKeywordInWrite from '../../organisms/cummunity/AddKeywordInWrite';
import useTextInputValidation from '../../../utils/hooks/useTextInputValidation';
import { userAuthAtom } from '../../../store/atoms';
import { issueKeywords } from '../../../utils/allKeywords';
import { subwayKeywords } from '../../../utils/allKeywords';
import { trafficKeywords } from '../../../utils/allKeywords';
import { writeCommentTemplateStyles } from '../../../styles/styles';
import { writeCommentAPI, writeCommentFilesAPI } from '../../../queries/api';
import {
    KeywordListTypes,
    TemporarySaveChooseLocationTypes,
    WriteCommentTemplateProps,
    WriteCommentTypes,
    uploadImageFileTypes,
} from '../../../types/types';
import Geolocation from '@react-native-community/geolocation';

const WriteCommentTemplate = ({ navigationHandler, threadInfo }: WriteCommentTemplateProps) => {
    const { accessToken } = useRecoilValue(userAuthAtom);

    const { text: content, onChangeText: onChangeContentText } = useTextInputValidation();

    const isAllowLocation = useRef<boolean>(false);
    const currentPositionRef = useRef<{ curLat: number; curLon: number }>({
        curLat: 0,
        curLon: 0,
    });

    const [onErrorText, setOnErrorText] = useState<string>('');
    const [keywordModal, setKeywordModal] = useState<boolean>(false);
    const [onErrorModal, setOnErrorModal] = useState<boolean>(false);
    const [loactionModal, setLoactionModal] = useState<boolean>(false);
    const [inputFocusBlur, setInputFocusBlur] = useState<boolean>(false);
    const [imagePermission, setImagePermission] = useState<boolean>(false);
    const [chooseKeywords, setChooseKeywords] = useState<KeywordListTypes[]>([]);
    const [isCamAllowPermission, setIsCamAllowPermission] = useState<boolean>(false);
    const [temporaryChooseLocationData, setTemporaryChooseLocationData] = useState<TemporarySaveChooseLocationTypes>({
        formatted_address: '',
        name: '',
        location: { lat: null, lng: null },
    });
    const [writeCommentData, setWriteCommentData] = useState<WriteCommentTypes>({
        placeName: '',
        dto: {
            postId: threadInfo.postId,
            content: '',
            latitude: null,
            longitude: null,
            keywordIdList: null,
        },
        files: [],
    });

    // Write comment API
    const { mutate: commentMutate, isLoading: isCommentLoading } = useMutation(writeCommentAPI, {
        onSuccess: ({ data }) => {
            if (writeCommentData.files.length > 0) {
                const responseRepostId = data.data;
                commentUploadFilesHandler(responseRepostId);
            } else {
                navigationHandler('GO', threadInfo.postId, threadInfo.rePostCount + 1);
            }
        },
        onError: error => {
            // For Debug
            console.log('(ERROR) Write comment API.', error);
        },
    });
    // Comment upload files API
    const { mutate: commentFileMutate, isLoading: isCommentFileLoading } = useMutation(writeCommentFilesAPI, {
        onSuccess: ({ data }) => {
            navigationHandler('GO', threadInfo.postId, threadInfo.rePostCount);
        },
        onError: error => {
            // For Debug
            console.log('(ERROR) Write comment upload files API.', error);
        },
    });

    // Input content text to writeCommentData state
    const onChangeContentTextData = (text: string) => {
        onChangeContentText(text);
        inputTitleDate(text);
    };
    const inputTitleDate = useCallback(
        debounce((text: string) => {
            setWriteCommentData({ ...writeCommentData, dto: { ...writeCommentData.dto, content: text } });
        }, 1000),
        [writeCommentData],
    );

    // Comment upload files
    const commentUploadFilesHandler = (rePostId: number) => {
        if (writeCommentData.files[0]) {
            const formdata = new FormData();
            for (const index in writeCommentData.files) {
                formdata.append('files', {
                    uri: writeCommentData.files[index].uri,
                    type: writeCommentData.files[index].type,
                    name: writeCommentData.files[index].fileName,
                });
            }
            commentFileMutate({
                data: formdata,
                rePostId,
            });
        } else {
            navigationHandler('GO', threadInfo.postId, threadInfo.rePostCount + 1);
        }
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

    // Check essential value of write post
    const finishWritingHandler = () => {
        const isNotEnoughContent = !writeCommentData.dto.content;
        const isNotEnoughLocation = !writeCommentData.dto.latitude || !writeCommentData.dto.longitude;
        const isNotEnoughKeyword = !writeCommentData.dto.keywordIdList;
        if (isNotEnoughContent) {
            setOnErrorText('본문 내용을 입력해주세요');
            setOnErrorModal(true);
        } else if (isNotEnoughLocation && isNotEnoughKeyword) {
            setOnErrorText('위치와 키워드를 설정해주세요');
            setOnErrorModal(true);
        } else if (isNotEnoughLocation) {
            setOnErrorText('위치를 설정해주세요');
            setOnErrorModal(true);
        } else if (isNotEnoughKeyword) {
            setOnErrorText('키워드를 설정해주세요');
            setOnErrorModal(true);
        } else {
            commentWriteAPIHandler();
        }
    };

    // Call write comment API
    const commentWriteAPIHandler = () => {
        commentMutate({
            accessToken,
            data: {
                postId: writeCommentData.dto.postId,
                content: writeCommentData.dto.content,
                latitude: writeCommentData.dto.latitude,
                longitude: writeCommentData.dto.longitude,
                keywordIdList: writeCommentData.dto.keywordIdList,
            },
        });
    };

    // Close gallery button
    const closeGalleryHandling = () => {
        setIsCamAllowPermission(false);
    };

    // Get image from gallery
    const getImageHandler = (file: uploadImageFileTypes, state: string) => {
        switch (state) {
            case 'ADD':
                setWriteCommentData({ ...writeCommentData, files: [...writeCommentData.files, file] });
                break;
            case 'DEL':
                const freshFiles = writeCommentData.files.filter(item => item.uri !== file.uri);
                setWriteCommentData({ ...writeCommentData, files: freshFiles });
                break;
            default:
                // For Debug
                console.log('(ERROR) Get image from gallery.', state, file);
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

    // Image library permission
    const notAllowPermission = () => {
        setImagePermission(true);
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

    // Search location finish handler
    const saveHistorySearchLocationStorage = async () => {
        try {
            let freshFilter: {
                formatted_address: string;
                name: string;
                location: { lat: number; lng: number };
            }[] = [];
            const historyArray = await AsyncStorage.getItem('GAZI_hst_sch');
            if (historyArray) {
                const prevHistory: {
                    formatted_address: string;
                    name: string;
                    location: { lat: number; lng: number };
                }[] = JSON.parse(historyArray);
                freshFilter = prevHistory.filter(
                    item => item.formatted_address !== temporaryChooseLocationData.formatted_address,
                );
            }
            const freshHistory = [
                {
                    formatted_address: temporaryChooseLocationData.formatted_address,
                    name: temporaryChooseLocationData.name,
                    location: temporaryChooseLocationData.location,
                },
                ...freshFilter,
            ];
            if (freshHistory.length > 10) {
                freshHistory.pop();
            }
            await AsyncStorage.setItem('GAZI_hst_sch', JSON.stringify(freshHistory));
            setWriteCommentData({
                ...writeCommentData,
                placeName: temporaryChooseLocationData.name,
                dto: {
                    ...writeCommentData.dto,
                    latitude: temporaryChooseLocationData.location.lat,
                    longitude: temporaryChooseLocationData.location.lng,
                },
            });
        } catch (error) {
            // For Debug
            console.log('(ERROR)Save search history from write comment.', error);
        } finally {
            setLoactionModal(false);
        }
    };

    // Choose location in search location modal
    const getLocationHandler = (location: { lat: number; lng: number }, placeName: string, address: string) => {
        setTemporaryChooseLocationData({
            formatted_address: address,
            name: placeName,
            location: { lat: location.lat, lng: location.lng },
        });
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

    // Get Keyword in add keyword modal
    const getKeywordHandler = (keyword: number[]) => {
        const allKeywords = [...issueKeywords, ...trafficKeywords, ...subwayKeywords];
        let newlist = allKeywords.filter((item, index) => keyword.includes(item.id));
        if (newlist[0].id !== keyword[0]) {
            const headIndex = newlist.findIndex(item => item.id === keyword[0]);
            newlist.unshift(newlist[headIndex]);
            newlist.splice(headIndex + 1, 1);
        }
        setChooseKeywords(newlist);
        setWriteCommentData({
            ...writeCommentData,
            dto: { ...writeCommentData.dto, keywordIdList: keyword },
        });
    };

    // Close error modal
    const offErrorModalHandler = () => {
        setOnErrorModal(false);
    };

    // Permission is not allow. On Request permission modal
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

    // Check location permission and get current position
    const locationSearchMyCurrentPosition = async () => {
        const locationPermission = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        const isAllow = locationPermission === RESULTS.GRANTED;
        if (isAllow) {
            isAllowLocation.current = true;
            Geolocation.getCurrentPosition(info => {
                currentPositionRef.current = {
                    curLat: info.coords.latitude,
                    curLon: info.coords.longitude,
                };
            });
        }
    };

    // Get current user position
    useLayoutEffect(() => {
        locationSearchMyCurrentPosition();
    }, []);

    return (
        <View style={writeCommentTemplateStyles.container}>
            <View style={writeCommentTemplateStyles.headerNavigateBox}>
                <TouchButton onPress={() => navigationHandler('BACK')} hitSlop={10}>
                    <Icons type="ionicons" name="close-sharp" size={24} color={Colors.BLACK} />
                </TouchButton>
                <TouchButton onPress={finishWritingHandler} hitSlop={10}>
                    <SemiBoldText text="등록" size={16} color={Colors.BLACK} />
                </TouchButton>
            </View>

            <ScrollView style={writeCommentTemplateStyles.contentBox}>
                <View style={writeCommentTemplateStyles.settingContainer}>
                    <View>
                        <SemiBoldText text={threadInfo.title} size={20} color={Colors.BLACK} numberOfLines={1} />
                        <Spacer height={4} />
                        <NormalText
                            text={`${threadInfo.rePostCount} post • updated ${threadInfo.time}`}
                            size={12}
                            color={Colors.BLACK}
                        />
                    </View>

                    <View style={writeCommentTemplateStyles.conditionSettingBox}>
                        <View style={writeCommentTemplateStyles.settingBox}>
                            <TouchButton onPress={() => locationModalHandler('OPEN')} hitSlop={5}>
                                <View style={writeCommentTemplateStyles.settingButton}>
                                    {writeCommentData.placeName ? (
                                        <>
                                            <FastImage
                                                source={require('../../../assets/icons/location-pin-outline-black.png')}
                                                style={writeCommentTemplateStyles.locationIcon}
                                            />
                                            <Spacer width={5} />
                                            <MediumText
                                                text={writeCommentData.placeName}
                                                size={13}
                                                color={Colors.BLACK}
                                            />
                                        </>
                                    ) : (
                                        <MediumText text="위치설정" size={13} color={Colors.BLACK} />
                                    )}
                                    <Spacer width={4} />
                                    <FastImage
                                        source={require('../../../assets/icons/triangle-down.png')}
                                        style={writeCommentTemplateStyles.searchToggleIcon}
                                    />
                                </View>
                            </TouchButton>
                            <Spacer width={13} />
                            <TouchButton onPress={() => keywordModalHandler('OPEN')} hitSlop={5}>
                                <View style={writeCommentTemplateStyles.settingBox}>
                                    {chooseKeywords.length > 0 ? (
                                        <MediumText
                                            text={issueKeywords[chooseKeywords[0].id - 1].keywordName}
                                            size={13}
                                            color={Colors.BLACK}
                                        />
                                    ) : (
                                        <MediumText text="키워드설정" size={13} color={Colors.BLACK} />
                                    )}
                                    <Spacer width={4} />
                                    <FastImage
                                        source={require('../../../assets/icons/triangle-down.png')}
                                        style={writeCommentTemplateStyles.searchToggleIcon}
                                    />
                                </View>
                            </TouchButton>
                        </View>
                    </View>
                </View>

                <View style={writeCommentTemplateStyles.inputBox}>
                    <MultiLineInput
                        value={content}
                        onChangeText={text => onChangeContentTextData(text)}
                        placeholder="무슨일이 일어나고 있나요?"
                        maxLength={300}
                        inputFocusBlur={inputFocusBlur}
                        inputFocusBlurHandler={inputFocusBlurHandler}
                    />
                </View>

                {!inputFocusBlur && (
                    <TouchableOpacity
                        style={writeCommentTemplateStyles.contentInputFocus}
                        onPress={() => inputFocusBlurHandler('FOCUS')}
                    />
                )}
            </ScrollView>

            <Modal visible={isCamAllowPermission} onRequestClose={() => setIsCamAllowPermission(false)}>
                <PhotoGallery closeGalleryHandling={closeGalleryHandling} getImageHandler={getImageHandler} />
            </Modal>

            <View style={writeCommentTemplateStyles.bottomBox}>
                <View style={writeCommentTemplateStyles.bottomKeyword}>
                    {chooseKeywords.length > 0 && (
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <>
                                {chooseKeywords.map(item => (
                                    <View key={item.id} style={writeCommentTemplateStyles.bottomKeywordItem}>
                                        <MediumText text={item.keywordName} size={12} color={Colors.TXT_LIGHTGRAY} />
                                    </View>
                                ))}
                            </>
                        </ScrollView>
                    )}
                    {writeCommentData.files.length > 0 && (
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <>
                                {writeCommentData.files.map(item => (
                                    <View style={writeCommentTemplateStyles.bottomImageBox}>
                                        <View style={writeCommentTemplateStyles.bottomImageInnerBox}>
                                            <Image
                                                source={{ uri: item.uri }}
                                                style={writeCommentTemplateStyles.bottomImageSize}
                                            />
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => getImageHandler(item, 'DEL')}
                                            activeOpacity={1}
                                            style={writeCommentTemplateStyles.bottomImageDelButton}>
                                            <View style={writeCommentTemplateStyles.bottomImageDelIconBack} />
                                            <Icons type="ionicons" name="close-circle" size={20} color="#000000" />
                                        </TouchableOpacity>
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
                    <View style={writeCommentTemplateStyles.bottomBarBotton}>
                        <View style={writeCommentTemplateStyles.addPhotoBox}>
                            <FastImage
                                source={require('../../../assets/icons/camera-outline.png')}
                                style={writeCommentTemplateStyles.cameraIcon}
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

            <Modal visible={loactionModal} onRequestClose={() => setLoactionModal(false)}>
                <View style={writeCommentTemplateStyles.locationSearchModal}>
                    <HeaderMolecule
                        isPaddingHorizontal={true}
                        isWorkDone={temporaryChooseLocationData.location.lat !== null}
                        backHandler={locationModalHandler}
                        headerFinish={true}
                        isNextStep={false}
                        title="위치 설정"
                        finishText="완료"
                        background="undefined"
                        finishFunction={saveHistorySearchLocationStorage}
                    />
                    <Spacer height={12} />
                    <SearchLocation
                        getLocationHandler={getLocationHandler}
                        placeholder="어디에서 일어난 일인가요?"
                        isHome={false}
                        isAllowLocation={isAllowLocation.current}
                        currentPosition={currentPositionRef.current}
                    />
                </View>
            </Modal>

            <Modal visible={keywordModal} onRequestClose={() => setKeywordModal(false)}>
                <AddKeywordInWrite keywordModalHandler={keywordModalHandler} getKeywordHandler={getKeywordHandler} />
            </Modal>

            <ModalBackground visible={onErrorModal}>
                <View style={writeCommentTemplateStyles.errorModalBox}>
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
            </ModalBackground>

            <ModalBackground visible={imagePermission}>
                <FailPermissionModal
                    permissionName="사진 접근 권한 허용하기"
                    contentOne="사진 업로드를 하시려면"
                    contentTwo=" 사진/카메라 권한 설정이 필요합니다"
                    onPressModalButton={onPressModalButton}
                />
            </ModalBackground>

            {(isCommentLoading || isCommentFileLoading) && <ActivityIndicator size="large" />}
        </View>
    );
};

export default WriteCommentTemplate;
