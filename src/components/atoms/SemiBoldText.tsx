import React from 'react';
import { Text } from 'react-native';

import { AppTextProps } from '../../types/atoms/types';
import { appTextStyles, semiBoldTextStyles } from '../../styles/atoms/styles';

const SemiBoldText = ({ text, size, color, textAlign, numberOfLines }: AppTextProps) => {
    return (
        <Text
            style={[appTextStyles(size, color, textAlign).textStyle, semiBoldTextStyles.family]}
            numberOfLines={numberOfLines}>
            {text}
        </Text>
    );
};
export default SemiBoldText;
