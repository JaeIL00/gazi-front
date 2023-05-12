import React, { useLayoutEffect, useState } from 'react';
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

const ThreadItemTemplate = ({ post, movetoCommunityScreen }: ThreadItemTemplateProps) => {
    const { accessToken } = useRecoilValue(userTokenAtom);
    const [postValue, setPostValue] = useState<CommentTopicTypes>({
        title: '',
        rePostCount: 0,
        placeName: '',
        time: '',
        distance: '',
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
    const getCommentTopic = (data: CommentTopicTypes, postList: CommentTypes[]) => {
        setPostValue({
            title: data.title,
            rePostCount: data.rePostCount,
            placeName: data.placeName,
            time: '1분전',
            distance: '3km',
        });
        setCommentList([...commentList, ...postList]);
    };

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

            <View style={threadItemTemplateStyles.mapCrop}></View>

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

                <View
                    style={{
                        position: 'relative',
                    }}>
                    <View
                        style={{
                            borderLeftWidth: 1 * screenFont,
                            borderColor: '#EBEBEB',
                            position: 'absolute',
                            top: 42 * screenHeight,
                            left: 2.8 * screenWidth,
                            width: 1 * screenWidth,
                            height: '100%',
                        }}
                    />
                    <FlatList
                        data={commentList}
                        renderItem={({ item }) => (
                            <View style={{ flexDirection: 'row', width: '94%' }}>
                                <View
                                    style={{
                                        width: 6 * screenWidth,
                                        height: 6 * screenWidth,
                                        backgroundColor: '#D9D9D9',
                                        borderRadius: 6 * screenFont,
                                        marginRight: 14 * screenWidth,
                                        marginTop: 18 * screenHeight,
                                    }}
                                />
                                {/* 헤더 */}
                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'flex-start',
                                                justifyContent: 'space-between',
                                                width: '100%',
                                            }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <View
                                                    style={{
                                                        width: 36 * screenWidth,
                                                        height: 36 * screenWidth,
                                                        backgroundColor: '#999',
                                                        borderRadius: 36 * screenFont,
                                                    }}></View>
                                                <View style={{ paddingLeft: 7 * screenWidth }}>
                                                    <SemiBoldText text={item.nickName} size={16} color={Colors.BLACK} />
                                                    <Spacer height={1} />
                                                    <MediumText
                                                        text={`${item.distance} | ${item.time}`}
                                                        size={11}
                                                        color="#999999"
                                                    />
                                                </View>
                                            </View>
                                            <TouchButton onPress={() => {}}>
                                                <MediumText text="신고하기" size={11} color={Colors.BLACK} />
                                            </TouchButton>
                                        </View>
                                    </View>

                                    {/* 내용 및 라이크 */}
                                    <View style={{ paddingTop: 8 * screenHeight }}>
                                        <NormalText text={item.content} size={13} color="#000000" />
                                        <Spacer height={8} />
                                        {/* {item.fileList.length === 1 && (
                                            <TouchButton onPress={() => {}} width={308} height={208}>
                                                <Image
                                                    source={{ uri: item.fileList[0].fileUrl }}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: 5 * screenFont,
                                                    }}
                                                />
                                            </TouchButton>
                                        )} */}
                                        {/* {item.fileList.length === 2 && (
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    // backgroundColor: 'tomato',
                                                }}>
                                                {item.fileList.map(file => (
                                                    <TouchButton onPress={() => {}} width={151} height={208}>
                                                        <Image
                                                            source={{ uri: file.fileUrl }}
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                borderRadius: 5 * screenFont,
                                                            }}
                                                        />
                                                    </TouchButton>
                                                ))}
                                            </View>
                                        )}
                                        {item.fileList.length === 3 && (
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    height: 208 * screenHeight,
                                                }}>
                                                <View style={{ width: '49%' }}>
                                                    <TouchButton onPress={() => {}} width={151} height={208}>
                                                        <Image
                                                            source={{ uri: item.fileList[0].fileUrl }}
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                borderRadius: 5 * screenFont,
                                                            }}
                                                        />
                                                    </TouchButton>
                                                </View>
                                                <View style={{ width: '49%', justifyContent: 'space-between' }}>
                                                    <TouchButton onPress={() => {}} width={151} height={101}>
                                                        <Image
                                                            source={{ uri: item.fileList[1].fileUrl }}
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                borderRadius: 5 * screenFont,
                                                            }}
                                                        />
                                                    </TouchButton>
                                                    <TouchButton onPress={() => {}} width={151} height={101}>
                                                        <Image
                                                            source={{ uri: item.fileList[2].fileUrl }}
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                borderRadius: 5 * screenFont,
                                                            }}
                                                        />
                                                    </TouchButton>
                                                </View>
                                            </View>
                                        )}
                                        {(item.fileList.length === 4 || item.fileList.length > 4) && (
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    height: 208 * screenHeight,
                                                }}>
                                                <View style={{ width: '49%', justifyContent: 'space-between' }}>
                                                    <TouchButton onPress={() => {}} width={151} height={101}>
                                                        <Image
                                                            source={{ uri: item.fileList[0].fileUrl }}
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                borderRadius: 5 * screenFont,
                                                            }}
                                                        />
                                                    </TouchButton>
                                                    <TouchButton onPress={() => {}} width={151} height={101}>
                                                        <Image
                                                            source={{ uri: item.fileList[1].fileUrl }}
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                borderRadius: 5 * screenFont,
                                                            }}
                                                        />
                                                    </TouchButton>
                                                </View>
                                                <View style={{ width: '49%', justifyContent: 'space-between' }}>
                                                    <TouchButton onPress={() => {}} width={151} height={101}>
                                                        <Image
                                                            source={{ uri: item.fileList[2].fileUrl }}
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                borderRadius: 5 * screenFont,
                                                            }}
                                                        />
                                                    </TouchButton>
                                                    {item.fileList.length > 4 ? (
                                                        <TouchButton onPress={() => {}} width={151} height={101}>
                                                            <>
                                                                <Image
                                                                    source={{ uri: item.fileList[3].fileUrl }}
                                                                    style={{
                                                                        width: '100%',
                                                                        height: '100%',
                                                                        borderRadius: 5 * screenFont,
                                                                    }}
                                                                />
                                                                <View
                                                                    style={{
                                                                        backgroundColor: '#171717CC',
                                                                        width: '100%',
                                                                        height: '100%',
                                                                        position: 'absolute',
                                                                        borderRadius: 5 * screenFont,
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                    }}>
                                                                    <MediumText
                                                                        text={`+${item.fileList.length - 3}`}
                                                                        size={18}
                                                                        color={Colors.WHITE}
                                                                    />
                                                                </View>
                                                            </>
                                                        </TouchButton>
                                                    ) : (
                                                        <TouchButton onPress={() => {}} width={151} height={101}>
                                                            <Image
                                                                source={{ uri: item.fileList[3].fileUrl }}
                                                                style={{
                                                                    width: '100%',
                                                                    height: '100%',
                                                                    borderRadius: 5 * screenFont,
                                                                }}
                                                            />
                                                        </TouchButton>
                                                    )}
                                                </View>
                                            </View>
                                        )} */}
                                    </View>

                                    <Spacer height={9} />

                                    <TouchButton onPress={() => {}} alignSelf="flex-start">
                                        <View style={{ flexDirection: 'row' }}>
                                            <Icons type="feather" name="thumbs-up" size={15} color={Colors.TXT_GRAY} />
                                            <Spacer width={2} />
                                            <NormalText
                                                text={`도움돼요 ${item.likeCount}`}
                                                size={13}
                                                color={Colors.TXT_GRAY}
                                            />
                                        </View>
                                    </TouchButton>
                                </View>
                            </View>
                        )}
                        contentContainerStyle={{
                            marginTop: 24 * screenHeight,
                            paddingBottom: 20 * screenHeight,
                        }}
                        ItemSeparatorComponent={() => <Spacer height={29} />}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </>
    );
};

export default ThreadItemTemplate;
