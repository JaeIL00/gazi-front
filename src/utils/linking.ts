import { LinkingOptions } from '@react-navigation/native';
import { Linking } from 'react-native';

import { RootStackParamList } from '../types/types';

export const linking: LinkingOptions<RootStackParamList> = {
    //디폴트 프로토콜 설정 필요
    prefixes: ['gazinow://'],

    async getInitialURL() {
        const url = await Linking.getInitialURL();

        if (url != null) {
            return url;
        }

        return null;
    },

    //받아준 딥링크 url을 subscribe에 넣어줘야 한다
    subscribe(listener) {
        const onReceiveURL = (event: { url: string }) => {
            const { url } = event;
            console.log('link has url', url, event);
            return listener(url);
        };

        Linking.addEventListener('url', onReceiveURL);
        return () => {
            Linking.removeAllListeners('url');
        };
    },
    //스텍 네비게이션 디렉토리 정보 설정 필요
    config: {
        screens: {
            JoinMember: {
                screens: {
                    JoinInputNickname: 'join/nickname',
                },
            },
        },
    },
};
