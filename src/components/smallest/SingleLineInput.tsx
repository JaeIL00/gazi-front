import React from 'react';
import { TextInput } from 'react-native';
import { SingleLineInputProps } from '../../types/types';
import { SingleLineInputStyles } from '../../styles/styles';
import Colors from '../../styles/Colors';

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
            placeholderTextColor={Colors.TXT_LIGHTGRAY}
            onSubmitEditing={onSubmitEditing}
            keyboardType={keyboardType ?? 'default'}
            maxLength={maxLength}
            secureTextEntry={secureTextEntry}
            style={SingleLineInputStyles(fontSize, width, height).input}
        />
    );
};
