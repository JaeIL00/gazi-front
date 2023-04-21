import React from 'react';
import { Text } from 'react-native';
import { appTextStyles, normalTextStyles } from '../../styles/styles';
import { AppTextProps } from '../../types/types';

const NormalText = ({ text, size, color }: AppTextProps) => {
    return <Text style={[appTextStyles(size, color).textStyle, normalTextStyles.family]}>{text}</Text>;
};
export default NormalText;
