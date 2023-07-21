import React from 'react';
import { Pressable } from 'react-native';

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
    alignItems,
    borderColor,
    borderWidth,
    borderRadius,
    borderBottomWidth,
    flex,
    hitSlop,
    marginLeft,
}: TouchButtonProps) => {
    return (
        <Pressable
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
                    alignItems,
                    borderColor,
                    borderWidth,
                    borderRadius,
                    borderBottomWidth,
                    flex,
                    marginLeft,
                ).container
            }
            hitSlop={hitSlop}>
            {children}
        </Pressable>
    );
};

export default TouchButton;
