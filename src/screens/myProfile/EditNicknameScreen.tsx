import React from 'react';

import ScreenWrapper from '../../components/organisms/ScreenWrapper';
import EditNicknameTemplate from '../../components/templates/myProfile/EditNicknameTemplate';
import { useRootNavigation } from '../../navigations/RootStackNavigation';

const EditNicknameScreen = () => {
    const rootNavigation = useRootNavigation();
    const moveToMyProfileScreen = (state: string) => {
        if (state === 'CLOSE') {
            rootNavigation.navigate('BottomTab', { screen: 'MyProfile' });
        }
    };
    return (
        <ScreenWrapper isPaddingHorizontal={false}>
            <EditNicknameTemplate moveToMyProfileScreen={moveToMyProfileScreen} />
        </ScreenWrapper>
    );
};
export default EditNicknameScreen;
