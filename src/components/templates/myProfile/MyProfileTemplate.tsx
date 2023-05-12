import React, { useCallback } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { useRecoilValue } from 'recoil';

import Icons from '../../smallest/Icons';
import Colors from '../../../styles/Colors';
import MediumText from '../../smallest/MediumText';
import NormalText from '../../smallest/NormalText';
import TouchButton from '../../smallest/TouchButton';
import SemiBoldText from '../../smallest/SemiBoldText';
import { userInfoAtom } from '../../../store/atoms';
import { myProfileTemplateStyles } from '../../../styles/styles';
import { myProfileTabList } from '../../../utils/myProfileTabList';
import { useRootNavigation } from '../../../navigations/RootStackNavigation';
import { MyProfileTabTypes, MyProfileTemplateProps } from '../../../types/types';
import { screenFont, screenHeight, screenWidth } from '../../../utils/changeStyleSize';

const MyProfileTemplate = ({ moveToScreen }: MyProfileTemplateProps) => {
    // Get user nickname
    const { nickname } = useRecoilValue(userInfoAtom);

    const scrollViewRender = useCallback((item: MyProfileTabTypes) => {
        const screenValue = () => {
            switch (item.screen) {
                case 'MyPostComment':
                    return 'MyPostComment';
                case 'AccountManagement':
                    return 'AccountManagement';
                case 'LikeKeywordSetting':
                    return 'LikeKeywordSetting';
                case 'Policies':
                    return 'Policies';
                default:
                    return 'None';
            }
        };
        const rootNavigation = useRootNavigation();
        return (
            <View key={item.text}>
                {item.tab ? (
                    <TouchButton
                        onPress={() => item.screen && rootNavigation.navigate(screenValue())}
                        paddingHorizontal={16}
                        paddingVertical={16}
                        borderBottomWidth={item.borderLine ? 1 * screenFont : undefined}
                        borderColor="#EBEBEB">
                        <View style={myProfileTemplateStyles.tabListBox}>
                            <NormalText text={item.text} size={16} color={Colors.BLACK} />
                            <Image
                                source={require('../../../assets/icons/to-right-white.png')}
                                style={myProfileTemplateStyles.tabRightIcon}
                            />
                        </View>
                    </TouchButton>
                ) : (
                    <View style={myProfileTemplateStyles.tabTitleBox}>
                        <MediumText text={item.text} size={14} color={Colors.TXT_GRAY} />
                    </View>
                )}
            </View>
        );
    }, []);

    return (
        <View style={myProfileTemplateStyles.container}>
            <View style={myProfileTemplateStyles.profileBox}>
                <TouchButton
                    onPress={() => {}}
                    width={63}
                    height={(63 / screenHeight) * screenWidth}
                    backgroundColor="#D9D9D9"
                    borderRadius={63}>
                    {/* <Image /> */}
                    <View style={myProfileTemplateStyles.profileCameraBox}>
                        <Icons type="feather" name="camera" color="#D9D9D9" size={12} />
                    </View>
                </TouchButton>
                <View style={myProfileTemplateStyles.profileTextBox}>
                    <View style={myProfileTemplateStyles.profileNameBox}>
                        <SemiBoldText text={nickname} size={16} color={Colors.WHITE} />
                        <TouchButton onPress={() => moveToScreen('EDIT_NICK')}>
                            <Image
                                source={require('../../../assets/icons/pencil.png')}
                                style={myProfileTemplateStyles.penIcon}
                            />
                        </TouchButton>
                    </View>
                    <NormalText text="asfda@naver.com" size={12} color={Colors.TXT_GRAY} />
                </View>
            </View>

            <ScrollView>
                {myProfileTabList.map(scrollViewRender)}
                <View style={myProfileTemplateStyles.versionBox}>
                    <NormalText text="버전" size={16} color={Colors.BLACK} />
                    <NormalText text="v.0.0.0 최신버전 입니다" size={12} color="#00000099" />
                </View>
            </ScrollView>
        </View>
    );
};
export default MyProfileTemplate;
