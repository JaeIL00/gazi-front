import React from 'react';

import ScreenWrapper from '../../organisms/common/ScreenWrapper';
import EditNicknameTemplate from '../../templates/myPage/EditNicknameTemplate';
import { useRootNavigation } from '../../../navigations/RootStackNavigation';

const EditNicknameScreen = () => {
    const rootNavigation = useRootNavigation();
    const moveToMyPageScreen = () => {
        rootNavigation.pop();
    };

    return (
        <ScreenWrapper isPaddingHorizontal={false}>
            <EditNicknameTemplate moveToMyPageScreen={moveToMyPageScreen} />
        </ScreenWrapper>
    );
};
export default EditNicknameScreen;
