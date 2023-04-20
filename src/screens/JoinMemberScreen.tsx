import React, { useEffect, useState } from 'react';
import { BackHandler, Platform, View } from 'react-native';

import EmailWithPasswordTemplate from '../components/templates/joinMember/EmailWithPasswordTemplate';
import NicknameTemplate from '../components/templates/joinMember/NicknameTemplate';
import { JoinMemberScreenStyles } from '../styles/styles';
import MoveBackWithPageTitle from '../components/organisms/MoveBackWithPageTitle';
import { useRootNavigation } from '../navigations/RootStackNavigation';

const JoinMemberScreen = () => {
    // Move to next step
    const [step, setStep] = useState(1);
    const onPressNextStep = () => {
        setStep(step + 1);
    };

    // Android back button & Header Back Button Handling
    const rootNavigation = useRootNavigation();
    const handleBackButton = () => {
        if (step > 1) {
            setStep(step - 1);
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
    }, [step]);

    const [title, setTitle] = useState('회원가입');
    const [explain, setExplain] = useState('본인인증을 위한 이메일을 입력해주세요');
    const headerTextHandler = () => {
        switch (step) {
            case 1:
                setTitle('회원가입');
                setExplain('본인인증을 위한 이메일을 입력해주세요');
                break;
            case 2:
                setTitle('회원가입');
                setExplain('비밀번호를 입력해주세요');
                break;
            case 3:
                setTitle('사용하실 닉네임을 입력해주세요');
                setExplain('다른 사용자들이 볼 수 있고, 내 프로필에서 수정할 수 있어요');
                break;
            default:
                setTitle('유저님의 회원가입을 축하드립니다!');
                setExplain('');
        }
    };

    return (
        <View style={JoinMemberScreenStyles.container}>
            <MoveBackWithPageTitle
                title={title}
                explainText={explain && explain}
                explainSize={13}
                onPress={handleBackButton}
            />
            {step === 1 && <EmailWithPasswordTemplate onPressNextStep={onPressNextStep} />}
            {step === 2 && <NicknameTemplate onPressNextStep={onPressNextStep} />}
        </View>
    );
};

export default JoinMemberScreen;
