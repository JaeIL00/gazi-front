import React, { useEffect, useState } from 'react';
import { BackHandler, Keyboard, Platform, View } from 'react-native';
import { useRecoilState } from 'recoil';

import AuthEmail from '../components/organisms/AuthEmail';
import ScreenWrapper from '../components/organisms/ScreenWrapper';
import ModalBackground from '../components/smallest/ModalBackground';
import ServiceAgreement from '../components/organisms/ServiceAgreement';
import useBackgroundInterval from '../utils/hooks/useBackgroundInterval';
import MoveBackWithPageTitle from '../components/organisms/MoveBackWithPageTitle';
import NicknameTemplate from '../components/templates/joinMember/NicknameTemplate';
import InputEmailTemplate from '../components/templates/joinMember/InputEmailTemplate';
import CompletedJoinTemplate from '../components/templates/joinMember/CompletedJoinTemplate';
import EmailWithPasswordTemplate from '../components/templates/joinMember/EmailWithPasswordTemplate';
import { JoinMemberScreenStyles } from '../styles/styles';
import { emailAuthAtom, joinMemberAtom } from '../store/atoms';
import { useRootNavigation } from '../navigations/RootStackNavigation';

const JoinMemberScreen = () => {
    const rootNavigation = useRootNavigation();

    const [joinData, setJoinData] = useRecoilState(joinMemberAtom);
    const [authData, setAuthData] = useRecoilState(emailAuthAtom);

    const [min, setMin] = useState<number>(5);
    const [sec, setSec] = useState<number>(0);
    const [step, setStep] = useState<number>(1);
    const [twoTitle, setTwoTitle] = useState<string>('');
    const [oneTitle, setOneTitle] = useState<string>('회원가입');
    const [isSlideComponent, setIsSlideComponent] = useState<boolean>(false);
    const [explain, setExplain] = useState<string>('본인인증을 위한 이메일을 입력해주세요');

    // Move to screen handling
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
    const didAuthEmail = () => {
        setStep(2);
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
                // For Debug
                console.log('(ERROR) Move to slider component of screen handling. state: ', state);
        }
    };

    // Change screen header title
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
                // For Debug
                console.log('(ERROR) Change screen header title. state: ', step);
        }
    };

    // Timer for email authorization
    const timerHandler = () => {
        if (sec > 0) {
            setSec(sec - 1);
        } else if (sec === 0) {
            setSec(59);
            setMin(min - 1);
        }
    };
    const resetTimeHandler = () => {
        setMin(5);
        setSec(0);
    };
    useBackgroundInterval(timerHandler, min === 0 && sec === 0 ? null : 1000);

    // Android back button & Header Back Button Handling
    const handleBackButton = (): boolean => {
        if (step === 4) {
            // For Debug
            rootNavigation.navigate('NotLoginHome');
        } else if (step > 1 && !isSlideComponent) {
            setStep(step - 1);
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

    // Reset auth number by full time
    useEffect(() => {
        if (min === 0 && sec === 0) {
            setAuthData({ ...authData, number: 0 });
        }
    }, [min]);

    useEffect(() => {
        headerTextHandler();
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', handleBackButton);
            return () => BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        }
    }, [step, isSlideComponent]);

    return (
        <ScreenWrapper isPaddingHorizontal={false}>
            <>
                <View style={JoinMemberScreenStyles.inner}>
                    <MoveBackWithPageTitle
                        oneTitle={oneTitle}
                        twoTitle={twoTitle}
                        explainText={explain && explain}
                        explainSize={explain ? 13 : undefined}
                        onPress={handleBackButton}
                    />

                    {step === 1 && (
                        <InputEmailTemplate
                            minutes={min}
                            seconds={sec}
                            resetTimeHandler={resetTimeHandler}
                            onPressNextStep={onPressNextStep}
                            didAuthEmail={didAuthEmail}
                        />
                    )}
                    {step === 2 && <EmailWithPasswordTemplate onPressNextStep={onPressNextStep} />}
                    {step === 3 && <NicknameTemplate onPressNextStep={onPressNextStep} />}
                    {step === 4 && <CompletedJoinTemplate onPressNextStep={onPressNextStep} />}

                    <ModalBackground
                        visible={isSlideComponent && step === 1}
                        onRequestClose={() => finishSlideComponentHandler('BACK')}>
                        <AuthEmail
                            min={min}
                            sec={sec}
                            resetTimeHandler={resetTimeHandler}
                            finishSlideComponentHandler={finishSlideComponentHandler}
                        />
                    </ModalBackground>
                </View>
                <ModalBackground
                    visible={isSlideComponent && step === 2}
                    onRequestClose={() => finishSlideComponentHandler('BACK')}>
                    <ServiceAgreement finishSlideComponentHandler={finishSlideComponentHandler} />
                </ModalBackground>
            </>
        </ScreenWrapper>
    );
};

export default JoinMemberScreen;
