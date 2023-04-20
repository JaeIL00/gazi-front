import React from 'react';
import { TouchableOpacity } from 'react-native';

import { TouchButtonProps } from '../../types/types';
import { touchButtonStyles } from '../../styles/styles';

const TouchButton = ({
    children,
    onPress,
    width,
    height,
    backgroundColor,
    paddingHorizontal,
    paddingVertical,
    alignSelf,
}: TouchButtonProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={
                touchButtonStyles(width, height, backgroundColor, paddingHorizontal, paddingVertical, alignSelf)
                    .container
            }
            activeOpacity={1}>
            {children}
        </TouchableOpacity>
    );
};

export default TouchButton;
