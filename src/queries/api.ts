import axios from 'axios';
import Config from 'react-native-config';

export const memberJoinAPIs = async (props: { endpoint: string; method: string; data: {} }) => {
    const response = await axios({
        baseURL: Config.API_BASE_URL,
        url: `/api/v1/member/${props.endpoint}`,
        method: props.method,
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(props.data),
    });
    return response;
};
export const checkNicknameAPI = async (nickname: string) => {
    const response = await axios({
        baseURL: Config.API_BASE_URL,
        url: `/api/v1/member/check-nickname?nickName=${nickname}`,
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response;
};
