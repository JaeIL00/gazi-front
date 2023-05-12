import React from 'react';
import { View } from 'react-native';
import CommunityTemplate from '../components/templates/community/CommunityTemplate';
import { useRootNavigation } from '../navigations/RootStackNavigation';
import { useIsFocused } from '@react-navigation/native';

const CommunityScreen = () => {
    const rootNavigation = useRootNavigation();
    const isFocused = useIsFocused();

    return <View>{isFocused && <CommunityTemplate />}</View>;
};

export default CommunityScreen;
