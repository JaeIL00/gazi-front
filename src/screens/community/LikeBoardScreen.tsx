import React from 'react';

import ScreenWrapper from '../../components/organisms/ScreenWrapper';
import LikeKeywordBoardTemplate from '../../components/templates/community/LikeKeywordBoardTemplate';
import { useRootNavigation } from '../../navigations/RootStackNavigation';

const LikeBoardScreen = () => {
    const rootNavigation = useRootNavigation();
    const moveToKeywordSettingScreen = () => {
        rootNavigation.navigate('LikeKeywordSetting', { isFromCommunity: true });
    };

    return (
        <ScreenWrapper isPaddingHorizontal={false}>
            <LikeKeywordBoardTemplate moveToKeywordSettingScreen={moveToKeywordSettingScreen} />
        </ScreenWrapper>
    );
};

export default LikeBoardScreen;
