import React from 'react';
import { View } from 'react-native';
import EditNicknameTemplate from '../../components/templates/myProfile/EditNicknameTemplate';
import { globalDefaultStyles } from '../../styles/styles';

const EditNicknameScreen = () => {
    return (
        <View style={globalDefaultStyles.container}>
            <EditNicknameTemplate />
        </View>
    );
};
export default EditNicknameScreen;
