import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { FlatList, Image, Platform, View } from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import { useRecoilValue } from 'recoil';
import { useInfiniteQuery, useMutation } from 'react-query';

import Icons from '../../smallest/Icons';
import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import NormalText from '../../smallest/NormalText';
import TouchButton from '../../smallest/TouchButton';
import SemiBoldText from '../../smallest/SemiBoldText';
import CommentListItem from '../../organisms/cummunity/CommentListItem';
import { userAuthAtom } from '../../../store/atoms';
import { threadItemTemplateStyles } from '../../../styles/styles';
import { getCommentListAPI, reportAPI } from '../../../queries/api';
import { screenHeight, screenWidth } from '../../../utils/changeStyleSize';
import { CommentTopicTypes, CommentTypes, ThreadItemTemplateProps } from '../../../types/types';

const ThreadItemTemplate = ({
    postId,
    freshRePostCount,
    movetoCommunityScreen,
    moveToWriteScreen,
}: ThreadItemTemplateProps) => {
    const { accessToken } = useRecoilValue(userAuthAtom);

    const firstCommentId = useRef<number>();
    const indexNumber = useRef<number>(0);

    const [commentList, setCommentList] = useState<CommentTypes[]>([]);
    const [isCommentRefresh, setIsCommentRefresh] = useState<boolean>(false);
    const [postValue, setPostValue] = useState<CommentTopicTypes>({
        title: '',
        rePostCount: 0,
        placeName: '',
        time: '',
        distance: '',
        backgroundMapUrl: '',
    });

    // Get comment list API
    const {
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
        refetch: commentRefetch,
        remove: commentRemove,
    } = useInfiniteQuery(
        ['getCommentList'],
        ({ pageParam = 0 }) =>
            getCommentListAPI({
                accessToken,
                postId,
                curX: 37.49795103144074,
                curY: 127.02760985223079,
                page: pageParam,
            }),
        {
            cacheTime: 0,
            getNextPageParam: (lastPage, allPages) => {
                const total = lastPage.data.data.postList.totalPages;
                const nextPage = lastPage.data.data.postList.pageable.pageNumber + 1;
                return nextPage === total ? undefined : nextPage;
            },
            onSuccess: data => {
                const pageNumber = data.pages[indexNumber.current].data.data.postList.pageable.pageNumber;
                const responseCommentList: CommentTypes[] = data.pages[indexNumber.current].data.data.postList.content;
                if (pageNumber === 0) {
                    setIsCommentRefresh(false);
                    getCommentTopic(data.pages[indexNumber.current].data.data, responseCommentList);
                } else {
                    const getNotReport = responseCommentList.filter((item: CommentTypes) => !item.report);
                    setCommentList([...commentList, ...getNotReport]);
                }
                if (data.pages[0].data.data.postList.last) {
                    firstCommentId.current = responseCommentList.pop()?.postId;
                } else {
                    indexNumber.current = indexNumber.current + 1;
                }
            },
            onError: ({ response }) => {
                setIsCommentRefresh(false);
                // For Debug
                console.log('(ERROR) Get comment list API. respense: ', response);
            },
        },
    );

    // Comment report API
    const { mutate, isLoading } = useMutation(reportAPI, {
        onSuccess: () => {
            commentRemove();
            commentRefetch();
        },
        onError: ({ response }) => {
            // For Debug
            console.log('(ERROR) report API. respense: ', response);
        },
    });

    const getCommentTopic = (data: CommentTopicTypes, content: CommentTypes[]) => {
        setPostValue({
            title: data.title,
            rePostCount: data.rePostCount,
            placeName: data.placeName,
            time: data.time,
            distance: data.distance,
            backgroundMapUrl: data.backgroundMapUrl,
        });
        const getNotReport = content.filter(item => !item.report);
        setCommentList([...getNotReport]);
    };

    // Comment thread list render
    const renderItem = useCallback(
        ({ item }: { item: CommentTypes }) => (
            <CommentListItem
                comment={item}
                reportHandler={reportHandler}
                postTitle={postValue.title}
                postCount={postValue.rePostCount}
                firstCommentId={firstCommentId.current}
            />
        ),
        [postValue],
    );
    const commentListRefresh = () => {
        setIsCommentRefresh(true);
        commentRemove();
        commentRefetch();
    };
    const ItemSeparatorComponent = useCallback(() => <Spacer height={29} />, []);

    const reportHandler = (repostId: number) => {
        if (firstCommentId.current === repostId) {
            mutate({
                accessToken,
                data: {
                    postId: repostId,
                    repostId: null,
                },
            });
        } else {
            mutate({
                accessToken,
                data: {
                    postId: null,
                    repostId,
                },
            });
        }
    };

    // If write comment, get fresh list
    useLayoutEffect(() => {
        indexNumber.current = 0;
        commentRemove();
        commentRefetch();
    }, [freshRePostCount]);

    return (
        <>
            {postValue.backgroundMapUrl && (
                <View style={threadItemTemplateStyles.mapImgBox}>
                    <Image source={{ uri: postValue.backgroundMapUrl }} style={threadItemTemplateStyles.mapImg} />
                </View>
            )}

            <View
                style={[
                    threadItemTemplateStyles.main,
                    {
                        paddingTop: postValue.backgroundMapUrl ? 19 * screenHeight : 66 * screenHeight,
                    },
                ]}>
                <View style={threadItemTemplateStyles.headerBox}>
                    <View>
                        {postValue.backgroundMapUrl && (
                            <>
                                <NormalText
                                    text={`${postValue.distance} | ${postValue.placeName}`}
                                    size={12}
                                    color={Colors.TXT_GRAY}
                                />
                                <Spacer height={4} />
                            </>
                        )}
                        <View style={threadItemTemplateStyles.headerTitleBox}>
                            {postValue.title.split(' ').map(item => (
                                <SemiBoldText text={`${item} `} size={20} color={Colors.BLACK} />
                            ))}
                        </View>
                        <Spacer height={4} />
                        <NormalText
                            text={`${postValue.rePostCount} posts • updated ${postValue.time}`}
                            size={12}
                            color={Colors.BLACK}
                        />
                    </View>
                    {/* Temparay planning
                    <Image
                        source={require('../../../assets/icons/share.png')}
                        style={threadItemTemplateStyles.shareIcon}
                    /> */}
                </View>

                <View style={threadItemTemplateStyles.commentBox}>
                    <View style={threadItemTemplateStyles.commentBoxBar} />
                    <FlatList
                        data={commentList}
                        renderItem={renderItem}
                        contentContainerStyle={threadItemTemplateStyles.commentListBox}
                        ItemSeparatorComponent={ItemSeparatorComponent}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={1.3}
                        onEndReached={() => {
                            if (hasNextPage) {
                                fetchNextPage();
                            }
                        }}
                        onRefresh={commentListRefresh}
                        refreshing={isCommentRefresh}
                    />
                </View>
            </View>

            <View
                style={[
                    threadItemTemplateStyles.backButtonBox,
                    {
                        top: postValue.backgroundMapUrl ? 20 * screenHeight : 35 * screenHeight,
                    },
                ]}>
                {Platform.OS === 'android' && (
                    <>
                        {postValue.backgroundMapUrl ? (
                            <DropShadow style={threadItemTemplateStyles.ButtonShadow}>
                                <TouchButton
                                    onPress={movetoCommunityScreen}
                                    backgroundColor="#FFFFFF80"
                                    width={36}
                                    height={(36 / screenHeight) * screenWidth}
                                    borderRadius={36}>
                                    <Icons type="octicons" name="arrow-left" color={Colors.TXT_BLACK} size={22} />
                                </TouchButton>
                            </DropShadow>
                        ) : (
                            <TouchButton onPress={movetoCommunityScreen}>
                                <Icons type="octicons" name="arrow-left" color={Colors.TXT_BLACK} size={22} />
                            </TouchButton>
                        )}
                    </>
                )}
            </View>

            <View style={threadItemTemplateStyles.writeCommentBox}>
                {Platform.OS === 'android' && (
                    <DropShadow style={threadItemTemplateStyles.ButtonShadow}>
                        <TouchButton
                            onPress={() => moveToWriteScreen(postValue.title, postValue.rePostCount, postValue.time)}
                            backgroundColor={Colors.VIOLET}
                            width={100}
                            height={44}
                            borderRadius={32}>
                            <View style={threadItemTemplateStyles.writeCommentButton}>
                                <Icons type="octicons" name="plus" color={Colors.WHITE} size={14} />
                                <Spacer width={6} />
                                <SemiBoldText text="답글달기" size={14} color={Colors.WHITE} />
                            </View>
                        </TouchButton>
                    </DropShadow>
                )}
            </View>
        </>
    );
};

export default ThreadItemTemplate;
