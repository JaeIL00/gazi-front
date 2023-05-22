import React from 'react';

import ScreenWrapper from '../../components/organisms/ScreenWrapper';
import MyPostCommentTemplate from '../../components/templates/myProfile/MyPostCommentTemplate';
import { useRootNavigation } from '../../navigations/RootStackNavigation';

const MyPostCommentScreen = () => {
    const rootNavigation = useRootNavigation();
    const moveToBackScreenHandler = () => {
        rootNavigation.goBack();
    };
    return (
        <ScreenWrapper isPaddingHorizontal={false}>
            <MyPostCommentTemplate moveToBackScreenHandler={moveToBackScreenHandler} />
        </ScreenWrapper>
    );
};

export default MyPostCommentScreen;
