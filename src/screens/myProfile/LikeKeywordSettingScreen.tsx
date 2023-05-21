import React from 'react';
import { View } from 'react-native';

import LikeKeywordSettingTemplate from '../../components/templates/myProfile/LikeKeywordSettingTemplate';
import { globalBackWhiteStyles } from '../../styles/styles';
import { useRootNavigation, useRootRoute } from '../../navigations/RootStackNavigation';

const LikeKeywordSettingScreen = () => {
    const rootNavigation = useRootNavigation();
    const rootRoute = useRootRoute<'LikeKeywordSetting'>();
    let isFromCommunity: boolean | undefined;
    if (rootRoute.params) {
        isFromCommunity = rootRoute.params.isFromCommunity;
    }
    const moveToBackScreenHandler = () => {
        rootNavigation.goBack();
    };
    return (
        <View style={globalBackWhiteStyles.container}>
            <LikeKeywordSettingTemplate
                moveToBackScreenHandler={moveToBackScreenHandler}
                isFromCommunity={isFromCommunity}
            />
        </View>
    );
};

export default LikeKeywordSettingScreen;
