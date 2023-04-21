import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import React from 'react';
import { IconsProps } from '../../types/types';

const Icons = ({ type, name, size, color }: IconsProps) => {
    return (
        <>
            {type === 'octicons' && <Octicons name={name} size={size} color={color} />}
            {type === 'feather' && <Feather name={name} size={size} color={color} />}
            {type === 'simpleLineIcons' && <SimpleLineIcons name={name} size={size} color={color} />}
            {type === 'fontisto' && <Fontisto name={name} size={size} color={color} />}
        </>
    );
};

export default Icons;
