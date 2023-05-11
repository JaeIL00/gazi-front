import React from 'react';
import { Image, Platform, View } from 'react-native';
import DropShadow from 'react-native-drop-shadow';

import Icons from '../../smallest/Icons';
import Colors from '../../../styles/Colors';
import TouchButton from '../../smallest/TouchButton';
import { ThreadItemTemplateProps } from '../../../types/types';
import { threadItemTemplateStyles } from '../../../styles/styles';
import { screenFont, screenHeight, screenWidth } from '../../../utils/changeStyleSize';
import NormalText from '../../smallest/NormalText';
import SemiBoldText from '../../smallest/SemiBoldText';
import Spacer from '../../smallest/Spacer';
const dummy = {
    content: '',
    distance: '160m',
    headKeyword: 2,
    latitude: 37.4988341,
    longitude: 127.0261778,
    postId: 59,
    rePostCount: 0,
    thumbNail:
        'https://gazimapbucket.s3.ap-northeast-2.amazonaws.com/thumbnail/929ccc1c07-759b-4695-9264-b5a33df0b7a52023-05-11',
    time: '1시간 전',
    title: '강남역 ',
};
const ThreadItemTemplate = ({ movetoCommunityScreen }: ThreadItemTemplateProps) => {
    return (
        <>
            <View style={threadItemTemplateStyles.backButtonBox}>
                {Platform.OS === 'android' && (
                    <DropShadow style={threadItemTemplateStyles.backButtonShadow}>
                        <TouchButton
                            onPress={movetoCommunityScreen}
                            backgroundColor="#FFFFFF80"
                            width={36}
                            height={(36 / screenHeight) * screenWidth}
                            borderRadius={36}>
                            <Icons type="octicons" name="arrow-left" color={Colors.TXT_BLACK} size={22} />
                        </TouchButton>
                    </DropShadow>
                )}
            </View>

            <View style={threadItemTemplateStyles.mapCrop}></View>

            <View style={threadItemTemplateStyles.main}>
                <View style={threadItemTemplateStyles.headerBox}>
                    <View>
                        <NormalText text={dummy.distance} size={12} color={Colors.TXT_GRAY} />
                        <Spacer height={4} />
                        <SemiBoldText text={dummy.title} size={20} color={Colors.BLACK} />
                        <Spacer height={4} />
                        <NormalText text={dummy.time} size={12} color={Colors.BLACK} />
                    </View>
                    <Image
                        source={require('../../../assets/icons/share.png')}
                        style={threadItemTemplateStyles.shareIcon}
                    />
                </View>
            </View>
        </>
    );
};

export default ThreadItemTemplate;
