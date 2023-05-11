import axios from 'axios';
import Config from 'react-native-config';
import { PostDto } from '../types/types';

const Axios = axios.create({
    baseURL: Config.API_BASE_URL,
});

// GOOGLE
export const searchGoogleAPI = async (searchInput: string, nextPageToken: string) => {
    const url = nextPageToken
        ? `https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken=${nextPageToken}&key=${Config.GOOGLE_PLACE_API_KEY}`
        : `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchInput}%20in%20Korea&key=${Config.GOOGLE_PLACE_API_KEY}`;
    const response = await axios({
        method: 'get',
        url,
        headers: {
            'Accept-Language': 'ko',
        },
    });
    return response;
};

// LOGIN
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
export const autoLoginAPI = async (data: { accessToken: string; refreshToken: string }) => {
    const response = await Axios({
        url: '/api/v1/member/reissue',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
    });
    return response;
};

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
        method: 'post',
        url: '/api/v1/member/check-nickname',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({
            nickName: nickname,
        }),
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

// DELETE MEMBER
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

// USER PROFILE
export const editNicknameAPI = async (param: { accessToken: string; data: string }) => {
    const response = await Axios({
        url: '/api/v1/member/change-nickname',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${param.accessToken}`,
        },
        data: JSON.stringify({
            nickName: param.data,
        }),
    });
    return response;
};

// KEYWORD
export const likeKeywordsAPI = async (param: { token: string; data: number[] }) => {
    const response = await Axios({
        url: '/api/v1/keyword/interest-keyword',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${param.token}`,
        },
        data: JSON.stringify({
            myKeywordList: param.data,
        }),
    });
    return response;
};

// MAP
export const nearByUserPostsAPI = async (param: {
    minLat: number;
    minLon: number;
    maxLat: number;
    maxLon: number;
    curLat: number;
    curLon: number;
    accessToken: string;
    page: number;
}) => {
    const response = await Axios({
        url: `/api/v1/post/locationPost?minLat=${param.minLat}&minLon=${param.minLon}&maxLat=${param.maxLat}&maxLon=${param.maxLon}&curLat=${param.curLat}&curLon=${param.curLon}&page=${param.page}`,
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${param.accessToken}`,
        },
    });
    return response;
};

// COMMUNITY

// TEMPORARY COMMUNITY
export const writePostAPI = async (param: { accessToken: string; data: PostDto }) => {
    const response = await Axios({
        url: '/api/v1/post/top-post',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${param.accessToken}`,
        },
        data: JSON.stringify(param.data),
    });
    return response;
};
export const writePostFilesAPI = async (param: { accessToken: string; data: FormData; postId: number }) => {
    const response = await Axios({
        url: `/api/v1/post/top-post-file?postId=${param.postId}`,
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data; boundary=someArbitraryUniqueString',
        },
        data: param.data,
    });
    return response;
};
