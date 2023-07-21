import React, { useCallback } from 'react';
import { Animated, View, useWindowDimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Route } from 'react-native-tab-view';
import { Props } from 'react-native-tab-view/lib/typescript/src/TabBarIndicator';

import AllBoardScreen from '../components/pages/community/AllBoardScreen';
import LikeBoardScreen from '../components/pages/community/LikeBoardScreen';
import WritingFloatingBtn from '../components/organisms/common/WritingFloatingBtn';
import { communityTabStyle } from '../styles/common/styles';
import { screenFont } from '../utils/changeStyleSize';
import { CommunityTabParamList } from '../types/common/types';
import { useRootNavigation } from './RootStackNavigation';
import colors from '../constants/colors';

const CommunityTabNavigation = () => {
    const rootNavigation = useRootNavigation();
    const moveToWritingScreen = () => {
        rootNavigation.push('WritePost');
    };

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
        <>
            <Tab.Navigator initialRouteName="AllBoard" screenOptions={tabNavigatorScreenOption}>
                <Tab.Screen name="AllBoard" component={AllBoardScreen} options={{ title: '전체 게시판' }} />
                <Tab.Screen name="LikeBoard" component={LikeBoardScreen} options={{ title: '관심 게시판' }} />
            </Tab.Navigator>

            {/* Common floating button */}
            <View style={{ position: 'absolute', right: 16, bottom: 18 }}>
                <WritingFloatingBtn moveToWritingScreen={moveToWritingScreen} />
            </View>
        </>
    );
};

export default CommunityTabNavigation;
