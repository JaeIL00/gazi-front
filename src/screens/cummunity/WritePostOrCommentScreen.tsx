import React from 'react';

import WritePostOrCommentTemplate from '../../components/templates/community/WritePostOrCommentTemplate';
import { useRootNavigation, useRootRoute } from '../../navigations/RootStackNavigation';
import { useIsFocused } from '@react-navigation/native';

const WritePostOrCommentScreen = () => {
    const route = useRootRoute<'WritePostOrComment'>();
    const data = route.params;

    const rootNavigation = useRootNavigation();
    const moveToScreen = (state: string, postId: number | null) => {
        switch (state) {
            case 'GO':
                rootNavigation.navigate('ThreadItem', {
                    postId: postId!,
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

    const isFocused = useIsFocused();

    return <>{isFocused && <WritePostOrCommentTemplate moveToScreen={moveToScreen} postThreadInfo={data} />}</>;
};

export default WritePostOrCommentScreen;