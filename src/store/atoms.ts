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
export const authEmailData = atom({
    key: 'authEmailData',
    default: {
        number: 0,
        min: 0,
        sec: 0,
    },
});
