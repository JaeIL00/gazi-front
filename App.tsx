import React from 'react';
import { LogBox, Platform, SafeAreaView, Text, TextInput } from 'react-native';
import { appStyles } from './src/styles/styles';
import CodePush from 'react-native-code-push';
import PushNotification from 'react-native-push-notification';
import { NavigationContainer } from '@react-navigation/native';
import { linking } from './src/utils/linking';
import messaging from '@react-native-firebase/messaging';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { navigationRef } from './src/navigations/RootStackNavigation';
import RootApp from './src/RootApp';

// Create notification channel id
PushNotification.createChannel(
    {
        channelId: 'channel_general', // (required)
        channelName: 'General Notifications', // (required)
    },
    created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

// Get background notification
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});

messaging().onMessage(async remoteMessage => {
    console.log('Message ', remoteMessage);
});

interface TextWithDefaultProps extends Text {
    defaultProps?: { allowFontScaling?: boolean };
}

interface TextInputWithDefaultProps extends TextInput {
    defaultProps?: { allowFontScaling?: boolean };
}

function App(): JSX.Element {
    const queryClient = new QueryClient();

    LogBox.ignoreAllLogs();

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
        <SafeAreaView style={appStyles.container}>
            <QueryClientProvider client={queryClient}>
                <RecoilRoot>
                    <NavigationContainer ref={navigationRef} linking={linking}>
                        <RootApp />
                    </NavigationContainer>
                </RecoilRoot>
            </QueryClientProvider>
        </SafeAreaView>
    );
}

const codePushOptions = {
    checkFrequency: CodePush.CheckFrequency.ON_APP_START,
    installMode: CodePush.InstallMode.IMMEDIATE,
};

// export default App;
export default CodePush(codePushOptions)(App);
