import React from 'react';

import ScreenWrapper from '../components/organisms/ScreenWrapper';
import NotLoginTemplate from '../components/templates/home/NotLoginTemplate';

const NotLoginHomeScreen = () => {
    return (
        <ScreenWrapper isPaddingHorizontal={true}>
            <NotLoginTemplate />
        </ScreenWrapper>
    );
};

export default NotLoginHomeScreen;
