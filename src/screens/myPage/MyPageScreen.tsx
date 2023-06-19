import React from 'react';
import { StatusBar, View } from 'react-native';

import Colors from '../../styles/Colors';
import MyProfileTemplate from '../../components/templates/myPage/MyPageTemplate';
import { globalBackWhiteStyles } from '../../styles/styles';
import { useRootNavigation } from '../../navigations/RootStackNavigation';
import ScreenWrapper from '../../components/organisms/ScreenWrapper';

const MyPageScreen = () => {
    const rootNavigation = useRootNavigation();
    const moveToScreen = (state: string) => {
        switch (state) {
            case 'EDIT_NICK':
                rootNavigation.push('EditNickname');
                break;
        }
    };
    return (
        <ScreenWrapper isPaddingHorizontal={false}>
            <MyProfileTemplate moveToScreen={moveToScreen} />
        </ScreenWrapper>
    );
};

export default MyPageScreen;
