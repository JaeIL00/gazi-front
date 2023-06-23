import React from 'react';
import { View } from 'react-native';

import Colors from '../../../styles/Colors';
import MediumText from '../../smallest/MediumText';
import TouchButton from '../../smallest/TouchButton';
import SemiBoldText from '../../smallest/SemiBoldText';
import { keywordAlarmTemplateStyles } from '../../../styles/styles';

const KeywordAlarmTemplate = () => {
    return (
        <View>
            <View style={keywordAlarmTemplateStyles.headerBox}>
                <MediumText text="알림 받는 키워드 2개" size={14} color={Colors.BLACK} />
                <TouchButton paddingHorizontal={16} paddingVertical={8} backgroundColor="#F2F2F2">
                    <SemiBoldText text="설정" size={13} color={Colors.BLACK} />
                </TouchButton>
            </View>
        </View>
    );
};

export default KeywordAlarmTemplate;
