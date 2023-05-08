import React, { useState } from 'react';
import { Image, View } from 'react-native';

import Icons from '../../smallest/Icons';
import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import MediumText from '../../smallest/MediumText';
import TouchButton from '../../smallest/TouchButton';
import SemiBoldText from '../../smallest/SemiBoldText';
import SearchLocation from '../../organisms/SearchLocation';
import WritePostAddKeyword from '../../organisms/cummunity/WritePostAddKeyword';
import { issueKeywords } from '../../../utils/allKeywords';
import { screenHeight, screenWidth } from '../../../utils/changeStyleSize';
import { writePostTemplateStyles } from '../../../styles/styles';
import { WritePostTemplateProps, writePostTypes } from '../../../types/types';
import { SingleLineInput } from '../../smallest/SingleLineInput';
import MultiLineInput from '../../smallest/MultiLineInput';

const WritePostTemplate = ({ moveToScreen }: WritePostTemplateProps) => {
    // Write post data for API request
    const [writePostData, setWritePostData] = useState<writePostTypes>({
        dto: {
            title: '',
            placeName: '',
            content: '',
            latitude: null,
            longitude: null,
            keywordIdList: null,
            headKeywordId: null,
        },
    });
    const getLocationHandler = (location: { lat: number; lng: number }, placeName: string) => {
        setWritePostData({ dto: { ...writePostData.dto, latitude: location.lat, longitude: location.lng, placeName } });
    };
    const getKeywordHandler = (state: string, keyword: number[]) => {
        switch (state) {
            case 'LIST':
                setWritePostData({ dto: { ...writePostData.dto, keywordIdList: keyword } });
                break;
            case 'HEAD':
                setWritePostData({ dto: { ...writePostData.dto, headKeywordId: keyword[0] } });
                break;
            default:
                // For Debug
                console.log('(ERROR) Get keyword function of keyword modal.', state);
        }
    };

    // Search location modal
    const [loactionModal, setLoactionModal] = useState<boolean>(false);
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
    const [keywordModal, setKeywordModal] = useState<boolean>(false);
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
    const [title, setTitle] = useState('');
    const [content, setcontent] = useState('');
    const onChangeTitleText = (text: string) => {
        setTitle(text);
    };
    const onChangeContentText = (text: string) => {
        setcontent(text);
    };

    return (
        <View style={writePostTemplateStyles.container}>
            <View style={writePostTemplateStyles.headerBox}>
                <View style={writePostTemplateStyles.headerNavigateBox}>
                    <TouchButton onPress={() => moveToScreen('BACK')}>
                        <Icons type="ionicons" name="close-sharp" size={20} color={Colors.BLACK} />
                    </TouchButton>
                    <TouchButton onPress={() => moveToScreen('GO')}>
                        <SemiBoldText text="다음" size={16} color={Colors.TXT_GRAY} />
                    </TouchButton>
                </View>

                <View style={writePostTemplateStyles.settingBox}>
                    <TouchButton onPress={() => locationModalHandler('OPEN')}>
                        <View style={writePostTemplateStyles.settingButton}>
                            {writePostData.dto.latitude && writePostData.dto.placeName ? (
                                <>
                                    <Image
                                        source={require('../../../assets/icons/location-pin-outline.png')}
                                        style={{ width: 16 * screenWidth, height: 16 * screenWidth }}
                                    />
                                    <Spacer width={5} />
                                    <MediumText text={writePostData.dto.placeName} size={13} color={Colors.BLACK} />
                                </>
                            ) : (
                                <MediumText text="위치설정" size={13} color={Colors.BLACK} />
                            )}
                            <Spacer width={4} />
                            <Image
                                source={require('../../../assets/icons/triangle-down.png')}
                                style={{ width: 10 * screenWidth, height: 10 * screenWidth }}
                            />
                        </View>
                    </TouchButton>
                    <Spacer width={13} />
                    <TouchButton onPress={() => keywordModalHandler('OPEN')}>
                        <View style={writePostTemplateStyles.settingBox}>
                            {writePostData.dto.headKeywordId ? (
                                <MediumText
                                    text={issueKeywords[writePostData.dto.headKeywordId - 1].keywordName}
                                    size={13}
                                    color={Colors.BLACK}
                                />
                            ) : (
                                <MediumText text="키워드설정" size={13} color={Colors.BLACK} />
                            )}
                            <Spacer width={4} />
                            <Image
                                source={require('../../../assets/icons/triangle-down.png')}
                                style={{ width: 10 * screenWidth, height: 10 * screenWidth }}
                            />
                        </View>
                    </TouchButton>
                </View>
            </View>

            <View style={{ paddingHorizontal: 16 * screenWidth }}>
                <SingleLineInput
                    value={title}
                    onChangeText={text => onChangeTitleText(text)}
                    placeFontFamily="Pretendard-SemiBold"
                    fontFamily="Pretendard-SemiBold"
                    placeholder="제목을 입력해주세요"
                    fontSize={24}
                />
                <MultiLineInput
                    value={content}
                    onChangeText={text => onChangeContentText(text)}
                    placeholder="무슨일이 일어나고 있나요?"
                    height={220 * screenHeight}
                />
            </View>

            {loactionModal && (
                <View style={writePostTemplateStyles.searchContainer}>
                    <View style={writePostTemplateStyles.searchHeaderBox}>
                        <TouchButton onPress={() => locationModalHandler('CLOSE')}>
                            <View style={writePostTemplateStyles.searchTitleBox}>
                                <Icons type="ionicons" name="close-sharp" size={24} color={Colors.BLACK} />
                                <Spacer width={16.8} />
                                <MediumText text="위치 설정" size={18} color={Colors.BLACK} />
                            </View>
                        </TouchButton>
                        <TouchButton
                            onPress={() => (writePostData.dto.latitude ? locationModalHandler('CLOSE') : undefined)}>
                            <SemiBoldText
                                text="완료"
                                size={16}
                                color={writePostData.dto.latitude ? Colors.BLACK : Colors.TXT_GRAY}
                            />
                        </TouchButton>
                    </View>

                    <Spacer height={28} />

                    <SearchLocation getLocationHandler={getLocationHandler} />
                </View>
            )}

            {keywordModal && (
                <WritePostAddKeyword keywordModalHandler={keywordModalHandler} getKeywordHandler={getKeywordHandler} />
            )}
        </View>
    );
};

export default WritePostTemplate;
