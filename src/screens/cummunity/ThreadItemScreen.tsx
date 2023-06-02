import React from 'react';
import { useIsFocused } from '@react-navigation/native';

import ScreenWrapper from '../../components/organisms/ScreenWrapper';
import ThreadItemTemplate from '../../components/templates/community/ThreadItemTemplate';
import { useRootNavigation, useRootRoute } from '../../navigations/RootStackNavigation';

const ThreadItemScreen = () => {
    const route = useRootRoute<'ThreadItem'>();
    const postId = route.params.postId;
    const freshRePostCount = route.params.freshRePostCount;

    const rootNavigation = useRootNavigation();
    const movetoCommunityScreen = () => {
        rootNavigation.navigate('BottomTab', { screen: 'Community' });
    };
    const moveToWriteScreen = (title: string, rePostCount: number, time: string) => {
        rootNavigation.navigate('WritePostOrComment', {
            title,
            rePostCount,
            time,
            postId: postId,
        });
    };

    return (
        <ScreenWrapper isPaddingHorizontal={false}>
            <ThreadItemTemplate
                postId={postId}
                movetoCommunityScreen={movetoCommunityScreen}
                moveToWriteScreen={moveToWriteScreen}
                freshRePostCount={freshRePostCount}
            />
        </ScreenWrapper>
    );
};
export default ThreadItemScreen;
