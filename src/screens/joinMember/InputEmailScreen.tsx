import React from 'react';

import ScreenWrapper from '../../components/organisms/ScreenWrapper';
import InputEmailTemplate from '../../components/templates/joinMember/InputEmailTemplate';
import { useJoinNavigation } from '../../navigations/JoinMemberNavigation';

const InputEmailScreen = () => {
    const joinNavigation = useJoinNavigation();
    const navigationHandler = (state: string) => {
        switch (state) {
            case 'BACK':
                joinNavigation.popToTop();
                break;
            case 'GO':
                joinNavigation.push('JoinInputPassword');
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
