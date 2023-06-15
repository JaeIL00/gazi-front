import React from 'react';
import { StatusBar, View } from 'react-native';

import Colors from '../../styles/Colors';
import { globalBackWhiteStyles } from '../../styles/styles';
import { useRootNavigation } from '../../navigations/RootStackNavigation';
import LikeKeywordBoardTemplate from '../../components/templates/community/LikeKeywordBoardTemplate';

const LikeBoardScreen = () => {
    const rootNavigation = useRootNavigation();
    const moveToKeywordSettingScreen = () => {
        rootNavigation.navigate('LikeKeywordSetting', { isFromCommunity: true });
    };

    return (
        <View style={globalBackWhiteStyles.container}>
            <StatusBar backgroundColor={Colors.WHITE} barStyle="dark-content" />
            <LikeKeywordBoardTemplate moveToKeywordSettingScreen={moveToKeywordSettingScreen} />
        </View>
    );
};

export default LikeBoardScreen;
