import { atom } from 'recoil';

// AUTH
export const userToken = atom({
    key: 'userToken',
    default: {
        accessToken: '',
        refreshToken: '',
    },
});

// JOIH
export const joinMemberData = atom({
    key: 'joinMemberData',
    default: {
        email: '',
        password: '',
        nickName: '',
    },
});
export const emailAuthNumber = atom({
    key: 'emailAuthNumber',
    default: 0,
});

// For Debug
export const forDebugAtom = atom({
    key: 'forDebugAtom',
    default: '',
});
