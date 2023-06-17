import React from 'react';

import ScreenWrapper from '../../components/organisms/ScreenWrapper';
import EmailLoginTemplate from '../../components/templates/login/EmailLoginTemplate';
import { useRootNavigation } from '../../navigations/RootStackNavigation';

const EmailLoginScreen = () => {
    const rootNavigation = useRootNavigation();

    // Move to screen handling
    const moveScreenHandler = (state: string) => {
        switch (state) {
            case 'GO':
                rootNavigation.navigate('BottomTab');
                break;
            case 'BACK':
                rootNavigation.popToTop();
                break;
            default:
                // For Debug
                console.log('(ERROR) Move to screen handling. state: ', state);
        }
    };

    return (
        <ScreenWrapper isPaddingHorizontal={true}>
            <EmailLoginTemplate moveServiceHomeHandler={moveScreenHandler} />
        </ScreenWrapper>
    );
};

export default EmailLoginScreen;
