import { Dimensions } from 'react-native';

export const screenHeight = Number((Dimensions.get('screen').height * (1 / 800)).toFixed(2));
export const screenWidth = Number((Dimensions.get('screen').width * (1 / 360)).toFixed(2));
export const screenFont = Number((Dimensions.get('screen').fontScale * 0.95).toFixed(2));
