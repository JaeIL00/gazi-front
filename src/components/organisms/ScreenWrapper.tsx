import React from 'react';
import { StatusBar, View } from 'react-native';
import { screenWidth } from '../../utils/changeStyleSize';
import { ScreenWrapperProps } from '../../types/types';
import { useRootRoute } from '../../navigations/RootStackNavigation';
import { useRoute } from '@react-navigation/native';
import Colors from '../../styles/Colors';

const ScreenWrapper = ({ children, isPaddingHorizontal }: ScreenWrapperProps) => {
    // 기본배경: 낫로그인, 회원가입, 로그인, 초기키워드, 초기권한, 서비스홈, 답글스레드, 글작성위치검색, 헤드키워드설정
    // 흰색배경: 커뮤니티, 관심키워드설정, 글작성, 마이페이지 모두
    // #29292980: 이미지 뷰어
    const rootRoute = useRoute();
    let statusColor: string = Colors.BACKGROUND_DEFAULT;
    let backgroundColor: string = Colors.BACKGROUND_DEFAULT;
    if (rootRoute.name === ('Community' || 'LikeKeywordSetting' || 'WritePostOrComment' || 'MyProfile')) {
        statusColor = Colors.WHITE;
        backgroundColor = Colors.WHITE;
    } else if (rootRoute.name === 'ImageView') {
        statusColor = '#29292980';
        backgroundColor = Colors.BLACK;
    }
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: backgroundColor,
                paddingHorizontal: isPaddingHorizontal ? 16 * screenWidth : undefined,
            }}>
            <StatusBar
                backgroundColor={statusColor}
                barStyle={rootRoute.name === 'ImageView' ? 'light-content' : 'dark-content'}
            />
            {children}
        </View>
    );
};

export default ScreenWrapper;
