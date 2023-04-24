import React from 'react';
import { Text } from 'react-native';

import { AppTextProps } from '../../types/types';
import { appTextStyles, mediumTextStyles } from '../../styles/styles';

const MediumText = ({ text, size, color }: AppTextProps) => {
    return <Text style={[appTextStyles(size, color).textStyle, mediumTextStyles.family]}>{text}</Text>;
};
export default MediumText;
