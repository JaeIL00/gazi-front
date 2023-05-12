import React from 'react';
import { View } from 'react-native';

import ThreadItemTemplate from '../../components/templates/community/ThreadItemTemplate';
import { useRootNavigation, useRootRoute } from '../../navigations/RootStackNavigation';
import { threadItemScreenStyles } from '../../styles/styles';

const ThreadItemScreen = () => {
    const route = useRootRoute<'ThreadItem'>();
    const data = route.params.post;

    const rootNavigation = useRootNavigation();
    const movetoCommunityScreen = () => {
        rootNavigation.navigate('BottomTab', { screen: 'Community' });
    };
    return (
        <View style={threadItemScreenStyles.container}>
            <ThreadItemTemplate post={data} movetoCommunityScreen={movetoCommunityScreen} />
        </View>
    );
};
export default ThreadItemScreen;
