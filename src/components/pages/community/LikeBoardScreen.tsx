import React from 'react';

import ScreenWrapper from '../../organisms/common/ScreenWrapper';
import LikeKeywordBoardTemplate from '../../templates/community/LikeKeywordBoardTemplate';
import { useRootNavigation } from '../../../navigations/RootStackNavigation';

const LikeBoardScreen = () => {
    const rootNavigation = useRootNavigation();
    const moveToKeywordSettingScreen = () => {
        rootNavigation.navigate('LikeKeywordSetting', { isShortcut: true });
    };

    return (
        <ScreenWrapper isPaddingHorizontal={false}>
            <LikeKeywordBoardTemplate moveToKeywordSettingScreen={moveToKeywordSettingScreen} />
        </ScreenWrapper>
    );
};

export default LikeBoardScreen;
