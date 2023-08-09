import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ActivityIndicator, Image, ImageSourcePropType, Linking, Modal, ScrollView, View } from 'react-native';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import { debounce } from 'lodash';
import FastImage from 'react-native-fast-image';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icons from '../../atoms/Icons';
import Spacer from '../../atoms/Spacer';
import colors from '../../../constants/colors';
import NormalText from '../../atoms/NormalText';
import MediumText from '../../atoms/MediumText';
import TouchButton from '../../atoms/TouchButton';
import TextButton from '../../molecules/TextButton';
import IconButton from '../../molecules/IconButton';
import SemiBoldText from '../../atoms/SemiBoldText';
import MultiLineInput from '../../atoms/MultiLineInput';
import ModalBackground from '../../atoms/ModalBackground';
import HeaderMolecule from '../../molecules/HeaderMolecule';
import SearchLocation from '../../organisms/common/SearchLocation';
import FailPermissionModal from '../../organisms/common/FailPermissionModal';
import WritePostAddKeyword from '../../organisms/cummunity/AddKeywordInWrite';
import HowGetPhotoSelectModal from '../../organisms/cummunity/HowGetPhotoSelectModal';
import { SingleLineInput } from '../../atoms/SingleLineInput';
import { writePostAPI, writePostFilesAPI } from '../../../apis/api';
import { WritePostTemplateProps } from '../../../types/templates/types';
import { writePostTemplateStyles } from '../../../styles/templates/styles';
import { issueKeywords, subwayKeywords, trafficKeywords } from '../../../constants/allKeywords';
import { writingPlaceLocationSearchResultAtom, userAuthAtom, userInfoAtom } from '../../../recoil';
import { KeywordListTypes, WritePostTypes, uploadImageFileTypes } from '../../../types/common/types';

