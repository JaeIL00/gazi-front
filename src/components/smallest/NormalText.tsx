import React from 'react';
import { Text } from 'react-native';

import { AppTextProps } from '../../types/types';
import { appTextStyles, normalTextStyles } from '../../styles/styles';

const NormalText = ({ text, size, color, textAlign, lineHeight }: AppTextProps) => {
    return (
        <Text style={[appTextStyles(size, color, textAlign).textStyle, normalTextStyles(lineHeight).family]}>
            {text}
        </Text>
    );
};
export default NormalText;
