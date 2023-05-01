import { Dimensions } from 'react-native';

const FIGMA_WIDTH = 360;
const FIGMA_HEIGHT = 800;

export const screenWidth = Number((Dimensions.get('screen').width * (1 / FIGMA_WIDTH)).toFixed(2));
export const screenHeight = Number((Dimensions.get('screen').height * (1 / FIGMA_HEIGHT)).toFixed(2));
export const screenFont = Number(Dimensions.get('screen').fontScale.toFixed(2));
