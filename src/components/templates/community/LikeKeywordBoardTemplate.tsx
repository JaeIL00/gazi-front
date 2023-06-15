import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, FlatList, RefreshControl, ScrollView, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import { useInfiniteQuery, useQuery } from 'react-query';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { debounce } from 'lodash';
import FastImage from 'react-native-fast-image';
import Geolocation from '@react-native-community/geolocation';
import { PERMISSIONS, RESULTS, check } from 'react-native-permissions';

import Icons from '../../smallest/Icons';
import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import MediumText from '../../smallest/MediumText';
import TouchButton from '../../smallest/TouchButton';
import SemiBoldText from '../../smallest/SemiBoldText';
import PostListItem from '../../organisms/PostListItem';
import { userAuthAtom } from '../../../store/atoms';
import { KeywordListTypes } from '../../../types/types';
import { likeKeywordBoardTemplateStyles } from '../../../styles/styles';
import { LikeKeywordBoardTemplateProps, PostTypes } from '../../../types/types';
import { getCommunityPostAPI, geyMyLikeKeywordsAPI } from '../../../queries/api';

const LikeKeywordBoardTemplate = ({ moveToKeywordSettingScreen }: LikeKeywordBoardTemplateProps) => {
    const isFocusScreen = useIsFocused();

    const { accessToken } = useRecoilValue(userAuthAtom);

    const postsResponseIndexRef = useRef<number>(0);
    const getKeywordPostParamRef = useRef<string>('');
    const currentPositionRef = useRef<{ lat: number; lon: number; isChecked: boolean }>({
        lat: 0,
        lon: 0,
        isChecked: false,
    });
    const tooltipAnimRef = useRef<Animated.Value>(new Animated.Value(0)).current;

    const [postList, setPostList] = useState<PostTypes[]>([]);
    const [isPostRefresh, setIsPostRefresh] = useState<boolean>(false);
    const [chooseKeywordFilter, setChooseKeywordFilter] = useState<number[]>([]);
    const [myKeywordList, setMyKeywordList] = useState<KeywordListTypes[] | null>(null);

    // Get post by like keyword API
    const {
        hasNextPage,
        isFetching,
        fetchNextPage,
        refetch: postRefetch,
        remove: postRemove,
    } = useInfiniteQuery(
        'getLikeKeywordPosts',
        ({ pageParam = 0 }) =>
            getCommunityPostAPI({
                curLat: currentPositionRef.current.lat,
                curLon: currentPositionRef.current.lon,
                accessToken,
                keywords: getKeywordPostParamRef.current,
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

    // Get my Keyword API
    const {
        refetch: keywordRefetch,
        remove: keywordRemove,
        isSuccess: isSuccessGetMyKeywords,
    } = useQuery('getMyLikeKeyword', () => geyMyLikeKeywordsAPI(accessToken), {
        onSuccess: ({ data }) => {
            if (data.data.length < 1) {
                setMyKeywordList(null);
            } else if (data.data !== myKeywordList) {
                initGetKeywordPost(data.data);
            }
        },
        onError: error => {
            // For Debug
            console.log('(ERROR), Get my like keyword list API.', error);
        },
    });

    // Init get post and check permission
    const isAllowLocationPermission = async () => {
        try {
            const locationPermission = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            const isAllow = locationPermission === RESULTS.GRANTED;
            if (isAllow) {
                Geolocation.getCurrentPosition(info => {
                    currentPositionRef.current = {
                        lat: info.coords.latitude,
                        lon: info.coords.longitude,
                        isChecked: true,
                    };
                });
            } else {
                currentPositionRef.current = {
                    lat: 0,
                    lon: 0,
                    isChecked: true,
                };
            }
        } catch (err) {
            // For Debug
            console.log('(ERROR) Check Location Permission.', err);
            currentPositionRef.current = {
                lat: 0,
                lon: 0,
                isChecked: true,
            };
        }
    };

    // Get my keyword post (init)
    const initGetKeywordPost = (keywords: KeywordListTypes[]) => {
        setMyKeywordList(keywords);
        postsResponseIndexRef.current = 0;
        setChooseKeywordFilter([]);
        for (const index in keywords) {
            getKeywordPostParamRef.current =
                getKeywordPostParamRef.current + `&keywordId=${keywords[Number(index)].id}`;
        }
        postRemove();
        postRefetch();
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
        postRemove();
        postRefetch();
    };

    // My like keyword posts filtering for request API by my like keyword
    const myLikeKeywordFilterHandler = useCallback(
        (keywordId: number) => {
            postsResponseIndexRef.current = 0;
            const isExist = chooseKeywordFilter.includes(keywordId);
            if (!isExist) {
                if (chooseKeywordFilter.length > 0) {
                    getKeywordPostParamRef.current = getKeywordPostParamRef.current + `&keywordId=${keywordId}`;
                } else {
                    getKeywordPostParamRef.current = `&keywordId=${keywordId}`;
                }
                setChooseKeywordFilter([...chooseKeywordFilter, keywordId]);
            } else {
                const refreshKeyword = chooseKeywordFilter.filter(item => item !== keywordId);
                setChooseKeywordFilter(refreshKeyword);
                getKeywordPostParamRef.current = '';
                if (refreshKeyword.length > 0) {
                    for (const index in refreshKeyword) {
                        getKeywordPostParamRef.current =
                            getKeywordPostParamRef.current + `&keywordId=${refreshKeyword[Number(index)]}`;
                    }
                } else {
                    for (const index in myKeywordList) {
                        getKeywordPostParamRef.current =
                            getKeywordPostParamRef.current + `&keywordId=${myKeywordList[Number(index)].id}`;
                    }
                }
            }
            keywordPostListPostRefetch();
        },
        [getKeywordPostParamRef.current, myKeywordList, chooseKeywordFilter, postsResponseIndexRef.current],
    );
    const keywordPostListPostRefetch = useCallback(
        debounce(() => {
            postRemove();
            postRefetch();
        }, 600),
        [],
    );

    // Flst list props callback
    const keyExtractor = useCallback((item: PostTypes) => item.postId + '', []);
    const renderItem = useCallback(({ item }: { item: PostTypes }) => <PostListItem post={item} isBorder={true} />, []);

    // My like Keyword is nothing then tooltip animation
    useLayoutEffect(() => {
        if (!isFocusScreen) {
            tooltipAnimRef.setValue(0);
        } else {
            keywordRemove();
            keywordRefetch();
        }
    }, [isFocusScreen]);
    useFocusEffect(
        useCallback(() => {
            if (!myKeywordList) {
                setTimeout(() => {
                    Animated.timing(tooltipAnimRef, {
                        toValue: 10,
                        duration: 500,
                        useNativeDriver: true,
                    }).start();
                }, 5000);
            }
        }, [tooltipAnimRef]),
    );

    useLayoutEffect(() => {
        isAllowLocationPermission();
    }, []);

    useLayoutEffect(() => {
        if (currentPositionRef.current.isChecked) {
            postRemove();
            postRefetch();
        }
    }, [currentPositionRef.current]);

    return (
        <View style={likeKeywordBoardTemplateStyles.container}>
            <View style={likeKeywordBoardTemplateStyles.contentBox}>
                {!myKeywordList ? (
                    <View style={likeKeywordBoardTemplateStyles.emptyKeywordBox}>
                        <View style={likeKeywordBoardTemplateStyles.emptyButtonBox}>
                            <TouchButton onPress={moveToKeywordSettingScreen}>
                                <View style={likeKeywordBoardTemplateStyles.addKeywordButton}>
                                    <Icons type="entypo" name="plus" size={16} color={Colors.VIOLET} />
                                    <Spacer width={4} />
                                    <MediumText text="관심 키워드 추가하기" size={14} color={Colors.VIOLET} />
                                </View>
                            </TouchButton>
                            <Animated.View
                                style={[
                                    likeKeywordBoardTemplateStyles.tooltipBox,
                                    {
                                        opacity: tooltipAnimRef.interpolate({
                                            inputRange: [0, 10],
                                            outputRange: [10, 0],
                                        }),
                                    },
                                ]}>
                                <FastImage
                                    source={require('../../../assets/icons/text-balloon.png')}
                                    style={likeKeywordBoardTemplateStyles.tooltipImg}
                                />
                                <View style={likeKeywordBoardTemplateStyles.tooltipTextBox}>
                                    <MediumText
                                        text="관심 키워드를 추가하면 한번에 모아볼 수 있어요"
                                        size={12}
                                        color={Colors.WHITE}
                                    />
                                </View>
                            </Animated.View>
                        </View>
                        <View style={likeKeywordBoardTemplateStyles.nothingBox}>
                            <FastImage
                                source={require('../../../assets/icons/warning.png')}
                                style={likeKeywordBoardTemplateStyles.nothingIcon}
                            />
                            <Spacer height={20} />
                            <SemiBoldText text="관심 키워드를 골라주세요" size={18} color={Colors.BTN_GRAY} />
                        </View>
                    </View>
                ) : (
                    <View style={likeKeywordBoardTemplateStyles.myKeywordScrollBox}>
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
                {myKeywordList && (
                    <FlatList
                        keyExtractor={keyExtractor}
                        data={postList}
                        renderItem={renderItem}
                        onEndReachedThreshold={1.8}
                        onEndReached={() => {
                            if (hasNextPage) {
                                fetchNextPage();
                            }
                        }}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                onRefresh={postListRefresh}
                                refreshing={isPostRefresh}
                                progressViewOffset={-10}
                            />
                        }
                    />
                )}
                {isFetching && !isPostRefresh && <ActivityIndicator size="large" />}
            </View>
        </View>
    );
};

export default LikeKeywordBoardTemplate;
