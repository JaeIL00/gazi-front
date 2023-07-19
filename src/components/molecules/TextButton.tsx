import React from 'react';

import TouchButton from '../atoms/TouchButton';
import SemiBoldText from '../atoms/SemiBoldText';
import { TextButtonProps } from '../../types/molecules/types';

const TextButton = ({
    onPress,
    text,
    textColor,
    width,
    height,
    backgroundColor,
    fontSize,
    paddingHorizontal,
    paddingVertical,
    borderColor,
    borderWidth,
    flex,
    alignSelf,
}: TextButtonProps) => {
    return (
        <TouchButton
            onPress={onPress}
            width={width}
            height={height}
            backgroundColor={backgroundColor}
            paddingHorizontal={paddingHorizontal}
            paddingVertical={paddingVertical}
            borderWidth={borderWidth}
            borderColor={borderColor}
            flex={flex}
            alignSelf={alignSelf}>
            <SemiBoldText color={textColor} size={fontSize} text={text} />
        </TouchButton>
    );
};

export default TextButton;
