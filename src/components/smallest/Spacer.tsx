import React from 'react';
import { View } from 'react-native';
import { SpacerStyles } from '../../styles/styles';

const Spacer = ({ height, width }: { height?: number; width?: number }) => {
    return <View style={SpacerStyles(height, width).size} />;
};

export default Spacer;
