import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';

import Icons from '../smallest/Icons';
import Colors from '../../styles/Colors';
import { WebViewComponentProps } from '../../types/types';
import { webViewComponentStyles } from '../../styles/styles';
import { screenHeight, screenWidth } from '../../utils/changeStyleSize';

const WebViewComponent = ({ uri, closeHandler }: WebViewComponentProps) => {
    return (
        <View style={{ height: '100%' }}>
            <TouchableOpacity
                style={{
                    paddingBottom: 10 * screenHeight,
                    paddingTop: 13 * screenHeight,
                    paddingLeft: 16 * screenWidth,
                    alignSelf: 'flex-start',
                }}
                onPress={() => closeHandler('')}
                activeOpacity={1}>
                <Icons type="ionicons" name="close" size={24} color={Colors.BLACK} />
            </TouchableOpacity>
            <WebView source={{ uri }} style={webViewComponentStyles.webview} />
        </View>
    );
};

export default WebViewComponent;
