import React from 'react';
import { View } from 'react-native';
import { SpacerStyles } from '../../styles/styles';

const Spacer = ({ height }: { height: number }) => {
    return <View style={SpacerStyles(height).height} />;
};

export default Spacer;
