import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, Image, View } from 'react-native';
import { communityTemplateStyles } from '../../../styles/styles';
import SemiBoldText from '../../smallest/SemiBoldText';
import TouchButton from '../../smallest/TouchButton';
import MediumText from '../../smallest/MediumText';
import Spacer from '../../smallest/Spacer';
import Colors from '../../../styles/Colors';
import { screenFont, screenHeight, screenWidth } from '../../../utils/changeStyleSize';
import PostListItem from '../../organisms/PostListItem';
import { PostTypes } from '../../../types/types';
import { useRecoilValue } from 'recoil';
import { userTokenAtom } from '../../../store/atoms';
import { getAllPostAPI } from '../../../queries/api';
import { useInfiniteQuery } from 'react-query';

const dummy: PostTypes[] = [
    {
        title: '서울역 시위',
        distance: '1km',
        time: '10분전',
        rePostCount: 10,
        content:
            '국무위원은 국정에 관하여 대통령을 보좌하며, 국무회의의 구성원으로서 국정을 심의한다. 정당의 목적이나 활동이 민주적 기본질서에 위배될 때에는 정부는 헌법재판소에 그 해산을 제소할 수 있고, 정당은 헌법재판소의 심판에 의하여 해산된다. 대통령은 국가의 안위에 관계되는 중대한 교전상태에 있어서 국가를 보위하기 위하여 긴급한 조치가 필요하고 국회의 집회가 불가능한 때에 한하여 법률의 효력을 가지는 명령을 발할 수 있다.',
        latitude: 37.49795103144074,
        longitude: 127.02760985223079,
        headKeyword: 4,
        thumbNail: 'https://i.ytimg.com/vi/Nbw92qgezis/maxresdefault.jpg',
        postId: 1,
    },
    {
        title: '서울역 시위',
        distance: '1km',
        time: '10분전',
        rePostCount: 10,
        content:
            '국무위원은 국정에 관하여 대통령을 보좌하며, 국무회의의 구성원으로서 국정을 심의한다. 정당의 목적이나 활동이 민주적 기본질서에 위배될 때에는 정부는 헌법재판소에 그 해산을 제소할 수 있고, 정당은 헌법재판소의 심판에 의하여 해산된다. 대통령은 국가의 안위에 관계되는 중대한 교전상태에 있어서 국가를 보위하기 위하여 긴급한 조치가 필요하고 국회의 집회가 불가능한 때에 한하여 법률의 효력을 가지는 명령을 발할 수 있다.',
        latitude: 37.49795103144074,
        longitude: 127.02760985223079,
        headKeyword: 4,
        thumbNail: 'https://i.ytimg.com/vi/Nbw92qgezis/maxresdefault.jpg',
        postId: 2,
    },
    {
        title: '서울역 시위',
        distance: '1km',
        time: '10분전',
        rePostCount: 10,
        content:
            '국무위원은 국정에 관하여 대통령을 보좌하며, 국무회의의 구성원으로서 국정을 심의한다. 정당의 목적이나 활동이 민주적 기본질서에 위배될 때에는 정부는 헌법재판소에 그 해산을 제소할 수 있고, 정당은 헌법재판소의 심판에 의하여 해산된다. 대통령은 국가의 안위에 관계되는 중대한 교전상태에 있어서 국가를 보위하기 위하여 긴급한 조치가 필요하고 국회의 집회가 불가능한 때에 한하여 법률의 효력을 가지는 명령을 발할 수 있다.',
        latitude: 37.49795103144074,
        longitude: 127.02760985223079,
        headKeyword: 4,
        thumbNail: 'https://i.ytimg.com/vi/Nbw92qgezis/maxresdefault.jpg',
        postId: 3,
    },
    {
        title: '서울역 시위',
        distance: '1km',
        time: '10분전',
        rePostCount: 10,
        content:
            '국무위원은 국정에 관하여 대통령을 보좌하며, 국무회의의 구성원으로서 국정을 심의한다. 정당의 목적이나 활동이 민주적 기본질서에 위배될 때에는 정부는 헌법재판소에 그 해산을 제소할 수 있고, 정당은 헌법재판소의 심판에 의하여 해산된다. 대통령은 국가의 안위에 관계되는 중대한 교전상태에 있어서 국가를 보위하기 위하여 긴급한 조치가 필요하고 국회의 집회가 불가능한 때에 한하여 법률의 효력을 가지는 명령을 발할 수 있다.',
        latitude: 37.49795103144074,
        longitude: 127.02760985223079,
        headKeyword: 4,
        thumbNail: 'https://i.ytimg.com/vi/Nbw92qgezis/maxresdefault.jpg',
        postId: 4,
    },
    {
        title: '서울역 시위',
        distance: '1km',
        time: '10분전',
        rePostCount: 10,
        content:
            '국무위원은 국정에 관하여 대통령을 보좌하며, 국무회의의 구성원으로서 국정을 심의한다. 정당의 목적이나 활동이 민주적 기본질서에 위배될 때에는 정부는 헌법재판소에 그 해산을 제소할 수 있고, 정당은 헌법재판소의 심판에 의하여 해산된다. 대통령은 국가의 안위에 관계되는 중대한 교전상태에 있어서 국가를 보위하기 위하여 긴급한 조치가 필요하고 국회의 집회가 불가능한 때에 한하여 법률의 효력을 가지는 명령을 발할 수 있다.',
        latitude: 37.49795103144074,
        longitude: 127.02760985223079,
        headKeyword: 4,
        thumbNail: 'https://i.ytimg.com/vi/Nbw92qgezis/maxresdefault.jpg',
        postId: 5,
    },
    {
        title: '서울역 시위',
        distance: '1km',
        time: '10분전',
        rePostCount: 10,
        content:
            '국무위원은 국정에 관하여 대통령을 보좌하며, 국무회의의 구성원으로서 국정을 심의한다. 정당의 목적이나 활동이 민주적 기본질서에 위배될 때에는 정부는 헌법재판소에 그 해산을 제소할 수 있고, 정당은 헌법재판소의 심판에 의하여 해산된다. 대통령은 국가의 안위에 관계되는 중대한 교전상태에 있어서 국가를 보위하기 위하여 긴급한 조치가 필요하고 국회의 집회가 불가능한 때에 한하여 법률의 효력을 가지는 명령을 발할 수 있다.',
        latitude: 37.49795103144074,
        longitude: 127.02760985223079,
        headKeyword: 4,
        thumbNail: 'https://i.ytimg.com/vi/Nbw92qgezis/maxresdefault.jpg',
        postId: 6,
    },
    {
        title: '서울역 시위',
        distance: '1km',
        time: '10분전',
        rePostCount: 10,
        content:
            '국무위원은 국정에 관하여 대통령을 보좌하며, 국무회의의 구성원으로서 국정을 심의한다. 정당의 목적이나 활동이 민주적 기본질서에 위배될 때에는 정부는 헌법재판소에 그 해산을 제소할 수 있고, 정당은 헌법재판소의 심판에 의하여 해산된다. 대통령은 국가의 안위에 관계되는 중대한 교전상태에 있어서 국가를 보위하기 위하여 긴급한 조치가 필요하고 국회의 집회가 불가능한 때에 한하여 법률의 효력을 가지는 명령을 발할 수 있다.',
        latitude: 37.49795103144074,
        longitude: 127.02760985223079,
        headKeyword: 4,
        thumbNail: 'https://i.ytimg.com/vi/Nbw92qgezis/maxresdefault.jpg',
        postId: 7,
    },
    {
        title: '서울역 시위',
        distance: '1km',
        time: '10분전',
        rePostCount: 10,
        content:
            '국무위원은 국정에 관하여 대통령을 보좌하며, 국무회의의 구성원으로서 국정을 심의한다. 정당의 목적이나 활동이 민주적 기본질서에 위배될 때에는 정부는 헌법재판소에 그 해산을 제소할 수 있고, 정당은 헌법재판소의 심판에 의하여 해산된다. 대통령은 국가의 안위에 관계되는 중대한 교전상태에 있어서 국가를 보위하기 위하여 긴급한 조치가 필요하고 국회의 집회가 불가능한 때에 한하여 법률의 효력을 가지는 명령을 발할 수 있다.',
        latitude: 37.49795103144074,
        longitude: 127.02760985223079,
        headKeyword: 4,
        thumbNail: 'https://i.ytimg.com/vi/Nbw92qgezis/maxresdefault.jpg',
        postId: 8,
    },
];

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
    const userTk = useRecoilValue(userTokenAtom);
    const [allPostList, setAllPostList] = useState<PostTypes[]>([]);
    const { hasNextPage, isFetching, isFetchingNextPage, fetchNextPage, refetch, remove } = useInfiniteQuery(
        ['getNearPosts'],
        ({ pageParam = 0 }) =>
            getAllPostAPI({
                curLat: 37.49795103144074,
                curLon: 127.02760985223079,
                accessToken: userTk.accessToken,
                page: pageParam,
            }),
        {
            getNextPageParam: (lastPage, allPages) => {
                const total = lastPage.data.data.totalPages;
                const nextPage = lastPage.data.data.pageable.pageNumber + 1;
                console.log('total', total);
                console.log('nextPage', nextPage);
                return nextPage > total ? undefined : nextPage;
            },
            onSuccess: data => {
                setAllPostList([...allPostList, ...data.pages[0].data.data.content]);
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
            />
            {isFetching && <ActivityIndicator size="large" />}
        </View>
    );
};

export default CommunityTemplate;
