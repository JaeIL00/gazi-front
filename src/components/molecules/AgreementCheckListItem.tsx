import React from 'react';
import { View } from 'react-native';

import Icons from '../smallest/Icons';
import Colors from '../../styles/Colors';
import TouchButton from '../smallest/TouchButton';
import SemiBoldText from '../smallest/SemiBoldText';
import { AgreementCheckListItemProps } from '../../types/types';
import { agreementCheckListItemStyles, checkBoxBackground } from '../../styles/styles';

const AgreementCheckListItem = ({
    text,
    check,
    index,
    onPressCheckList,
    webViewHandler,
}: AgreementCheckListItemProps) => {
    return (
        <View style={agreementCheckListItemStyles.agreeBox}>
            <TouchButton onPress={() => onPressCheckList(index)} width={250}>
                <View style={agreementCheckListItemStyles.agreeTitleBox}>
                    <View style={[agreementCheckListItemStyles.checkBox, checkBoxBackground(check).color]}>
                        {check && <Icons type="feather" name="check" size={20} color={Colors.WHITE} />}
                    </View>
                    <SemiBoldText size={14} color={Colors.BLACK} text={text} />
                </View>
            </TouchButton>

            <TouchButton onPress={() => webViewHandler(index)} width={20}>
                <Icons type="simpleLineIcons" name="arrow-right" size={12} color="#CACACA" />
            </TouchButton>
        </View>
    );
};
export default AgreementCheckListItem;
