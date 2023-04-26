import React from 'react';

import BoldText from './BoldText';
import Colors from '../../styles/Colors';
import { PageTitleProps } from '../../types/types';

const PageTitle = ({ title }: PageTitleProps) => {
    return <BoldText text={title} size={24} color={Colors.BLACK} />;
};

export default PageTitle;
