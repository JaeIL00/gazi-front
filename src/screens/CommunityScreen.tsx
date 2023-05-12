import React from 'react';
import { View } from 'react-native';
import CommunityTemplate from '../components/templates/community/CommunityTemplate';
import { useRootNavigation } from '../navigations/RootStackNavigation';

const CommunityScreen = () => {
    const rootNavigation = useRootNavigation();

    return (
        <View>
            <CommunityTemplate />
        </View>
    );
};

export default CommunityScreen;
