import React from 'react';
import { View } from 'react-native';

import { SpacerStyles } from '../../styles/atoms/styles';

const Spacer = ({ height, width }: { height?: number; width?: number }) => {
    return <View style={SpacerStyles(height, width).size} />;
};

export default Spacer;
