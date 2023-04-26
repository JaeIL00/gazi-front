import React from 'react';
import { Text } from 'react-native';

import { AppTextProps } from '../../types/types';
import { appTextStyles, semiBoldTextStyles } from '../../styles/styles';

const SemiBoldText = ({ text, size, color, textAlign }: AppTextProps) => {
    return <Text style={[appTextStyles(size, color, textAlign).textStyle, semiBoldTextStyles.family]}>{text}</Text>;
};
export default SemiBoldText;
