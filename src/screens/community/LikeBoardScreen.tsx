import React from 'react';
import { StatusBar, View } from 'react-native';

import Colors from '../../styles/Colors';
import CommunityTemplate from '../../components/templates/community/CommunityTemplate';
import { globalBackWhiteStyles } from '../../styles/styles';
import { useRootNavigation } from '../../navigations/RootStackNavigation';

const LikeBoardScreen = () => {
    const rootNavigation = useRootNavigation();
    const moveToKeywordSettingScreen = () => {
        rootNavigation.navigate('LikeKeywordSetting', { isFromCommunity: true });
    };

    return (
        <View style={globalBackWhiteStyles.container}>
            <StatusBar backgroundColor={Colors.WHITE} barStyle="dark-content" />
            <CommunityTemplate moveToKeywordSettingScreen={moveToKeywordSettingScreen} />
        </View>
    );
};

export default LikeBoardScreen;
