import React, { useState } from 'react';
import { Image, View } from 'react-native';

import Icons from '../../smallest/Icons';
import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import MediumText from '../../smallest/MediumText';
import TouchButton from '../../smallest/TouchButton';
import SemiBoldText from '../../smallest/SemiBoldText';
import SearchLocation from '../../organisms/SearchLocation';
import { screenWidth } from '../../../utils/changeStyleSize';
import { writePostTemplateStyles } from '../../../styles/styles';
import { WritePostTemplateProps, writePostTypes } from '../../../types/types';

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

    const [loactionModal, setLoactionModal] = useState(false);
    const locationModalHandler = (isOpen: boolean) => {
        if (isOpen) {
            setLoactionModal(true);
        } else {
            setLoactionModal(false);
        }
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
                    <TouchButton onPress={() => locationModalHandler(true)}>
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
                            <Icons type="entypo" name="triangle-down" size={14} color={Colors.BLACK} />
                        </View>
                    </TouchButton>
                    <Spacer width={13} />
                    <TouchButton onPress={() => {}}>
                        <View style={writePostTemplateStyles.settingBox}>
                            <MediumText text="키워드설정" size={13} color={Colors.BLACK} />
                            <Spacer width={4} />
                            <Icons type="entypo" name="triangle-down" size={14} color={Colors.BLACK} />
                        </View>
                    </TouchButton>
                </View>
            </View>

            {loactionModal && (
                <View style={writePostTemplateStyles.searchContainer}>
                    <View style={writePostTemplateStyles.searchHeaderBox}>
                        <TouchButton onPress={() => locationModalHandler(false)}>
                            <View style={writePostTemplateStyles.searchTitleBox}>
                                <Icons type="ionicons" name="close-sharp" size={24} color={Colors.BLACK} />
                                <Spacer width={16.8} />
                                <MediumText text="위치 설정" size={18} color={Colors.BLACK} />
                            </View>
                        </TouchButton>
                        <TouchButton
                            onPress={() => (writePostData.dto.latitude ? locationModalHandler(false) : undefined)}>
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
        </View>
    );
};

export default WritePostTemplate;
