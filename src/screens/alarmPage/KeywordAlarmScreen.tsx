import React from 'react';
import { View } from 'react-native';

import ScreenWrapper from '../../components/organisms/ScreenWrapper';
import KeywordAlarmTemplate from '../../components/templates/alarmPage/KeywordAlarmTemplate';

const KeywordAlarmScreen = () => {
    return (
        <ScreenWrapper isPaddingHorizontal={true}>
            <KeywordAlarmTemplate />
        </ScreenWrapper>
    );
};

export default KeywordAlarmScreen;
