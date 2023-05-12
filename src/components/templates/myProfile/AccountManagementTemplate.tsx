import React from 'react';
import { Image, View } from 'react-native';

import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import MediumText from '../../smallest/MediumText';
import NormalText from '../../smallest/NormalText';
import TouchButton from '../../smallest/TouchButton';
import { AccountManagementTemplateProps } from '../../../types/types';
import { AccountManagementTemplateStyles } from '../../../styles/styles';

const AccountManagementTemplate = ({ moveToScreenHandler }: AccountManagementTemplateProps) => {
    return (
        <View>
            <View style={AccountManagementTemplateStyles.headerBox}>
                <TouchButton onPress={() => moveToScreenHandler('BACK')} hitSlop={20}>
                    <Image
                        source={require('../../../assets/icons/to-left-black.png')}
                        style={AccountManagementTemplateStyles.headerIcon}
                    />
                </TouchButton>
                <Spacer width={21} />
                <MediumText text="계정관리" size={18} color={Colors.BLACK} />
            </View>

            <View style={AccountManagementTemplateStyles.tabBox}>
                <TouchButton onPress={() => moveToScreenHandler('PASSWORD')}>
                    <View style={AccountManagementTemplateStyles.buttonBox}>
                        <NormalText text="비밀번호 변경" size={16} color={Colors.BLACK} />
                    </View>
                </TouchButton>
            </View>
            <View style={AccountManagementTemplateStyles.tabBox}>
                <TouchButton onPress={() => moveToScreenHandler('LOGOUT')}>
                    <View style={AccountManagementTemplateStyles.buttonBox}>
                        <NormalText text="로그아웃" size={16} color={Colors.BLACK} />
                    </View>
                </TouchButton>
            </View>
            <View style={AccountManagementTemplateStyles.tabBox}>
                <TouchButton onPress={() => moveToScreenHandler('DELET')}>
                    <View style={AccountManagementTemplateStyles.buttonBox}>
                        <NormalText text="회원 탈퇴" size={16} color={Colors.BLACK} />
                    </View>
                </TouchButton>
            </View>
        </View>
    );
};
export default AccountManagementTemplate;
