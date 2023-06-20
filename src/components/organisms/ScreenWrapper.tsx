import React, { useLayoutEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { StatusBar, View } from 'react-native';

import Colors from '../../styles/Colors';
import { ScreenWrapperProps } from '../../types/types';
import { screenWidth } from '../../utils/changeStyleSize';

const ScreenWrapper = ({ children, isPaddingHorizontal }: ScreenWrapperProps) => {
    const route = useRoute();
    const [statusColor, setStatusColor] = useState<string>(Colors.BACKGROUND_DEFAULT);
    const [backgroundColor, setBackgroundColor] = useState<string>(Colors.BACKGROUND_DEFAULT);

    useLayoutEffect(() => {
        if (
            route.name === 'Community' ||
            route.name === 'LikeKeywordSetting' ||
            route.name === 'WritePost' ||
            route.name === 'WriteComment' ||
            route.name === 'MyProfile'
        ) {
            setStatusColor(Colors.WHITE);
            setBackgroundColor(Colors.WHITE);
        } else if (route.name === 'ImageView') {
            setStatusColor('#29292980');
            setBackgroundColor(Colors.BLACK);
        }
    }, [route.name]);

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: backgroundColor,
                paddingHorizontal: isPaddingHorizontal ? 16 * screenWidth : undefined,
            }}>
            <StatusBar
                backgroundColor={statusColor}
                barStyle={route.name === 'ImageView' ? 'light-content' : 'dark-content'}
            />
            {children}
        </View>
    );
};

export default ScreenWrapper;
