import React from 'react';

import ScreenWrapper from '../../components/organisms/ScreenWrapper';
import InputNicknameTemplate from '../../components/templates/joinMember/InputNicknameTemplate';
import { useRootNavigation } from '../../navigations/RootStackNavigation';

const InputNicknameScreen = () => {
    const rootNavigation = useRootNavigation();
    const navigationHandler = (state: string) => {
        switch (state) {
            case 'BACK':
                rootNavigation.pop();
                break;
            case 'GO':
                rootNavigation.push('RequestPermission');
                break;
            default:
                // For Debug
                console.log('(ERROR) Input nickname screen navigation handler', state);
        }
    };
    return (
        <ScreenWrapper isPaddingHorizontal={true}>
            <InputNicknameTemplate navigationHandler={navigationHandler} />
        </ScreenWrapper>
    );
};
export default InputNicknameScreen;
