import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Colors from '../styles/Colors';
import TabBar from '../components/organisms/TabBar';
import MapHomeScreen from '../screens/home/MapHomeScreen';
import CommunityTabNavigation from './CommunityTabNavigation';
import SemiBoldText from '../components/smallest/SemiBoldText';
import MyProfileScreen from '../screens/myProfile/MyProfileScreen';
import { View } from 'react-native';
import { ServiceMainTabParamList } from '../types/types';
import { screenHeight, screenWidth } from '../utils/changeStyleSize';
import MyPageNavigation from './MyPageNavigation';

const ServiceMainTabNavigation = () => {
    const ServiceMainTab = createBottomTabNavigator<ServiceMainTabParamList>();

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
            <ServiceMainTab.Screen name="MapHome" component={MapHomeScreen} />
            <ServiceMainTab.Screen name="MyProfile" component={MyPageNavigation} />
        </ServiceMainTab.Navigator>
    );
};

export default ServiceMainTabNavigation;
