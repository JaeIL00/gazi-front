export type InputEmailTemplateProps = {
    navigationHandler: (state: string) => void;
};
export interface InputPasswordTemplateProps extends InputEmailTemplateProps {}
export interface InputNicknameTemplateProps extends InputEmailTemplateProps {}
export interface CompletedJoinMemberModalProps extends InputEmailTemplateProps {
    inputNickname: string;
}
export type RequestPemissionTemplateProps = {
    navigationHandler: (state: string) => void;
};
export type EmailLoginTemplateProps = {
    moveServiceHomeHandler: (state: string) => void;
};
export interface InitLikeKeywordTemplateProps extends RequestPemissionTemplateProps {}
export type MapHomeTemplateProps = {
    isModalRef: React.MutableRefObject<boolean>;
    handleModalTrigger: boolean;
    moveToWritingScreen: () => void;
};
export type WritePostTemplateProps = {
    navigationHandler: (state: string, postId?: number) => void;
};
export type WriteCommentTemplateProps = {
    threadInfo: {
        title: string;
        rePostCount: number;
        time: string;
        postId: number;
    };
    navigationHandler: (state: string, postId?: number, freshRePostCount?: number) => void;
};
export type EditNicknameTemplateProps = {
    moveToMyPageScreen: () => void;
};
export type MyPageTemplateProps = {
    moveToScreen: (state: string) => void;
};
export type ThreadItemTemplateProps = {
    postId: number;
    freshRePostCount?: number;
    movetoCommunityScreen: () => void;
    moveToWriteScreen: (title: string, rePostCount: number, time: string) => void;
};
export type MyPostCommentTemplateProps = {
    moveToBackScreenHandler: () => void;
};
export type AccountManagementTemplateProps = {
    moveToScreenHandler: (state: string) => void;
};
export type DeleteMemberTemplateProps = {
    moveToScreenHandler: (state: string) => void;
};
export type ChangePasswordTemplateProps = {
    moveToBackScreenHandler: () => void;
};
export type LikeKeywordSettingTemplateProps = {
    isShortcut: boolean | undefined;
    moveToBackScreenHandler: () => void;
};
export type PoliciesTemplateProps = {
    moveToBackScreenHandler: () => void;
};
export type LikeKeywordBoardTemplateProps = {
    moveToKeywordSettingScreen: () => void;
};
export type KeywordAlarmTemplateProps = {
    navigationHandler: (screen: string, postId?: number) => void;
};
