import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, FlatList, Image, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import { useInfiniteQuery, useQuery } from 'react-query';

import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import TouchButton from '../../smallest/TouchButton';
import SemiBoldText from '../../smallest/SemiBoldText';
import PostListItem from '../../organisms/PostListItem';
import { CommunityTemplateProps, PostTypes } from '../../../types/types';
import { userTokenAtom } from '../../../store/atoms';
import { getAllPostAPI, geyMyLikeKeywordsAPI } from '../../../queries/api';
import { communityTemplateStyles } from '../../../styles/styles';
import { screenFont, screenHeight, screenWidth } from '../../../utils/changeStyleSize';
import Icons from '../../smallest/Icons';
import MediumText from '../../smallest/MediumText';
import { KeywordListTypes } from '../../../types/types';
import { useIsFocused } from '@react-navigation/native';

const dummy = [
    {
        title: '서울역 시위',
        distance: '1km',
        time: '10분전',
        rePostCount: 10,
        content: '서울역에서 명동까지 40분 걸렸어요. 차라리 걸어가는 게 빠를듯.. 중간 정가장들은 무정차 통과를 해야',
        latitude: 37.49795103144074,
        longitude: 127.02760985223079,
        headKeyword: 5,
        thumbNail:
            'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201502/18/htm_20150218121015c010c011.jpg',
        postId: 1,
    },
    {
        title: '서울역 시위',
        distance: '1km',
        time: '10분전',
        rePostCount: 10,
        content: '서울역에서 명동까지 40분 걸렸어요. 차라리 걸어가는 게 빠를듯.. 중간 정가장들은 무정차 통과를 해야',
        latitude: 37.49795103144074,
        longitude: 127.02760985223079,
        headKeyword: 6,
        thumbNail:
            'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201502/18/htm_20150218121015c010c011.jpg',
        postId: 2,
    },
    {
        title: '서울역 시위',
        distance: '1km',
        time: '10분전',
        rePostCount: 10,
        content: '서울역에서 명동까지 40분 걸렸어요. 차라리 걸어가는 게 빠를듯.. 중간 정가장들은 무정차 통과를 해야',
        latitude: 37.49795103144074,
        longitude: 127.02760985223079,
        headKeyword: 2,
        thumbNail:
            'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201502/18/htm_20150218121015c010c011.jpg',
        postId: 3,
    },
    {
        title: '서울역 시위',
        distance: '1km',
        time: '10분전',
        rePostCount: 10,
        content: '서울역에서 명동까지 40분 걸렸어요. 차라리 걸어가는 게 빠를듯.. 중간 정가장들은 무정차 통과를 해야',
        latitude: 37.49795103144074,
        longitude: 127.02760985223079,
        headKeyword: 7,
        thumbNail:
            'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201502/18/htm_20150218121015c010c011.jpg',
        postId: 4,
    },
    {
        title: '서울역 시위',
        distance: '1km',
        time: '10분전',
        rePostCount: 10,
        content: '서울역에서 명동까지 40분 걸렸어요. 차라리 걸어가는 게 빠를듯.. 중간 정가장들은 무정차 통과를 해야',
        latitude: 37.49795103144074,
        longitude: 127.02760985223079,
        headKeyword: 6,
        thumbNail:
            'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201502/18/htm_20150218121015c010c011.jpg',
        postId: 5,
    },
    {
        title: '서울역 시위',
        distance: '1km',
        time: '10분전',
        rePostCount: 10,
        content: '서울역에서 명동까지 40분 걸렸어요. 차라리 걸어가는 게 빠를듯.. 중간 정가장들은 무정차 통과를 해야',
        latitude: 37.49795103144074,
        longitude: 127.02760985223079,
        headKeyword: 1,
        thumbNail:
            'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201502/18/htm_20150218121015c010c011.jpg',
        postId: 6,
    },
    {
        title: '서울역 시위',
        distance: '1km',
        time: '10분전',
        rePostCount: 10,
        content: '서울역에서 명동까지 40분 걸렸어요. 차라리 걸어가는 게 빠를듯.. 중간 정가장들은 무정차 통과를 해야',
        latitude: 37.49795103144074,
        longitude: 127.02760985223079,
        headKeyword: 5,
        thumbNail:
            'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201502/18/htm_20150218121015c010c011.jpg',
        postId: 7,
    },
    {
        title: '서울역 시위',
        distance: '1km',
        time: '10분전',
        rePostCount: 10,
        content: '서울역에서 명동까지 40분 걸렸어요. 차라리 걸어가는 게 빠를듯.. 중간 정가장들은 무정차 통과를 해야',
        latitude: 37.49795103144074,
        longitude: 127.02760985223079,
        headKeyword: 4,
        thumbNail:
            'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201502/18/htm_20150218121015c010c011.jpg',
        postId: 8,
    },
    {
        title: '서울역 시위',
        distance: '1km',
        time: '10분전',
        rePostCount: 10,
        content: '서울역에서 명동까지 40분 걸렸어요. 차라리 걸어가는 게 빠를듯.. 중간 정가장들은 무정차 통과를 해야',
        latitude: 37.49795103144074,
        longitude: 127.02760985223079,
        headKeyword: 6,
        thumbNail:
            'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201502/18/htm_20150218121015c010c011.jpg',
        postId: 9,
    },
    {
        title: '서울역 시위',
        distance: '1km',
        time: '10분전',
        rePostCount: 10,
        content: '서울역에서 명동까지 40분 걸렸어요. 차라리 걸어가는 게 빠를듯.. 중간 정가장들은 무정차 통과를 해야',
        latitude: 37.49795103144074,
        longitude: 127.02760985223079,
        headKeyword: 3,
        thumbNail:
            'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201502/18/htm_20150218121015c010c011.jpg',
        postId: 10,
    },
    {
        title: '서울역 시위',
        distance: '1km',
        time: '10분전',
        rePostCount: 10,
        content: '서울역에서 명동까지 40분 걸렸어요. 차라리 걸어가는 게 빠를듯.. 중간 정가장들은 무정차 통과를 해야',
        latitude: 37.49795103144074,
        longitude: 127.02760985223079,
        headKeyword: 4,
        thumbNail:
            'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201502/18/htm_20150218121015c010c011.jpg',
        postId: 11,
    },
    {
        title: '서울역 시위',
        distance: '1km',
        time: '10분전',
        rePostCount: 10,
        content: '서울역에서 명동까지 40분 걸렸어요. 차라리 걸어가는 게 빠를듯.. 중간 정가장들은 무정차 통과를 해야',
        latitude: 37.49795103144074,
        longitude: 127.02760985223079,
        headKeyword: 5,
        thumbNail:
            'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201502/18/htm_20150218121015c010c011.jpg',
        postId: 12,
    },
    {
        title: '서울역 시위',
        distance: '1km',
        time: '10분전',
        rePostCount: 10,
        content: '서울역에서 명동까지 40분 걸렸어요. 차라리 걸어가는 게 빠를듯.. 중간 정가장들은 무정차 통과를 해야',
        latitude: 37.49795103144074,
        longitude: 127.02760985223079,
        headKeyword: 5,
        thumbNail:
            'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201502/18/htm_20150218121015c010c011.jpg',
        postId: 13,
    },
    {
        title: '서울역 시위',
        distance: '1km',
        time: '10분전',
        rePostCount: 10,
        content: '서울역에서 명동까지 40분 걸렸어요. 차라리 걸어가는 게 빠를듯.. 중간 정가장들은 무정차 통과를 해야',
        latitude: 37.49795103144074,
        longitude: 127.02760985223079,
        headKeyword: 8,
        thumbNail:
            'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201502/18/htm_20150218121015c010c011.jpg',
        postId: 14,
    },
];

