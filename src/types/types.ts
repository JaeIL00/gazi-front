import { KeyboardType } from "react-native/types";

// Navigation
// Navigation
export type RootStackParamList = {
    NotLoginHome: undefined;
    JoinMember: undefined;
};
export type NotLoginRouteName = "JoinMember";

// Smallest
// Smallest
export type TouchButtonProps = {
    title: string;
    onPress: () => void;
};
export type SingleLineInputProps = {
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    onSubmitEditing?: () => void;
    keyboardType?: KeyboardType;
    fontSize?: number;
    maxLength?: number;
    secureTextEntry?: boolean;
    width?: number;
    height?: number;
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
