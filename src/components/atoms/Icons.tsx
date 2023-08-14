import React from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { IconsCompProps } from '../../types/atoms/types';
import { screenFont } from '../../utils/changeStyleSize';

const Icons = ({ type, name, size, color }: IconsCompProps) => {
    if (size) {
        let freshSize = size * screenFont;
        return (
            <>
                {type === 'octicons' && <Octicons name={name} size={freshSize} color={color} />}
                {type === 'feather' && <Feather name={name} size={freshSize} color={color} />}
                {type === 'simpleLineIcons' && <SimpleLineIcons name={name} size={freshSize} color={color} />}
                {type === 'fontisto' && <Fontisto name={name} size={freshSize} color={color} />}
                {type === 'ionicons' && <Ionicons name={name} size={freshSize} color={color} />}
                {type === 'entypo' && <Entypo name={name} size={freshSize} color={color} />}
                {type === 'fontAwesome' && <FontAwesome name={name} size={freshSize} color={color} />}
                {type === 'materialCommunityIcons' && (
                    <MaterialCommunityIcons name={name} size={freshSize} color={color} />
                )}
            </>
        );
    } else return <></>;
};

export default Icons;
