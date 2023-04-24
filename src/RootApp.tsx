import React from 'react';
import { LogBox } from 'react-native';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackNavigation } from './navigations/RootStackNavigation';

export const RootApp = () => {
    // Background timer hide warning
    LogBox.ignoreLogs(['new NativeEventEmitter']);

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
