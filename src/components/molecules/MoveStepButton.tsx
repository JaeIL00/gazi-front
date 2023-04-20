import React from 'react';
import TouchButton from '../smallest/TouchButton';
import { Text } from 'react-native';
import { MoveStepButtonProps } from '../../types/types';
import { MoveStepButtonStyles } from '../../styles/styles';

const MoveStepButton = ({ onPress, text, textColor, backgroundColor }: MoveStepButtonProps) => {
    return (
        <TouchButton onPress={onPress} height={48} backgroundColor={backgroundColor}>
            <Text style={MoveStepButtonStyles(textColor).text}>{text}</Text>
        </TouchButton>
    );
};

export default MoveStepButton;
