import React from 'react';
import { View } from 'react-native';

import ThreadItemTemplate from '../../components/templates/community/ThreadItemTemplate';
import { threadItemScreenStyles } from '../../styles/styles';
import { useRootNavigation, useRootRoute } from '../../navigations/RootStackNavigation';

const ThreadItemScreen = () => {
    const route = useRootRoute<'ThreadItem'>();
    const postId = route.params.postId;

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
        <View style={threadItemScreenStyles.container}>
            <ThreadItemTemplate
                postId={postId}
                movetoCommunityScreen={movetoCommunityScreen}
                moveToWriteScreen={moveToWriteScreen}
            />
        </View>
    );
};
export default ThreadItemScreen;
