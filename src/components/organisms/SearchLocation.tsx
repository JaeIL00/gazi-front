import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, ToastAndroid, View } from 'react-native';
import { debounce } from 'lodash';
import { useQuery } from 'react-query';

import Icons from '../smallest/Icons';
import TouchButton from '../smallest/TouchButton';
import { searchGoogleAPI } from '../../queries/api';
import { screenFont, screenHeight, screenWidth } from '../../utils/changeStyleSize';
import { searchLocationStyles } from '../../styles/styles';
import { SingleLineInput } from '../smallest/SingleLineInput';
import { LocationResultTypes } from '../../types/types';
import Colors from '../../styles/Colors';
import MediumText from '../smallest/MediumText';
import NormalText from '../smallest/NormalText';
import Spacer from '../smallest/Spacer';

const SearchLocation = () => {
    // Input text for searching location
    const [searchText, setSearchText] = useState<string>('');
    const onChangeSearchText = (text: string) => {
        setSearchText(text);
        setNextPageToken('');
        setResultsData([]);
        if (text.length > 0) {
            getSearchResult();
        }
    };
    const onPressDeleteText = () => {
        setSearchText('');
        setNextPageToken('');
        setResultsData([]);
    };

    // Save search results for list
    const [resultsData, setResultsData] = useState<LocationResultTypes[]>([]);
    const [nextPageToken, setNextPageToken] = useState<string>('');

    // Get Google search results API
    const { refetch, isFetching } = useQuery(['search'], () => searchGoogleAPI(searchText, nextPageToken), {
        enabled: false,
        onSuccess: ({ data }) => {
            if (data.next_page_token && !nextPageToken) {
                setNextPageToken(data.next_page_token);
                setResultsData(data.results);
            } else if (nextPageToken) {
                data.next_page_token ? setNextPageToken(data.next_page_token) : setNextPageToken('');
                setResultsData([...resultsData, ...data.results]);
            } else {
                setResultsData(data.results);
            }
        },
        onError: ({ response }) => {
            // For Debug
            console.log('(ERROR) Get Google search results API.', response);
        },
    });
    const getSearchResult = useCallback(
        debounce(() => {
            refetch();
        }, 400),
        [],
    );
    const getNextPageResults = () => {
        if (nextPageToken) {
            refetch();
        } else {
            ToastAndroid.show('검색 결과 끝', 4000);
        }
    };

    // Flatlist function
    const keyExtractor = useCallback((item: LocationResultTypes) => item.place_id, []);
    const renderItem = useCallback(
        ({ item }: { item: LocationResultTypes }) => {
            const freshAddress = item.formatted_address.replace('대한민국 ', '');
            return (
                <View style={searchLocationStyles.listItemBox}>
                    <Icons type="ionicons" name="location-sharp" size={25} color={Colors.BTN_GRAY} />
                    <Spacer width={11} />
                    <View>
                        <MediumText text={item.name} size={16} color="#000000" />
                        <Spacer height={3} />
                        <NormalText text={freshAddress} size={14} color={Colors.TXT_GRAY} />
                    </View>
                </View>
            );
        },
        [resultsData],
    );

    return (
        <View>
            <View style={searchLocationStyles.inputContainer}>
                <View style={searchLocationStyles.inputBox}>
                    <SingleLineInput
                        value={searchText}
                        placeholder="사건이 어디에서 발생했나요?"
                        onChangeText={text => onChangeSearchText(text)}
                        width={200 * screenWidth}
                    />
                    <TouchButton onPress={onPressDeleteText} paddingHorizontal={18 * screenWidth}>
                        <Icons type="ionicons" name="close-circle" size={19.5} color="#00000075" />
                    </TouchButton>
                </View>
            </View>

            <Spacer height={20} />

            <FlatList
                keyExtractor={keyExtractor}
                data={resultsData}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                getItemLayout={(data, index) => ({
                    length: resultsData.length,
                    offset: resultsData.length * index,
                    index,
                })}
                onEndReachedThreshold={0.6}
                onEndReached={({ distanceFromEnd }) => {
                    if (distanceFromEnd > 0) {
                        getNextPageResults();
                    }
                }}
            />

            {isFetching && <ActivityIndicator size="large" />}
        </View>
    );
};

export default SearchLocation;
