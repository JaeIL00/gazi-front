import React, { RefObject, useEffect, useRef } from 'react';
import { Keyboard, TextInput } from 'react-native';

import Colors from '../../styles/Colors';
import { MultiLineInputProps } from '../../types/types';
import { singleLineInputStyles } from '../../styles/styles';

const MultiLineInput = ({
    value,
    placeholder,
    fontSize,
    onChangeText,
    onSubmitEditing,
    maxLength,
    width,
    height,
    fontFamily = 'Pretendard-Medium',
    placeFontFamily = 'Pretendard-Regular',
}: MultiLineInputProps) => {
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
            multiline={true}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={Colors.TXT_LIGHTGRAY}
            onSubmitEditing={onSubmitEditing}
            maxLength={maxLength}
            style={
                value
                    ? singleLineInputStyles(fontSize, width, height, fontFamily).input
                    : singleLineInputStyles(fontSize, width, height, placeFontFamily).placeholder
            }
            underlineColorAndroid={'transparent'}
        />
    );
};

export default MultiLineInput;
