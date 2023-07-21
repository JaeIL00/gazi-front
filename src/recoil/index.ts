import { atom } from 'recoil';
import {
    emailAuthAtomTypes,
    joinMemberTypes,
    userInfoAtomTypes,
    userAuthAtomTypes,
    PostTypes,
} from '../types/common/types';

// AUTH
export const userAuthAtom = atom<userAuthAtomTypes>({
    key: 'userAuthAtom',
    default: {
        accessToken: '',
        refreshToken: '',
        isLogIn: false,
    },
});

// USER_INFO
export const userInfoAtom = atom<userInfoAtomTypes>({
    key: 'userInfoAtom',
    default: {
        memberId: null,
        nickname: '',
        email: '',
        isAllowLocation: false,
    },
});

// JOIN
export const joinMemberAtom = atom<joinMemberTypes>({
    key: 'joinMemberAtom',
    default: {
        email: '',
        password: '',
        nickName: '',
    },
});
export const emailAuthAtom = atom<emailAuthAtomTypes>({
    key: 'emailAuthAtom',
    default: {
        number: 0,
        isAuthorizationPass: false,
    },
});

// COMMUNITY
export const nearPostListAtom = atom<PostTypes[]>({
    key: 'nearPostListAtom',
    default: [
        {
            title: '',
            distance: '',
            time: '',
            rePostCount: 0,
            content: '',
            latitude: 0,
            longitude: 0,
            headKeyword: 0,
            thumbNail: '',
            postId: 0,
        },
    ],
});
