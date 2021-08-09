import { ScreenNameEnum } from '../enum/screen-name.enum';
import { ScreenConfigInterface } from '../interface/screen-config.interface';

export type ScreenListType = {
  [key in ScreenNameEnum]: ScreenConfigInterface;
};
