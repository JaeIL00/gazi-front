import React, { RefObject, useEffect, useRef } from 'react';
import { Keyboard, TextInput } from 'react-native';

import colors from '../../common/constants/colors';
import { MultiLineInputProps } from '../../types/atoms/types';
import { multiLineInputStyles } from '../../styles/atoms/styles';

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
    inputFocusBlur,
    inputFocusBlurHandler,
}: MultiLineInputProps) => {
    // When keyboard hide, input is blur
    const textInputRef = useRef() as RefObject<TextInput>;
    const blurTextInput = () => {
        textInputRef.current?.blur();
        inputFocusBlurHandler('BLUR');
    };
    useEffect(() => {
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', blurTextInput);
        return () => {
            keyboardDidHideListener.remove();
        };
    }, []);
    useEffect(() => {
        if (inputFocusBlur) {
            textInputRef.current?.focus();
        }
    }, [inputFocusBlur]);

    return (
        <TextInput
            ref={textInputRef}
            autoCorrect={false}
            autoCapitalize="none"
            multiline={true}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={colors.TXT_LIGHTGRAY}
            onSubmitEditing={onSubmitEditing}
            maxLength={maxLength}
            style={[
                value
                    ? multiLineInputStyles(fontSize, width, height, fontFamily, placeFontFamily).input
                    : multiLineInputStyles(fontSize, width, height, placeFontFamily, fontFamily).placeholder,
                multiLineInputStyles(fontSize, width, height, placeFontFamily, fontFamily).common,
            ]}
            underlineColorAndroid={'transparent'}
        />
    );
};

export default MultiLineInput;
