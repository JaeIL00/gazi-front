import React from 'react';

import ScreenWrapper from '../../components/organisms/ScreenWrapper';
import InputPasswordTemplate from '../../components/templates/joinMember/InputPasswordTemplate';
import { useJoinNavigation } from '../../navigations/JoinMemberNavigation';
import { useIsFocused } from '@react-navigation/native';

const InputPasswordScreen = () => {
    const isFocus = useIsFocused();
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
            <>{isFocus && <InputPasswordTemplate navigationHandler={navigationHandler} />}</>
        </ScreenWrapper>
    );
};
export default InputPasswordScreen;
