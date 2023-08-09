import { atom } from 'recoil';
import {
    emailAuthAtomTypes,
    joinMemberTypes,
    userInfoAtomTypes,
    userAuthAtomTypes,
    PostTypes,
    placeSearchResultAtomTypes,
} from '../types/common/types';

// AUTH
export const userAuthAtom = atom<userAuthAtomTypes>({
    key: 'userAuthAtom',
    default: {
        accessToken: '',
        refreshToken: '',
        isLogIn: false,
    },
});

// USER_INFO
export const userInfoAtom = atom<userInfoAtomTypes>({
    key: 'userInfoAtom',
    default: {
        memberId: null,
        nickname: '',
        email: '',
        isAllowLocation: false,
    },
});

// JOIN
export const joinMemberAtom = atom<joinMemberTypes>({
    key: 'joinMemberAtom',
    default: {
        email: '',
        password: '',
        nickName: '',
    },
});
export const emailAuthAtom = atom<emailAuthAtomTypes>({
    key: 'emailAuthAtom',
    default: {
        number: 0,
        isAuthorizationPass: false,
    },
});

// COMMUNITY
export const nearPostListAtom = atom<PostTypes[]>({
    key: 'nearPostListAtom',
    default: [],
});

// MAP
export const mapLocationSearchResultAtom = atom<placeSearchResultAtomTypes>({
    key: 'mapLocationSearchResultAtom',
    default: {
        location: {
            lat: 0,
            lng: 0,
        },
        placeName: '',
        address: '',
    },
});
export const writingPlaceLocationSearchResultAtom = atom<placeSearchResultAtomTypes>({
    key: 'writingPlaceLocationSearchResultAtom',
    default: {
        location: {
            lat: 0,
            lng: 0,
        },
        placeName: '',
        address: '',
    },
});
