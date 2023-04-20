import React from 'react';
import { View } from 'react-native';
import Icons from '../smallest/Icon';
import PageTitleWithExplain from '../molecules/PageTitleWithExplain';
import TouchButton from '../smallest/TouchButton';
import Colors from '../../styles/Colors';
import { MoveBackWithPageTitleProps } from '../../types/types';
import { MoveBackWithPageTitleStyles } from '../../styles/styles';

const MoveBackWithPageTitle = ({
    oneTitle,
    twoTitle,
    explainText,
    explainSize,
    onPress,
}: MoveBackWithPageTitleProps) => {
    return (
        <View>
            <View style={MoveBackWithPageTitleStyles.buttonContainer}>
                <TouchButton alignSelf="flex-start" onPress={onPress}>
                    <Icons type="octicons" name="arrow-left" color={Colors.TXT_BLACK} size={24} />
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
