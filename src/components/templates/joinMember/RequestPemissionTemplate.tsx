import React from 'react';
import { Platform, ScrollView, View } from 'react-native';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';

import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import NormalText from '../../smallest/NormalText';
import TextButton from '../../molecules/TextButton';
import MoveBackWithPageTitle from '../../organisms/MoveBackWithPageTitle';
import IconPermissionListItem from '../../molecules/IconPermissionListItem';
import { RequestPemissionTemplateProps } from '../../../types/types';
import { requestPemissionTemplateStyles } from '../../../styles/styles';

const RequestPemissionTemplate = ({ moveToScreen }: RequestPemissionTemplateProps) => {
    // Request Permissions
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
                moveToScreen('OK');
            }
        }
    };

    return (
        <View style={requestPemissionTemplateStyles.container}>
            <MoveBackWithPageTitle
                oneTitle="앱 사용을 위해"
                twoTitle="접근 권한을 허용해주세요"
                onPress={() => moveToScreen('BACK')}
            />

            <Spacer height={63} />

            <View>
                <ScrollView contentContainerStyle={requestPemissionTemplateStyles.choicePermission}>
                    <IconPermissionListItem
                        iconType="simpleLineIcons"
                        iconName="location-pin"
                        title="위치"
                        explain="내 주변의 교통 돌발상황을 확인"
                    />
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

            <View style={requestPemissionTemplateStyles.buttonBox}>
                <TextButton
                    onPress={onPressrequstPermission}
                    text="확인"
                    height={48}
                    backgroundColor={Colors.BLACK}
                    textColor={Colors.WHITE}
                    fontSize={17}
                />
            </View>
        </View>
    );
};

export default RequestPemissionTemplate;
