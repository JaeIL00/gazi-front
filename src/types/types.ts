import { KeyboardType } from 'react-native/types';

// Navigation
// Navigation
export type RootStackParamList = {
    NotLoginHome: undefined;
    JoinMember: undefined;
};
export type NotLoginRouteName = 'JoinMember';

// Smallest
// Smallest
export type TouchButtonProps = {
    title: string;
    onPress: () => void;
};
export type SingleLineInputProps = {
    value: string;
    placeholder: string;
    keyboardType?: KeyboardType;
    fontSize?: number;
    maxLength?: number;
    secureTextEntry?: boolean;
    width?: number;
    height?: number;
    onChangeText: (text: string) => void;
    onSubmitEditing?: () => void;
};

// Molecules
// Molecules
export interface LoginTextInputProps extends SingleLineInputProps {
    title: string;
    firstErrorText?: string;
    firstErrorTextStyle?: boolean;
    secondErrorText?: string;
    secondErrorTextStyle?: boolean;
}

// Organisms
// Organisms
export type InputEmailPwProps = {
    data: {
        email: string;
        password: string;
        nickname: string;
        keyword: string;
    };
    isEmail?: boolean;
    isPasswordLeng?: boolean;
    isPasswordReg?: boolean;
    onChangeEmailText: (text: string) => void;
    onChangePasswordText: (text: string) => void;
};

// templates
// templates
export type EmailWithPasswordProps = {
    onPressNextStep: () => void;
};
