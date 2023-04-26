import { atom } from 'recoil';
import { joinMemberTypes, userTokenTypes } from '../types/types';

// AUTH
export const userToken = atom<userTokenTypes>({
    key: 'userToken',
    default: {
        accessToken: '',
        refreshToken: '',
    },
});

// JOIH
export const joinMemberData = atom<joinMemberTypes>({
    key: 'joinMemberData',
    default: {
        email: '',
        password: '',
        nickName: '',
    },
});
export const emailAuthNumber = atom<number>({
    key: 'emailAuthNumber',
    default: 0,
});

// For Debug
export const forDebugAtom = atom<string>({
    key: 'forDebugAtom',
    default: '',
});
