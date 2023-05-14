import React, { useCallback, useRef, useState } from 'react';
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
import { userTokenAtom } from '../../../store/atoms';
import { threadItemTemplateStyles } from '../../../styles/styles';
import { getCommentListAPI, reportAPI } from '../../../queries/api';
import { screenHeight, screenWidth } from '../../../utils/changeStyleSize';
import { CommentTopicTypes, CommentTypes, ThreadItemTemplateProps } from '../../../types/types';

const ThreadItemTemplate = ({ postId, movetoCommunityScreen, moveToWriteScreen }: ThreadItemTemplateProps) => {
    const { accessToken } = useRecoilValue(userTokenAtom);
    const [postValue, setPostValue] = useState<CommentTopicTypes>({
        title: '',
        rePostCount: 0,
        placeName: '',
        time: '',
        distance: '',
        backgroundMapUrl: '',
    });
    const [commentList, setCommentList] = useState<CommentTypes[]>([]);
    const firstCommentId = useRef<number>();
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
            getCommentListAPI({ accessToken, postId, curX: 37.49795103144074, curY: 127.02760985223079 }),
        {
            getNextPageParam: (lastPage, allPages) => {
                // const total = lastPage.data.data.totalPages;
                // const nextPage = lastPage.data.data.pageable.pageNumber + 1;
                // return nextPage > total ? undefined : nextPage;
                // console.log('last', lastPage.data);
            },
            onSuccess: data => {
                const pageNumber = data.pages[0].data.data.postList.pageable.pageNumber;
                const responseCommentList: CommentTypes[] = data.pages[0].data.data.postList.content;
                if (pageNumber === 0) {
                    getCommentTopic(data.pages[0].data.data, responseCommentList);
                } else {
                    const getNotReport = responseCommentList.filter((item: CommentTypes) => !item.report);
                    setCommentList([...responseCommentList, ...getNotReport]);
                }
                if (data.pages[0].data.data.postList.last) {
                    firstCommentId.current = responseCommentList.pop()?.id;
                }
            },
            onError: ({ response }) => {
                // For Debug
                console.log('(ERROR) Get comment list API. respense: ', response);
            },
        },
    );
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
        ({ item }: { item: CommentTypes }) => <CommentListItem comment={item} reportHandler={reportHandler} />,
        [],
    );
    const ItemSeparatorComponent = useCallback(() => <Spacer height={29} />, []);

    // report API
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

    return (
        <>
            <View style={threadItemTemplateStyles.mapImgBox}>
                {postValue.backgroundMapUrl && (
                    <Image source={{ uri: postValue.backgroundMapUrl }} style={threadItemTemplateStyles.mapImg} />
                )}
            </View>

            <View style={threadItemTemplateStyles.main}>
                <View style={threadItemTemplateStyles.headerBox}>
                    <View>
                        <NormalText
                            text={`${postValue.distance} | ${postValue.placeName}`}
                            size={12}
                            color={Colors.TXT_GRAY}
                        />
                        <Spacer height={4} />
                        <SemiBoldText text={postValue.title} size={20} color={Colors.BLACK} />
                        <Spacer height={4} />
                        <NormalText
                            text={`${postValue.rePostCount} posts • updated ${postValue.time}`}
                            size={12}
                            color={Colors.BLACK}
                        />
                    </View>
                    <Image
                        source={require('../../../assets/icons/share.png')}
                        style={threadItemTemplateStyles.shareIcon}
                    />
                </View>

                <View style={threadItemTemplateStyles.commentBox}>
                    <View style={threadItemTemplateStyles.commentBoxBar} />
                    <FlatList
                        data={commentList}
                        renderItem={renderItem}
                        contentContainerStyle={threadItemTemplateStyles.commentListBox}
                        ItemSeparatorComponent={ItemSeparatorComponent}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>

            <View style={threadItemTemplateStyles.backButtonBox}>
                {Platform.OS === 'android' && (
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
