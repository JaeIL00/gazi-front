import React from 'react';
import { Text } from 'react-native';

import { AppTextProps } from '../../types/atoms/types';
import { appTextStyles, boldTextStyles } from '../../styles/atoms/styles';

const BoldText = ({ text, size, color, textAlign }: AppTextProps) => {
    return <Text style={[appTextStyles(size, color, textAlign).textStyle, boldTextStyles.family]}>{text}</Text>;
};
export default BoldText;
