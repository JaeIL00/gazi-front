import React from 'react';
import { WebView } from 'react-native-webview';
import { WebViewComponentProps } from '../../types/types';
import { webViewComponentStyles } from '../../styles/styles';
import { Text, TouchableOpacity, View } from 'react-native';
import { screenFont } from '../../utils/changeStyleSize';

const WebViewComponent = ({ uri, closeHandler }: WebViewComponentProps) => {
    return (
        <View style={{ height: '100%' }}>
            <TouchableOpacity
                style={{
                    height: '5%',
                    backgroundColor: '#fff',
                    borderBottomWidth: 1 * screenFont,
                    borderColor: '#333',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onPress={() => closeHandler('')}>
                <Text style={{ fontWeight: '600', fontSize: 20 * screenFont }}>닫기</Text>
            </TouchableOpacity>
            <WebView source={{ uri }} style={webViewComponentStyles.webview} />
        </View>
    );
};

export default WebViewComponent;
