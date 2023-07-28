import React, { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { useFocusEffect } from '@react-navigation/native';

import ScreenWrapper from '../../organisms/common/ScreenWrapper';
import NotLoginTemplate from '../../templates/home/NotLoginTemplate';
import { joinMemberAtom } from '../../../recoil';

const NotLoginHomeScreen = () => {
    const setJoinMemberState = useSetRecoilState(joinMemberAtom);
    useFocusEffect(
        useCallback(() => {
            setJoinMemberState({
                email: '',
                password: '',
                nickName: '',
            });
        }, []),
    );
    return (
        <ScreenWrapper isPaddingHorizontal={true}>
            <NotLoginTemplate />
        </ScreenWrapper>
    );
};

export default NotLoginHomeScreen;
