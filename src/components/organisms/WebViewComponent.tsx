import React from 'react';
import { WebView } from 'react-native-webview';
import { WebViewComponentProps } from '../../types/types';
import { webViewComponentStyles } from '../../styles/styles';

const WebViewComponent = ({ uri }: WebViewComponentProps) => {
    return <WebView source={{ uri }} style={webViewComponentStyles.webview} />;
};

export default WebViewComponent;
