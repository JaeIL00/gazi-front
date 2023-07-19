import React from 'react';
import { TouchableOpacity } from 'react-native';

import { TouchButtonProps } from '../../types/atoms/types';
import { touchButtonStyles } from '../../styles/atoms/styles';

const TouchButton = ({
    children,
    onPressIn,
    onPress,
    width,
    height,
    backgroundColor,
    paddingHorizontal,
    paddingVertical,
    alignSelf,
    borderColor,
    borderWidth,
    borderRadius,
    borderBottomWidth,
    flex,
    hitSlop,
    marginLeft,
}: TouchButtonProps) => {
    return (
        <TouchableOpacity
            onPressIn={onPressIn}
            onPress={onPress}
            style={
                touchButtonStyles(
                    width,
                    height,
                    backgroundColor,
                    paddingHorizontal,
                    paddingVertical,
                    alignSelf,
                    borderColor,
                    borderWidth,
                    borderRadius,
                    borderBottomWidth,
                    flex,
                    marginLeft,
                ).container
            }
            activeOpacity={1}
            hitSlop={hitSlop}>
            {children}
        </TouchableOpacity>
    );
};

export default TouchButton;
