import React from 'react';
import { Alert, Linking, Platform, View } from 'react-native';
import { PERMISSIONS, RESULTS, check, requestMultiple } from 'react-native-permissions';

import TouchButton from '../../smallest/TouchButton';

const InitPemissionTemplate = () => {
    const canMoveNextStepHandler = async () => {
        if (Platform.OS === 'android') {
            try {
                await requestMultiple([
                    PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
                    PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
                    PERMISSIONS.ANDROID.CAMERA,
                    PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
                    PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
                ]);
            } finally {
                const locationPermmission = await check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
                const isAllow = locationPermmission === RESULTS.GRANTED;
                if (isAllow) {
                    Alert.alert('키워드 설정 페이지 이동');
                } else {
                    Alert.alert('경고', '위치 권한을 허용해주세요', [
                        {
                            text: '취소',
                            style: 'cancel',
                        },
                        {
                            text: 'OK',
                            onPress: async () => await Linking.openSettings(),
                        },
                    ]);
                }
            }
        }
    };

    return (
        <View>
            <TouchButton title="다음" onPress={canMoveNextStepHandler} />
        </View>
    );
};

export default InitPemissionTemplate;
