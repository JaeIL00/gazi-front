import React, { useLayoutEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { StatusBar, View } from 'react-native';

import { screenWidth } from '../../../utils/changeStyleSize';
import colors from '../../../constants/colors';
import { ScreenWrapperProps } from '../../../types/organisms/types';

const ScreenWrapper = ({ children, isPaddingHorizontal }: ScreenWrapperProps) => {
    const route = useRoute();
    const [statusColor, setStatusColor] = useState<string>(colors.BACKGROUND_DEFAULT);
    const [backgroundColor, setBackgroundColor] = useState<string>(colors.BACKGROUND_DEFAULT);

    useLayoutEffect(() => {
        if (
            route.name === 'AllBoard' ||
            route.name === 'LikeBoard' ||
            route.name === 'LikeKeywordSetting' ||
            route.name === 'WritePost' ||
            route.name === 'WriteComment' ||
            route.name === 'MyProfile' ||
            route.name === 'KeywordAlarm' ||
            route.name === 'NewsAlarm'
        ) {
            setStatusColor(colors.WHITE);
            setBackgroundColor(colors.WHITE);
        } else if (route.name === 'ImageView') {
            setStatusColor('#29292980');
            setBackgroundColor(colors.BLACK);
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
