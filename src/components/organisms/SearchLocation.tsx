import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
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
        if (text) {
            getSearchResult();
        } else {
            setResultsData([]);
        }
    };
    const onPressDeleteText = () => {
        setSearchText('');
        setResultsData([]);
    };

    // Get Google search results API
    const { refetch, isFetching } = useQuery(['search'], () => searchGoogleAPI(searchText), {
        enabled: false,
        onSuccess: ({ data }) => {
            setResultsData(data.results);
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

    // Save search results for list
    const [resultsData, setResultsData] = useState<LocationResultTypes[]>([]);

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
                data={resultsData}
                renderItem={({ item }) => {
                    const freshAddress = item.formatted_address.replace('대한민국 ', '');
                    return (
                        <View
                            style={{
                                flexDirection: 'row',
                                paddingHorizontal: 16 * screenWidth,
                                paddingVertical: 12 * screenHeight,
                                borderBottomWidth: 1 * screenFont,
                                borderColor: '#BEBEBE',
                            }}>
                            <Icons type="ionicons" name="location-sharp" size={25} color={Colors.BTN_GRAY} />
                            <Spacer width={11} />
                            <View>
                                <MediumText text={item.name} size={16} color="#000000" />
                                <Spacer height={3} />
                                <NormalText text={freshAddress} size={14} color={Colors.TXT_GRAY} />
                            </View>
                        </View>
                    );
                }}
            />

            {isFetching && <ActivityIndicator size="large" />}
        </View>
    );
};

export default SearchLocation;
