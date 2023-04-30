import { Dimensions } from 'react-native';
import {
    responsiveScreenFontSize,
    responsiveScreenHeight,
    responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

const FIGMA_WINDOW_WIDTH = 360;
const FIGMA_WINDOW_HEIGHT = 800;

export const widthPercentage = (width: number) => {
    const percentage = (width / FIGMA_WINDOW_WIDTH) * 100;
    return responsiveScreenWidth(percentage);
};
export const heightPercentage = (height: number) => {
    const percentage = (height / FIGMA_WINDOW_HEIGHT) * 100;
    return responsiveScreenHeight(percentage);
};
export const fontPercentage = (size: number) => {
    const percentage = size * 0.12;
    return responsiveScreenFontSize(percentage);
};
export const heightScreen = Number((Dimensions.get('screen').height * (1 / 800)).toFixed(2));
export const widthScreen = Number((Dimensions.get('screen').width * (1 / 360)).toFixed(2));
