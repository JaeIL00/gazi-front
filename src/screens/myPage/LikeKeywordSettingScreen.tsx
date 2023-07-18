import React from 'react';

import ScreenWrapper from '../../components/organisms/ScreenWrapper';
import LikeKeywordSettingTemplate from '../../components/templates/myPage/LikeKeywordSettingTemplate';
import { useRootNavigation, useRootRoute } from '../../navigations/RootStackNavigation';

const LikeKeywordSettingScreen = () => {
    const rootNavigation = useRootNavigation();
    const rootRoute = useRootRoute<'LikeKeywordSetting'>();
    let isShortcut: boolean | undefined;
    if (rootRoute.params) {
        isShortcut = rootRoute.params.isShortcut;
    }
    const moveToBackScreenHandler = () => {
        rootNavigation.pop();
    };
    return (
        <ScreenWrapper isPaddingHorizontal={false}>
            <LikeKeywordSettingTemplate moveToBackScreenHandler={moveToBackScreenHandler} isShortcut={isShortcut} />
        </ScreenWrapper>
    );
};

export default LikeKeywordSettingScreen;
