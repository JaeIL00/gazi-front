import React from 'react';
import { View } from 'react-native';
import TouchButton from '../../smallest/TouchButton';
import Icons from '../../smallest/Icons';
import SemiBoldText from '../../smallest/SemiBoldText';
import Colors from '../../../styles/Colors';
import { screenHeight } from '../../../utils/changeStyleSize';
import { WritePostTemplateProps } from '../../../types/types';

const WritePostTemplate = ({ moveToScreen }: WritePostTemplateProps) => {
    return (
        <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 18 * screenHeight }}>
                <TouchButton onPress={() => moveToScreen('BACK')}>
                    <Icons type="ionicons" name="close-sharp" size={20} color={Colors.BLACK} />
                </TouchButton>
                <TouchButton onPress={() => moveToScreen('GO')}>
                    <SemiBoldText text="다음" size={16} color={Colors.TXT_GRAY} />
                </TouchButton>
            </View>
        </>
    );
};

export default WritePostTemplate;
