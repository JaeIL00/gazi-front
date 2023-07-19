import React from 'react';
import { View } from 'react-native';

import Icons from '../atoms/Icons';
import colors from '../../common/constants/colors';
import TouchButton from '../atoms/TouchButton';
import PageTitleWithExplain from '../molecules/PageTitleWithExplain';
import { moveBackWithPageTitleStyles } from '../../styles/organisms/styles';
import { MoveBackWithPageTitleProps } from '../../types/organisms/types';

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
                <TouchButton alignSelf="flex-start" onPress={onPress} hitSlop={10}>
                    <Icons type="octicons" name="arrow-left" color={colors.TXT_BLACK} size={24} />
                </TouchButton>
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
