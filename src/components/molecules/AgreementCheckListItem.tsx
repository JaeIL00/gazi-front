import React from 'react';
import { View } from 'react-native';

import Icons from '../atoms/Icons';
import colors from '../../common/constants/colors';
import TouchButton from '../atoms/TouchButton';
import SemiBoldText from '../atoms/SemiBoldText';
import { AgreementCheckListItemProps } from '../../types/molecules/types';
import { agreementCheckListItemStyles, checkBoxBackground } from '../../styles/molecules/styles';

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
                        {check && <Icons type="feather" name="check" size={20} color={colors.WHITE} />}
                    </View>
                    <SemiBoldText size={14} color={colors.BLACK} text={text} />
                </View>
            </TouchButton>

            <TouchButton onPress={() => webViewHandler(index)} width={20}>
                <Icons type="simpleLineIcons" name="arrow-right" size={12} color="#CACACA" />
            </TouchButton>
        </View>
    );
};
export default AgreementCheckListItem;
