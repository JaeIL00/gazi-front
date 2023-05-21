import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, FlatList, Image, ScrollView, View } from 'react-native';
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

const CommunityTemplate = ({ moveToKeywordSettingScreen }: CommunityTemplateProps) => {
    const isFocusScreen = useIsFocused();

    const { accessToken } = useRecoilValue(userTokenAtom);

    const [allPostList, setAllPostList] = useState<PostTypes[]>([]);
    const [isLikePostTab, setIsLikePostTab] = useState<boolean>(false);
    const [chooseKeywordFilter, setChooseKeywordFilter] = useState<number[]>([]);
    const [likeKeywordPostList, setLikeKeywordPostList] = useState<PostTypes[]>([]);
    const [myKeywordList, setMyKeywordList] = useState<KeywordListTypes[] | null>(null);

    const postsResponseIndexref = useRef<number>(0);
    const tooltipAnimRef = useRef<Animated.Value>(new Animated.Value(0)).current;

    // Get all post API
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
                const pageNumber = data.pages[postsResponseIndexref.current].data.data.pageable.pageNumber;
                const content = data.pages[postsResponseIndexref.current].data.data.content;
                const isLast = data.pages[postsResponseIndexref.current].data.data.last;
                if (!isLikePostTab) {
                    getAllPostHandler(pageNumber, content, isLast);
                }
            },
            onError: ({ response }) => {
                // For Debug
                console.log('(ERROR) Get all post API. respense: ', response);
            },
        },
    );

    // Get my Keyword API
    const { refetch: getMyKeywordRefetch } = useQuery('getMyLikeKeyword', () => geyMyLikeKeywordsAPI(accessToken), {
        onSuccess: ({ data }) => {
            if (data.data.length < 1) {
                setMyKeywordList(null);
                setLikeKeywordPostList([]);
            } else {
                setMyKeywordList(data.data);
                // getLikeKeywordAllPostHandler(data.data);
            }
        },
        onError: error => {
            // For Debug
            console.log('(ERROR), Get my like keyword list API.', error);
        },
    });

    // All posts or like keyword posts choose handler
    const tabHandler = (state: string) => {
        switch (state) {
            case 'ALL':
                setIsLikePostTab(false);
                break;
            case 'LIKE':
                if (!myKeywordList) {
                    setTimeout(() => {
                        Animated.timing(tooltipAnimRef, {
                            toValue: 10,
                            duration: 500,
                            useNativeDriver: true,
                        }).start();
                    }, 5000);
                } else {
                    // getLikeKeywordAllPostHandler(null);
                }
                setIsLikePostTab(true);
                break;
            default:
                // For Debug
                console.log('(ERROR) Tab control handler.', state);
        }
    };

    // Get all post list handler
    const getAllPostHandler = (pageNumber: number, content: PostTypes[], isLast: boolean) => {
        if (pageNumber === 0) {
            console.log(pageNumber);
            setAllPostList(content);
        } else {
            setAllPostList([...allPostList, ...content]);
        }
        if (!isLast) {
            postsResponseIndexref.current = postsResponseIndexref.current + 1;
        }
    };

    // Get all post by my like keyword
    // const getLikeKeywordAllPostHandler = (keywords: KeywordListTypes[] | null) => {
    //     let allKeywordFilter: PostTypes[] = [];
    //     if (myKeywordList && !keywords) {
    //         const myKeywordId = myKeywordList.map(item => item.id);
    //         allKeywordFilter = dummy.filter((item, index) => {
    //             const keywordsId = [...item.keywordIdList, ...myKeywordId];
    //             return keywordsId.filter((item, index) => keywordsId.indexOf(item) !== index).length > 0;
    //         });
    //     } else if (keywords) {
    //         const myKeywordId = keywords.map(item => item.id);
    //         allKeywordFilter = dummy.filter((item, index) => {
    //             const keywordsId = [...item.keywordIdList, ...myKeywordId];
    //             return keywordsId.filter((item, index) => keywordsId.indexOf(item) !== index).length > 0;
    //         });
    //     }
    //     setLikeKeywordPostList(allKeywordFilter);
    // };

    // My like keyword posts filtering by my like keyword
    const myLikeKeywordFilterHandler = (keywordId: number) => {
        const isExist = chooseKeywordFilter.includes(keywordId);
        if (!isExist) {
            // const keywordFilter = dummy.filter((item, index) => {
            //     const keywordsId = [...item.keywordIdList, ...chooseKeywordFilter, keywordId];
            //     return keywordsId.filter((item, index) => keywordsId.indexOf(item) !== index).length > 0;
            // });
            // setLikeKeywordPostList(keywordFilter);
            setChooseKeywordFilter([...chooseKeywordFilter, keywordId]);
        } else {
            const refreshKeyword = chooseKeywordFilter.filter(item => item !== keywordId);
            if (refreshKeyword.length < 1) {
                // getLikeKeywordAllPostHandler(null);
                setChooseKeywordFilter([]);
            } else {
                // const keywordFilter = dummy.filter((item, index) => {
                //     const keywordsId = [...item.keywordIdList, ...refreshKeyword];
                //     return keywordsId.filter((item, index) => keywordsId.indexOf(item) !== index).length > 0;
                // });
                // setLikeKeywordPostList(keywordFilter);
                setChooseKeywordFilter(refreshKeyword);
            }
        }
    };

    // Flst list props callback
    const keyExtractor = useCallback((item: PostTypes) => item.postId + '', []);
    const renderItem = useCallback(({ item }: { item: PostTypes }) => <PostListItem post={item} isBorder={true} />, []);
    const ItemSeparatorComponent = useCallback(() => <Spacer height={33} />, []);
    const ListFooterComponent = useCallback(() => <Spacer height={260} />, []);

    // Refresh my keyword setting
    useLayoutEffect(() => {
        if (isLikePostTab) {
            getMyKeywordRefetch();
        }
    }, [isFocusScreen]);

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
                            borderColor: isLikePostTab ? '#EBEBEB' : Colors.BLACK,
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
                            borderColor: isLikePostTab ? Colors.BLACK : '#EBEBEB',
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
                {isLikePostTab && myKeywordList && (
                    <View
                        style={{
                            width: '100%',
                            height: 30 * screenHeight,
                            marginBottom: 24 * screenHeight,
                        }}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <TouchButton
                                onPress={moveToKeywordSettingScreen}
                                borderColor={Colors.TXT_LIGHTGRAY}
                                borderWidth={1}
                                borderRadius={16}
                                width={41.24}
                                height={29}>
                                <Icons type="entypo" name="plus" size={15} color={Colors.TXT_LIGHTGRAY} />
                            </TouchButton>
                            {myKeywordList.map(item => (
                                <TouchButton
                                    key={item.id}
                                    onPress={() => myLikeKeywordFilterHandler(item.id)}
                                    backgroundColor={chooseKeywordFilter.includes(item.id) ? Colors.VIOLET : '#F3EFF9'}
                                    borderRadius={16}
                                    paddingHorizontal={16}
                                    height={29}
                                    marginLeft={6}>
                                    <MediumText
                                        text={item.keywordName}
                                        size={14}
                                        color={chooseKeywordFilter.includes(item.id) ? Colors.WHITE : '#49454F'}
                                    />
                                </TouchButton>
                            ))}
                        </ScrollView>
                    </View>
                )}
                {isLikePostTab && !myKeywordList ? null : (
                    <FlatList
                        keyExtractor={keyExtractor}
                        data={isLikePostTab ? likeKeywordPostList : allPostList}
                        renderItem={renderItem}
                        ItemSeparatorComponent={ItemSeparatorComponent}
                        ListFooterComponent={ListFooterComponent}
                        onEndReachedThreshold={1.8}
                        onEndReached={() => {
                            if (hasNextPage) {
                                fetchNextPage();
                            }
                        }}
                        showsVerticalScrollIndicator={false}
                    />
                )}
                {isFetching && <ActivityIndicator size="large" />}
            </View>
        </View>
    );
};

export default CommunityTemplate;
