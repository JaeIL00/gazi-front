import React from 'react';
import { View } from 'react-native';
import EditNicknameTemplate from '../../components/templates/myProfile/EditNicknameTemplate';
import { useRootNavigation } from '../../navigations/RootStackNavigation';
import { editNicknameScreenStyles } from '../../styles/styles';

const EditNicknameScreen = () => {
    const rootNavigation = useRootNavigation();
    const moveToMyProfileScreen = (state: string) => {
        if (state == 'CLOSE') {
            rootNavigation.navigate('BottomTab', { screen: 'MyProfile' });
        }
    };
    return (
        <View style={editNicknameScreenStyles.container}>
            <EditNicknameTemplate moveToMyProfileScreen={moveToMyProfileScreen} />
        </View>
    );
};
export default EditNicknameScreen;
