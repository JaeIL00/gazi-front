import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TabBar from '../components/organisms/TabBar';
import MapHomeScreen from '../screens/MapHomeScreen';
import CommunityScreen from '../screens/cummunity/CommunityScreen';
import MyProfileScreen from '../screens/myProfile/MyProfileScreen';
import { BottomTabParamList } from '../types/types';

const BottomTabNavigation = () => {
    const BottomTab = createBottomTabNavigator<BottomTabParamList>();

    return (
        <BottomTab.Navigator
            tabBar={props => <TabBar {...props} />}
            screenOptions={{ headerShown: false }}
            initialRouteName="MapHome">
            <BottomTab.Screen name="Community" component={CommunityScreen} />
            <BottomTab.Screen name="MapHome" component={MapHomeScreen} />
            <BottomTab.Screen name="MyProfile" component={MyProfileScreen} />
        </BottomTab.Navigator>
    );
};

export default BottomTabNavigation;
