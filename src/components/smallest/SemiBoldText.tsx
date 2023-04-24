import React from 'react';
import { Text } from 'react-native';

import { AppTextProps } from '../../types/types';
import { appTextStyles, semiBoldTextStyles } from '../../styles/styles';

const SemiBoldText = ({ text, size, color }: AppTextProps) => {
    return <Text style={[appTextStyles(size, color).textStyle, semiBoldTextStyles.family]}>{text}</Text>;
};
export default SemiBoldText;
