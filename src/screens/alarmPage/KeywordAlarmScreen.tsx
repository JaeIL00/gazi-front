import React from 'react';

import ScreenWrapper from '../../components/organisms/ScreenWrapper';
import KeywordAlarmTemplate from '../../components/templates/alarmPage/KeywordAlarmTemplate';
import { useRootNavigation } from '../../navigations/RootStackNavigation';

const KeywordAlarmScreen = () => {
    const rootNavigation = useRootNavigation();
    const navigationHandler = () => {
        rootNavigation.push('LikeKeywordSetting', { isShortcut: true });
    };
    return (
        <ScreenWrapper isPaddingHorizontal={true}>
            <KeywordAlarmTemplate navigationHandler={navigationHandler} />
        </ScreenWrapper>
    );
};

export default KeywordAlarmScreen;
