import React from 'react';

import WritePostOrCommentTemplate from '../../components/templates/home/WritePostOrCommentTemplate';
import { useRootNavigation } from '../../navigations/RootStackNavigation';
import { useHomeRoute } from '../../navigations/ServiceHomeNavigation';

const WritePostOrCommentScreen = () => {
    const route = useHomeRoute();
    const data = route.params;

    const rootNavigation = useRootNavigation();
    const moveToScreen = (state: string, postId: number | null, freshRePostCount?: number) => {
        switch (state) {
            case 'GO':
                rootNavigation.navigate('ThreadItem', {
                    postId: postId!,
                    freshRePostCount,
                });
                break;
            case 'BACK':
                rootNavigation.navigate('BottomTab');
                break;
            default:
                // For Debug
                console.log('(ERROR) Write post move to screen function argument.', state);
        }
    };

    return <WritePostOrCommentTemplate moveToScreen={moveToScreen} postThreadInfo={data} />;
};

export default WritePostOrCommentScreen;
