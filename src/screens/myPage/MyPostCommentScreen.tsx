import React from 'react';

import ScreenWrapper from '../../components/organisms/ScreenWrapper';
import MyPostCommentTemplate from '../../components/templates/myPage/MyPostCommentTemplate';
import { useRootNavigation } from '../../navigations/RootStackNavigation';
import { useIsFocused } from '@react-navigation/native';

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
