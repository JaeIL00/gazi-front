import React from 'react';
import { View } from 'react-native';

import Spacer from '../smallest/Spacer';
import Colors from '../../styles/Colors';
import NormalText from '../smallest/NormalText';
import TextButton from '../molecules/TextButton';
import SemiBoldText from '../smallest/SemiBoldText';
import ModalBackground from '../smallest/ModalBackground';
import { FailLocationPermisionModalProps } from '../../types/types';
import { failLocationPermisionModalStyles } from '../../styles/styles';

const FailLocationPermisionModal = ({ onPressModalButton }: FailLocationPermisionModalProps) => {
    return (
        <ModalBackground>
            <View style={failLocationPermisionModalStyles.container}>
                <View style={failLocationPermisionModalStyles.textBox}>
                    <SemiBoldText text="필수 권한 허용 안내" size={18} color={Colors.BLACK} />
                    <Spacer height={8} />
                    <NormalText
                        text="위치 권한에 대한 사용을 거부하였습니다. 서비스 사용을 원하실 경우 해당 앱의 권한을 허용해주세요"
                        size={14}
                        color="#777777"
                        textAlign="center"
                        lineHeight={19}
                    />
                </View>

                <Spacer height={18} />

                <View style={failLocationPermisionModalStyles.buttonBox}>
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

export default FailLocationPermisionModal;
