import React from 'react';
import { View } from 'react-native';

import ThreadItemTemplate from '../../components/templates/community/ThreadItemTemplate';
import { useRootNavigation, useRootRoute } from '../../navigations/RootStackNavigation';

const ThreadItemScreen = () => {
    const route = useRootRoute<'ThreadItem'>();
    const data = route.params.post;

    const rootNavigation = useRootNavigation();
    const movetoCommunityScreen = () => {
        rootNavigation.navigate('BottomTab', { screen: 'Community' });
    };
    return (
        <View>
            <ThreadItemTemplate post={data} movetoCommunityScreen={movetoCommunityScreen} />
        </View>
    );
};
export default ThreadItemScreen;
