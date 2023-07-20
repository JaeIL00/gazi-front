import React from 'react';

import TouchButton from '../atoms/TouchButton';
import { IconButtonProps } from '../../types/molecules/types';
import Icons from '../atoms/Icons';

const IconButton = ({
    onPress,
    width,
    height,
    backgroundColor,
    paddingHorizontal,
    paddingVertical,
    borderColor,
    borderWidth,
    borderRadius,
    flex,
    alignSelf,
    iconType,
    iconColor,
    iconName,
    iconSize,
}: IconButtonProps) => {
    return (
        <TouchButton
            onPress={onPress}
            width={width}
            height={height}
            backgroundColor={backgroundColor}
            paddingHorizontal={paddingHorizontal}
            paddingVertical={paddingVertical}
            borderRadius={borderRadius}
            borderWidth={borderWidth}
            borderColor={borderColor}
            flex={flex}
            alignSelf={alignSelf}>
            <Icons type={iconType} name={iconName} size={iconSize} color={iconColor} />
        </TouchButton>
    );
};

export default IconButton;
