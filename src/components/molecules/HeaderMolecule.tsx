import React from 'react';
import { View } from 'react-native';

import Icons from '../smallest/Icons';
import Spacer from '../smallest/Spacer';
import Colors from '../../styles/Colors';
import MediumText from '../smallest/MediumText';
import TouchButton from '../smallest/TouchButton';
import SemiBoldText from '../smallest/SemiBoldText';
import { headerStyles } from '../../styles/styles';
import { HeaderMoleculeProps } from '../../types/types';
import { screenWidth } from '../../utils/changeStyleSize';

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
                        <Icons type="feather" name="arrow-left" size={24} color={Colors.BLACK} />
                    ) : (
                        <Icons type="ionicons" name="close-sharp" size={24} color={Colors.BLACK} />
                    )}
                    <Spacer width={16.8} />
                    <MediumText text={title} size={18} color={Colors.BLACK} />
                </View>
            </TouchButton>
            {headerFinish && finishFunction && (
                <TouchButton onPress={() => (isWorkDone ? finishFunction() : undefined)}>
                    <SemiBoldText text={finishText} size={16} color={isWorkDone ? Colors.BLACK : Colors.TXT_GRAY} />
                </TouchButton>
            )}
        </View>
    );
};

export default HeaderMolecule;
