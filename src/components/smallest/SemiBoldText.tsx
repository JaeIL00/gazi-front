import React from 'react';
import { Text } from 'react-native';
import { appTextStyles, semiBoldTextStyles } from '../../styles/styles';
import { AppTextProps } from '../../types/types';

const SemiBoldText = ({ text, size, color }: AppTextProps) => {
    return <Text style={[appTextStyles(size, color).textStyle, semiBoldTextStyles.family]}>{text}</Text>;
};
export default SemiBoldText;
