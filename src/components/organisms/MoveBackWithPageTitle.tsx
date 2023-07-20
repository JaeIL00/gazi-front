import React from 'react';
import { View } from 'react-native';

import Icons from '../atoms/Icons';
import colors from '../../common/constants/colors';
import TouchButton from '../atoms/TouchButton';
import PageTitleWithExplain from '../molecules/PageTitleWithExplain';
import { moveBackWithPageTitleStyles } from '../../styles/organisms/styles';
import { MoveBackWithPageTitleProps } from '../../types/organisms/types';
import IconButton from '../molecules/IconButton';

const MoveBackWithPageTitle = ({
    oneTitle,
    twoTitle,
    explainText,
    explainSize,
    onPress,
}: MoveBackWithPageTitleProps) => {
    return (
        <View>
            <View style={moveBackWithPageTitleStyles.buttonContainer}>
                <IconButton
                    onPress={onPress}
                    alignSelf="flex-start"
                    hitSlop={10}
                    iconType="octicons"
                    iconName="arrow-left"
                    iconColor={colors.TXT_BLACK}
                    iconSize={24}
                />
            </View>
            <PageTitleWithExplain
                oneTitle={oneTitle}
                twoTitle={twoTitle}
                explainText={explainText}
                explainSize={explainSize}
            />
        </View>
    );
};

export default MoveBackWithPageTitle;
