import React from 'react';

import ScreenWrapper from '../../components/organisms/ScreenWrapper';
import ChangePasswordTemplate from '../../components/templates/myPage/ChangePasswordTemplate';
import { useRootNavigation } from '../../navigations/RootStackNavigation';

const ChangePasswordScreen = () => {
    const rootNavigation = useRootNavigation();
    const moveToBackScreenHandler = () => {
        rootNavigation.goBack();
    };
    return (
        <ScreenWrapper isPaddingHorizontal={false}>
            <ChangePasswordTemplate moveToBackScreenHandler={moveToBackScreenHandler} />
        </ScreenWrapper>
    );
};

export default ChangePasswordScreen;
