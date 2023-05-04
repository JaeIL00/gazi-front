import React from 'react';
import { View } from 'react-native';

import { globalDefaultStyles } from '../styles/styles';
import InitLikeKeywordTemplate from '../components/templates/joinMember/InitLikeKeywordTemplate';
import { useRootNavigation } from '../navigations/RootStackNavigation';

const InitLikeKeywordScreen = () => {
    const rootNavigation = useRootNavigation();

    // Move to screen handling
    const moveToScreen = (state: string) => {
        switch (state) {
            case 'OK':
                rootNavigation.navigate('ServiceHome');
                break;
            case 'BACK':
                rootNavigation.goBack();
                break;
            default:
                // For Debug
                console.log('(ERROR) Move to screen handling. state: ', state);
        }
    };
    return (
        <View style={globalDefaultStyles.container}>
            <InitLikeKeywordTemplate moveToScreen={moveToScreen} />
        </View>
    );
};

export default InitLikeKeywordScreen;
