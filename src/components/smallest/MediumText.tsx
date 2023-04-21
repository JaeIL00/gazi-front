import React from 'react';
import { Text } from 'react-native';
import { appTextStyles, mediumTextStyles } from '../../styles/styles';
import { AppTextProps } from '../../types/types';

const MediumText = ({ text, size, color }: AppTextProps) => {
    return <Text style={[appTextStyles(size, color).textStyle, mediumTextStyles.family]}>{text}</Text>;
};
export default MediumText;
