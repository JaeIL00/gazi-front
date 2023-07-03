import React, { useCallback } from 'react';
import { Animated, View, useWindowDimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Route } from 'react-native-tab-view';
import { communityTabStyle } from '../styles/styles';
import { screenFont } from '../utils/changeStyleSize';
import { AlarmPageTabParamList } from '../types/types';
import { Props } from 'react-native-tab-view/lib/typescript/src/TabBarIndicator';

import Colors from '../styles/Colors';
import KeywordAlarmScreen from '../screens/alarmPage/KeywordAlarmScreen';
import NewsAlarmScreen from '../screens/alarmPage/NewsAlarmScreen';

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
    return (
        <Tab.Navigator
            initialRouteName="KeywordAlarm"
            screenOptions={{
                tabBarIndicator: topTabBarIndicator,
                tabBarIndicatorStyle: {
                    backgroundColor: Colors.BLACK,
                },
                tabBarActiveTintColor: Colors.BLACK,
                tabBarInactiveTintColor: Colors.TXT_GRAY,
                tabBarLabelStyle: {
                    fontFamily: 'Pretendard-SemiBold',
                    fontSize: 16 * screenFont,
                },
                tabBarStyle: {
                    shadowColor: 'transparent',
                },
                tabBarPressColor: 'transparent',
            }}>
            <Tab.Screen name="KeywordAlarm" component={KeywordAlarmScreen} options={{ title: '키워드 알림' }} />
            <Tab.Screen name="NewsAlarm" component={NewsAlarmScreen} options={{ title: '새 소식 알림' }} />
        </Tab.Navigator>
    );
};

export default AlarmPageTabNavigation;
