import axios from 'axios';
import Config from 'react-native-config';

const Axios = axios.create({
    baseURL: Config.API_BASE_URL,
});

// JOIN
export const emailAuthAPI = async (email: string) => {
    const response = await Axios({
        method: 'post',
        url: '/api/v1/member/email-confirm',
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
export const joinMemberAPI = async (data: { email: string; password: string; nickName: string }) => {
    const response = await Axios({
        url: '/api/v1/member/signup',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
    });
    return response;
};
export const loginAPI = async (data: { email: string; password: string }) => {
    const response = await Axios({
        url: '/api/v1/member/login',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
    });
    return response;
};

export const deleteMemberAPI = async (token: string) => {
    const response = await Axios({
        url: '/api/v1/member/delete-member',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
};

// KEYWORD
export const likeKeywordsAPI = async (props: { token: string; data: number[] }) => {
    const response = await Axios({
        url: '/api/v1/keyword/interest-keyword',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${props.token}`,
        },
        data: JSON.stringify({
            myKeywordList: props.data,
        }),
    });
    return response;
};
