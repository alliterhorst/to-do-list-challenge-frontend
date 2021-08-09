import { Dimensions } from 'react-native';
import Constants from 'expo-constants';

const barHeight = Constants.statusBarHeight;
const maxWidth = 720;
const headerHeight = 60;
const footerHeight = 0;

const windowWidth =
  Constants.platform.web && Dimensions.get('window').width > maxWidth
    ? maxWidth
    : Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const mainHeight = windowHeight - headerHeight - footerHeight - barHeight;

export const units = {
  padding: '8px',
  borderRadius: '8px',
  windowWidth,
  windowHeight,
  headerHeight,
  footerHeight,
  mainHeight,
  mainWidth: windowWidth,
  fontSizeH1: '24px',
  fontSizeH2: '20px',
  fontSizeBody: '16px',
  fontHelp: '14px',
};

export type UnitsType = [keyof typeof units];
