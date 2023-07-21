import { ImageRequireSource } from 'react-native';
import { SingleLineInputProps, TouchButtonProps } from '../atoms/types';

export type CommentImageProps = {
    fileUrl: string;
    width: number;
    height: number;
    moveImageViewScreen: () => void;
};
export interface LoginTextInputProps extends SingleLineInputProps {
    title: string;
}
export type WritingFloatingBtnProps = {
    moveToWritingScreen: () => void;
};

export interface PageTitleWithExplainProps {
    oneTitle: string;
    twoTitle: string;
    explainText?: string;
    explainSize?: number;
}
export interface TextButtonProps extends TouchButtonProps {
    text: string;
    fontColor: string;
    fontSize: number;
    fontWeight: 'bold' | 'semiBold' | 'medium' | 'normal';
}
export interface IconButtonProps extends TouchButtonProps {
    iconType:
        | 'octicons'
        | 'feather'
        | 'simpleLineIcons'
        | 'materialCommunityIcons'
        | 'fontisto'
        | 'ionicons'
        | 'fontAwesome'
        | 'entypo';
    iconName: string;
    iconSize: number;
    iconColor: string;
}
export type MapMarkerProps = {
    findMarkerPost: (id: number) => void;
};
export interface ImageButtonProps extends TouchButtonProps {
    isCaching: boolean;
    imageWidth: number | string;
    imageHeight: number | string;
    imageBorderRadius?: number;
    imageSource: ImageRequireSource | { uri: string };
}
export type AgreementCheckListItemProps = {
    text: string;
    check: boolean;
    index: number;
    onPressCheckList: (index: number) => void;
    webViewHandler: (index: number) => void;
};
export type IconWithMediumTextProps = {
    iconColor: string;
    text: string;
    textColor: string;
    type: string;
    name: string;
};
export type IconPermissionListItemProps = {
    iconType?: string;
    iconName?: string;
    title: string;
    explain: string;
    image?: string;
};
export type HeaderMoleculeProps = {
    isPaddingHorizontal: boolean;
    isWorkDone?: boolean;
    isNextStep: boolean;
    headerFinish: boolean;
    title: string;
    finishText: string;
    background: string;
    backHandler: (state: string) => void;
    finishFunction?: () => void;
};
