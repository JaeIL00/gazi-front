import React from 'react';
import { View } from 'react-native';

import Icons from '../../smallest/Icons';
import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import MediumText from '../../smallest/MediumText';
import TouchButton from '../../smallest/TouchButton';
import SemiBoldText from '../../smallest/SemiBoldText';
import { WritePostAddKeywordProps } from '../../../types/types';
import { writePostAddKeywordStyles } from '../../../styles/styles';

const WritePostAddKeyword = ({ keywordModalHandler }: WritePostAddKeywordProps) => {
    return (
        <View style={writePostAddKeywordStyles.container}>
            <View style={writePostAddKeywordStyles.headerBox}>
                <TouchButton onPress={() => keywordModalHandler('CLOSE')}>
                    <View style={writePostAddKeywordStyles.titleBox}>
                        <Icons type="ionicons" name="close-sharp" size={24} color={Colors.BLACK} />
                        <Spacer width={16.8} />
                        <MediumText text="키워드 설정" size={18} color={Colors.BLACK} />
                    </View>
                </TouchButton>
                <TouchButton onPress={() => {}}>
                    <SemiBoldText text="완료" size={16} color={Colors.TXT_GRAY} />
                </TouchButton>
            </View>
        </View>
    );
};

export default WritePostAddKeyword;
