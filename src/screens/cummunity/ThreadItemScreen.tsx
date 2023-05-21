import React from 'react';
import { View } from 'react-native';

import ThreadItemTemplate from '../../components/templates/community/ThreadItemTemplate';
import { useIsFocused } from '@react-navigation/native';
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

    const isFocus = useIsFocused();
    return (
        <View style={threadItemScreenStyles.container}>
            {isFocus && (
                <ThreadItemTemplate
                    postId={postId}
                    movetoCommunityScreen={movetoCommunityScreen}
                    moveToWriteScreen={moveToWriteScreen}
                />
            )}
        </View>
    );
};
export default ThreadItemScreen;
