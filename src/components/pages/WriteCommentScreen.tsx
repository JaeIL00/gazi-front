import React from 'react';

import ScreenWrapper from '../organisms/ScreenWrapper';
import WriteCommentTemplate from '../templates/community/WriteCommentTempate';
import { useRootNavigation, useRootRoute } from '../../navigations/RootStackNavigation';

const WriteCommentScreen = () => {
    const route = useRootRoute<'WriteComment'>();
    const threadInfo = route.params;

    const rootNavigation = useRootNavigation();

    const navigationHandler = (state: string, postId?: number, freshRePostCount?: number) => {
        switch (state) {
            case 'GO':
                if (postId) {
                    rootNavigation.navigate('ThreadItem', {
                        postId: postId,
                        freshRePostCount,
                    });
                }
                break;
            case 'BACK':
                rootNavigation.navigate('ServiceMainTab');
                break;
            default:
                // For Debug
                console.log('(ERROR) Write post move to screen.', state);
        }
    };

    return (
        <ScreenWrapper isPaddingHorizontal={false}>
            <WriteCommentTemplate navigationHandler={navigationHandler} threadInfo={threadInfo} />
        </ScreenWrapper>
    );
};

export default WriteCommentScreen;
