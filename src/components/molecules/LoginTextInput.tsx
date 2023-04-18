import React from "react";
import { Text, View } from "react-native";
import { SingleLineInput } from "../smallest/SingleLineInput";
import { LoginTextInputProps } from "../../types/types";
import { LoginTextInputStyles } from "../../styles/styles";

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
            <SingleLineInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                maxLength={maxLength}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
            />
            <View style={LoginTextInputStyles.errorSection}>
                {firstErrorText && (
                    <Text
                        style={
                            firstErrorTextStyle
                                ? LoginTextInputStyles.correctTextStyle
                                : LoginTextInputStyles.errorTextStyle
                        }>
                        {firstErrorText}
                    </Text>
                )}
                {secondErrorText && (
                    <Text
                        style={
                            secondErrorTextStyle
                                ? LoginTextInputStyles.correctTextStyle
                                : LoginTextInputStyles.errorTextStyle
                        }>
                        {secondErrorText}
                    </Text>
                )}
            </View>
        </View>
    );
};

export default LoginTextInput;
