import React from 'react';

import ScreenWrapper from '../../components/organisms/ScreenWrapper';
import InitLikeKeywordTemplate from '../../components/templates/joinMember/InitLikeKeywordTemplate';
import { useRootNavigation } from '../../navigations/RootStackNavigation';

const InitLikeKeywordScreen = () => {
    const rootNavigation = useRootNavigation();

    // Move to screen handling
    const navigationHandler = (state: string) => {
        switch (state) {
            case 'OK':
                rootNavigation.push('BottomTab');
                break;
            case 'BACK':
                rootNavigation.pop();
                break;
            default:
                // For Debug
                console.log('(ERROR) Move to screen handling. state: ', state);
        }
    };

    return (
        <ScreenWrapper isPaddingHorizontal={true}>
            <InitLikeKeywordTemplate navigationHandler={navigationHandler} />
        </ScreenWrapper>
    );
};

export default InitLikeKeywordScreen;
