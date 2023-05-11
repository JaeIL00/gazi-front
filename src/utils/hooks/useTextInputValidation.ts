import { useState } from 'react';

const useTextInputValidation = () => {
    // Input text
    const [text, setText] = useState<string>('');
    const onChangeText = (text: string) => {
        setText(text);
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