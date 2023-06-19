import React from 'react';

import ScreenWrapper from '../../components/organisms/ScreenWrapper';
import EditNicknameTemplate from '../../components/templates/myPage/EditNicknameTemplate';
import { useRootNavigation } from '../../navigations/RootStackNavigation';

const EditNicknameScreen = () => {
    const rootNavigation = useRootNavigation();
    const moveToMyProfileScreen = (state: string) => {
        if (state === 'CLOSE') {
            rootNavigation.navigate('ServiceMainTab', { screen: 'MyProfile' });
        }
    };
    return (
        <ScreenWrapper isPaddingHorizontal={false}>
            <EditNicknameTemplate moveToMyProfileScreen={moveToMyProfileScreen} />
        </ScreenWrapper>
    );
};
export default EditNicknameScreen;
