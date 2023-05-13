import React from 'react';
import { View } from 'react-native';
import AccountManagementTemplate from '../../components/templates/myProfile/AccountManagementTemplate';
import { globalBackWhiteStyles } from '../../styles/styles';
import { useRootNavigation } from '../../navigations/RootStackNavigation';

const AccountManagementScreen = () => {
    const rootNavigation = useRootNavigation();
    const moveToScreenHandler = (state: string) => {
        switch (state) {
            case 'BACK':
                rootNavigation.goBack();
                break;
            case 'PASSWORD':
                // rootNavigation.navigate();
                break;
            case 'LOGOUT':
                // rootNavigation.navigate();
                break;
            case 'DELETE':
                rootNavigation.navigate('DeleteMember');
                break;
            default:
                // For Debug
                console.log('(ERROR) Move screen account manage.', state);
        }
    };
    return (
        <View style={globalBackWhiteStyles.container}>
            <AccountManagementTemplate moveToScreenHandler={moveToScreenHandler} />
        </View>
    );
};
export default AccountManagementScreen;
