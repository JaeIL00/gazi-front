import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import { useInfiniteQuery } from 'react-query';
import Geolocation from '@react-native-community/geolocation';

import PostListItem from '../../organisms/PostListItem';
import { PostTypes } from '../../../types/types';
import { getCommunityPostAPI } from '../../../queries/api';
import { allBoardTemplateStyles } from '../../../styles/styles';
import { userAuthAtom, userInfoAtom } from '../../../store/atoms';

const ALL_POSTS = '';

const AllBoardTemplate = () => {
    const { accessToken } = useRecoilValue(userAuthAtom);
    const { isAllowLocation } = useRecoilValue(userInfoAtom);

    const postsResponseIndexRef = useRef<number>(0);

    const [postList, setPostList] = useState<PostTypes[]>([]);
    const [isPostRefresh, setIsPostRefresh] = useState<boolean>(false);
    const [currentPosition, setCurrentPosition] = useState<{ lat: number; lon: number; isChecked: boolean }>({
        lat: 0,
        lon: 0,
        isChecked: false,
    });

    // Get post API
    const {
        hasNextPage,
        isFetching,
        fetchNextPage,
        refetch: getPostRefetch,
        remove,
    } = useInfiniteQuery(
        'getAllPosts',
        ({ pageParam = 0 }) =>
            getCommunityPostAPI({
                curLat: currentPosition.lat,
                curLon: currentPosition.lon,
                accessToken,
                keywords: ALL_POSTS,
                page: pageParam,
            }),
        {
            enabled: false,
            getNextPageParam: (lastPage, allPages) => {
                const total = lastPage.data.data.totalPages;
                const nextPage = lastPage.data.data.pageable.pageNumber + 1;
                return nextPage === total ? undefined : nextPage;
            },
            onSuccess: data => {
                const pageNumber = data.pages[postsResponseIndexRef.current].data.data.pageable.pageNumber;
                const content = data.pages[postsResponseIndexRef.current].data.data.content;
                const isLast = data.pages[postsResponseIndexRef.current].data.data.last;
                getPostHandler(pageNumber, content, isLast);
                setIsPostRefresh(false);
            },
            onError: ({ response }) => {
                // For Debug
                console.log('(ERROR) Get post API. respense: ', response);
            },
        },
    );

    // Get my current location
    const getMyCurrentLocation = () => {
        if (isAllowLocation) {
            Geolocation.getCurrentPosition(info => {
                setCurrentPosition({
                    lat: info.coords.latitude,
                    lon: info.coords.longitude,
                    isChecked: true,
                });
            });
        } else {
            setCurrentPosition({
                lat: 0,
                lon: 0,
                isChecked: true,
            });
        }
    };

    // Get post list handler
    const getPostHandler = (pageNumber: number, content: PostTypes[], isLast: boolean) => {
        if (pageNumber === 0) {
            setPostList(content);
        } else {
            setPostList([...postList, ...content]);
        }
        if (!isLast) {
            postsResponseIndexRef.current = postsResponseIndexRef.current + 1;
        }
    };

    const postListRefresh = () => {
        postsResponseIndexRef.current = 0;
        setIsPostRefresh(true);
        remove();
        getPostRefetch();
    };

    // Flst list props callback
    const keyExtractor = useCallback((item: PostTypes) => item.postId + '', []);
    const renderItem = useCallback(({ item }: { item: PostTypes }) => <PostListItem post={item} isBorder={true} />, []);

    useLayoutEffect(() => {
        getMyCurrentLocation();
    }, []);

    useLayoutEffect(() => {
        if (currentPosition.isChecked) {
            remove();
            getPostRefetch();
        }
    }, [currentPosition]);

    return (
        <View style={allBoardTemplateStyles.container}>
            <FlatList
                keyExtractor={keyExtractor}
                data={postList}
                renderItem={renderItem}
                onEndReachedThreshold={1.0}
                onEndReached={() => {
                    if (hasNextPage) {
                        fetchNextPage();
                    }
                }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl onRefresh={postListRefresh} refreshing={isPostRefresh} progressViewOffset={-10} />
                }
            />

            {isFetching && !isPostRefresh && <ActivityIndicator size="large" />}
        </View>
    );
};

export default AllBoardTemplate;
