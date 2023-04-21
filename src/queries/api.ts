import axios from 'axios';
import Config from 'react-native-config';

// const API = axios.create({
//     baseURL: Config.API_BASE_URL,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

export const authEmail = async (email: string) => {
    const response = await axios({
        baseURL: Config.API_BASE_URL,
        url: '/api/v1/member/emailConfirm',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({
            email,
        }),
    });
    return response;
};
