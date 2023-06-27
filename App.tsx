import React from 'react';
import { SafeAreaView } from 'react-native';
import RootApp, { navigationRef } from './src/RootApp';
import { appStyles } from './src/styles/styles';
import CodePush from 'react-native-code-push';
import PushNotification from 'react-native-push-notification';
import { NavigationContainer } from '@react-navigation/native';
import { linking } from './src/utils/linking';
import messaging from '@react-native-firebase/messaging';

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

// Get foreground notification
PushNotification.configure({
    onNotification: function (notification: any) {
        if (notification.userInteraction) {
            console.log('notification', notification.data);
            navigationRef.current?.navigate(notification.data.screen);
        }
    },
});

function App(): JSX.Element {
    return (
        <SafeAreaView style={appStyles.container}>
            <NavigationContainer ref={navigationRef} linking={linking}>
                <RootApp />
            </NavigationContainer>
        </SafeAreaView>
    );
}

const codePushOptions = {
    checkFrequency: CodePush.CheckFrequency.ON_APP_START,
    installMode: CodePush.InstallMode.IMMEDIATE,
};

// export default App;
export default CodePush(codePushOptions)(App);
