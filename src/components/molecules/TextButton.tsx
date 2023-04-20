import React from 'react';
import TouchButton from '../smallest/TouchButton';
import { Text } from 'react-native';
import { TextButtonProps } from '../../types/types';
import { TextButtonStyles } from '../../styles/styles';

const TextButton = ({ onPress, text, textColor, height, backgroundColor }: TextButtonProps) => {
    return (
        <TouchButton onPress={onPress} height={height} backgroundColor={backgroundColor}>
            <Text style={TextButtonStyles(textColor).text}>{text}</Text>
        </TouchButton>
    );
};

export default TextButton;
