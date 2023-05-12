import React from 'react';

import WritePostTemplate from '../../components/templates/community/WritePostOrCommentTemplate';
import { useRootNavigation } from '../../navigations/RootStackNavigation';

const WritePostScreen = () => {
    const rootNavigation = useRootNavigation();
    const moveToScreen = (state: string) => {
        switch (state) {
            case 'GO':
                console.log('Finish post writing');
                // rootNavigation.navigate('');
                break;
            case 'BACK':
                rootNavigation.navigate('BottomTab');
                break;
            default:
                // For Debug
                console.log('(ERROR) Write post move to screen function argument.', state);
        }
    };

    return (
        <>
            <WritePostTemplate moveToScreen={moveToScreen} />
        </>
    );
};

export default WritePostScreen;
