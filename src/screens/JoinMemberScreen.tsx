import React, { useEffect, useState } from 'react';
import { BackHandler, Keyboard, Platform, View } from 'react-native';

import EmailWithPasswordTemplate from '../components/templates/joinMember/EmailWithPasswordTemplate';
import NicknameTemplate from '../components/templates/joinMember/NicknameTemplate';
import { joinMemberScreenStyles } from '../styles/styles';
import MoveBackWithPageTitle from '../components/organisms/MoveBackWithPageTitle';
import { useRootNavigation } from '../navigations/RootStackNavigation';
import ServiceAgreement from '../components/organisms/ServiceAgreement';
import Spacer from '../components/smallest/Spacer';
import InputEmailTemplate from '../components/templates/joinMember/InputEmailTemplate';
import AuthEmail from '../components/organisms/AuthEmail';
import { useRecoilState } from 'recoil';
import { joinMemberData } from '../store/atoms';
import useBackgroundInterval from '../utils/hooks/useBackgroundInterval';
import CompletedJoinTemplate from '../components/templates/joinMember/CompletedJoinTemplate';

const JoinMemberScreen = () => {
    const [joinData, setJoinData] = useRecoilState(joinMemberData);

    // Move to next step
    const [step, setStep] = useState(1);
    const [isSlideComponent, setIsSlideComponent] = useState(false);
    const onPressNextStep = () => {
        Keyboard.dismiss();
        if (step < 3) {
            setIsSlideComponent(true);
        } else {
            setStep(step + 1);
        }
    };
    const finishSlideComponentHandler = (status: string) => {
        switch (status) {
            case 'OK':
                setStep(step + 1);
                setIsSlideComponent(false);
                break;
            case 'BACK':
                setIsSlideComponent(false);
                break;
            default:
                return;
        }
    };

    // Page Header Title Handling
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

    // Timer
    const [min, setMin] = useState(0);
    const [sec, setSec] = useState(0);
    const timerHandler = () => {
        if (sec < 59) {
            setSec(sec + 1);
        } else {
            setMin(min + 1);
            setSec(0);
        }
    };
    const resetTimeHandler = () => {
        setMin(0);
        setSec(0);
    };
    useBackgroundInterval(timerHandler, min === 5 ? null : 1000);

    // Android back button & Header Back Button Handling
    const rootNavigation = useRootNavigation();
    const handleBackButton = () => {
        if (step > 1 && !isSlideComponent) {
            setStep(step - 1);
        } else if (isSlideComponent) {
            setIsSlideComponent(false);
        } else {
            setJoinData({
                email: '',
                password: '',
                nickname: '',
                keyword: '',
            });
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
    }, [step, isSlideComponent]);

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

                {step === 1 && (
                    <InputEmailTemplate resetTimeHandler={resetTimeHandler} onPressNextStep={onPressNextStep} />
                )}
                {step === 2 && <EmailWithPasswordTemplate onPressNextStep={onPressNextStep} />}
                {step === 3 && <NicknameTemplate onPressNextStep={onPressNextStep} />}
                {step === 4 && <CompletedJoinTemplate onPressNextStep={onPressNextStep} />}
            </View>
            {isSlideComponent && step === 1 && (
                <AuthEmail
                    min={min}
                    sec={sec}
                    resetTimeHandler={resetTimeHandler}
                    finishSlideComponentHandler={finishSlideComponentHandler}
                />
            )}
            {isSlideComponent && step === 2 && (
                <ServiceAgreement finishSlideComponentHandler={finishSlideComponentHandler} />
            )}
        </View>
    );
};

export default JoinMemberScreen;
