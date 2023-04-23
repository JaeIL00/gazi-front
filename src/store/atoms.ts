import { atom } from 'recoil';

export const joinMemberData = atom({
    key: 'joinMemberData',
    default: {
        email: '',
        password: '',
        nickname: '',
        keyword: '',
    },
});
export const emailAuthNumber = atom({
    key: 'emailAuthNumber',
    default: 0,
});
