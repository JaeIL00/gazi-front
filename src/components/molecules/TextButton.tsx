import React from 'react';
import TouchButton from '../smallest/TouchButton';
import { Text } from 'react-native';
import { TextButtonProps } from '../../types/types';
import { TextButtonStyles } from '../../styles/styles';

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
            <Text style={TextButtonStyles(textColor, fontSize).text}>{text}</Text>
        </TouchButton>
    );
};

export default TextButton;
