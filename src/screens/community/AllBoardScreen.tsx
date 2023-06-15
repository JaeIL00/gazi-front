import React from 'react';
import { StatusBar, View } from 'react-native';

import Colors from '../../styles/Colors';
import AllBoardTemplate from '../../components/templates/community/AllBoardTemplate';
import { globalBackWhiteStyles } from '../../styles/styles';
import { useRootNavigation } from '../../navigations/RootStackNavigation';

const AllBoardScreen = () => {
    const rootNavigation = useRootNavigation();
    const moveToKeywordSettingScreen = () => {
        rootNavigation.navigate('LikeKeywordSetting', { isFromCommunity: true });
    };

    return (
        <View style={globalBackWhiteStyles.container}>
            <StatusBar backgroundColor={Colors.WHITE} barStyle="dark-content" />
            <AllBoardTemplate moveToKeywordSettingScreen={moveToKeywordSettingScreen} />
        </View>
    );
};

export default AllBoardScreen;
