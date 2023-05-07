import React from 'react';
import { View } from 'react-native';

import { globalDefaultStyles } from '../styles/styles';
import WritePostTemplate from '../components/templates/community/WritePostTemplate';
import { useRootNavigation } from '../navigations/RootStackNavigation';

const WritePostScreen = () => {
    const rootNavigation = useRootNavigation();
    const moveToScreen = (state: string) => {
        switch (state) {
            case 'GO':
                console.log('Finish post writing');
                // rootNavigation.navigate('');
                break;
            case 'BACK':
                rootNavigation.goBack();
                break;
            default:
                // For Debug
                console.log('(ERROR) Write post move to screen function argument.', state);
        }
    };

    return (
        <View style={globalDefaultStyles.container}>
            <WritePostTemplate moveToScreen={moveToScreen} />
        </View>
    );
};

export default WritePostScreen;
