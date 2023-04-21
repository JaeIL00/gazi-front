import React from 'react';
import { Animated, ScrollView, View } from 'react-native';

import TouchButton from '../smallest/TouchButton';
import Icons from '../smallest/Icons';
import { serviceAgreementStyles } from '../../styles/styles';
import SemiBoldText from '../smallest/SemiBoldText';
import Colors from '../../styles/Colors';
import Space from '../smallest/Space';
import TextButton from '../molecules/TextButton';

const ServiceAgreement = () => {
    // Render list data
    const listData = ['(필수) 서비스 약관 동의', '(필수) 개인정보 수집 동의', '(필수) 위치기반 서비스 이용 동의'];

    return (
        <View style={serviceAgreementStyles.container}>
            <Animated.View style={[serviceAgreementStyles.animateInner, { transform: [{ translateY: 240 }] }]}>
                <View>
                    <TouchButton backgroundColor="#f9f9f9" onPress={() => {}}>
                        <View style={serviceAgreementStyles.allAgreeBox}>
                            <View style={serviceAgreementStyles.checkBox}>
                                <Icons type="feather" name="check" size={20} color="black" />
                            </View>
                            <SemiBoldText size={14} color={Colors.BLACK} text="약관 전체 동의" />
                        </View>
                    </TouchButton>
                    <Space height={3} />
                    <ScrollView>
                        {listData.map((text, index) => (
                            <CheckElements text={text} key={index} />
                        ))}
                    </ScrollView>
                    <Space height={158} />
                    <TextButton
                        height={48}
                        backgroundColor="#333"
                        onPress={() => {}}
                        fontSize={17}
                        textColor="#FFFFFF"
                        text="완료"
                    />
                </View>
            </Animated.View>
        </View>
    );
};
export default ServiceAgreement;

const CheckElements = ({ text }: { text: string }) => (
    <View style={serviceAgreementStyles.agreeBox}>
        <View style={serviceAgreementStyles.agreeTitleBox}>
            <View style={serviceAgreementStyles.checkBox}>
                <Icons type="feather" name="check" size={20} color="black" />
            </View>
            <SemiBoldText size={14} color={Colors.BLACK} text={text} />
        </View>
        <TouchButton onPress={() => {}}>
            <Icons type="simpleLineIcons" name="arrow-right" size={12} color="#CACACA" />
        </TouchButton>
    </View>
);
