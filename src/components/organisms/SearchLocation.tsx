import React, { useCallback, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { debounce } from 'lodash';
import { useQuery } from 'react-query';

import Icons from '../smallest/Icons';
import TouchButton from '../smallest/TouchButton';
import { searchGoogleAPI } from '../../queries/api';
import { screenWidth } from '../../utils/changeStyleSize';
import { searchLocationStyles } from '../../styles/styles';
import { SingleLineInput } from '../smallest/SingleLineInput';

const SearchLocation = () => {
    // Input text for searching location
    const [searchText, setSearchText] = useState('');
    const onChangeSearchText = (text: string) => {
        setSearchText(text);
        if (text) {
            getSearchResult();
        }
    };
    const onPressDeleteText = () => {
        setSearchText('');
    };

    // Get Google search results API
    const { refetch, isFetching } = useQuery(['search'], () => searchGoogleAPI(searchText), {
        enabled: false,
        onSuccess: data => {
            console.log('data', data.data);
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

            {isFetching && <ActivityIndicator size="large" />}
        </View>
    );
};

export default SearchLocation;
