import { atom } from 'recoil';
import { emailAuthAtomTypes, joinMemberTypes, userInfoAtomTypes, userAuthAtomTypes } from '../types/types';

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
        isOk: false,
    },
});
