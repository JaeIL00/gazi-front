import React, { RefObject, useEffect, useRef } from 'react';
import { Keyboard, TextInput } from 'react-native';

import Colors from '../../styles/Colors';
import { SingleLineInputProps } from '../../types/types';
import { singleLineInputStyles } from '../../styles/styles';

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
    fontFamily = 'Pretendard-Medium',
    placeFontFamily = 'Pretendard-Regular',
    isFocus,
}: SingleLineInputProps) => {
    // When keyboard hide, input is blur
    const textInputRef = useRef() as RefObject<TextInput>;
    const blurTextInput = () => {
        textInputRef.current?.blur();
    };
    useEffect(() => {
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', blurTextInput);
        return () => {
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <TextInput
            ref={textInputRef}
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
            style={[
                value
                    ? singleLineInputStyles(fontSize, width, height, fontFamily, placeFontFamily).input
                    : singleLineInputStyles(fontSize, width, height, placeFontFamily, fontFamily).placeholder,
                singleLineInputStyles(fontSize, width, height, placeFontFamily, fontFamily).common,
            ]}
            underlineColorAndroid={'transparent'}
            autoFocus={isFocus}
        />
    );
};
