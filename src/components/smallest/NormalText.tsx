import React from 'react';
import { Text } from 'react-native';

import { AppTextProps } from '../../types/types';
import { appTextStyles, normalTextStyles } from '../../styles/styles';

const NormalText = ({ text, size, color, textAlign, lineHeight, numberOfLines }: AppTextProps) => {
    return (
        <Text
            style={[appTextStyles(size, color, textAlign).textStyle, normalTextStyles(lineHeight).family]}
            numberOfLines={numberOfLines}>
            {text}
        </Text>
    );
};
export default NormalText;
