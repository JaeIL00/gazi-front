import React, { useCallback, useLayoutEffect, useState } from 'react';
import { SectionList, TouchableOpacity, View } from 'react-native';
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
import { myPageTabList } from '../../../utils/myPageTabList';
import { myPageTemplateStyles } from '../../../styles/styles';
import { MyPageTemplateProps } from '../../../types/types';
import { screenFont, screenHeight, screenWidth } from '../../../utils/changeStyleSize';

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
            <TouchableOpacity
                onPress={() => navigation.push(item.screen)}
                style={[
                    {
                        paddingHorizontal: 16 * screenWidth,
                        paddingVertical: 16 * screenHeight,
                        borderColor: '#EBEBEB',
                    },
                    {
                        borderBottomWidth: item.isBorder ? 1 * screenFont : undefined,
                    },
                ]}
                activeOpacity={1}>
                <View style={myPageTemplateStyles.tabListBox}>
                    <NormalText text={item.name} size={16} color={Colors.BLACK} />
                    <FastImage
                        source={require('../../../assets/icons/to-right-white.png')}
                        style={myPageTemplateStyles.tabRightIcon}
                    />
                </View>
            </TouchableOpacity>
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
                        <MediumText text={section.title} size={14} color={Colors.TXT_GRAY} />
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
                        <SemiBoldText text={nickname} size={16} color={Colors.WHITE} />
                        <TouchButton onPress={() => moveToScreen('EDIT_NICK')} hitSlop={10}>
                            <FastImage
                                source={require('../../../assets/icons/pencil.png')}
                                style={myPageTemplateStyles.penIcon}
                            />
                        </TouchButton>
                    </View>
                    <NormalText text={email} size={12} color={Colors.TXT_GRAY} />
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
                    <NormalText text="버전" size={16} color={Colors.BLACK} />
                    <NormalText text={appVersionText} size={12} color="#00000099" />
                </View>
            </View>
        </View>
    );
};
export default MyProfileTemplate;
