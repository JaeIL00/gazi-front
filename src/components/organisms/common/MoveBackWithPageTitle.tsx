import React from 'react';
import { View } from 'react-native';

import colors from '../../../common/constants/colors';
import { moveBackWithPageTitleStyles } from '../../../styles/organisms/styles';
import { MoveBackWithPageTitleProps } from '../../../types/organisms/types';
import IconButton from '../../molecules/IconButton';
import BoldText from '../../atoms/BoldText';
import Spacer from '../../atoms/Spacer';
import NormalText from '../../atoms/NormalText';

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
            <View>
                <View>
                    <BoldText text={oneTitle} size={24} color={colors.BLACK} />
                    {twoTitle && <BoldText text={twoTitle} size={24} color={colors.BLACK} />}
                </View>

                {explainText && explainSize && (
                    <>
                        <Spacer height={10} />
                        <NormalText text={explainText} size={explainSize} color={colors.TXT_GRAY} />
                    </>
                )}
            </View>
        </View>
    );
};

export default MoveBackWithPageTitle;
