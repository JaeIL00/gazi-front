import React, { useEffect, useState } from 'react';
import { BackHandler, Platform, View } from 'react-native';

import EmailWithPasswordTemplate from '../components/templates/joinMember/EmailWithPasswordTemplate';
import NicknameTemplate from '../components/templates/joinMember/NicknameTemplate';
import { joinMemberScreenStyles } from '../styles/styles';
import MoveBackWithPageTitle from '../components/organisms/MoveBackWithPageTitle';
import { useRootNavigation } from '../navigations/RootStackNavigation';
import ServiceAgreement from '../components/organisms/ServiceAgreement';
import Spacer from '../components/smallest/Spacer';
import InputEmailTemplate from '../components/templates/joinMember/InputEmailTemplate';
import AuthEmail from '../components/organisms/AuthEmail';

const JoinMemberScreen = () => {
    // Move to next step
    const [step, setStep] = useState(1);
    const [authEmail, setAuthEmail] = useState(false);
    const [agreement, setAgreement] = useState(false);
    const onPressNextStep = () => {
        if (step === 1) {
            setAuthEmail(true);
        } else if (step === 2) {
            setAgreement(true);
        } else {
            setStep(step + 1);
        }
    };
    const finishAuthEmailHandler = () => {
        setStep(step + 1);
        setAuthEmail(false);
    };
    // In Angreement component
    const finishAgreementHandler = () => {
        setStep(step + 1);
        setAgreement(false);
    };

    // Android back button & Header Back Button Handling
    const rootNavigation = useRootNavigation();
    const handleBackButton = () => {
        if (step > 1 && !agreement) {
            setStep(step - 1);
        } else if (agreement) {
            setAgreement(false);
        } else {
            rootNavigation.goBack();
        }
        return true;
    };
    useEffect(() => {
        headerTextHandler();
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', handleBackButton);
            return () => BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        }
    }, [step, agreement]);

    const [oneTitle, setOneTitle] = useState('회원가입');
    const [twoTitle, setTwoTitle] = useState('');
    const [explain, setExplain] = useState('본인인증을 위한 이메일을 입력해주세요');
    const headerTextHandler = () => {
        switch (step) {
            case 1:
                setOneTitle('회원가입');
                setTwoTitle('');
                setExplain('본인인증을 위한 이메일을 입력해주세요');
                break;
            case 2:
                setOneTitle('회원가입');
                setTwoTitle('');
                setExplain('비밀번호를 입력해주세요');
                break;
            case 3:
                setOneTitle('사용하실 닉네임을');
                setTwoTitle('입력해주세요');
                setExplain('다른 사용자들이 볼 수 있고, 내 프로필에서 수정할 수 있어요');
                break;
            case 4:
                setOneTitle('유저님의 ');
                setTwoTitle('회원가입을 축하드립니다!');
                setExplain('');
                break;
            default:
                return;
        }
    };

    return (
        <View style={joinMemberScreenStyles.container}>
            <View style={joinMemberScreenStyles.inner}>
                <MoveBackWithPageTitle
                    oneTitle={oneTitle}
                    twoTitle={twoTitle}
                    explainText={explain && explain}
                    explainSize={explain ? 13 : undefined}
                    onPress={handleBackButton}
                />

                <Spacer height={51} />

                {step === 1 && <InputEmailTemplate onPressNextStep={onPressNextStep} />}
                {step === 2 && <EmailWithPasswordTemplate onPressNextStep={onPressNextStep} />}
                {step === 3 && <NicknameTemplate onPressNextStep={onPressNextStep} />}
            </View>
            {authEmail && <AuthEmail finishAuthEmailHandler={finishAuthEmailHandler} />}
            {agreement && <ServiceAgreement finishAgreementHandler={finishAgreementHandler} />}
        </View>
    );
};

export default JoinMemberScreen;
