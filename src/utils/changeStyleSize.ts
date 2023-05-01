import { Dimensions } from 'react-native';

export const heightScreen = Number((Dimensions.get('screen').height * (1 / 800)).toFixed(2));
export const widthScreen = Number((Dimensions.get('screen').width * (1 / 360)).toFixed(2));
export const fontScreen = Number((Dimensions.get('screen').fontScale * 0.95).toFixed(2));
