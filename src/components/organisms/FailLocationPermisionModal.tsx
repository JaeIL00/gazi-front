import React from 'react';
import ModalBackground from '../smallest/ModalBackground';
import { View } from 'react-native';
import SemiBoldText from '../smallest/SemiBoldText';
import NormalText from '../smallest/NormalText';
import Colors from '../../styles/Colors';
import { failLocationPermisionModalStyles } from '../../styles/styles';
import Spacer from '../smallest/Spacer';
import TextButton from '../molecules/TextButton';

const FailLocationPermisionModal = () => {
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
                        onPress={() => {}}
                        paddingVertical={12}
                        borderWidth={1}
                        borderColor={Colors.TXT_GRAY}
                    />
                    <Spacer width={8} />
                    <TextButton
                        text="설정하러 가기"
                        textColor={Colors.WHITE}
                        fontSize={14}
                        onPress={() => {}}
                        backgroundColor={Colors.BLACK}
                        paddingVertical={12}
                    />
                </View>
            </View>
        </ModalBackground>
    );
};

export default FailLocationPermisionModal;
