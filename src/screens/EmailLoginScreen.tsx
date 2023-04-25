import React from 'react';
import { View } from 'react-native';
import EmailLoginTemplate from '../components/templates/emailLogin/EmailLoginTemplate';
import { globalDefaultStyles } from '../styles/styles';

const EmailLoginScreen = () => {
    return (
        <View style={globalDefaultStyles.container}>
            <EmailLoginTemplate />
        </View>
    );
};

export default EmailLoginScreen;
