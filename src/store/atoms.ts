import { atom } from 'recoil';
import { emailAuthAtomTypes, joinMemberTypes, userTokenAtomTypes } from '../types/types';

// AUTH
export const userTokenAtom = atom<userTokenAtomTypes>({
    key: 'userTokenAtom',
    default: {
        accessToken: '',
        refreshToken: '',
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

// For Debug
export const forDebugAtom = atom<string>({
    key: 'forDebugAtom',
    default: '',
});
