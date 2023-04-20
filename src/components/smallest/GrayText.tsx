import React from 'react';
import { Text } from 'react-native';
import { grayTextStyles } from '../../styles/styles';
import { GrayTextProps } from '../../types/types';

const GrayText = ({ text, size }: GrayTextProps) => {
    return <Text style={grayTextStyles(size).text}>{text}</Text>;
};

export default GrayText;
