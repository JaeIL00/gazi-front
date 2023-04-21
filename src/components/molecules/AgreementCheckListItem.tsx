import React from 'react';
import { View } from 'react-native';

import { agreementCheckListItemStyles } from '../../styles/styles';
import TouchButton from '../smallest/TouchButton';
import Icons from '../smallest/Icons';
import SemiBoldText from '../smallest/SemiBoldText';
import Colors from '../../styles/Colors';
import { AgreementCheckListItemProps } from '../../types/types';

const AgreementCheckListItem = ({ text, check, index, onPressCheckList }: AgreementCheckListItemProps) => {
    return (
        <View style={agreementCheckListItemStyles.agreeBox}>
            <TouchButton onPress={() => onPressCheckList(index)} width={250}>
                <View style={agreementCheckListItemStyles.agreeTitleBox}>
                    <View style={agreementCheckListItemStyles.checkBox}>
                        {check && <Icons type="feather" name="check" size={20} color="black" />}
                    </View>
                    <SemiBoldText size={14} color={Colors.BLACK} text={text} />
                </View>
            </TouchButton>

            <TouchButton onPress={() => {}} width={20}>
                <Icons type="simpleLineIcons" name="arrow-right" size={12} color="#CACACA" />
            </TouchButton>
        </View>
    );
};
export default AgreementCheckListItem;
