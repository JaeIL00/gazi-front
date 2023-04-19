import { atom } from 'recoil';

export const joinMemberInfo = atom({
    key: 'joinMemberInfo',
    default: {
        email: '',
        password: '',
        nickname: '',
        keyword: '',
    },
});
