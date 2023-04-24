import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { modalBackgroundStyles } from '../../styles/styles';
import { ModalBackgroundProps } from '../../types/types';

const ModalBackground = ({ children }: ModalBackgroundProps) => {
    const { width, height } = useWindowDimensions();
    return <View style={modalBackgroundStyles(width, height).background}>{children}</View>;
};

export default ModalBackground;
