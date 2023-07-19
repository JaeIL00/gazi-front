import React from 'react';
import { Platform } from 'react-native';
import DropShadow from 'react-native-drop-shadow';

import colors from '../../common/constants/colors';
import FastImage from 'react-native-fast-image';
import TouchButton from '../atoms/TouchButton';
import { WritingFloatingBtnProps } from '../../types/molecules/types';
import { writingFloatingBtnStyles } from '../../styles/molecules/styles';

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
                        backgroundColor={colors.VIOLET}>
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
