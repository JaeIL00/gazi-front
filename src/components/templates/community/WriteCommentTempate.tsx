import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { ActivityIndicator, Image, Linking, Modal, ScrollView, TouchableOpacity, View } from 'react-native';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { debounce } from 'lodash';
import FastImage from 'react-native-fast-image';

import Icons from '../../atoms/Icons';
import Spacer from '../../atoms/Spacer';
import colors from '../../../common/constants/colors';
import NormalText from '../../atoms/NormalText';
import MediumText from '../../atoms/MediumText';
import TouchButton from '../../atoms/TouchButton';
import TextButton from '../../molecules/TextButton';
import SemiBoldText from '../../atoms/SemiBoldText';
import PhotoGallery from '../../organisms/common/PhotoGallery';
import MultiLineInput from '../../atoms/MultiLineInput';
import ModalBackground from '../../atoms/ModalBackground';
import HeaderMolecule from '../../molecules/HeaderMolecule';
import SearchLocation from '../../organisms/common/SearchLocation';
import AddKeywordInWrite from '../../organisms/cummunity/AddKeywordInWrite';
import useTextInputValidation from '../../../common/hooks/useTextInputValidation';
import { userAuthAtom, userInfoAtom } from '../../../recoil';
import { writeCommentTemplateStyles } from '../../../styles/templates/styles';
import FailPermissionModal from '../../organisms/common/FailPermissionModal';
import { writeCommentAPI, writeCommentFilesAPI } from '../../../apis/api';
import { issueKeywords, subwayKeywords, trafficKeywords } from '../../../common/constants/allKeywords';

import Geolocation from '@react-native-community/geolocation';
import { WriteCommentTemplateProps } from '../../../types/templates/types';
import {
    KeywordListTypes,
    TemporarySaveChooseLocationTypes,
    WriteCommentTypes,
    uploadImageFileTypes,
} from '../../../types/common/types';
import IconButton from '../../molecules/IconButton';

const WriteCommentTemplate = ({ navigationHandler, threadInfo }: WriteCommentTemplateProps) => {
    const { accessToken } = useRecoilValue(userAuthAtom);
    const { isAllowLocation } = useRecoilValue(userInfoAtom);

    const { text: content, onChangeText: onChangeContentText } = useTextInputValidation();

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

    // Get image in library
    const openGalleryHandler = async () => {
        if (isAllowLocation) {
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
        if (isAllowLocation) {
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
                <IconButton
                    onPress={() => navigationHandler('BACK')}
                    hitSlop={10}
                    iconType="ionicons"
                    iconName="close-sharp"
                    iconSize={24}
                    iconColor={colors.BLACK}
                />
                <TextButton
                    onPress={finishWritingHandler}
                    hitSlop={10}
                    text="등록"
                    fontSize={16}
                    fontColor={colors.BLACK}
                    fontWeight="semiBold"
                />
            </View>

            <ScrollView style={writeCommentTemplateStyles.contentBox}>
                <View style={writeCommentTemplateStyles.settingContainer}>
                    <View>
                        <SemiBoldText text={threadInfo.title} size={20} color={colors.BLACK} numberOfLines={1} />
                        <Spacer height={4} />
                        <NormalText
                            text={`${threadInfo.rePostCount} post • updated ${threadInfo.time}`}
                            size={12}
                            color={colors.BLACK}
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
                                                color={colors.BLACK}
                                            />
                                        </>
                                    ) : (
                                        <MediumText text="위치설정" size={13} color={colors.BLACK} />
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
                                            color={colors.BLACK}
                                        />
                                    ) : (
                                        <MediumText text="키워드설정" size={13} color={colors.BLACK} />
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

                {!inputFocusBlur && <TouchButton onPress={() => inputFocusBlurHandler('FOCUS')} height={400} />}
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
                                        <MediumText text={item.keywordName} size={12} color={colors.TXT_LIGHTGRAY} />
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
                                        <View style={writeCommentTemplateStyles.bottomImageDelButton}>
                                            <TouchButton onPress={() => getImageHandler(item, 'DEL')} height={25}>
                                                <>
                                                    <View style={writeCommentTemplateStyles.bottomImageDelIconBack} />
                                                    <Icons
                                                        type="ionicons"
                                                        name="close-circle"
                                                        size={20}
                                                        color="#000000"
                                                    />
                                                </>
                                            </TouchButton>
                                        </View>
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
                        isAllowLocation={isAllowLocation}
                        currentPosition={currentPositionRef.current}
                    />
                </View>
            </Modal>

            <Modal visible={keywordModal} onRequestClose={() => setKeywordModal(false)}>
                <AddKeywordInWrite keywordModalHandler={keywordModalHandler} getKeywordHandler={getKeywordHandler} />
            </Modal>

            <ModalBackground visible={onErrorModal}>
                <View style={writeCommentTemplateStyles.errorModalBox}>
                    <SemiBoldText text={onErrorText} size={18} color={colors.BLACK} />
                    <Spacer height={18} />
                    <TextButton
                        onPress={offErrorModalHandler}
                        text="확인"
                        fontColor="#49454F"
                        fontWeight="semiBold"
                        fontSize={14}
                        backgroundColor={colors.LIGHTGRAY}
                        paddingHorizontal={111}
                        paddingVertical={12}
                        borderRadius={5}
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
