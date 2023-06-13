import React, { useEffect, useState } from 'react';
import { BackHandler, Keyboard, Platform, View } from 'react-native';
import { useRecoilState } from 'recoil';

import AuthEmail from '../components/organisms/AuthEmail';
import ScreenWrapper from '../components/organisms/ScreenWrapper';
import ModalBackground from '../components/smallest/ModalBackground';
import ServiceAgreement from '../components/organisms/ServiceAgreement';
import useBackgroundInterval from '../utils/hooks/useBackgroundInterval';
import MoveBackWithPageTitle from '../components/organisms/MoveBackWithPageTitle';
import NicknameTemplate from '../components/templates/joinMember/InputNicknameTemplate';
import InputEmailTemplate from '../components/templates/joinMember/InputEmailTemplate';
import CompletedJoinTemplate from '../components/templates/joinMember/CompletedJoinTemplate';
import EmailWithPasswordTemplate from '../components/templates/joinMember/InputPasswordTemplate';
import { JoinMemberScreenStyles } from '../styles/styles';
import { emailAuthAtom, joinMemberAtom } from '../store/atoms';
import { useRootNavigation } from '../navigations/RootStackNavigation';

const JoinMemberScreen = () => {
    const rootNavigation = useRootNavigation();

    const [joinData, setJoinData] = useRecoilState(joinMemberAtom);
    const [authData, setAuthData] = useRecoilState(emailAuthAtom);

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

                    {step === 2 && <EmailWithPasswordTemplate onPressNextStep={onPressNextStep} />}
                    {step === 3 && <NicknameTemplate onPressNextStep={onPressNextStep} />}
                    {step === 4 && <CompletedJoinTemplate onPressNextStep={onPressNextStep} />}
                </View>
            </>
        </ScreenWrapper>
    );
};

export default JoinMemberScreen;
