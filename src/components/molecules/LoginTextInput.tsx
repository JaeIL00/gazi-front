import React from 'react';
import { View } from 'react-native';

import Spacer from '../atoms/Spacer';
import MediumText from '../atoms/MediumText';
import { LoginTextInputProps } from '../../types/molecules/types';
import { loginTextInputStyles } from '../../styles/molecules/styles';
import { SingleLineInput } from '../atoms/SingleLineInput';

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
                    fontFamily={null}
                    placeFontFamily={null}
                />
            </View>
        </View>
    );
};

export default LoginTextInput;
