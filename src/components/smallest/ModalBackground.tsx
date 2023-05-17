import React from 'react';
import { Dimensions, Modal, View } from 'react-native';

import { ModalBackgroundProps } from '../../types/types';
import { modalBackgroundStyles } from '../../styles/styles';

const ModalBackground = ({ children, visible }: ModalBackgroundProps) => {
    const { width, height } = Dimensions.get('screen');
    return (
        <Modal transparent={true} statusBarTranslucent={true} visible={visible}>
            <View style={modalBackgroundStyles(width, height).background}>{children}</View>
        </Modal>
    );
};

export default ModalBackground;
