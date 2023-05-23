import React from 'react';

import ScreenWrapper from '../components/organisms/ScreenWrapper';
import InitLikeKeywordTemplate from '../components/templates/joinMember/InitLikeKeywordTemplate';
import { useRootNavigation } from '../navigations/RootStackNavigation';

const InitLikeKeywordScreen = () => {
    const rootNavigation = useRootNavigation();

    // Move to screen handling
    const moveToScreen = (state: string) => {
        switch (state) {
            case 'OK':
                rootNavigation.navigate('BottomTab');
                break;
            case 'BACK':
                rootNavigation.goBack();
                break;
            default:
                // For Debug
                console.log('(ERROR) Move to screen handling. state: ', state);
        }
    };

    return (
        <ScreenWrapper isPaddingHorizontal={true}>
            <InitLikeKeywordTemplate moveToScreen={moveToScreen} />
        </ScreenWrapper>
    );
};

export default InitLikeKeywordScreen;
