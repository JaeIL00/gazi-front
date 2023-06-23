import React, { useCallback, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useInfiniteQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import FastImage from 'react-native-fast-image';
import NormalText from '../../smallest/NormalText';
import PostListItem from '../../organisms/PostListItem';

import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import MediumText from '../../smallest/MediumText';
import TouchButton from '../../smallest/TouchButton';
import SemiBoldText from '../../smallest/SemiBoldText';
import { PostTypes } from '../../../types/types';
import { userAuthAtom } from '../../../store/atoms';
import { getMyPostCommentAPI } from '../../../queries/api';
import { myPostCommentTemplateStyles } from '../../../styles/styles';
import { MyCommentTypes, MyPostCommentTemplateProps } from '../../../types/types';
import { screenFont, screenHeight, screenWidth } from '../../../utils/changeStyleSize';

const MyPostCommentTemplate = ({ moveToBackScreenHandler }: MyPostCommentTemplateProps) => {
    const { accessToken } = useRecoilValue(userAuthAtom);

    const pageIndexRef = useRef<number>(0);
    const isPostRef = useRef<boolean>(true);

    const [isPost, setIsPost] = useState<boolean>(true);
    const [postList, setPostList] = useState<PostTypes[]>([]);
    const [count, setCount] = useState<number>(0);
    const [commentList, setCommentList] = useState<MyCommentTypes[]>([]);

    // Get my post or comment API
    const { hasNextPage, fetchNextPage, refetch, remove } = useInfiniteQuery(
        'myPostComment',
        ({ pageParam = 0 }) =>
            getMyPostCommentAPI({
                accessToken,
                curLat: 37.49795103144074,
                curLon: 127.02760985223079,
                isPost: isPostRef.current,
                page: pageParam,
            }),
        {
            // Screen unfocused pageParam number save bug handling
            cacheTime: 0,
            getNextPageParam: lastPage => {
                if (isPost) {
                    const total = lastPage.data.data.postDtoPage.totalPages;
                    const nextPage = lastPage.data.data.postDtoPage.pageable.pageNumber + 1;
                    return nextPage === total ? undefined : nextPage;
                } else {
                    const total = lastPage.data.data.repostListPage.totalPages;
                    const nextPage = lastPage.data.data.repostListPage.pageable.pageNumber + 1;
                    return nextPage === total ? undefined : nextPage;
                }
            },
            onSuccess: data => {
                if (isPost) {
                    const responseList = data.pages[pageIndexRef.current].data.data.postDtoPage.content;

                    if (data.pages[pageIndexRef.current].data.data.postDtoPage.pageable.pageNumber === 0) {
                        setPostList(responseList);
                    } else {
                        setPostList([...postList, ...responseList]);
                    }
                    if (data.pages[pageIndexRef.current].data.data.postDtoPage.first) {
                        setCount(data.pages[pageIndexRef.current].data.data.postCount);
                    }
                    if (data.pages[pageIndexRef.current].data.data.postDtoPage.last) {
                        pageIndexRef.current = 0;
                    } else {
                        pageIndexRef.current = pageIndexRef.current + 1;
                    }
                } else {
                    const responseList = data.pages[pageIndexRef.current].data.data.repostListPage.content;
                    if (data.pages[pageIndexRef.current].data.data.repostListPage.pageable.pageNumber === 0) {
                        setCommentList(responseList);
                    } else {
                        setCommentList([...commentList, ...responseList]);
                    }
                    if (data.pages[pageIndexRef.current].data.data.repostListPage.first) {
                        setCount(data.pages[pageIndexRef.current].data.data.repostCount);
                    }
                    if (data.pages[pageIndexRef.current].data.data.repostListPage.last) {
                        pageIndexRef.current = 0;
                    } else {
                        pageIndexRef.current = pageIndexRef.current + 1;
                    }
                }
            },
            onError: error => {
                // For Debug
                console.log('(ERROR) Get my post or comment API.', error);
            },
        },
    );

    const tabHandler = (state: string) => {
        pageIndexRef.current = 0;
        switch (state) {
            case 'POST':
                setIsPost(true);
                isPostRef.current = true;
                break;
            case 'COMMENT':
                setIsPost(false);
                isPostRef.current = false;
                break;
            default:
                // For Debug
                console.log('(ERROR) Tab control handler.', state);
        }
        remove();
        refetch();
    };

    const renderItemPost = useCallback(
        ({ item }: { item: PostTypes }) => <PostListItem post={item} isBorder={true} />,
        [],
    );
    const renderItemComment = useCallback(
        ({ item }: { item: MyCommentTypes }) => (
            <View style={myPostCommentTemplateStyles.commentItem}>
                <MediumText text={item.title} size={16} color={Colors.BLACK} numberOfLines={1} />
                <Spacer height={4} />
                <NormalText
                    text={`회원님이 "${item.content}" 사건에 댓글을 남겼습니다`}
                    size={12}
                    color={Colors.TXT_GRAY}
                    numberOfLines={1}
                />
                <Spacer height={4} />
                <NormalText text={item.createTime} size={12} color={Colors.TXT_GRAY} />
            </View>
        ),
        [],
    );
    const ListFooterComponent = useCallback(() => <Spacer height={140} />, []);

    return (
        <View>
            <View style={myPostCommentTemplateStyles.headerBox}>
                <TouchButton onPress={moveToBackScreenHandler} hitSlop={20}>
                    <FastImage
                        source={require('../../../assets/icons/to-left-black.png')}
                        style={myPostCommentTemplateStyles.headerIcon}
                    />
                </TouchButton>
                <Spacer width={21} />
                <MediumText text="내가 작성한 글" size={18} color={Colors.BLACK} />
            </View>

            <View style={myPostCommentTemplateStyles.tabBox}>
                <View
                    style={[
                        myPostCommentTemplateStyles.tabButton,
                        {
                            borderColor: isPost ? Colors.BLACK : Colors.BORDER_GRAY,
                        },
                    ]}>
                    <TouchButton onPress={() => tabHandler('POST')}>
                        <SemiBoldText text="작성한 글" size={16} color={Colors.BLACK} />
                    </TouchButton>
                </View>
                <View
                    style={[
                        myPostCommentTemplateStyles.tabButton,
                        {
                            borderColor: !isPost ? Colors.BLACK : Colors.BORDER_GRAY,
                        },
                    ]}>
                    <TouchButton onPress={() => tabHandler('COMMENT')}>
                        <SemiBoldText text="나의 답글" size={16} color={Colors.BLACK} />
                    </TouchButton>
                </View>
            </View>

            <View style={{ paddingTop: 12 * screenHeight, paddingLeft: 16 * screenWidth }}>
                <NormalText text={`총 ${count}개`} size={14} color="#757575" />
            </View>
            {isPost ? (
                <FlatList
                    data={postList}
                    renderItem={renderItemPost}
                    ListFooterComponent={ListFooterComponent}
                    onEndReachedThreshold={1}
                    onEndReached={() => {
                        if (hasNextPage) {
                            fetchNextPage();
                        }
                    }}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <FlatList
                    data={commentList}
                    renderItem={renderItemComment}
                    ListFooterComponent={ListFooterComponent}
                    onEndReachedThreshold={1}
                    onEndReached={() => {
                        if (hasNextPage) {
                            fetchNextPage();
                        }
                    }}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
};

export default MyPostCommentTemplate;
