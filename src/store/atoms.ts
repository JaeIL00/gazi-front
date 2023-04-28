import { atom } from 'recoil';
import { emailAuthAtomTypes, joinMemberTypes, userTokenTypes } from '../types/types';

// AUTH
export const userToken = atom<userTokenTypes>({
    key: 'userToken',
    default: {
        accessToken: '',
        refreshToken: '',
    },
});

// JOIN
export const joinMemberData = atom<joinMemberTypes>({
    key: 'joinMemberData',
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
