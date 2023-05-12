import React from 'react';
import { View } from 'react-native';
import MyPostCommentTemplate from '../../components/templates/myProfile/MyPostCommentTemplate';
import { myPostCommentScreenStyles } from '../../styles/styles';
import { useRootNavigation } from '../../navigations/RootStackNavigation';

const MyPostCommentScreen = () => {
    const rootNavigation = useRootNavigation();
    const moveToBackScreenHandler = () => {
        rootNavigation.goBack();
    };
    return (
        <View style={myPostCommentScreenStyles.container}>
            <MyPostCommentTemplate moveToBackScreenHandler={moveToBackScreenHandler} />
        </View>
    );
};

export default MyPostCommentScreen;
