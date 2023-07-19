import { useState } from 'react';

const useTextInputValidation = () => {
    // Input text
    const [text, setText] = useState<string>('');
    const onChangeText = (value: string) => {
        setText(value);
    };

    // Text validator
    const [validationResult, setValidationResult] = useState<string>('');
    const changeValidationResult = (result: string) => {
        setValidationResult(result);
    };

    return {
        text,
        onChangeText,
        validationResult,
        changeValidationResult,
    };
};
export default useTextInputValidation;
