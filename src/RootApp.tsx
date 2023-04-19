import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RecoilRoot } from 'recoil';

import { RootStackNavigation } from './navigations/RootStackNavigation';

export const RootApp = () => {
    return (
        <RecoilRoot>
            <NavigationContainer>
                <RootStackNavigation />
            </NavigationContainer>
        </RecoilRoot>
    );
};
