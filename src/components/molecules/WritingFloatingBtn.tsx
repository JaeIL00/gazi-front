import React from 'react';
import { Platform } from 'react-native';
import DropShadow from 'react-native-drop-shadow';

import Colors from '../../styles/Colors';
import FastImage from 'react-native-fast-image';
import TouchButton from '../smallest/TouchButton';
import { WritingFloatingBtnProps } from '../../types/types';
import { writingFloatingBtnStyles } from '../../styles/styles';

const WritingFloatingBtn = ({ moveToWritingScreen }: WritingFloatingBtnProps) => {
    return (
        <>
            {Platform.OS === 'android' && (
                <DropShadow style={writingFloatingBtnStyles.dropshadow}>
                    <TouchButton
                        onPress={moveToWritingScreen}
                        width={52}
                        height={52}
                        borderRadius={52}
                        backgroundColor={Colors.VIOLET}>
                        <FastImage
                            source={require('../../assets/icons/write.png')}
                            style={writingFloatingBtnStyles.writeIcon}
                        />
                    </TouchButton>
                </DropShadow>
            )}
        </>
    );
};

export default WritingFloatingBtn;
