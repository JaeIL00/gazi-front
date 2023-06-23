import React from 'react';

import ScreenWrapper from '../../components/organisms/ScreenWrapper';
import AllBoardTemplate from '../../components/templates/community/AllBoardTemplate';
import { useRootNavigation } from '../../navigations/RootStackNavigation';

const AllBoardScreen = () => {
    const rootNavigation = useRootNavigation();
    const moveToKeywordSettingScreen = () => {
        rootNavigation.navigate('LikeKeywordSetting', { isShortcut: true });
    };

    return (
        <ScreenWrapper isPaddingHorizontal={false}>
            <AllBoardTemplate moveToKeywordSettingScreen={moveToKeywordSettingScreen} />
        </ScreenWrapper>
    );
};

export default AllBoardScreen;
