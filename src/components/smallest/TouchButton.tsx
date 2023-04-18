import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { TouchButtonProps } from '../../types/types';
import { touchButtonStyles } from '../../styles/styles';

const TouchButton = ({ title, onPress }: TouchButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={touchButtonStyles.container}>
            <Text>{title}</Text>
        </TouchableOpacity>
    );
};

export default TouchButton;
