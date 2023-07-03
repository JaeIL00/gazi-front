import React, { useCallback } from 'react';
import { Animated, View, useWindowDimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Route } from 'react-native-tab-view';
import { Props } from 'react-native-tab-view/lib/typescript/src/TabBarIndicator';

import Colors from '../styles/Colors';
import AllBoardScreen from '../screens/community/AllBoardScreen';
import LikeBoardScreen from '../screens/community/LikeBoardScreen';
import { communityTabStyle } from '../styles/styles';
import { screenFont } from '../utils/changeStyleSize';
import { CommunityTabParamList } from '../types/types';

const CommunityTabNavigation = () => {
    const Tab = createMaterialTopTabNavigator<CommunityTabParamList>();

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
    };

    return (
        <Tab.Navigator initialRouteName="AllBoard" screenOptions={tabNavigatorScreenOption}>
            <Tab.Screen name="AllBoard" component={AllBoardScreen} options={{ title: '전체 게시판' }} />
            <Tab.Screen name="LikeBoard" component={LikeBoardScreen} options={{ title: '관심 게시판' }} />
        </Tab.Navigator>
    );
};

export default CommunityTabNavigation;
