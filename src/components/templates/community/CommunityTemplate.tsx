import React, { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import { useInfiniteQuery } from 'react-query';

import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import TouchButton from '../../smallest/TouchButton';
import SemiBoldText from '../../smallest/SemiBoldText';
import PostListItem from '../../organisms/PostListItem';
import { PostTypes } from '../../../types/types';
import { userTokenAtom } from '../../../store/atoms';
import { getAllPostAPI } from '../../../queries/api';
import { communityTemplateStyles } from '../../../styles/styles';
import { screenFont, screenHeight, screenWidth } from '../../../utils/changeStyleSize';

const CommunityTemplate = () => {
    const [isLikePostTab, setIsLikePostTab] = useState<boolean>(false);
    const tabHandler = (state: string) => {
        switch (state) {
            case 'ALL':
                setIsLikePostTab(false);
                break;
            case 'LIKE':
                setIsLikePostTab(true);
                break;
            default:
                // For Debug
                console.log('(ERROR) Tab control handler.', state);
        }
    };

    // Get all post API
    const { accessToken } = useRecoilValue(userTokenAtom);
    const indexNumber = useRef<number>(0);
    const [allPostList, setAllPostList] = useState<PostTypes[]>([]);
    const { hasNextPage, isFetching, isFetchingNextPage, fetchNextPage, refetch, remove } = useInfiniteQuery(
        ['getAllPosts'],
        ({ pageParam = 0 }) =>
            getAllPostAPI({
                curLat: 37.49795103144074,
                curLon: 127.02760985223079,
                accessToken,
                page: pageParam,
            }),
        {
            getNextPageParam: (lastPage, allPages) => {
                const total = lastPage.data.data.totalPages;
                const nextPage = lastPage.data.data.pageable.pageNumber + 1;
                return nextPage === total ? undefined : nextPage;
            },
            onSuccess: data => {
                const pageNumber = data.pages[indexNumber.current].data.data.pageable.pageNumber;
                if (pageNumber === 0) {
                    setAllPostList(data.pages[indexNumber.current].data.data.content);
                } else {
                    setAllPostList([...allPostList, ...data.pages[indexNumber.current].data.data.content]);
                }
                if (!data.pages[indexNumber.current].data.data.last) {
                    indexNumber.current = indexNumber.current + 1;
                }
            },
            onError: ({ response }) => {
                // For Debug
                console.log('(ERROR) Get all post API. respense: ', response);
            },
        },
    );

    // Flst list props value
    const keyExtractor = useCallback((item: PostTypes) => item.postId + '', []);
    const renderItem = useCallback(({ item }: { item: PostTypes }) => <PostListItem post={item} isBorder={true} />, []);
    const ItemSeparatorComponent = useCallback(() => <Spacer height={33} />, []);
    const ListFooterComponent = useCallback(() => <Spacer height={260} />, []);

    return (
        <View>
            <View style={communityTemplateStyles.headerBox}>
                <SemiBoldText text="커뮤니티" size={20} color="#000000" />
            </View>

            <View style={communityTemplateStyles.tabBox}>
                <View
                    style={[
                        communityTemplateStyles.tabButton,
                        {
                            borderBottomWidth: isLikePostTab ? undefined : 1.5 * screenFont,
                        },
                    ]}>
                    <TouchButton onPress={() => tabHandler('ALL')}>
                        <SemiBoldText text="전체 게시판" size={16} color={Colors.BLACK} />
                    </TouchButton>
                </View>
                <View
                    style={[
                        communityTemplateStyles.tabButton,
                        {
                            borderBottomWidth: isLikePostTab ? 1.5 * screenFont : undefined,
                        },
                    ]}>
                    <TouchButton onPress={() => tabHandler('LIKE')}>
                        <SemiBoldText text="관심 게시판" size={16} color={Colors.BLACK} />
                    </TouchButton>
                </View>
            </View>

            <FlatList
                keyExtractor={keyExtractor}
                data={allPostList}
                renderItem={renderItem}
                ItemSeparatorComponent={ItemSeparatorComponent}
                ListFooterComponent={ListFooterComponent}
                contentContainerStyle={{ paddingHorizontal: 16 * screenWidth, paddingTop: 17 * screenHeight }}
                onEndReachedThreshold={0.5}
                onEndReached={({ distanceFromEnd }) => {
                    if (distanceFromEnd > 0 && hasNextPage) {
                        fetchNextPage();
                    }
                }}
            />
            {isFetching && <ActivityIndicator size="large" />}
        </View>
    );
};

export default CommunityTemplate;
