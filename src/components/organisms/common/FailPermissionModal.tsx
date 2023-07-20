import React from 'react';
import { View } from 'react-native';

import Spacer from '../../atoms/Spacer';
import colors from '../../../common/constants/colors';
import NormalText from '../../atoms/NormalText';
import TextButton from '../../molecules/TextButton';
import SemiBoldText from '../../atoms/SemiBoldText';
import { FailPermissionModalProps } from '../../../types/organisms/types';
import { FailPermissionModalStyles } from '../../../styles/organisms/styles';

const FailPermissionModal = ({
    onPressModalButton,
    permissionName,
    contentOne,
    contentTwo,
}: FailPermissionModalProps) => {
    return (
        <View style={FailPermissionModalStyles.container}>
            <View style={FailPermissionModalStyles.textBox}>
                <SemiBoldText text={permissionName} size={18} color={colors.BLACK} />
                <Spacer height={8} />
                <NormalText text={contentOne} size={14} color="#777777" textAlign="center" lineHeight={19} />
                {contentTwo && (
                    <NormalText text={contentTwo} size={14} color="#777777" textAlign="center" lineHeight={19} />
                )}
            </View>

            <Spacer height={18} />

            <View style={FailPermissionModalStyles.buttonBox}>
                <TextButton
                    text="닫기"
                    fontColor={colors.TXT_GRAY}
                    fontSize={14}
                    fontWeight="semiBold"
                    onPress={() => onPressModalButton('CLOSE')}
                    paddingVertical={12}
                    borderWidth={1}
                    borderColor={colors.TXT_GRAY}
                    flex={1}
                    borderRadius={5}
                />
                <Spacer width={8} />
                <TextButton
                    text="설정하러 가기"
                    fontColor={colors.WHITE}
                    fontWeight="semiBold"
                    fontSize={14}
                    onPress={() => onPressModalButton('MOVE')}
                    backgroundColor={colors.BLACK}
                    paddingVertical={12}
                    flex={1}
                    borderRadius={5}
                />
            </View>
        </View>
    );
};
export default FailPermissionModal;
