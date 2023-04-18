import React from 'react';
import { SafeAreaView } from 'react-native';
import { RootApp } from './src/RootApp';
import { appStyles } from './src/styles/styles';

function App(): JSX.Element {
    return (
        <SafeAreaView style={appStyles.container}>
            <RootApp />
        </SafeAreaView>
    );
}

export default App;
