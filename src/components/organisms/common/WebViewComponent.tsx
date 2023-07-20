import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

import Icons from '../../atoms/Icons';
import colors from '../../../common/constants/colors';
import { webViewComponentStyles } from '../../../styles/organisms/styles';
import { WebViewComponentProps } from '../../../types/organisms/types';
import TouchButton from '../../atoms/TouchButton';

const WebViewComponent = ({ uri, closeHandler }: WebViewComponentProps) => {
    return (
        <View style={webViewComponentStyles.container}>
            <TouchButton onPress={() => closeHandler('')} alignSelf="flex-start">
                <View style={webViewComponentStyles.headerBox}>
                    <Icons type="ionicons" name="close" size={24} color={colors.BLACK} />
                </View>
            </TouchButton>
            <WebView source={{ uri }} style={webViewComponentStyles.webview} />
        </View>
    );
};

export default WebViewComponent;
