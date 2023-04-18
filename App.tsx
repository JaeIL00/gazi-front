import React from 'react';
import { SafeAreaView } from 'react-native';
import { RootApp } from './src/RootApp';

function App(): JSX.Element {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <RootApp />
        </SafeAreaView>
    );
}

export default App;
