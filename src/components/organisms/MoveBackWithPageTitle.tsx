import React from 'react';
import { View } from 'react-native';
import Icons from '../smallest/Icon';
import PageTitleWithExplain from '../molecules/PageTitleWithExplain';
import TouchButton from '../smallest/TouchButton';
import Colors from '../../styles/colors';
import { MoveBackWithPageTitleProps } from '../../types/types';
import { MoveBackWithPageTitleStyles } from '../../styles/styles';

const MoveBackWithPageTitle = ({ title, explainText, explainSize, onPress }: MoveBackWithPageTitleProps) => {
    return (
        <View>
            <View style={MoveBackWithPageTitleStyles.buttonContainer}>
                <TouchButton onPress={onPress}>
                    <Icons type="octicons" name="arrow-left" color={Colors.BLACK} size={24} />
                </TouchButton>
            </View>
            <PageTitleWithExplain title={title} explainText={explainText} explainSize={explainSize} />
        </View>
    );
};

export default MoveBackWithPageTitle;
