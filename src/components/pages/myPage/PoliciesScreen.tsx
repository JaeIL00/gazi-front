import React from 'react';

import ScreenWrapper from '../../organisms/ScreenWrapper';
import PoliciesTemplate from '../../templates/myPage/PoliciesTemplate';
import { useRootNavigation } from '../../../navigations/RootStackNavigation';

const PoliciesScreen = () => {
    const rootNavigation = useRootNavigation();
    const moveToBackScreenHandler = () => {
        rootNavigation.pop();
    };
    return (
        <ScreenWrapper isPaddingHorizontal={false}>
            <PoliciesTemplate moveToBackScreenHandler={moveToBackScreenHandler} />
        </ScreenWrapper>
    );
};

export default PoliciesScreen;
