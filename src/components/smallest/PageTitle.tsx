import React from 'react';
import { Text } from 'react-native';
import { PageTitleProps } from '../../types/types';
import { pageTitleStyles } from '../../styles/styles';

const PageTitle = ({ title }: PageTitleProps) => {
    return <Text style={pageTitleStyles.title}>{title}</Text>;
};

export default PageTitle;
