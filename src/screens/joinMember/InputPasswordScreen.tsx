import React from 'react';

import ScreenWrapper from '../../components/organisms/ScreenWrapper';
import InputPasswordTemplate from '../../components/templates/joinMember/InputPasswordTemplate';
import { useRootNavigation } from '../../navigations/RootStackNavigation';

const InputPasswordScreen = () => {
    const rootNavigation = useRootNavigation();
    const navigationHandler = (state: string) => {
        switch (state) {
            case 'BACK':
                rootNavigation.pop();
                break;
            case 'GO':
                console.log('다음');
                // rootNavigation.push()
                break;
            default:
                // For Debug
                console.log('(ERROR) Input password screen navigation handler', state);
        }
    };
    return (
        <ScreenWrapper isPaddingHorizontal={true}>
            <InputPasswordTemplate navigationHandler={navigationHandler} />
        </ScreenWrapper>
    );
};
export default InputPasswordScreen;
