import React, { useCallback, useLayoutEffect, useState } from 'react';
import { SectionList, TouchableOpacity, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import { useNavigation } from '@react-navigation/native';
import VersionCheck from 'react-native-version-check';
import FastImage from 'react-native-fast-image';

import Icons from '../../atoms/Icons';
import colors from '../../../common/constants/colors';
import MediumText from '../../atoms/MediumText';
import NormalText from '../../atoms/NormalText';
import TouchButton from '../../atoms/TouchButton';
import SemiBoldText from '../../atoms/SemiBoldText';
import { userInfoAtom } from '../../../recoil';
import { myPageTabList } from '../../../common/constants/myPageTabList';
import { myPageTemplateStyles } from '../../../styles/templates/styles';
import { screenFont, screenHeight, screenWidth } from '../../../utils/changeStyleSize';
import { MyPageTemplateProps } from '../../../types/templates/types';
import ImageButton from '../../molecules/ImageButton';
import Spacer from '../../atoms/Spacer';

const MyProfileTemplate = ({ moveToScreen }: MyPageTemplateProps) => {
    const navigation = useNavigation<any>();

    const { nickname, email } = useRecoilValue(userInfoAtom);

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

    // Section list render item
    const renderItem = useCallback(
        ({
            item,
        }: {
            item: {
                name: string;
                screen: string;
                isBorder: boolean;
            };
        }) => (
            <TouchButton
                onPress={() => navigation.push(item.screen)}
                paddingHorizontal={16}
                paddingVertical={16}
                borderColor={colors.BORDER_GRAY}
                borderBottomWidth={item.isBorder ? 1 * screenFont : undefined}>
                <View style={myPageTemplateStyles.tabListBox}>
                    <NormalText text={item.name} size={16} color={colors.BLACK} />
                    <FastImage
                        source={require('../../../assets/icons/to-right-white.png')}
                        style={myPageTemplateStyles.tabRightIcon}
                    />
                </View>
            </TouchButton>
        ),
        [],
    );
    const renderSectionHeader = useCallback(
        ({
            section,
        }: {
            section: {
                title: string;
            };
        }) => (
            <>
                {section.title && (
                    <View style={myPageTemplateStyles.tabTitleBox}>
                        <MediumText text={section.title} size={14} color={colors.TXT_GRAY} />
                    </View>
                )}
            </>
        ),
        [],
    );

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
                        <SemiBoldText text={nickname} size={16} color={colors.WHITE} />
                        <Spacer width={4} />
                        <ImageButton
                            onPress={() => moveToScreen('EDIT_NICK')}
                            hitSlop={10}
                            imageSource={require('../../../assets/icons/pencil.png')}
                            imageHeight={12}
                            imageWidth={12}
                            isCaching={true}
                        />
                    </View>
                    <NormalText text={email} size={12} color={colors.TXT_GRAY} />
                </View>
            </View>

            <View>
                <SectionList
                    keyExtractor={({ name }) => name}
                    sections={myPageTabList}
                    renderItem={renderItem}
                    renderSectionHeader={renderSectionHeader}
                />
                <View style={myPageTemplateStyles.versionBox}>
                    <NormalText text="버전" size={16} color={colors.BLACK} />
                    <NormalText text={appVersionText} size={12} color="#00000099" />
                </View>
            </View>
        </View>
    );
};
export default MyProfileTemplate;
