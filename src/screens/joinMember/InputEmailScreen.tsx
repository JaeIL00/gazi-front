import React from 'react';

import ScreenWrapper from '../../components/organisms/ScreenWrapper';
import InputEmailTemplate from '../../components/templates/joinMember/InputEmailTemplate';
import { useRootNavigation } from '../../navigations/RootStackNavigation';

const InputEmailScreen = () => {
    const rootNavigation = useRootNavigation();
    const navigationHandler = (state: string) => {
        switch (state) {
            case 'BACK':
                rootNavigation.popToTop();
                break;
            case 'GO':
                console.log('다음');
                // rootNavigation.pop()
                break;
            default:
                // For Debug
                console.log('(ERROR) Input email screen navigation handler', state);
        }
    };
    return (
        <ScreenWrapper isPaddingHorizontal={true}>
            <InputEmailTemplate navigationHandler={navigationHandler} />
        </ScreenWrapper>
    );
};
export default InputEmailScreen;
