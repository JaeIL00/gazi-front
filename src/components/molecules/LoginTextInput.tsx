import React from 'react';
import { Text, View } from 'react-native';
import { SingleLineInput } from '../smallest/SingleLineInput';
import { LoginTextInputProps } from '../../types/types';
import { loginTextInputStyles } from '../../styles/styles';

const LoginTextInput = ({
    title,
    value,
    onChangeText,
    placeholder,
    maxLength,
    keyboardType,
    firstErrorTextStyle,
    secondErrorTextStyle,
    firstErrorText,
    secondErrorText,
    secureTextEntry,
}: LoginTextInputProps) => {
    return (
        <View>
            <Text>{title}</Text>
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
            <View style={loginTextInputStyles.errorSection}>
                {firstErrorText && (
                    <Text
                        style={
                            firstErrorTextStyle
                                ? loginTextInputStyles.correctTextStyle
                                : loginTextInputStyles.errorTextStyle
                        }>
                        {firstErrorText}
                    </Text>
                )}
                {secondErrorText && (
                    <Text
                        style={
                            secondErrorTextStyle
                                ? loginTextInputStyles.correctTextStyle
                                : loginTextInputStyles.errorTextStyle
                        }>
                        {secondErrorText}
                    </Text>
                )}
            </View>
        </View>
    );
};

export default LoginTextInput;
