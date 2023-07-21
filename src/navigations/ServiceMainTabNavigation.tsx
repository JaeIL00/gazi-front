import React, { useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';

import TabBar from '../components/organisms/common/TabBar';
import MapHomeScreen from '../components/pages/home/MapHomeScreen';
import MyPageScreen from '../components/pages/myPage/MyPageScreen';
import CommunityTabNavigation from './CommunityTabNavigation';
import AlarmPageTabNavigation from './AlarmPageTabNavigation';
import SemiBoldText from '../components/atoms/SemiBoldText';
import { ServiceMainTabParamList } from '../types/common/types';
import { screenHeight, screenWidth } from '../utils/changeStyleSize';
import colors from '../constants/colors';

const ServiceMainTabNavigation = () => {
    const ServiceMainTab = createBottomTabNavigator<ServiceMainTabParamList>();

    const header = useCallback(
        (title: string) => (
            <View
                style={{
                    backgroundColor: colors.WHITE,
                    paddingLeft: 16 * screenWidth,
                    paddingVertical: 15.5 * screenHeight,
                }}>
                <SemiBoldText text={title} size={20} color="#000000" />
            </View>
        ),
        [],
    );

    return (
        <ServiceMainTab.Navigator
            tabBar={props => <TabBar {...props} />}
            screenOptions={{ headerShown: false }}
            initialRouteName="MapHome">
            <ServiceMainTab.Screen
                name="Community"
                component={CommunityTabNavigation}
                options={{
                    headerShown: true,
                    header: () => header('커뮤니티'),
                }}
            />
            <ServiceMainTab.Screen name="MapHome" component={MapHomeScreen} />
            <ServiceMainTab.Screen name="MyPage" component={MyPageScreen} />
            <ServiceMainTab.Screen
                name="AlarmPage"
                component={AlarmPageTabNavigation}
                options={{
                    headerShown: true,
                    header: () => header('알림'),
                }}
            />
        </ServiceMainTab.Navigator>
    );
};

export default ServiceMainTabNavigation;
