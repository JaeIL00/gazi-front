import { atom } from 'recoil';
import { emailAuthAtomTypes, joinMemberTypes, userInfoAtomTypes, userTokenAtomTypes } from '../types/types';

// AUTH
export const userTokenAtom = atom<userTokenAtomTypes>({
    key: 'userTokenAtom',
    default: {
        accessToken: '',
        refreshToken: '',
    },
});

// USER_INFO
export const userInfoAtom = atom<userInfoAtomTypes>({
    key: 'userInfoAtom',
    default: {
        memberId: null,
        nickname: '',
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
