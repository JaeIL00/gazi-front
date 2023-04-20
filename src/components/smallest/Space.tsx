import React from 'react';
import { View } from 'react-native';
import { spaceStyles } from '../../styles/styles';

const Space = ({ height }: { height: number }) => {
    return <View style={spaceStyles(height).height} />;
};

export default Space;
