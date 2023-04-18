import React from 'react';
import { TextInput } from 'react-native';
import { SingleLineInputProps } from '../../types/types';

export const SingleLineInput = ({
    value,
    placeholder,
    keyboardType,
    fontSize,
    onChangeText,
    onSubmitEditing,
    maxLength,
    secureTextEntry,
    width,
    height,
}: SingleLineInputProps) => {
    return (
        <TextInput
            autoCorrect={false}
            autoCapitalize="none"
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            onSubmitEditing={onSubmitEditing}
            keyboardType={keyboardType ?? 'default'}
            maxLength={maxLength}
            secureTextEntry={secureTextEntry}
            style={{ fontSize: fontSize ?? 20, width: width, height: height }}
        />
    );
};
