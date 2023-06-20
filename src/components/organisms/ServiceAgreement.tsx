import React, { useEffect, useRef, useState } from 'react';
import { Animated, Modal, View, useWindowDimensions } from 'react-native';

import Icons from '../smallest/Icons';
import Colors from '../../styles/Colors';
import TextButton from '../molecules/TextButton';
import WebViewComponent from './WebViewComponent';
import TouchButton from '../smallest/TouchButton';
import SemiBoldText from '../smallest/SemiBoldText';
import AgreementCheckListItem from '../molecules/AgreementCheckListItem';
import { ServiceAgreementProps } from '../../types/types';
import { screenHeight } from '../../utils/changeStyleSize';
import { checkBoxBackground, serviceAgreementStyles } from '../../styles/styles';

// Render list data
const listData = ['(필수) 서비스 약관 동의', '(필수) 개인정보 수집 동의', '(필수) 위치기반 서비스 이용 동의'];

const ServiceAgreement = ({ finishSlideComponentHandler }: ServiceAgreementProps) => {
    const { height } = useWindowDimensions();

    const topValue = useRef<Animated.Value>(new Animated.Value(height)).current;

    const [uri, seturi] = useState<string>('');
    const [isAllCheck, setIsAllCheck] = useState<boolean>(false);
    const [isServiceCheck, setIsServiceCheck] = useState<boolean>(false);
    const [isPersonalCheck, setIsPersonalCheck] = useState<boolean>(false);
    const [isLocationCheck, setIsLocationCheck] = useState<boolean>(false);

    // Check box handling
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

    // Animation handling
    const startAnimationHandler = () => {
        Animated.timing(topValue, {
            toValue: 290 * screenHeight,
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
            }).start(({ finished }: { finished: boolean }) => {
                if (finished) {
                    finishSlideComponentHandler('GO');
                }
            });
        }
    };
    useEffect(() => {
        startAnimationHandler();
    }, []);

    // WebView component handling
    const webViewHandler = (index: number) => {
        switch (index) {
            case 0:
                seturi('https://gilded-turn-6c9.notion.site/ver-1-10f4eab4c1c842cab3539cdd013dc0c7');
                break;
            case 1:
                seturi('https://gilded-turn-6c9.notion.site/ver-1-6992d062c19a466aaf4e37db4df2498b');
                break;
            case 2:
                seturi('https://gilded-turn-6c9.notion.site/ver-1-9eabbc4300464d07adc940a1c7c33840');
                break;
            default:
                // For Debug
                console.log('(ERROR) WebView Handler.', index);
        }
    };

    // Agreement check
    useEffect(() => {
        if (isServiceCheck && isPersonalCheck && isLocationCheck) {
            setIsAllCheck(true);
        } else {
            setIsAllCheck(false);
        }
    }, [isServiceCheck, isPersonalCheck, isLocationCheck]);

    return (
        <>
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

                    <View style={serviceAgreementStyles.listBox}>
                        {listData.map((text, index) => (
                            <AgreementCheckListItem
                                text={text}
                                key={index}
                                check={index === 0 ? isServiceCheck : index === 1 ? isPersonalCheck : isLocationCheck}
                                onPressCheckList={onPressCheckList}
                                index={index}
                                webViewHandler={webViewHandler}
                            />
                        ))}
                    </View>

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

            <Modal visible={uri.length > 0} onRequestClose={() => seturi('')}>
                <WebViewComponent uri={uri} closeHandler={seturi} />
            </Modal>
        </>
    );
};
export default ServiceAgreement;
