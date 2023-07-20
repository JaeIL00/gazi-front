import React from 'react';

import ScreenWrapper from '../../organisms/common/ScreenWrapper';
import ChangePasswordTemplate from '../../templates/myPage/ChangePasswordTemplate';
import { useRootNavigation } from '../../../navigations/RootStackNavigation';

const ChangePasswordScreen = () => {
    const rootNavigation = useRootNavigation();
    const moveToBackScreenHandler = () => {
        rootNavigation.pop();
    };
    return (
        <ScreenWrapper isPaddingHorizontal={false}>
            <ChangePasswordTemplate moveToBackScreenHandler={moveToBackScreenHandler} />
        </ScreenWrapper>
    );
};

export default ChangePasswordScreen;
