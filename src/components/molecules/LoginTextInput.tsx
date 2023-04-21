import React from 'react';
import { View } from 'react-native';
import { SingleLineInput } from '../smallest/SingleLineInput';
import { LoginTextInputProps } from '../../types/types';
import { loginTextInputStyles } from '../../styles/styles';
import MediumText from '../smallest/MediumText';
import Spacer from '../smallest/Spacer';

const LoginTextInput = ({
    title,
    value,
    onChangeText,
    placeholder,
    maxLength,
    keyboardType,
    secureTextEntry,
}: LoginTextInputProps) => {
    return (
        <View>
            <MediumText text={title} size={14} color="#7C8183" />
            <Spacer height={6} />
            <View style={loginTextInputStyles.inputBox}>
                <SingleLineInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    fontSize={16}
                />
            </View>
        </View>
    );
};

export default LoginTextInput;
