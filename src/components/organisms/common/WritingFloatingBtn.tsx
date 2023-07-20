import React from 'react';
import { Platform } from 'react-native';
import DropShadow from 'react-native-drop-shadow';

import colors from '../../../common/constants/colors';
import { WritingFloatingBtnProps } from '../../../types/molecules/types';
import { writingFloatingBtnStyles } from '../../../styles/molecules/styles';
import ImageButton from '../../molecules/ImageButton';

const WritingFloatingBtn = ({ moveToWritingScreen }: WritingFloatingBtnProps) => {
    return (
        <>
            {Platform.OS === 'android' && (
                <DropShadow style={writingFloatingBtnStyles.dropshadow}>
                    <ImageButton
                        onPress={moveToWritingScreen}
                        width={52}
                        height={52}
                        borderRadius={52}
                        backgroundColor={colors.VIOLET}
                        imageWidth={14.5}
                        imageHeight={16}
                        imageSource={require('../../../assets/icons/write.png')}
                        isCaching={true}
                    />
                </DropShadow>
            )}
        </>
    );
};

export default WritingFloatingBtn;
