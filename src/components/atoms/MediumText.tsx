import React from 'react';
import { Text } from 'react-native';

import { AppTextProps } from '../../types/atoms/types';
import { appTextStyles, mediumTextStyles } from '../../styles/atoms/styles';

const MediumText = ({ text, size, color, textAlign, numberOfLines }: AppTextProps) => {
    return (
        <Text
            style={[appTextStyles(size, color, textAlign).textStyle, mediumTextStyles.family]}
            numberOfLines={numberOfLines}>
            {text}
        </Text>
    );
};
export default MediumText;
