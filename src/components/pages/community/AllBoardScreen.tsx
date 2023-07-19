import React from 'react';

import ScreenWrapper from '../../organisms/ScreenWrapper';
import AllBoardTemplate from '../../templates/community/AllBoardTemplate';

const AllBoardScreen = () => {
    return (
        <ScreenWrapper isPaddingHorizontal={false}>
            <AllBoardTemplate />
        </ScreenWrapper>
    );
};

export default AllBoardScreen;
