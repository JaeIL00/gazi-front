import { MyProfileTabTypes } from '../types/types';

export const myProfileTabList: MyProfileTabTypes[] = [
    {
        text: '내가 작성한 글',
        screen: 'MyPostComment',
        icon: true,
        version: false,
        tab: true,
        borderLine: true,
    },
    {
        text: '계정관리',
        screen: 'AccountManagement',
        icon: true,
        version: false,
        tab: true,
        borderLine: false,
    },
    {
        text: '설정',
        screen: null,
        icon: false,
        version: false,
        tab: false,
        borderLine: false,
    },
    {
        text: '관심키워드 설정',
        screen: 'LikeKeywordSetting',
        icon: true,
        version: false,
        tab: true,
        borderLine: false,
    },
    {
        text: '정보',
        screen: null,
        icon: false,
        version: false,
        tab: false,
        borderLine: false,
    },
    {
        text: '약관 및 정책',
        screen: 'Policies',
        icon: true,
        version: false,
        tab: true,
        borderLine: true,
    },
];
