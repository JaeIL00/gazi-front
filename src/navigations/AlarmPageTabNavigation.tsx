import React, { useCallback } from 'react';
import { Animated, View, useWindowDimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Route } from 'react-native-tab-view';
import { Props } from 'react-native-tab-view/lib/typescript/src/TabBarIndicator';

import colors from '../common/constants/colors';
import NewsAlarmScreen from '../components/pages/alarmPage/NewsAlarmScreen';
import KeywordAlarmScreen from '../components/pages/alarmPage/KeywordAlarmScreen';
import { communityTabStyle } from '../styles/common/styles';
import { screenFont } from '../utils/changeStyleSize';
import { AlarmPageTabParamList } from '../types/common/types';

const AlarmPageTabNavigation = () => {
    const Tab = createMaterialTopTabNavigator<AlarmPageTabParamList>();

    const topTabBarIndicator = useCallback((props: Omit<Props<Route>, 'navigationState'>) => {
        const width = useWindowDimensions().width / 2;
        return (
            <View style={communityTabStyle.container}>
                <Animated.View
                    style={[
                        communityTabStyle.animBar,
                        {
                            width: width,
                            transform: [
                                {
                                    translateX: props.position.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, width],
                                    }),
                                },
                            ],
                        },
                    ]}></Animated.View>
            </View>
        );
    }, []);

    const tabNavigatorScreenOption = {
        tabBarIndicator: topTabBarIndicator,
        tabBarIndicatorStyle: {
            backgroundColor: colors.BLACK,
        },
        tabBarActiveTintColor: colors.BLACK,
        tabBarInactiveTintColor: colors.TXT_GRAY,
        tabBarLabelStyle: {
            fontFamily: 'Pretendard-SemiBold',
            fontSize: 16 * screenFont,
        },
        tabBarStyle: {
            shadowColor: 'transparent',
        },
        tabBarPressColor: 'transparent',
    };

    return (
        <Tab.Navigator initialRouteName="KeywordAlarm" screenOptions={tabNavigatorScreenOption}>
            <Tab.Screen name="KeywordAlarm" component={KeywordAlarmScreen} options={{ title: '키워드 알림' }} />
            <Tab.Screen name="NewsAlarm" component={NewsAlarmScreen} options={{ title: '새 소식 알림' }} />
        </Tab.Navigator>
    );
};

export default AlarmPageTabNavigation;
