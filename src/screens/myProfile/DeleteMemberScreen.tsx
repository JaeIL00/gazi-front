import React from 'react';
import { View } from 'react-native';

import DeleteMemberTemplate from '../../components/templates/myProfile/DeleteMemberTemplate';
import { globalBackWhiteStyles } from '../../styles/styles';
import { useRootNavigation } from '../../navigations/RootStackNavigation';

const DeleteMemberScreen = () => {
    const rootNavigation = useRootNavigation();
    const moveToScreenHandler = (state: string) => {
        switch (state) {
            case 'BACK':
                rootNavigation.goBack();
                break;
            case 'HOME':
                rootNavigation.navigate('NotLoginHome');
                break;
            default:
                // For Debug
                console.log('(ERROR) Delete member screen move handler.', state);
        }
    };
    return (
        <View style={globalBackWhiteStyles.container}>
            <DeleteMemberTemplate moveToScreenHandler={moveToScreenHandler} />
        </View>
    );
};

export default DeleteMemberScreen;
