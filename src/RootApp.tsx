import React from 'react';
import { LogBox, Platform, Text, TextInput } from 'react-native';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RootStackNavigation } from './navigations/RootStackNavigation';
import { createNavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from './types/types';

interface TextWithDefaultProps extends Text {
    defaultProps?: { allowFontScaling?: boolean };
}

interface TextInputWithDefaultProps extends TextInput {
    defaultProps?: { allowFontScaling?: boolean };
}

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

const RootApp = () => {
    LogBox.ignoreAllLogs();

    const queryClient = new QueryClient();

    // Ignore font setting of device
    if (Platform.OS === 'android') {
        (Text as unknown as TextWithDefaultProps).defaultProps =
            (Text as unknown as TextWithDefaultProps).defaultProps || {};
        (Text as unknown as TextWithDefaultProps).defaultProps!.allowFontScaling = false;

        (TextInput as unknown as TextInputWithDefaultProps).defaultProps =
            (TextInput as unknown as TextInputWithDefaultProps).defaultProps || {};
        (TextInput as unknown as TextInputWithDefaultProps).defaultProps!.allowFontScaling = false;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <RootStackNavigation />
            </RecoilRoot>
        </QueryClientProvider>
    );
};

export default RootApp;
