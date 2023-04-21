import React from 'react';
import TouchButton from '../smallest/TouchButton';
import { TextButtonProps } from '../../types/types';
import SemiBoldText from '../smallest/SemiBoldText';

const TextButton = ({
    onPress,
    text,
    textColor,
    height,
    backgroundColor,
    fontSize,
    paddingHorizontal,
    paddingVertical,
}: TextButtonProps) => {
    return (
        <TouchButton
            onPress={onPress}
            height={height}
            backgroundColor={backgroundColor}
            paddingHorizontal={paddingHorizontal}
            paddingVertical={paddingVertical}>
            <SemiBoldText color={textColor} size={fontSize} text={text} />
        </TouchButton>
    );
};

export default TextButton;
