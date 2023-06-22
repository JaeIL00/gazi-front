import { useRecoilState } from 'recoil';
import { useMutation } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import { PERMISSIONS, RESULTS, check } from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';

import { userAuthAtom, userInfoAtom } from '../store/atoms';
import { autoLoginAPI, fcmDeviceTokenAPI } from '../queries/api';
import { useRootNavigation } from '../navigations/RootStackNavigation';

const initEssentialFunc = () => {
    const rootNavigation = useRootNavigation();

    // Check storage and token valication for auto login
    const [userAuth, setUserAuth] = useRecoilState(userAuthAtom);
    const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
    const { mutate } = useMutation(autoLoginAPI, {
        onSuccess: ({ data }) => {
            successTokenHandler(data.data);
        },
        onError: ({ response }) => {
            errorLoginHandler(response.status);
            // For Debug
            console.log('(ERROR) auto login API.', response);
        },
    });

    // Send device token to FCM server
    const { mutate: fcmTokenMutate } = useMutation(fcmDeviceTokenAPI, {
        onSuccess: () => {
            rootNavigation.navigate('ServiceMainTab');
        },
        onError: error => {
            // For Debug
            console.log('(ERROR) Send device token to FCM server. ', error);
        },
    });

    const errorLoginHandler = async (status: number) => {
        if (status === 400 || status === 404) {
            await AsyncStorage.multiRemove(['GAZI_ac_tk', 'GAZI_re_tk']);
        }
        rootNavigation.navigate('NotLoginHome');
        SplashScreen.hide();
    };
    const successTokenHandler = async (data: {
        accessToken: string;
        refreshToken: string;
        memberId: number;
        nickName: string;
        email: string;
        firebaseToken: string;
    }) => {
        try {
            await AsyncStorage.setItem('GAZI_ac_tk', data.accessToken);
            await AsyncStorage.setItem('GAZI_re_tk', data.refreshToken);
            setUserAuth({
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
                isLogIn: true,
            });
            setUserInfo({
                ...userInfo,
                memberId: data.memberId,
                nickname: data.nickName,
                email: data.email,
            });
            console.log('저장 엑세스', data.accessToken);
            console.log('저장 리프레시', data.refreshToken);

            if (!data.firebaseToken) {
                getTokenFCM(data.accessToken);
            } else {
                rootNavigation.navigate('ServiceMainTab');
            }
        } catch (error) {
            // For Debug
            console.log('(ERROR) User authorization token set storage.', error);
        }
    };
    const getTokenFCM = async (accessToken: string) => {
        const deviceToken = await messaging().getToken();
        fcmTokenMutate({
            accessToken,
            fireBaseToken: deviceToken,
        });
    };

    const checkAsyncStorage = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('GAZI_ac_tk');
            const refreshToken = await AsyncStorage.getItem('GAZI_re_tk');
            if (accessToken && refreshToken) {
                console.log('겟 엑세스', accessToken);
                console.log('겟 리프레시', refreshToken);
                mutate({
                    accessToken,
                    refreshToken,
                });
            } else {
                rootNavigation.navigate('NotLoginHome');
                SplashScreen.hide();
            }
        } catch (error) {
            // For Debug
            console.log('(ERROR) Check async storage for auto login ', error);
            rootNavigation.navigate('NotLoginHome');
            SplashScreen.hide();
        }
    };

    // Check location permission
    const isAllowLocationPermission = async () => {
        try {
            const locationPermission = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            const isAllow = locationPermission === RESULTS.GRANTED;
            if (isAllow) {
                setUserInfo({
                    ...userInfo,
                    isAllowLocation: true,
                });
            }
        } catch (err) {
            // For Debug
            console.log('(ERROR) Check Location Permission.', err);
        }
    };

    return {
        checkAsyncStorage,
        isAllowLocationPermission,
    };
};

export default initEssentialFunc;
