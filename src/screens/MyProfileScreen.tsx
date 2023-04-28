import React from 'react';
import { View } from 'react-native';
import BoldText from '../components/smallest/BoldText';

const MyProfileScreen = () => {
    return (
        <View>
            <BoldText text="내 프로필" color="#333" size={20} />
        </View>
    );
};

export default MyProfileScreen;
