import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import { useNavigation } from '@react-navigation/native';
import VersionCheck from 'react-native-version-check';
import FastImage from 'react-native-fast-image';

import Icons from '../../smallest/Icons';
import Colors from '../../../styles/Colors';
import MediumText from '../../smallest/MediumText';
import NormalText from '../../smallest/NormalText';
import TouchButton from '../../smallest/TouchButton';
import SemiBoldText from '../../smallest/SemiBoldText';
import { userInfoAtom } from '../../../store/atoms';
import { myPageTemplateStyles } from '../../../styles/styles';
import { myPageTabList } from '../../../utils/myPageTabList';
import { MyPageTabTypes, MyPageTemplateProps } from '../../../types/types';
import { screenFont, screenHeight, screenWidth } from '../../../utils/changeStyleSize';

const MyProfileTemplate = ({ moveToScreen }: MyPageTemplateProps) => {
    const rootNavigation = useNavigation<any>();

    const [appVersionText, setAppVersionText] = useState<string>('');

    const checkAppVersion = async () => {
        const currentVersion = VersionCheck.getCurrentVersion();
        const latestVersion = await VersionCheck.getLatestVersion();
        if (currentVersion === latestVersion) {
            setAppVersionText(`v${currentVersion} 최신버전 입니다`);
        } else {
            setAppVersionText(`v${currentVersion}`);
        }
    };

    // Get user nickname
    const { nickname, email } = useRecoilValue(userInfoAtom);

    const scrollViewRender = useCallback((item: MyPageTabTypes) => {
        return (
            <View key={item.text}>
                {item.tab ? (
                    <TouchButton
                        onPress={() => item.screen && rootNavigation.navigate(item.screen)}
                        paddingHorizontal={16}
                        paddingVertical={16}
                        borderBottomWidth={item.borderLine ? 1 * screenFont : undefined}
                        borderColor="#EBEBEB">
                        <View style={myPageTemplateStyles.tabListBox}>
                            <NormalText text={item.text} size={16} color={Colors.BLACK} />
                            <FastImage
                                source={require('../../../assets/icons/to-right-white.png')}
                                style={myPageTemplateStyles.tabRightIcon}
                            />
                        </View>
                    </TouchButton>
                ) : (
                    <View style={myPageTemplateStyles.tabTitleBox}>
                        <MediumText text={item.text} size={14} color={Colors.TXT_GRAY} />
                    </View>
                )}
            </View>
        );
    }, []);

    useLayoutEffect(() => {
        checkAppVersion();
    }, []);

    return (
        <View style={myPageTemplateStyles.container}>
            <View style={myPageTemplateStyles.profileBox}>
                <TouchButton
                    onPress={() => {}}
                    width={63}
                    height={(63 / screenHeight) * screenWidth}
                    backgroundColor="#D9D9D9"
                    borderRadius={63}>
                    {/* profile image empty
                    <Image /> */}
                    <View style={myPageTemplateStyles.profileCameraBox}>
                        <Icons type="feather" name="camera" color="#D9D9D9" size={12} />
                    </View>
                </TouchButton>
                <View style={myPageTemplateStyles.profileTextBox}>
                    <View style={myPageTemplateStyles.profileNameBox}>
                        <SemiBoldText text={nickname} size={16} color={Colors.WHITE} />
                        <TouchButton onPress={() => moveToScreen('EDIT_NICK')}>
                            <FastImage
                                source={require('../../../assets/icons/pencil.png')}
                                style={myPageTemplateStyles.penIcon}
                            />
                        </TouchButton>
                    </View>
                    <NormalText text={email} size={12} color={Colors.TXT_GRAY} />
                </View>
            </View>

            <ScrollView>
                {myPageTabList.map(scrollViewRender)}
                <View style={myPageTemplateStyles.versionBox}>
                    <NormalText text="버전" size={16} color={Colors.BLACK} />
                    <NormalText text={appVersionText} size={12} color="#00000099" />
                </View>
            </ScrollView>
        </View>
    );
};
export default MyProfileTemplate;
