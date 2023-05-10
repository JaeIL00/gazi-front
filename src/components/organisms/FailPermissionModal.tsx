import React from 'react';
import { View } from 'react-native';

import Spacer from '../smallest/Spacer';
import Colors from '../../styles/Colors';
import NormalText from '../smallest/NormalText';
import TextButton from '../molecules/TextButton';
import SemiBoldText from '../smallest/SemiBoldText';
import ModalBackground from '../smallest/ModalBackground';
import { FailPermissionModalProps } from '../../types/types';
import { FailPermissionModalStyles } from '../../styles/styles';

const FailPermissionModal = ({
    onPressModalButton,
    permissionName,
    contentOne,
    contentTwo,
}: FailPermissionModalProps) => {
    return (
        <ModalBackground>
            <View style={FailPermissionModalStyles.container}>
                <View style={FailPermissionModalStyles.textBox}>
                    <SemiBoldText text={permissionName} size={18} color={Colors.BLACK} />
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
                        textColor={Colors.TXT_GRAY}
                        fontSize={14}
                        onPress={() => onPressModalButton('CLOSE')}
                        paddingVertical={12}
                        borderWidth={1}
                        borderColor={Colors.TXT_GRAY}
                        flex={1}
                    />
                    <Spacer width={8} />
                    <TextButton
                        text="설정하러 가기"
                        textColor={Colors.WHITE}
                        fontSize={14}
                        onPress={() => onPressModalButton('MOVE')}
                        backgroundColor={Colors.BLACK}
                        paddingVertical={12}
                        flex={1}
                    />
                </View>
            </View>
        </ModalBackground>
    );
};

export default FailPermissionModal;
