import React from 'react';

import ScreenWrapper from '../../organisms/ScreenWrapper';
import InputNicknameTemplate from '../../templates/joinMember/InputNicknameTemplate';
import { useJoinNavigation } from '../../../navigations/JoinMemberNavigation';

const InputNicknameScreen = () => {
    const joinNavigation = useJoinNavigation();
    const navigationHandler = (state: string) => {
        switch (state) {
            case 'BACK':
                joinNavigation.pop();
                break;
            case 'GO':
                joinNavigation.push('JoinRequestPermission');
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
