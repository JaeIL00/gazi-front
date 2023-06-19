import React from 'react';

import ScreenWrapper from '../../components/organisms/ScreenWrapper';
import DeleteMemberTemplate from '../../components/templates/myPage/DeleteMemberTemplate';
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
        <ScreenWrapper isPaddingHorizontal={false}>
            <DeleteMemberTemplate moveToScreenHandler={moveToScreenHandler} />
        </ScreenWrapper>
    );
};

export default DeleteMemberScreen;
