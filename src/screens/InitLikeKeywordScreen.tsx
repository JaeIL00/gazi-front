import React from 'react';
import { View } from 'react-native';
import { globalDefaultStyles } from '../styles/styles';
import InitLikeKeywordTemplate from '../components/templates/joinMember/InitLikeKeywordTemplate';

const InitLikeKeywordScreen = () => {
    return (
        <View style={globalDefaultStyles.background}>
            <InitLikeKeywordTemplate />
        </View>
    );
};

export default InitLikeKeywordScreen;
