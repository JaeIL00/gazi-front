import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Animated, Keyboard, View } from 'react-native';
import { useRecoilState } from 'recoil';
import { useQuery } from 'react-query';

import { SingleLineInput } from '../../smallest/SingleLineInput';
import { joinMemberData } from '../../../store/atoms';
import { NicknameTemplateProps } from '../../../types/types';
import TextButton from '../../molecules/TextButton';
import Colors from '../../../styles/Colors';
import { nextStepButtonPosition, nicknameTemplateStyles } from '../../../styles/styles';
import useKeyboardMotion from '../../../utils/hooks/useKeyboardMotion';
import { checkNicknameAPI } from '../../../queries/api';
import Icons from '../../smallest/Icons';
import Spacer from '../../smallest/Spacer';
import MediumText from '../../smallest/MediumText';

const NicknameTemplate = ({ onPressNextStep }: NicknameTemplateProps) => {
    const [joinData, setJoinData] = useRecoilState(joinMemberData);
    const [initErrorText, setInitErrorText] = useState(false);

    const [inputNickname, setInputNickname] = useState('');
    const onChangeNickname = (text: string) => {
        setInputNickname(text);
    };

    // Check nickname duplicate Handling
    const [isDuplicate, setIsDuplicate] = useState(false);
    const { refetch, isFetching } = useQuery('duplicateNickname', () => checkNicknameAPI(inputNickname), {
        enabled: false,
        onSuccess: () => {
            setIsDuplicate(true);
        },
        onError: ({ response }) => {
            // 추후에 409로 수정 예정
            if (response.status === 401) {
                setIsDuplicate(false);
            }
        },
        onSettled: () => {
            setInitErrorText(true);
        },
    });
    const onPressCheckDuplicate = () => {
        if (inputNickname.length > 1) {
            refetch();
        }
    };

    // Move Next Step
    const canMoveNextStepHandler = () => {
        if (isDuplicate) {
            setJoinData({ ...joinData, nickname: inputNickname });
            onPressNextStep();
        }
    };

    // Finish button transitionY handling
    const { bottomValue, buttonUpAnimationHandler, buttonDownAnimationHandler } = useKeyboardMotion(170, 400);
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', buttonUpAnimationHandler);
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', buttonDownAnimationHandler);

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <View style={nicknameTemplateStyles.container}>
            <View style={nicknameTemplateStyles.inputBox}>
                <SingleLineInput
                    value={inputNickname}
                    onChangeText={onChangeNickname}
                    maxLength={12}
                    placeholder="닉네임을 입력해주세요."
                />
                <TextButton
                    text="중복 확인"
                    textColor={Colors.WHITE}
                    width={69}
                    height={31}
                    backgroundColor={Colors.BLACK}
                    onPress={onPressCheckDuplicate}
                    fontSize={13}
                    paddingHorizontal={10}
                    paddingVertical={6}
                />
            </View>

            <Spacer height={8} />

            {initErrorText && (
                <View style={nicknameTemplateStyles.emailErrorTextBox}>
                    <Icons
                        type={isDuplicate ? 'octicons' : 'fontisto'}
                        name={isDuplicate ? 'check' : 'close'}
                        size={14}
                        color={isDuplicate ? Colors.STATUS_GREEN : Colors.STATUS_RED}
                    />
                    <Spacer width={4} />
                    <MediumText
                        text={isDuplicate ? '사용 가능한 닉네임입니다' : '중복된 닉네임입니다'}
                        size={12}
                        color={isDuplicate ? Colors.STATUS_GREEN : Colors.STATUS_RED}
                    />
                </View>
            )}
            {isFetching && <ActivityIndicator size="large" />}
            <Animated.View style={[nextStepButtonPosition.button, { transform: [{ translateY: bottomValue }] }]}>
                <TextButton
                    text="확인"
                    textColor={Colors.WHITE}
                    backgroundColor={isDuplicate ? Colors.BLACK : Colors.BTN_GRAY}
                    onPress={canMoveNextStepHandler}
                    height={48}
                    fontSize={17}
                />
            </Animated.View>
        </View>
    );
};

export default NicknameTemplate;
