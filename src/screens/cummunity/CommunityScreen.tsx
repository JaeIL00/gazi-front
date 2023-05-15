import React from 'react';
import { View } from 'react-native';

import CommunityTemplate from '../../components/templates/community/CommunityTemplate';
import { globalBackWhiteStyles } from '../../styles/styles';
import { useRootNavigation } from '../../navigations/RootStackNavigation';

const CommunityScreen = () => {
    const rootNavigation = useRootNavigation();
    const moveToKeywordSettingScreen = () => {
        rootNavigation.navigate('LikeKeywordSetting');
    };

    return (
        <View style={globalBackWhiteStyles.container}>
            <CommunityTemplate moveToKeywordSettingScreen={moveToKeywordSettingScreen} />
        </View>
    );
};

export default CommunityScreen;
