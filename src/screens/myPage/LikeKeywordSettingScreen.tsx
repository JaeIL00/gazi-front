import React from 'react';

import ScreenWrapper from '../../components/organisms/ScreenWrapper';
import LikeKeywordSettingTemplate from '../../components/templates/myPage/LikeKeywordSettingTemplate';
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
        <ScreenWrapper isPaddingHorizontal={false}>
            <LikeKeywordSettingTemplate
                moveToBackScreenHandler={moveToBackScreenHandler}
                isFromCommunity={isFromCommunity}
            />
        </ScreenWrapper>
    );
};

export default LikeKeywordSettingScreen;
