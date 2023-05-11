import React from 'react';
import { View } from 'react-native';

import HeaderMolecule from '../../molecules/HeaderMolecule';
import { EditNicknameTemplateProps } from '../../../types/types';

const EditNicknameTemplate = ({ moveToMyProfileScreen }: EditNicknameTemplateProps) => {
    return (
        <>
            <View>
                <HeaderMolecule
                    isPaddingHorizontal={false}
                    backHandler={moveToMyProfileScreen}
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
