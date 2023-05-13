import React from 'react';
import { View } from 'react-native';
import LikeKeywordSettingTemplate from '../../components/templates/myProfile/LikeKeywordSettingTemplate';
import { globalBackWhiteStyles } from '../../styles/styles';
import { useRootNavigation } from '../../navigations/RootStackNavigation';

const LikeKeywordSettingScreen = () => {
    const rootNavigation = useRootNavigation();
    const moveToBackScreenHandler = () => {
        rootNavigation.goBack();
    };
    return (
        <View style={globalBackWhiteStyles.container}>
            <LikeKeywordSettingTemplate moveToBackScreenHandler={moveToBackScreenHandler} />
        </View>
    );
};

export default LikeKeywordSettingScreen;
