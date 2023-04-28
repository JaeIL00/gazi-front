import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../types/types';
import SeviceHomeScreen from '../screens/SeviceHomeScreen';
import CommunityScreen from '../screens/CommunityScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import TabBar from '../components/organisms/TabBar';

const BottomTabNavigation = () => {
    const BottomTab = createBottomTabNavigator<BottomTabParamList>();

    return (
        <BottomTab.Navigator tabBar={props => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
            <BottomTab.Screen name="Community" component={CommunityScreen} />
            <BottomTab.Screen name="ServiceHome" component={SeviceHomeScreen} />
            <BottomTab.Screen name="MyProfile" component={MyProfileScreen} />
        </BottomTab.Navigator>
    );
};

export default BottomTabNavigation;