const WritePostTemplate = ({ navigationHandler }: WritePostTemplateProps) => {
    const { accessToken } = useRecoilValue(userAuthAtom);
    const { isAllowLocation } = useRecoilValue(userInfoAtom);

    const postIdRef = useRef<number>();
    const currentPositionRef = useRef<{ curLat: number; curLon: number }>({
        curLat: 0,
        curLon: 0,
    });

    const [title, setTitle] = useState<string>('');
    const [content, setcontent] = useState<string>('');
    const [onErrorText, setOnErrorText] = useState<string>('');
    const [keywordModal, setKeywordModal] = useState<boolean>(false);
    const [onErrorModal, setOnErrorModal] = useState<boolean>(false);
    const [isChoosePlace, setIsChoosePlace] = useState<boolean>(false);
    const [loactionModal, setLoactionModal] = useState<boolean>(false);
    const [markerType, setMarkerType] = useState<ImageSourcePropType>();
    const [inputFocusBlur, setInputFocusBlur] = useState<boolean>(false);
    const [imagePermission, setImagePermission] = useState<boolean>(false);
    const [chooseKeywords, setChooseKeywords] = useState<KeywordListTypes[]>([]);
    const [isHowGetPhotoSelectModal, setIsHowGetPhotoSelectModal] = useState<boolean>(false);
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
            navigationHandler('GO', postIdRef.current);
        },
        onError: error => {
            // For Debug
            console.log('(ERROR) Write post upload files API.', error);
        },
    });

    const getKeywordHandler = (keyword: number[]) => {
        const allKeywords = [...issueKeywords, ...trafficKeywords, ...subwayKeywords];
        let newlist = allKeywords.filter(item => keyword.includes(item.id));
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
    const writingPlaceLocationSearchResult = useRecoilValue(writingPlaceLocationSearchResultAtom);
    // Search location finish handler
    const saveHistorySearchLocationStorage = async () => {
        try {
            setIsChoosePlace(true);
            const historyArray: {
                formatted_address: string;
                name: string;
                location: { lat: number; lng: number };
            }[] = await AsyncStorage.getItem('GAZI_hst_sch').then(response => {
                if (response) return JSON.parse(response);
            });
            if (historyArray) {
                const freshFilter = historyArray.filter(
                    item => item.formatted_address !== writingPlaceLocationSearchResult.address,
                );
                freshFilter.unshift({
                    formatted_address: writingPlaceLocationSearchResult.address,
                    name: writingPlaceLocationSearchResult.placeName,
                    location: writingPlaceLocationSearchResult.location,
                });
                if (freshFilter.length > 10) {
                    freshFilter.pop();
                }
                await AsyncStorage.setItem('GAZI_hst_sch', JSON.stringify(freshFilter));
            }
        } catch (error) {
            // For Debug
            console.log('(ERROR)Save search history from write post.', error);
        }
    };

    const closeLocationSearchModal = () => {
        setWritePostData({
            ...writePostData,
            dto: {
                ...writePostData.dto,
                latitude: writingPlaceLocationSearchResult.location.lat,
                longitude: writingPlaceLocationSearchResult.location.lng,
                placeName: writingPlaceLocationSearchResult.placeName,
            },
        });
        setIsChoosePlace(false);
        setLoactionModal(false);
    };

    // Get image from gallery
    const getImageHandler = (file: uploadImageFileTypes[]) => {
        setWritePostData({ ...writePostData, files: [...writePostData.files, ...file] });
    };
    const delImageHandler = (file: uploadImageFileTypes) => {
        const freshFiles = writePostData.files.filter(item => item.uri !== file.uri);
        setWritePostData({ ...writePostData, files: freshFiles });
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

    // Get image in gallery or camera
    const addPhotoHandler = async () => {
        if (isAllowLocation && writePostData.files.length < 10) {
            setIsHowGetPhotoSelectModal(true);
        } else if (!isAllowLocation) {
            notAllowPermission();
        }
    };

    // Close gallery button
    const closePhotoSelectModalHandler = () => {
        setIsHowGetPhotoSelectModal(false);
    };

    // Check essential value of write post
    const finishWritingHandler = () => {
        const isNotEnoughTitle = !writePostData.dto.title;
        const isNotEnoughContent = !writePostData.dto.content;
        const isNotEnoughLocation = !writePostData.dto.latitude || !writePostData.dto.longitude;
        const isNotEnoughKeyword = !writePostData.dto.keywordIdList || !writePostData.dto.headKeywordId;
        if (isNotEnoughTitle) {
            setOnErrorText('제목을 2자 이상 작성해주세요');
            setOnErrorModal(true);
        } else if (isNotEnoughContent) {
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
            postMutate({
                accessToken,
                data: writePostData.dto,
            });
        }
    };
    const offErrorModalHandler = () => {
        setOnErrorModal(false);
    };

    // Upload post formdata
    const postUploadFilesHandler = (id: number) => {
        postIdRef.current = id;
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

    // Image library permission
    const notAllowPermission = () => {
        setImagePermission(true);
    };
    const onPressModalButton = async (state: string) => {
        setImagePermission(false);
        if (state === 'MOVE') {
            try {
                await Linking.openSettings();
            } catch (error) {
                // For Debug
                console.log('(ERROR) Cannot move to device setting for permission.', error);
            }
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

    // Search location modal
    const locationModalHandler = (state: string) => {
        switch (state) {
            case 'OPEN':
                setLoactionModal(true);
                break;
            case 'CLOSE':
                setIsChoosePlace(false);
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
        }, 1000),
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

    // Place search result handler
    useEffect(() => {
        if (loactionModal) {
            saveHistorySearchLocationStorage();
        }
    }, [writingPlaceLocationSearchResult]);

    // Get current user position
    useLayoutEffect(() => {
        locationSearchMyCurrentPosition();
    }, []);

    return (
        <>
            <View style={writePostTemplateStyles.container}>
                <View style={writePostTemplateStyles.headerNavigateBox}>
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
                <ScrollView style={writePostTemplateStyles.contentBox}>
                    <View style={writePostTemplateStyles.settingContainer}>
                        <View style={writePostTemplateStyles.settingBox}>
                            <TouchButton onPress={() => locationModalHandler('OPEN')} hitSlop={5}>
                                <View style={writePostTemplateStyles.settingButton}>
                                    {writePostData.dto.placeName ? (
                                        <>
                                            <FastImage
                                                source={require('../../../assets/icons/location-pin-outline-black.png')}
                                                style={writePostTemplateStyles.locationIcon}
                                            />
                                            <Spacer width={5} />
                                            <MediumText
                                                text={writePostData.dto.placeName}
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
                                        style={writePostTemplateStyles.searchToggleIcon}
                                    />
                                </View>
                            </TouchButton>
                            <Spacer width={13} />
                            <TouchButton onPress={() => keywordModalHandler('OPEN')} hitSlop={5}>
                                <View style={writePostTemplateStyles.settingBox}>
                                    {writePostData.dto.headKeywordId ? (
                                        <MediumText
                                            text={issueKeywords[writePostData.dto.headKeywordId! - 1].keywordName}
                                            size={13}
                                            color={colors.BLACK}
                                        />
                                    ) : (
                                        <MediumText text="키워드설정" size={13} color={colors.BLACK} />
                                    )}
                                    <Spacer width={4} />
                                    <FastImage
                                        source={require('../../../assets/icons/triangle-down.png')}
                                        style={writePostTemplateStyles.searchToggleIcon}
                                    />
                                </View>
                            </TouchButton>
                        </View>
                    </View>
                    <View style={writePostTemplateStyles.inputBox}>
                        <SingleLineInput
                            value={title}
                            onChangeText={text => onChangeTitleText(text)}
                            placeFontFamily="Pretendard-SemiBold"
                            fontFamily="Pretendard-SemiBold"
                            placeholder="제목을 입력해주세요"
                            fontSize={24}
                        />
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
                    {!inputFocusBlur && <TouchButton onPress={() => inputFocusBlurHandler('FOCUS')} height={400} />}
                </ScrollView>

                <View style={writePostTemplateStyles.bottomBox}>
                    <View style={writePostTemplateStyles.bottomKeyword}>
                        {chooseKeywords.length > 0 && (
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <>
                                    {chooseKeywords.map(item => (
                                        <View key={item.id} style={writePostTemplateStyles.bottomKeywordItem}>
                                            <MediumText
                                                text={item.keywordName}
                                                size={12}
                                                color={colors.TXT_LIGHTGRAY}
                                            />
                                        </View>
                                    ))}
                                </>
                            </ScrollView>
                        )}
                        {writePostData.files.length > 0 && (
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <>
                                    {writePostData.files.map(item => (
                                        <View style={writePostTemplateStyles.bottomImageBox}>
                                            <View style={writePostTemplateStyles.bottomImageInnerBox}>
                                                <Image
                                                    source={{ uri: item.uri }}
                                                    style={writePostTemplateStyles.bottomImageSize}
                                                />
                                            </View>
                                            <View style={writePostTemplateStyles.bottomImageDelButton}>
                                                <TouchButton onPress={() => delImageHandler(item)}>
                                                    <>
                                                        <View style={writePostTemplateStyles.bottomImageDelIconBack} />
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

                    <ModalBackground
                        visible={isHowGetPhotoSelectModal}
                        onRequestClose={() => setIsHowGetPhotoSelectModal(false)}>
                        <HowGetPhotoSelectModal
                            getImageHandler={getImageHandler}
                            closePhotoSelectModalHandler={closePhotoSelectModalHandler}
                        />
                    </ModalBackground>

                    <TouchButton
                        onPress={addPhotoHandler}
                        alignSelf="flex-start"
                        paddingHorizontal={16}
                        paddingVertical={11}>
                        <View style={writePostTemplateStyles.bottomBarBotton}>
                            <View style={writePostTemplateStyles.addPhotoBox}>
                                <FastImage
                                    source={require('../../../assets/icons/camera-outline.png')}
                                    style={writePostTemplateStyles.cameraIcon}
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
                    <View style={writePostTemplateStyles.locationSearchModal}>
                        <HeaderMolecule
                            isPaddingHorizontal={true}
                            isWorkDone={isChoosePlace}
                            backHandler={locationModalHandler}
                            headerFinish={true}
                            isNextStep={false}
                            title="위치 설정"
                            finishText="완료"
                            background="undefined"
                            finishFunction={closeLocationSearchModal}
                        />
                        <Spacer height={12} />
                        <SearchLocation
                            placeholder="어디에서 일어난 일인가요?"
                            isHome={false}
                            isAllowLocation={isAllowLocation}
                            currentPosition={currentPositionRef.current}
                        />
                    </View>
                </Modal>

                <Modal visible={keywordModal} onRequestClose={() => setKeywordModal(false)}>
                    <WritePostAddKeyword
                        keywordModalHandler={keywordModalHandler}
                        getKeywordHandler={getKeywordHandler}
                    />
                </Modal>

                <ModalBackground visible={onErrorModal}>
                    <View style={writePostTemplateStyles.errorModalBox}>
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

                {(isPostLoading || isPostFileLoading) && <ActivityIndicator size="large" />}
            </View>
        </>
    );
};

export default WritePostTemplate;
