import React from 'react';
import { TouchableOpacity } from 'react-native';

import { TouchButtonProps } from '../../types/types';
import { touchButtonStyles } from '../../styles/styles';

const TouchButton = ({ children, onPress }: TouchButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={touchButtonStyles.container} activeOpacity={1}>
            {children}
        </TouchableOpacity>
    );
};

export default TouchButton;
