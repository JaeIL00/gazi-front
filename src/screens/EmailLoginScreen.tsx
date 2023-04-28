import React from 'react';
import { View } from 'react-native';

import EmailLoginTemplate from '../components/templates/emailLogin/EmailLoginTemplate';
import { globalDefaultStyles } from '../styles/styles';
import { useRootNavigation } from '../navigations/RootStackNavigation';

const EmailLoginScreen = () => {
    const rootNavigation = useRootNavigation();

    // Move to screen handling
    const moveScreenHandler = (state: string) => {
        switch (state) {
            case 'GO':
                rootNavigation.navigate('BottomTab');
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
            <EmailLoginTemplate moveServiceHomeHandler={moveScreenHandler} />
        </View>
    );
};

export default EmailLoginScreen;
