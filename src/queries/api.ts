import axios from 'axios';
import Config from 'react-native-config';
import { CommentDtoTypes, PostDtoTypes } from '../types/types';

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
export const nearPlaceGoogleAPI = async (curLat: number, curLon: number, nextPageToken: string) => {
    const url = nextPageToken
        ? `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${nextPageToken}&key=${Config.GOOGLE_PLACE_API_KEY}`
        : `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${curLat}%2C${curLon}&radius=1000&key=${Config.GOOGLE_PLACE_API_KEY}`;
    const response = await axios({
        method: 'get',
        url,
        headers: {
            'Accept-Language': 'ko',
        },
    });
    return response;
};

// ACCOUT LOGIN LOGOUT
export const fcmDeviceTokenAPI = async (param: { accessToken: string; fireBaseToken: string }) => {
    const response = await Axios({
        url: '/api/v1/member/get-firebase-access-key',
        method: 'post',
        headers: {
            Authorization: `Bearer ${param.accessToken}`,
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({ fireBaseToken: param.fireBaseToken }),
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
export const deleteMemberAPI = async (accessToken: string) => {
    const response = await Axios({
        url: '/api/v1/member/delete-member',
        method: 'post',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response;
};
export const logoutAPI = async (data: { accessToken: string; refreshToken: string }) => {
    const response = await Axios({
        url: '/api/v1/member/logout',
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
export const getMyPostCommentAPI = async (param: {
    accessToken: string;
    curLat: number;
    curLon: number;
    isPost: boolean;
    page: number;
}) => {
    const response = await Axios({
        url: `/api/v1/post/myPost?curLat=${param.curLat}&curLon=${param.curLon}&isPost=${param.isPost}&page=${param.page}`,
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${param.accessToken}`,
        },
    });
    return response;
};

// KEYWORD
export const addLikeKeywordsAPI = async (param: { accessToken: string; data: number[] }) => {
    const response = await Axios({
        url: '/api/v1/keyword/interest-keyword',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${param.accessToken}`,
        },
        data: JSON.stringify({
            myKeywordList: param.data,
        }),
    });
    return response;
};
export const getMyLikeKeywordsAPI = async (accessToken: string) => {
    const response = await Axios({
        url: '/api/v1/member/my-keyword',
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response;
};
export const editMyLikeKeywordsAPI = async (param: {
    accessToken: string;
    addKeywordIdList: number[];
    deleteKeywordIdList: number[];
}) => {
    const response = await Axios({
        url: '/api/v1/keyword/update-interest-keyword',
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${param.accessToken}`,
        },
        data: JSON.stringify({
            addKeywordIdList: param.addKeywordIdList,
            deleteKeywordIdList: param.deleteKeywordIdList,
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
    isNearSearch: boolean;
}) => {
    const response = await Axios({
        url: `/api/v1/post/locationPost?minLat=${param.minLat}&minLon=${param.minLon}&maxLat=${param.maxLat}&maxLon=${param.maxLon}&curLat=${param.curLat}&curLon=${param.curLon}&page=${param.page}&isNearSearch=${param.isNearSearch}`,
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${param.accessToken}`,
        },
    });
    return response;
};

// COMMUNITY
export const getCommunityPostAPI = async (param: {
    accessToken: string;
    curLat: number;
    curLon: number;
    keywords: string;
    page: number;
}) => {
    const response = await Axios({
        url: `/api/v1/post/top-post-list?curLat=${param.curLat}&curLon=${param.curLon}${param.keywords}&page=${param.page}`,
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${param.accessToken}`,
        },
    });
    return response;
};
export const getCommentListAPI = async (param: {
    accessToken: string;
    postId: number;
    curX: number;
    curY: number;
    page: number;
}) => {
    const response = await Axios({
        url: `/api/v1/post/top-post?postId=${param.postId}&curX=${param.curX}&curY=${param.curY}&page=${param.page}`,
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${param.accessToken}`,
        },
    });

    return response;
};
export const reportAPI = async (param: {
    accessToken: string;
    data: {
        postId: number | null;
        repostId: number | null;
    };
}) => {
    const response = await Axios({
        url: '/api/v1/report',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${param.accessToken}`,
        },
        data: JSON.stringify(param.data),
    });
    return response;
};
export const addHelpfulCommentAPI = async (param: {
    accessToken: string;
    data: {
        postId: number | null;
        repostId: number | null;
    };
}) => {
    const response = await Axios({
        url: '/api/v1/like',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${param.accessToken}`,
        },
        data: JSON.stringify(param.data),
    });
    return response;
};
export const delHelpfulCommentAPI = async (param: {
    accessToken: string;
    data: {
        postId: number | null;
        repostId: number | null;
    };
}) => {
    const response = await Axios({
        url: '/api/v1/like',
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${param.accessToken}`,
        },
        data: JSON.stringify(param.data),
    });
    return response;
};

// TEMPORARY COMMUNITY
export const writePostAPI = async (param: { accessToken: string; data: PostDtoTypes }) => {
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
export const writeCommentAPI = async (param: { accessToken: string; data: CommentDtoTypes }) => {
    const response = await Axios({
        url: '/api/v1/post/repost',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${param.accessToken}`,
        },
        data: JSON.stringify(param.data),
    });
    return response;
};
export const writeCommentFilesAPI = async (param: { data: FormData; rePostId: number }) => {
    const response = await Axios({
        url: `/api/v1/post/repost-file?repostId=${param.rePostId}`,
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data; boundary=someArbitraryUniqueString',
        },
        data: param.data,
    });
    return response;
};

// ALARM
export const getAlarmHistoryAPI = async (param: { accessToken: string; page: number; isKeywordAlarm: boolean }) => {
    const response = await Axios({
        url: param.isKeywordAlarm
            ? `/api/v1/member/get_notification_list?notificationEnums=KEYWORD&page=${param.page}`
            : `/api/v1/member/get_notification_list?notificationEnums=LIKE?notificationEnums=REPOST&page=${param.page}`,
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${param.accessToken}`,
        },
    });
    return response;
};
