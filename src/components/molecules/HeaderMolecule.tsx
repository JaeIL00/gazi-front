import React from 'react';
import { View } from 'react-native';

import Icons from '../atoms/Icons';
import Spacer from '../atoms/Spacer';
import colors from '../../common/constants/colors';
import MediumText from '../atoms/MediumText';
import TouchButton from '../atoms/TouchButton';
import SemiBoldText from '../atoms/SemiBoldText';
import { headerStyles } from '../../styles/molecules/styles';

import { HeaderMoleculeProps } from '../../types/molecules/types';
import { screenWidth } from '../../utils/changeStyleSize';
import TextButton from './TextButton';

const HeaderMolecule = ({
    isPaddingHorizontal,
    backHandler,
    isWorkDone,
    isNextStep,
    headerFinish,
    title,
    finishText,
    background,
    finishFunction,
}: HeaderMoleculeProps) => {
    return (
        <View
            style={[
                headerStyles.searchHeaderBox,
                {
                    paddingHorizontal: isPaddingHorizontal ? 16 * screenWidth : undefined,
                    backgroundColor: background,
                },
            ]}>
            <TouchButton onPress={() => (isNextStep ? backHandler('NEXT') : backHandler('CLOSE'))}>
                <View style={headerStyles.searchTitleBox}>
                    {isNextStep ? (
                        <Icons type="feather" name="arrow-left" size={24} color={colors.BLACK} />
                    ) : (
                        <Icons type="ionicons" name="close-sharp" size={24} color={colors.BLACK} />
                    )}
                    <Spacer width={16.8} />
                    <MediumText text={title} size={18} color={colors.BLACK} />
                </View>
            </TouchButton>
            {headerFinish && (
                <TextButton
                    onPress={() => (isWorkDone && finishFunction ? finishFunction() : undefined)}
                    text={finishText}
                    fontColor={isWorkDone ? colors.BLACK : colors.TXT_GRAY}
                    fontSize={16}
                    fontWeight="semiBold"
                />
            )}
        </View>
    );
};

export default HeaderMolecule;
