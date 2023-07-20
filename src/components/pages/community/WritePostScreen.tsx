import React from 'react';

import WritePostTemplate from '../../templates/community/WritePostTemplate';
import { useRootNavigation } from '../../../navigations/RootStackNavigation';
import ScreenWrapper from '../../organisms/common/ScreenWrapper';

const WritePostScreen = () => {
    const rootNavigation = useRootNavigation();

    const navigationHandler = (state: string, postId?: number) => {
        switch (state) {
            case 'GO':
                rootNavigation.navigate('ThreadItem', {
                    postId: postId!,
                });
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
            <WritePostTemplate navigationHandler={navigationHandler} />
        </ScreenWrapper>
    );
};

export default WritePostScreen;
