import React, { useEffect, useState } from 'react';
import { BackHandler, Keyboard, Platform, View } from 'react-native';
import { useRecoilState } from 'recoil';

import Spacer from '../components/smallest/Spacer';
import AuthEmail from '../components/organisms/AuthEmail';
import ServiceAgreement from '../components/organisms/ServiceAgreement';
import useBackgroundInterval from '../utils/hooks/useBackgroundInterval';
import MoveBackWithPageTitle from '../components/organisms/MoveBackWithPageTitle';
import NicknameTemplate from '../components/templates/joinMember/NicknameTemplate';
import InputEmailTemplate from '../components/templates/joinMember/InputEmailTemplate';
import CompletedJoinTemplate from '../components/templates/joinMember/CompletedJoinTemplate';
import EmailWithPasswordTemplate from '../components/templates/joinMember/EmailWithPasswordTemplate';
import { emailAuthNumber, joinMemberData } from '../store/atoms';
import { globalDefaultStyles } from '../styles/styles';
import { useRootNavigation } from '../navigations/RootStackNavigation';

const JoinMemberScreen = () => {
    const rootNavigation = useRootNavigation();
    const [joinData, setJoinData] = useRecoilState(joinMemberData);

    // Move to screen handling
    const [step, setStep] = useState<number>(1);
    const [isSlideComponent, setIsSlideComponent] = useState<boolean>(false);
    const onPressNextStep = () => {
        Keyboard.dismiss();
        if (step < 3) {
            setIsSlideComponent(true);
        } else if (step === 4) {
            rootNavigation.navigate('RequestPermission');
        } else {
            setStep(step + 1);
        }
    };
    const finishSlideComponentHandler = (state: string) => {
        switch (state) {
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

    // Change screen header title
    const [oneTitle, setOneTitle] = useState<string>('회원가입');
    const [twoTitle, setTwoTitle] = useState<string>('');
    const [explain, setExplain] = useState<string>('본인인증을 위한 이메일을 입력해주세요');
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
                setOneTitle(`${joinData.nickName}님의`);
                setTwoTitle('회원가입을 축하드립니다!');
                setExplain('');
                break;
            default:
                return;
        }
    };

    // Timer for email authorization
    const [min, setMin] = useState<number>(0);
    const [sec, setSec] = useState<number>(0);
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
    useBackgroundInterval(timerHandler, min === 1 ? null : 1000);

    // Reset auth number by full time
    const [authData, setAuthData] = useRecoilState(emailAuthNumber);
    useEffect(() => {
        if (min > 0) {
            setAuthData(0);
        }
    }, [min]);

    // Android back button & Header Back Button Handling
    const handleBackButton = (): boolean => {
        if (step === 4) {
            // For Debug
            rootNavigation.navigate('NotLoginHome');
        } else if (step > 1 && !isSlideComponent) {
            setStep(step - 1);
        } else if (isSlideComponent) {
            setIsSlideComponent(false);
        } else {
            setJoinData({
                email: '',
                password: '',
                nickName: '',
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
        <View style={globalDefaultStyles.container}>
            <MoveBackWithPageTitle
                oneTitle={oneTitle}
                twoTitle={twoTitle}
                explainText={explain && explain}
                explainSize={explain ? 13 : undefined}
                onPress={handleBackButton}
            />

            <Spacer height={51} />

            {step === 1 && <InputEmailTemplate resetTimeHandler={resetTimeHandler} onPressNextStep={onPressNextStep} />}
            {step === 2 && <EmailWithPasswordTemplate onPressNextStep={onPressNextStep} />}
            {step === 3 && <NicknameTemplate onPressNextStep={onPressNextStep} />}
            {step === 4 && <CompletedJoinTemplate onPressNextStep={onPressNextStep} />}

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
