import { atom } from 'recoil';

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
