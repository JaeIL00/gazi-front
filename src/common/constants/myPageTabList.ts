import { MyPageTabTypes } from '../../types/common/types';

export const myPageTabList: MyPageTabTypes[] = [
    {
        title: '',
        data: [
            { name: '내가 작성한 글', screen: 'MyPostComment', isBorder: true },
            { name: '계정관리', screen: 'AccountManagement', isBorder: false },
        ],
    },
    {
        title: '설정',
        data: [{ name: '관심키워드 설정', screen: 'LikeKeywordSetting', isBorder: false }],
    },
    {
        title: '정보',
        data: [{ name: '약관 및 정책', screen: 'Policies', isBorder: true }],
    },
];
