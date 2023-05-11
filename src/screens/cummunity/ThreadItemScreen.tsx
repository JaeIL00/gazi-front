import React from 'react';
import { View } from 'react-native';

import ThreadItemTemplate from '../../components/templates/community/ThreadItemTemplate';
import { useRootRoute } from '../../navigations/RootStackNavigation';

const ThreadItemScreen = () => {
    const route = useRootRoute<'ThreadItem'>();
    const data = route.params.post;
    return (
        <View>
            <ThreadItemTemplate post={data} />
        </View>
    );
};
export default ThreadItemScreen;
