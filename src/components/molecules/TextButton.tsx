import React from 'react';
import TouchButton from '../smallest/TouchButton';
import { TextButtonProps } from '../../types/types';
import SemiBoldText from '../smallest/SemiBoldText';

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
            borderColor={borderColor}>
            <SemiBoldText color={textColor} size={fontSize} text={text} />
        </TouchButton>
    );
};

export default TextButton;
