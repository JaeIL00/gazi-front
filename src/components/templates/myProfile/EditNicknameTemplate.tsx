import React from 'react';
import { View } from 'react-native';

import HeaderMolecule from '../../molecules/HeaderMolecule';

const EditNicknameTemplate = () => {
    return (
        <>
            <View>
                <HeaderMolecule
                    isPaddingHorizontal={false}
                    backHandler={() => {}}
                    headerFinish={true}
                    title="닉네임 수정"
                    finishText="완료"
                    isNextStep={false}
                />
            </View>
        </>
    );
};
export default EditNicknameTemplate;
