import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Colors from '../styles/Colors';
import AllBoardScreen from '../screens/community/AllBoardScreen';
import LikeBoardScreen from '../screens/community/LikeBoardScreen';
import { screenFont } from '../utils/changeStyleSize';
import { CommunityTabParamList } from '../types/types';

const CommunityTabNavigation = () => {
    const Tab = createMaterialTopTabNavigator<CommunityTabParamList>();

    return (
        <Tab.Navigator
            initialRouteName="AllBoard"
            screenOptions={{
                tabBarIndicatorStyle: {
                    backgroundColor: Colors.BLACK,
                },
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
            <Tab.Screen name="AllBoard" component={AllBoardScreen} options={{ title: '전체 게시판' }} />
            <Tab.Screen name="LikeBoard" component={LikeBoardScreen} options={{ title: '관심 게시판' }} />
        </Tab.Navigator>
    );
};

export default CommunityTabNavigation;
