import React from 'react';
import { Text } from 'react-native';

import { AppTextProps } from '../../types/types';
import { appTextStyles, boldTextStyles } from '../../styles/styles';

const BoldText = ({ text, size, color }: AppTextProps) => {
    return <Text style={[appTextStyles(size, color).textStyle, boldTextStyles.family]}>{text}</Text>;
};
export default BoldText;
