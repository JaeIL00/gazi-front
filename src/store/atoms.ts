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
export const authEmailNumber = atom({
    key: 'authEmailNumber',
    default: 0,
});