const CommunityTemplate = ({ moveToKeywordSettingScreen }: CommunityTemplateProps) => {
    const [isLikePostTab, setIsLikePostTab] = useState<boolean>(false);
    const tabHandler = (state: string) => {
        switch (state) {
            case 'ALL':
                setIsLikePostTab(false);
                break;
            case 'LIKE':
                setIsLikePostTab(true);
                if (!myKeywordList) {
                    setTimeout(() => {
                        Animated.timing(tooltipAnimRef, {
                            toValue: 10,
                            duration: 500,
                            useNativeDriver: true,
                        }).start();
                    }, 5000);
                }
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
            enabled: false,
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

    // Get my Keyword API
    const [myKeywordList, setMyKeywordList] = useState<KeywordListTypes[] | null>(null);
    const { refetch: getMyKeywordRefetch } = useQuery('getMyLikeKeyword', () => geyMyLikeKeywordsAPI(accessToken), {
        onSuccess: ({ data }) => {
            if (data.data.length < 1) {
                setMyKeywordList(null);
            } else {
                setMyKeywordList(data.data);
            }
        },
        onError: error => {
            // For Debug
            console.log('(ERROR), Get my like keyword list API.', error);
        },
    });

    // Refresh my keyword setting
    const isFocusScreen = useIsFocused();
    useLayoutEffect(() => {
        if (isLikePostTab && !myKeywordList) {
            getMyKeywordRefetch();
        }
    }, [isFocusScreen]);

    // Keyword set tooltip animation
    const tooltipAnimRef = useRef<Animated.Value>(new Animated.Value(0)).current;

    // Flst list props value
    const keyExtractor = useCallback((item: PostTypes) => item.postId + '', []);
    const renderItem = useCallback(({ item }: { item: PostTypes }) => <PostListItem post={item} isBorder={true} />, []);
    const ItemSeparatorComponent = useCallback(() => <Spacer height={33} />, []);
    const ListFooterComponent = useCallback(() => <Spacer height={260} />, []);

    return (
        <View style={communityTemplateStyles.container}>
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

            <View style={communityTemplateStyles.contentBox}>
                {isLikePostTab && !myKeywordList && (
                    <View style={communityTemplateStyles.emptyKeywordBox}>
                        <TouchButton onPress={moveToKeywordSettingScreen}>
                            <View style={communityTemplateStyles.addKeywordButton}>
                                <Icons type="entypo" name="plus" size={16} color={Colors.VIOLET} />
                                <Spacer width={4} />
                                <MediumText text="관심 키워드 추가하기" size={14} color={Colors.VIOLET} />
                            </View>
                        </TouchButton>
                        <Animated.View
                            style={[
                                communityTemplateStyles.tooltipBox,
                                {
                                    opacity: tooltipAnimRef.interpolate({
                                        inputRange: [0, 10],
                                        outputRange: [10, 0],
                                    }),
                                },
                            ]}>
                            <Image
                                source={require('../../../assets/icons/text-balloon.png')}
                                style={communityTemplateStyles.tooltipImg}
                            />
                            <View style={communityTemplateStyles.tooltipTextBox}>
                                <MediumText
                                    text="관심 키워드를 추가하면 한번에 모아볼 수 있어요"
                                    size={12}
                                    color={Colors.WHITE}
                                />
                            </View>
                        </Animated.View>
                        <View style={communityTemplateStyles.nothingBox}>
                            <Image
                                source={require('../../../assets/icons/warning.png')}
                                style={communityTemplateStyles.nothingIcon}
                            />
                            <Spacer height={20} />
                            <SemiBoldText text="관심 키워드를 골라주세요" size={18} color={Colors.BTN_GRAY} />
                        </View>
                    </View>
                )}

                {myKeywordList && (
                    <FlatList
                        keyExtractor={keyExtractor}
                        data={dummy}
                        renderItem={renderItem}
                        ItemSeparatorComponent={ItemSeparatorComponent}
                        ListFooterComponent={ListFooterComponent}
                        onEndReachedThreshold={0.5}
                        onEndReached={({ distanceFromEnd }) => {
                            if (distanceFromEnd > 0 && hasNextPage) {
                                fetchNextPage();
                            }
                        }}
                    />
                )}
                {isFetching && <ActivityIndicator size="large" />}
            </View>
        </View>
    );
};

export default CommunityTemplate;
