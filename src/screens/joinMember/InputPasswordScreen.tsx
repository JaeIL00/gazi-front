import React from 'react';

import ScreenWrapper from '../../components/organisms/ScreenWrapper';
import InputPasswordTemplate from '../../components/templates/joinMember/InputPasswordTemplate';
import { useJoinNavigation } from '../../navigations/JoinMemberNavigation';

const InputPasswordScreen = () => {
    const joinNavigation = useJoinNavigation();
    const navigationHandler = (state: string) => {
        switch (state) {
            case 'BACK':
                joinNavigation.pop();
                break;
            case 'GO':
                joinNavigation.push('JoinInputNickname');
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
