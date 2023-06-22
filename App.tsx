import React, { useCallback, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { RootApp } from './src/RootApp';
import { appStyles } from './src/styles/styles';
import CodePush from 'react-native-code-push';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

function App(): JSX.Element {
    // Create notification channel id
    const notificationChannelId = () => {
        PushNotification.createChannel(
            {
                channelId: 'channel_general', // (required)
                channelName: 'General Notifications', // (required)
            },
            created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
        );
    };
    // FCM push notification in app
    const foregroundNotiListener = useCallback(() => {
        messaging().onMessage(async remoteMessage => {
            PushNotification.localNotification({
                message: remoteMessage.notification.body,
                title: remoteMessage.notification.title,
                bigPictureUrl: remoteMessage.notification.android.imageUrl,
                smallIcon: remoteMessage.notification.android.imageUrl,
                channelId: 'channel_general',
            });
            console.log('FCM push notification in app', remoteMessage);
        });
    }, []);
    useEffect(() => {
        notificationChannelId();
        foregroundNotiListener();
    }, []);

    return (
        <SafeAreaView style={appStyles.container}>
            <RootApp />
        </SafeAreaView>
    );
}

const codePushOptions = {
    checkFrequency: CodePush.CheckFrequency.ON_APP_START,
    installMode: CodePush.InstallMode.IMMEDIATE,
};

// export default App;
export default CodePush(codePushOptions)(App);
