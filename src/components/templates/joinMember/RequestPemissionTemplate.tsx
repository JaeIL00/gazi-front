import React, { useState } from 'react';
import { Linking, Platform, ScrollView, View } from 'react-native';
import { PERMISSIONS, RESULTS, check, requestMultiple } from 'react-native-permissions';

import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import MediumText from '../../smallest/MediumText';
import NormalText from '../../smallest/NormalText';
import TextButton from '../../molecules/TextButton';
import MoveBackWithPageTitle from '../../organisms/MoveBackWithPageTitle';
import IconPermissionListItem from '../../molecules/IconPermissionListItem';
import FailLocationPermisionModal from '../../organisms/FailLocationPermisionModal';
import { RequestPemissionTemplateProps } from '../../../types/types';
import { requestPemissionTemplateStyles } from '../../../styles/styles';

const RequestPemissionTemplate = ({ moveToScreen }: RequestPemissionTemplateProps) => {
    // Request Permissions
    const [onModal, setOnModal] = useState<boolean>(false);
    const onPressrequstPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                await requestMultiple([
                    PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
                    PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
                    PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
                    PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
                    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                ]);
            } catch (err) {
                // For Debug
                console.log('(ERROR) Request Permissions. err: ', err);
            } finally {
                const locationPermmission = await check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
                const isAllow = locationPermmission === RESULTS.GRANTED;
                if (isAllow) {
                    moveToScreen('OK');
                } else {
                    setOnModal(true);
                }
            }
        }
    };

    // Again request modal button Handling
    const onPressModalButton = async (state: string) => {
        switch (state) {
            case 'CLOSE':
                setOnModal(false);
                break;
            case 'MOVE':
                setOnModal(false);
                await Linking.openSettings();
                break;
            default:
                // For Debug
                console.log('(ERROR) Again request modal button Handling. state: ', state);
        }
    };

    return (
        <>
            <MoveBackWithPageTitle
                oneTitle="앱 사용을 위해"
                twoTitle="접근 권한을 허용해주세요"
                onPress={() => moveToScreen('BACK')}
            />

            <Spacer height={51} />

            <View>
                <MediumText text="필수 권한" size={14} color={Colors.TXT_GRAY} />
                <Spacer height={13} />
                <IconPermissionListItem
                    iconType="simpleLineIcons"
                    iconName="location-pin"
                    title="위치"
                    explain="내 주변의 교통 돌발상황을 확인"
                />
            </View>

            <Spacer height={17} />

            <View>
                <MediumText text="선택 권한" size={14} color={Colors.TXT_GRAY} />

                <ScrollView contentContainerStyle={requestPemissionTemplateStyles.choicePermission}>
                    <IconPermissionListItem
                        image="bell-outline"
                        title="푸시알림"
                        explain="내 주변이나 관심있는 키워드에 관한 소식"
                    />
                    <IconPermissionListItem
                        image="gallery"
                        title="사진 접근"
                        explain="교통 상황 게시글에 업로드할 사진 접근"
                    />
                    <IconPermissionListItem
                        iconType="simpleLineIcons"
                        iconName="camera"
                        title="카메라 접근"
                        explain="교통 상황 게시글에 업로드할 사진 접근"
                    />
                </ScrollView>
            </View>

            <View style={requestPemissionTemplateStyles.lineBar} />

            <Spacer height={16} />

            <View>
                <NormalText
                    text="선택 권한의 경우 허용하지 않아도 서비스를 사용할 수 있으나"
                    size={12}
                    color={Colors.TXT_GRAY}
                />
                <NormalText text="일부 서비스 이용이 제한될 수 있습니다" size={12} color={Colors.TXT_GRAY} />
            </View>

            <Spacer height={61} />

            <TextButton
                onPress={onPressrequstPermission}
                text="확인"
                height={48}
                backgroundColor={Colors.BLACK}
                textColor={Colors.WHITE}
                fontSize={17}
            />

            {onModal && <FailLocationPermisionModal onPressModalButton={onPressModalButton} />}
        </>
    );
};

export default RequestPemissionTemplate;
