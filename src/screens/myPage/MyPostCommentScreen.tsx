import React from 'react';
import { useIsFocused } from '@react-navigation/native';

import ScreenWrapper from '../../components/organisms/ScreenWrapper';
import MyPostCommentTemplate from '../../components/templates/myPage/MyPostCommentTemplate';
import { useRootNavigation } from '../../navigations/RootStackNavigation';

const MyPostCommentScreen = () => {
    const rootNavigation = useRootNavigation();
    const isFocus = useIsFocused();

    const moveToBackScreenHandler = () => {
        rootNavigation.pop();
    };
    return (
        <>
            {isFocus && (
                <ScreenWrapper isPaddingHorizontal={false}>
                    <MyPostCommentTemplate moveToBackScreenHandler={moveToBackScreenHandler} />
                </ScreenWrapper>
            )}
        </>
    );
};

export default MyPostCommentScreen;
