import React, { useCallback, useLayoutEffect, useState } from 'react';
import { FlatList, Image, Platform, View } from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import { useRecoilValue } from 'recoil';
import { useInfiniteQuery } from 'react-query';

import Icons from '../../smallest/Icons';
import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import NormalText from '../../smallest/NormalText';
import MediumText from '../../smallest/MediumText';
import TouchButton from '../../smallest/TouchButton';
import SemiBoldText from '../../smallest/SemiBoldText';
import { userTokenAtom } from '../../../store/atoms';
import { getCommentListAPI } from '../../../queries/api';
import { threadItemTemplateStyles } from '../../../styles/styles';
import { screenFont, screenHeight, screenWidth } from '../../../utils/changeStyleSize';
import { CommentTopicTypes, CommentTypes, ThreadItemTemplateProps } from '../../../types/types';
import CommentListItem from '../../organisms/cummunity/CommentListItem';

const ThreadItemTemplate = ({ post, movetoCommunityScreen }: ThreadItemTemplateProps) => {
    const { accessToken } = useRecoilValue(userTokenAtom);
    const [postValue, setPostValue] = useState<CommentTopicTypes>({
        title: '',
        rePostCount: 0,
        placeName: '',
        time: '',
        distance: '',
        backgroundMapUri: '',
    });
    const [commentList, setCommentList] = useState<CommentTypes[]>([]);
    const { hasNextPage, isFetching, isFetchingNextPage, fetchNextPage, refetch, remove } = useInfiniteQuery(
        ['getCommentList'],
        ({ pageParam = 0 }) =>
            getCommentListAPI({ accessToken, postId: post.postId, curX: 37.49795103144074, curY: 127.02760985223079 }),
        {
            getNextPageParam: (lastPage, allPages) => {
                // const total = lastPage.data.data.totalPages;
                // const nextPage = lastPage.data.data.pageable.pageNumber + 1;
                // return nextPage > total ? undefined : nextPage;
                // console.log('last', lastPage.data);
            },
            onSuccess: data => {
                const pageNumber = data.pages[0].data.data.postList.pageable.pageNumber;
                if (pageNumber === 0) {
                    getCommentTopic(data.pages[0].data.data, data.pages[0].data.data.postList.content);
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
            time: '1분전',
            distance: '3km',
            backgroundMapUri: content[0].backgroundMapUrl,
        });
        setCommentList([...commentList, ...content]);
    };

    // Comment thread list render
    const renderItem = useCallback(({ item }: { item: CommentTypes }) => <CommentListItem comment={item} />, []);
    const ItemSeparatorComponent = useCallback(() => <Spacer height={29} />, []);

    return (
        <>
            <View style={threadItemTemplateStyles.backButtonBox}>
                {Platform.OS === 'android' && (
                    <DropShadow style={threadItemTemplateStyles.backButtonShadow}>
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
            <View style={threadItemTemplateStyles.mapImgBox}>
                {postValue.backgroundMapUri && (
                    <Image source={{ uri: postValue.backgroundMapUri }} style={threadItemTemplateStyles.mapImg} />
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
        </>
    );
};

export default ThreadItemTemplate;
