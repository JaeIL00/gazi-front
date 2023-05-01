import React from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import { IconsProps } from '../../types/types';
import { fontScreen } from '../../utils/changeStyleSize';

const Icons = ({ type, name, size, color }: IconsProps) => {
    let freshSize = size * fontScreen;
    return (
        <>
            {type === 'octicons' && <Octicons name={name} size={freshSize} color={color} />}
            {type === 'feather' && <Feather name={name} size={freshSize} color={color} />}
            {type === 'simpleLineIcons' && <SimpleLineIcons name={name} size={freshSize} color={color} />}
            {type === 'fontisto' && <Fontisto name={name} size={freshSize} color={color} />}
        </>
    );
};

export default Icons;
