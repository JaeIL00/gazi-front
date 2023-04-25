import axios from 'axios';
import Config from 'react-native-config';

const Axios = axios.create({
    baseURL: Config.API_BASE_URL,
});

export const emailAuthAPI = async (email: string) => {
    const response = await Axios({
        method: 'post',
        url: `/api/v1/member/email-confirm`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({
            email,
        }),
    });
    return response;
};
export const checkNicknameAPI = async (nickname: string) => {
    const response = await Axios({
        method: 'get',
        url: `/api/v1/member/check-nickname?nickName=${nickname}`,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response;
};
export const JoinMemberAPI = async (data: { email: string; password: string; nickName: string }) => {
    const response = await Axios({
        url: `/api/v1/member/signup`,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
    });
    return response;
};
