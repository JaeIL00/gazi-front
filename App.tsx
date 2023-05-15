import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { RootApp } from './src/RootApp';
import { appStyles } from './src/styles/styles';
import CodePush from 'react-native-code-push';
import SplashScreen from 'react-native-splash-screen';

function App(): JSX.Element {
    useEffect(() => {
        setTimeout(() => {
            SplashScreen.hide();
        }, 100);
    });
    return (
        <SafeAreaView style={appStyles.container}>
            <RootApp />
        </SafeAreaView>
    );
}

// const codePushOptions = {
//     checkFrequency: CodePush.CheckFrequency.ON_APP_START,
//     updateDialog: {
//         title: '...',
//         optionalUpdateMessage: '...',
//         optionalInstallButtonLabel: '업데이트',
//         optionalIgnoreButtonLabel: '아니요.',
//     },
//     installMode: CodePush.InstallMode.IMMEDIATE,
// };

export default App;
// export default CodePush(codePushOptions)(App);
