import React from 'react';
import { Dimensions, Modal, View } from 'react-native';

import { ModalBackgroundProps } from '../../types/atoms/types';
import { modalBackgroundStyles } from '../../styles/atoms/styles';

const ModalBackground = ({ children, visible, onRequestClose }: ModalBackgroundProps) => {
    const { width, height } = Dimensions.get('screen');
    return (
        <Modal
            transparent={true}
            statusBarTranslucent={true}
            visible={visible}
            onRequestClose={onRequestClose}
            style={{ flex: 1 }}>
            <View style={modalBackgroundStyles(width, height).background}>{children}</View>
        </Modal>
    );
};

export default ModalBackground;
