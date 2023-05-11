import React from 'react';
import { View } from 'react-native';
import EditNicknameTemplate from '../../components/templates/myProfile/EditNicknameTemplate';
import { globalDefaultStyles } from '../../styles/styles';
import { useRootNavigation } from '../../navigations/RootStackNavigation';

const EditNicknameScreen = () => {
    const rootNavigation = useRootNavigation();
    const moveToMyProfileScreen = (state: string) => {
        if (state == 'CLOSE') {
            rootNavigation.navigate('BottomTab', { screen: 'MyProfile' });
        }
    };
    return (
        <View style={globalDefaultStyles.container}>
            <EditNicknameTemplate moveToMyProfileScreen={moveToMyProfileScreen} />
        </View>
    );
};
export default EditNicknameScreen;
