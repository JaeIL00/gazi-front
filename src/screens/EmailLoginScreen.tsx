import React from 'react';
import { View } from 'react-native';
import EmailLoginTemplate from '../components/templates/emailLogin/EmailLoginTemplate';
import { globalDefaultStyles } from '../styles/styles';
import { useRootNavigation } from '../navigations/RootStackNavigation';

const EmailLoginScreen = () => {
    const rootNavigation = useRootNavigation();
    const moveServiceHomeHandler = () => {
        rootNavigation.navigate('ServiceHome');
    };

    return (
        <View style={globalDefaultStyles.container}>
            <EmailLoginTemplate moveServiceHomeHandler={moveServiceHomeHandler} />
        </View>
    );
};

export default EmailLoginScreen;
