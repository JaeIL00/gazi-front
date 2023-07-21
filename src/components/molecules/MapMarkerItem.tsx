import React from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import { Marker } from 'react-native-nmap';

import { nearPostListAtom } from '../../recoil';
import { MapMarkerProps } from '../../types/molecules/types';

const ISSUE_MARKER = {
    1: require('../../assets/icons/marker-protest.png'),
    2: require('../../assets/icons/marker-delay.png'),
    3: require('../../assets/icons/marker-disaster.png'),
    4: require('../../assets/icons/marker-construction.png'),
    5: require('../../assets/icons/marker-congestion.png'),
    6: require('../../assets/icons/marker-accident.png'),
    7: require('../../assets/icons/marker-traffic-jam.png'),
    8: require('../../assets/icons/marker-festival.png'),
    9: require('../../assets/icons/marker-etc.png'),
};

const MapMarkerItem = ({ findMarkerPost }: MapMarkerProps) => {
    const isFocused = useIsFocused();

    const nearPostList = useRecoilValue(nearPostListAtom);

    if (nearPostList.length > 0) {
        return (
            <>
                {isFocused &&
                    nearPostList.map(item => {
                        return (
                            <Marker
                                key={item.postId}
                                coordinate={{
                                    latitude: item.latitude,
                                    longitude: item.longitude,
                                }}
                                anchor={{ x: 0.5, y: 0.5 }}
                                width={30}
                                height={30}
                                onClick={() => findMarkerPost(item.postId)}
                                image={ISSUE_MARKER[item.headKeyword]}
                            />
                        );
                    })}
            </>
        );
    } else {
        return <></>;
    }
};

export default MapMarkerItem;
