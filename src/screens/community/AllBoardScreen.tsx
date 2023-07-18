import React from 'react';

import ScreenWrapper from '../../components/organisms/ScreenWrapper';
import AllBoardTemplate from '../../components/templates/community/AllBoardTemplate';

const AllBoardScreen = () => {
    return (
        <ScreenWrapper isPaddingHorizontal={false}>
            <AllBoardTemplate />
        </ScreenWrapper>
    );
};

export default AllBoardScreen;
