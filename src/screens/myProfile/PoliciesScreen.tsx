import React from 'react';
import { View } from 'react-native';
import PoliciesTemplate from '../../components/templates/myProfile/PoliciesTemplate';
import { globalBackWhiteStyles } from '../../styles/styles';
import { useRootNavigation } from '../../navigations/RootStackNavigation';

const PoliciesScreen = () => {
    const rootNavigation = useRootNavigation();
    const moveToBackScreenHandler = () => {
        rootNavigation.goBack();
    };
    return (
        <View style={globalBackWhiteStyles.container}>
            <PoliciesTemplate moveToBackScreenHandler={moveToBackScreenHandler} />
        </View>
    );
};

export default PoliciesScreen;
