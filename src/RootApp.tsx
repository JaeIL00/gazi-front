import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';

import { RootStackNavigation } from './navigations/RootStackNavigation';

export const RootApp = () => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <NavigationContainer>
                    <RootStackNavigation />
                </NavigationContainer>
            </RecoilRoot>
        </QueryClientProvider>
    );
};
