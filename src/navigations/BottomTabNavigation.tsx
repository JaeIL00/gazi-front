import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TabBar from '../components/organisms/TabBar';
import CommunityScreen from '../screens/CommunityScreen';
import MyProfileScreen from '../screens/myProfile/MyProfileScreen';
import SeviceHomeScreen from '../screens/SeviceHomeScreen';
import { BottomTabParamList } from '../types/types';

const BottomTabNavigation = () => {
    const BottomTab = createBottomTabNavigator<BottomTabParamList>();

    return (
        <BottomTab.Navigator
            tabBar={props => <TabBar {...props} />}
            screenOptions={{ headerShown: false }}
            initialRouteName="Community">
            <BottomTab.Screen name="Community" component={CommunityScreen} />
            <BottomTab.Screen name="ServiceHome" component={SeviceHomeScreen} />
            <BottomTab.Screen name="MyProfile" component={MyProfileScreen} />
        </BottomTab.Navigator>
    );
};

export default BottomTabNavigation;
