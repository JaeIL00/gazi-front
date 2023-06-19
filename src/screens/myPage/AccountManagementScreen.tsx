import React from 'react';

import ScreenWrapper from '../../components/organisms/ScreenWrapper';
import AccountManagementTemplate from '../../components/templates/myPage/AccountManagementTemplate';
import { useRootNavigation } from '../../navigations/RootStackNavigation';

const AccountManagementScreen = () => {
    const rootNavigation = useRootNavigation();
    const moveToScreenHandler = (state: string) => {
        switch (state) {
            case 'BACK':
                rootNavigation.goBack();
                break;
            case 'PASSWORD':
                rootNavigation.navigate('ChangePassword');
                break;
            case 'INIT_HOME':
                rootNavigation.navigate('NotLoginHome');
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
        <ScreenWrapper isPaddingHorizontal={false}>
            <AccountManagementTemplate moveToScreenHandler={moveToScreenHandler} />
        </ScreenWrapper>
    );
};
export default AccountManagementScreen;
