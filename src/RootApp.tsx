import React from 'react';
import { LogBox, Platform, Text, TextInput } from 'react-native';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackNavigation } from './navigations/RootStackNavigation';

interface TextWithDefaultProps extends Text {
    defaultProps?: { allowFontScaling?: boolean };
}

interface TextInputWithDefaultProps extends TextInput {
    defaultProps?: { allowFontScaling?: boolean };
}

export const RootApp = () => {
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
                <NavigationContainer>
                    <RootStackNavigation />
                </NavigationContainer>
            </RecoilRoot>
        </QueryClientProvider>
    );
};
