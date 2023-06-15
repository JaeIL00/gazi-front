import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TabBar from '../components/organisms/TabBar';
import MapHomeScreen from '../screens/MapHomeScreen';
import CommunityTabNavigation from './CommunityTabNavigation';
import MyProfileScreen from '../screens/myProfile/MyProfileScreen';
import { BottomTabParamList } from '../types/types';
import { Text, View } from 'react-native';
import SemiBoldText from '../components/smallest/SemiBoldText';
import { screenHeight, screenWidth } from '../utils/changeStyleSize';
import Colors from '../styles/Colors';

const BottomTabNavigation = () => {
    const BottomTab = createBottomTabNavigator<BottomTabParamList>();

    return (
        <BottomTab.Navigator
            tabBar={props => <TabBar {...props} />}
            screenOptions={{ headerShown: false }}
            initialRouteName="MapHome">
            <BottomTab.Screen
                name="Community"
                component={CommunityTabNavigation}
                options={{
                    headerShown: true,
                    header: () => {
                        return (
                            <View
                                style={{
                                    backgroundColor: Colors.WHITE,
                                    paddingLeft: 16 * screenWidth,
                                    paddingVertical: 15.5 * screenHeight,
                                }}>
                                <SemiBoldText text="커뮤니티" size={20} color="#000000" />
                            </View>
                        );
                    },
                }}
            />
            <BottomTab.Screen name="MapHome" component={MapHomeScreen} />
            <BottomTab.Screen name="MyProfile" component={MyProfileScreen} />
        </BottomTab.Navigator>
    );
};

export default BottomTabNavigation;
