import React from 'react';
import { Dimensions, Modal, ModalProps, View } from 'react-native';

import { modalBackgroundStyles } from '../../styles/atoms/styles';

const ModalBackground = ({ children, visible, onRequestClose }: ModalProps) => {
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
