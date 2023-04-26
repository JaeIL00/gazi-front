import React, { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, View, useWindowDimensions } from 'react-native';

import Icons from '../smallest/Icons';
import Colors from '../../styles/Colors';
import TextButton from '../molecules/TextButton';
import TouchButton from '../smallest/TouchButton';
import ModalBackground from '../smallest/ModalBackground';
import SemiBoldText from '../smallest/SemiBoldText';
import AgreementCheckListItem from '../molecules/AgreementCheckListItem';
import { ServiceAgreementProps } from '../../types/types';
import { checkBoxBackground, serviceAgreementStyles } from '../../styles/styles';

const ServiceAgreement = ({ finishSlideComponentHandler }: ServiceAgreementProps) => {
    // Render list data
    const listData = ['(필수) 서비스 약관 동의', '(필수) 개인정보 수집 동의', '(필수) 위치기반 서비스 이용 동의'];

    // Check box handling
    const [isServiceCheck, setIsServiceCheck] = useState<boolean>(false);
    const [isPersonalCheck, setIsPersonalCheck] = useState<boolean>(false);
    const [isLocationCheck, setIsLocationCheck] = useState<boolean>(false);
    const [isAllCheck, setIsAllCheck] = useState<boolean>(false);
    const onPressCheckList = (index: number) => {
        switch (index) {
            case 0:
                setIsServiceCheck(!isServiceCheck);
                break;
            case 1:
                setIsPersonalCheck(!isPersonalCheck);
                break;
            case 2:
                setIsLocationCheck(!isLocationCheck);
                break;
            default:
                return;
        }
    };
    const onPressAllCheck = () => {
        if (isAllCheck) {
            setIsServiceCheck(false);
            setIsPersonalCheck(false);
            setIsLocationCheck(false);
        } else {
            setIsServiceCheck(true);
            setIsPersonalCheck(true);
            setIsLocationCheck(true);
        }
    };
    useEffect(() => {
        if (isServiceCheck && isPersonalCheck && isLocationCheck) {
            setIsAllCheck(true);
        } else {
            setIsAllCheck(false);
        }
    }, [isServiceCheck, isPersonalCheck, isLocationCheck]);

    // Animation handling
    const { height } = useWindowDimensions();
    const topValue = useRef<Animated.Value>(new Animated.Value(height)).current;
    const startAnimationHandler = () => {
        Animated.timing(topValue, {
            toValue: 295,
            duration: 400,
            useNativeDriver: true,
        }).start();
    };
    const onPressFinishAnimation = () => {
        if (isAllCheck) {
            Animated.timing(topValue, {
                toValue: height,
                duration: 300,
                useNativeDriver: true,
            }).start(({ finished }) => {
                if (finished) {
                    finishSlideComponentHandler('OK');
                }
            });
        }
    };
    useEffect(() => {
        startAnimationHandler();
    }, []);

    return (
        <ModalBackground>
            <Animated.View style={[serviceAgreementStyles.animateInner, { transform: [{ translateY: topValue }] }]}>
                <View>
                    <TouchButton backgroundColor="#f9f9f9" onPress={onPressAllCheck}>
                        <View style={serviceAgreementStyles.allAgreeBox}>
                            <View style={[serviceAgreementStyles.checkBox, checkBoxBackground(isAllCheck).color]}>
                                {isAllCheck && <Icons type="feather" name="check" size={20} color={Colors.WHITE} />}
                            </View>
                            <SemiBoldText size={14} color={Colors.BLACK} text="약관 전체 동의" />
                        </View>
                    </TouchButton>

                    <ScrollView contentContainerStyle={serviceAgreementStyles.listBox}>
                        {listData.map((text, index) => (
                            <AgreementCheckListItem
                                text={text}
                                key={index}
                                check={index === 0 ? isServiceCheck : index === 1 ? isPersonalCheck : isLocationCheck}
                                onPressCheckList={onPressCheckList}
                                index={index}
                            />
                        ))}
                    </ScrollView>

                    <TextButton
                        height={48}
                        backgroundColor={isAllCheck ? Colors.BLACK : Colors.BTN_GRAY}
                        onPress={onPressFinishAnimation}
                        fontSize={17}
                        textColor={Colors.WHITE}
                        text="완료"
                    />
                </View>
            </Animated.View>
        </ModalBackground>
    );
};
export default ServiceAgreement;
