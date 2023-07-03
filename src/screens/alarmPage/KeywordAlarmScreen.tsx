import React from 'react';

import ScreenWrapper from '../../components/organisms/ScreenWrapper';
import KeywordAlarmTemplate from '../../components/templates/alarmPage/KeywordAlarmTemplate';
import { useRootNavigation } from '../../navigations/RootStackNavigation';

const KeywordAlarmScreen = () => {
    const rootNavigation = useRootNavigation();
    const navigationHandler = (screen: string, postId?: number) => {
        switch (screen) {
            case 'LikeKeywordSetting':
                rootNavigation.push('LikeKeywordSetting', { isShortcut: true });
                break;
            case 'ThreadItem':
                if (postId) {
                    rootNavigation.push('ThreadItem', { postId });
                }

                break;
        }
    };
    return (
        <ScreenWrapper isPaddingHorizontal={true}>
            <KeywordAlarmTemplate navigationHandler={navigationHandler} />
        </ScreenWrapper>
    );
};

export default KeywordAlarmScreen;
