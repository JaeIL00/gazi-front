import axios from 'axios';
import Config from 'react-native-config';

// const API = axios.create({
//     baseURL: Config.API_BASE_URL,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

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
