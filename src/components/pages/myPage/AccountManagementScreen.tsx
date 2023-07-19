import React from 'react';

import ScreenWrapper from '../../organisms/ScreenWrapper';
import AccountManagementTemplate from '../../templates/myPage/AccountManagementTemplate';
import { useRootNavigation } from '../../../navigations/RootStackNavigation';

const AccountManagementScreen = () => {
    const rootNavigation = useRootNavigation();
    const moveToScreenHandler = (state: string) => {
        switch (state) {
            case 'BACK':
                rootNavigation.goBack();
                break;
            case 'PASSWORD':
                rootNavigation.push('ChangePassword');
                break;
            case 'INIT_HOME':
                rootNavigation.navigate('NotLoginHome');
                break;
            case 'DELETE':
                rootNavigation.push('DeleteMember');
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
