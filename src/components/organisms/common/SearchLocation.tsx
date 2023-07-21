import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { FlatList, StatusBar, TouchableOpacity, View } from 'react-native';
import { debounce } from 'lodash';
import { useQuery } from 'react-query';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icons from '../../atoms/Icons';
import Spacer from '../../atoms/Spacer';
import colors from '../../../constants/colors';
import MediumText from '../../atoms/MediumText';
import NormalText from '../../atoms/NormalText';
import TouchButton from '../../atoms/TouchButton';
import { nearPlaceGoogleAPI, searchGoogleAPI } from '../../../apis/api';
import { searchLocationStyles } from '../../../styles/organisms/styles';
import { SingleLineInput } from '../../atoms/SingleLineInput';
import { screenHeight, screenWidth } from '../../../utils/changeStyleSize';
import { SearchLocationProps } from '../../../types/organisms/types';
import { LocationResultTypes, SearchHistoryTypes } from '../../../types/common/types';
import IconButton from '../../molecules/IconButton';
import ImageButton from '../../molecules/ImageButton';

const SearchLocation = ({
    isHome,
    placeholder,
    isAllowLocation,
    currentPosition,
    searchModalHandler,
    getLocationHandler,
}: SearchLocationProps) => {
    const nextPageTokenRef = useRef<string>('');

    const [searchText, setSearchText] = useState<string>('');
    const [resultsData, setResultsData] = useState<LocationResultTypes[]>([]);
    const [searchHistory, setSearchHistory] = useState<SearchHistoryTypes[]>([]);
    const [resultsNearData, setResultsNearData] = useState<LocationResultTypes[]>([]);

    // Get Google search results API
    const { refetch: placeSearchRefetch } = useQuery(
        'placeSearch',
        () => searchGoogleAPI(searchText, nextPageTokenRef.current),
        {
            enabled: false,
            onSuccess: ({ data }) => {
                // Save search results for list
                if (data.next_page_token && !nextPageTokenRef.current) {
                    nextPageTokenRef.current = data.next_page_token;
                    setResultsData(data.results);
                } else if (nextPageTokenRef.current) {
                    data.next_page_token
                        ? (nextPageTokenRef.current = data.next_page_token)
                        : (nextPageTokenRef.current = '');
                    setResultsData([...resultsData, ...data.results]);
                } else {
                    setResultsData(data.results);
                }
            },
            onError: ({ response }) => {
                // For Debug
                console.log('(ERROR) Get Google search results API.', response);
            },
        },
    );

    // Get Google near search results API
    const { refetch: nearPlaceSearchRefetch } = useQuery(
        'nearPlaceSearch',
        () => nearPlaceGoogleAPI(currentPosition!.curLat, currentPosition!.curLon, nextPageTokenRef.current),
        {
            enabled: false,
            onSuccess: ({ data }) => {
                // Save near place results for list
                if (data.next_page_token && !nextPageTokenRef.current) {
                    nextPageTokenRef.current = data.next_page_token;
                    setResultsNearData(data.results);
                } else if (nextPageTokenRef.current) {
                    data.next_page_token
                        ? (nextPageTokenRef.current = data.next_page_token)
                        : (nextPageTokenRef.current = '');
                    setResultsNearData([...resultsData, ...data.results]);
                } else {
                    setResultsNearData(data.results);
                }
            },
            onError: ({ response }) => {
                // For Debug
                console.log('(ERROR) Get Google near place results API.', response);
            },
        },
    );

    // Input text for searching location
    const onChangeSearchText = (text: string) => {
        setSearchText(text);
        nextPageTokenRef.current = '';
        if (text.length > 0) {
            getSearchResult();
        } else if (text.length === 0) {
            setResultsData([]);
        }
    };
    const onPressDeleteText = () => {
        setSearchText('');
        nextPageTokenRef.current = '';
        setResultsData([]);
    };

    const getSearchResult = useCallback(
        debounce(() => {
            placeSearchRefetch();
        }, 600),
        [],
    );

    const getNextPageResults = () => {
        if (nextPageTokenRef.current) {
            placeSearchRefetch();
        }
    };

    // Save search history from home
    const saveSearchHistoryStorage = async (address: string, name: string, location: { lat: number; lng: number }) => {
        try {
            const freshFilter = searchHistory.filter(item => item.formatted_address !== address);
            const freshHistory = [{ formatted_address: address, name, location }, ...freshFilter];
            if (freshHistory.length > 10) {
                freshHistory.pop();
            }
            setSearchHistory(freshHistory);
            await AsyncStorage.setItem('GAZI_hst_sch', JSON.stringify(freshHistory));
        } catch (error) {
            // For Debug
            console.log('(ERROR)Save search history from home.', error);
        }
    };

    // Get search history from storage
    const getSearchHistory = async () => {
        try {
            const historyArray = await AsyncStorage.getItem('GAZI_hst_sch');
            if (historyArray) {
                setSearchHistory(JSON.parse(historyArray));
            }
        } catch (error) {
            // For Debug
            console.log('(ERROR)Get search history from storage.', error);
        }
    };

    // Flatlist function
    const keyExtractorHistory = useCallback((item: SearchHistoryTypes) => item.location.lat + '', []);
    const keyExtractorSearchResults = useCallback((item: LocationResultTypes) => item.geometry.location.lat + '', []);
    const renderItemResult = useCallback(
        ({ item }: { item: LocationResultTypes }) => {
            let freshAddress: string = '';
            if (isAllowLocation && !searchText) {
                freshAddress = item.vicinity;
            } else {
                freshAddress = item.formatted_address.replace('대한민국 ', '');
            }
            return (
                <TouchButton
                    onPress={() => {
                        getLocationHandler(
                            item.geometry.location,
                            item.name,
                            searchText ? item.formatted_address : item.vicinity,
                        );
                        if (isHome) {
                            saveSearchHistoryStorage(
                                searchText ? item.formatted_address : item.vicinity,
                                item.name,
                                item.geometry.location,
                            );
                        }
                    }}
                    paddingVertical={12}
                    borderColor={colors.BORDER_GRAY}
                    borderBottomWidth={1}
                    paddingHorizontal={16}>
                    <View style={searchLocationStyles.listItemBox}>
                        <FastImage
                            source={require('../../../assets/icons/location-pin-fill.png')}
                            style={searchLocationStyles.resultIcon}
                        />
                        <View style={searchLocationStyles.resultTextBox}>
                            <MediumText text={item.name} size={16} color="#000000" />
                            <Spacer height={3} />
                            <View style={searchLocationStyles.resultAddress}>
                                {freshAddress.split(' ').map(item => (
                                    <NormalText text={`${item} `} size={14} color={colors.TXT_GRAY} />
                                ))}
                            </View>
                        </View>
                    </View>
                </TouchButton>
            );
        },
        [searchHistory, searchText],
    );
    const renderItemHistory = useCallback(
        ({ item }: { item: SearchHistoryTypes }) => {
            const freshAddress = item.formatted_address.replace('대한민국 ', '');
            return (
                <TouchButton
                    onPress={() => {
                        saveSearchHistoryStorage(item.formatted_address, item.name, item.location);
                        getLocationHandler(item.location, item.name, '');
                    }}
                    paddingVertical={12}
                    borderColor={colors.BORDER_GRAY}
                    borderBottomWidth={1}
                    paddingHorizontal={16}>
                    <View style={searchLocationStyles.listItemBox}>
                        <View style={searchLocationStyles.historyIcons}>
                            <Icons type="feather" name="clock" size={21} color={colors.TXT_LIGHTGRAY} />
                        </View>
                        <View style={searchLocationStyles.resultTextBox}>
                            <MediumText text={item.name} size={16} color="#000000" />
                            <Spacer height={3} />
                            <View style={searchLocationStyles.resultAddress}>
                                {freshAddress.split(' ').map(item => (
                                    <NormalText text={`${item} `} size={14} color={colors.TXT_GRAY} />
                                ))}
                            </View>
                        </View>
                    </View>
                </TouchButton>
            );
        },
        [searchHistory],
    );

    useLayoutEffect(() => {
        getSearchHistory();
        if (!isHome && isAllowLocation) {
            nearPlaceSearchRefetch();
        }
    }, []);

    return (
        <View style={searchLocationStyles.container}>
            <StatusBar backgroundColor={isHome ? colors.WHITE : colors.BACKGROUND_DEFAULT} />
            <View style={searchLocationStyles.inputContainer}>
                <View style={searchLocationStyles.inputBox}>
                    {isHome && searchModalHandler && (
                        <>
                            <ImageButton
                                onPress={() => searchModalHandler('CLOSE')}
                                hitSlop={10}
                                imageSource={require('../../../assets/icons/arrow-left-sharp.png')}
                                imageHeight={16}
                                imageWidth={16}
                                isCaching={true}
                            />
                            <Spacer width={20} />
                        </>
                    )}
                    <SingleLineInput
                        value={searchText}
                        placeholder={placeholder}
                        onChangeText={text => onChangeSearchText(text)}
                    />
                    <IconButton
                        onPress={onPressDeleteText}
                        paddingHorizontal={18 * screenWidth}
                        iconType="ionicons"
                        iconName="close-circle"
                        iconSize={24}
                        iconColor="#00000075"
                    />
                </View>
            </View>

            <Spacer height={20} />

            {isHome && !searchText ? (
                <>
                    <View style={{ paddingHorizontal: 16 * screenWidth }}>
                        <NormalText text="최근검색" size={14} color="#757575" />
                    </View>
                    <FlatList
                        keyExtractor={keyExtractorHistory}
                        data={searchHistory}
                        renderItem={renderItemHistory}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.7}
                        onEndReached={({ distanceFromEnd }) => {
                            if (distanceFromEnd > 0) {
                                getNextPageResults();
                            }
                        }}
                        contentContainerStyle={{ paddingBottom: 200 * screenHeight }}
                        keyboardDismissMode="on-drag"
                    />
                </>
            ) : (
                <FlatList
                    keyExtractor={keyExtractorSearchResults}
                    data={searchText ? resultsData : resultsNearData}
                    renderItem={renderItemResult}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={1}
                    onEndReached={() => {
                        getNextPageResults();
                    }}
                    contentContainerStyle={{ paddingBottom: 200 * screenHeight }}
                    keyboardDismissMode="on-drag"
                />
            )}
        </View>
    );
};

export default SearchLocation;
