import React from 'react';
import { Text } from 'react-native';

import { PageTitleProps } from '../../types/types';
import { pageTitleStyles } from '../../styles/styles';
import BoldText from './BoldText';
import Colors from '../../styles/Colors';

const PageTitle = ({ title }: PageTitleProps) => {
    return <BoldText text={title} size={24} color={Colors.BLACK} />;
};

export default PageTitle;
