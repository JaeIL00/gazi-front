import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import { MapMarkerProps } from '../../types/molecules/types';
import { useRecoilValue } from 'recoil';
import { nearPostListAtom } from '../../recoil';
import { Marker } from 'react-native-nmap';

const MapMarkerItem = ({ findMarkerPost }: MapMarkerProps) => {
    const isFocused = useIsFocused();

    const nearPostList = useRecoilValue(nearPostListAtom);

    if (nearPostList[0].postId) {
        return (
            <>
                {isFocused &&
                    nearPostList.map(item => {
                        const markertypeIcon = () => {
                            switch (item.headKeyword) {
                                case 1:
                                    return require('../../assets/icons/marker-protest.png');
                                case 2:
                                    return require('../../assets/icons/marker-delay.png');
                                case 3:
                                    return require('../../assets/icons/marker-disaster.png');
                                case 4:
                                    return require('../../assets/icons/marker-construction.png');
                                case 5:
                                    return require('../../assets/icons/marker-congestion.png');
                                case 6:
                                    return require('../../assets/icons/marker-accident.png');
                                case 7:
                                    return require('../../assets/icons/marker-traffic-jam.png');
                                case 8:
                                    return require('../../assets/icons/marker-festival.png');
                                case 9:
                                    return require('../../assets/icons/marker-etc.png');
                                default:
                                    // For Debug
                                    console.log('(ERROR) Near post marker image');
                                    return;
                            }
                        };
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
                                image={markertypeIcon()}
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
