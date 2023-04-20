import Octicons from 'react-native-vector-icons/Octicons';
import React from 'react';
import { IconsProps } from '../../types/types';

const Icons = ({ type, name, size, color }: IconsProps) => {
    return <>{type === 'octicons' && <Octicons name={name} size={size} color={color} />}</>;
};

export default Icons;
