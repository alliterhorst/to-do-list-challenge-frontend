import styled from 'styled-components/native';
import { TaskStatusEnum } from '../enum/task-status.enum';
import { ColorsType } from '../theme/colors';

const TaskViewModal = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }): string => theme.colors.modal_background};
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const TaskViewContainer = styled.View`
  width: ${({ theme }): string => `${theme.units.mainWidth - 26}px`};
  height: ${({ theme }): string => `${theme.units.mainHeight - 260}px`};
  max-height: ${({ theme }): string => `${theme.units.mainHeight - 26}px`};
  max-width: 500px;
  border-radius: ${({ theme }): string => theme.units.borderRadius};
  align-items: center;
  background-color: ${({ theme }): string => theme.colors.background};
  z-index: 1;
`;

const TaskScrollView = styled.ScrollView`
  padding: 16px;
  height: 100%;
`;

const TaskAfterScroll = styled.View`
  position: absolute;
  bottom: 0;
  height: 8px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.7);
`;

const TaskViewGrid = styled.View`
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px 0;
`;

const TaskViewRowSpaceBetween = styled.View`
  flex-grow: 1;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
`;

const TaskViewRow = styled.View`
  flex-grow: 1;
  flex-direction: row;
  text-align: center;
`;

const MaterialIconViewRow = styled.View`
  position: absolute;
  top: -10px;
  right: -2px;
  z-index: 999;
`;

const TaskViewButtonClose = styled.View`
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 1;
`;

const TaskDescription = styled.Text`
  font-family: ${({ theme }): string => theme.fonts.roboto_500};
  font-size: ${({ theme }): string => theme.units.fontSizeBody};
  color: ${({ theme }): string => theme.colors.text_medium_emphasis};
  margin: 2px 0;
  /* text-transform: uppercase; */
`;

const TaskStatusText = styled.Text<{ status: TaskStatusEnum }>`
  font-family: ${({ theme }): string => theme.fonts.roboto_500};
  font-size: ${({ theme }): string => theme.units.fontSizeBody};
  color: ${({ theme, status }): string =>
    status === TaskStatusEnum.PENDING
      ? theme.colors.secondary
      : theme.colors.primary};
  margin-top: 6px;
  margin-left: 6px;
  /* text-transform: uppercase; */
`;

enum PropertiesColorEnum {
  backgroundColor,
  borderColor,
  textColor,
}

type VariantType = {
  [key in keyof typeof PropertiesColorEnum]: ColorsType;
};

type TaskGridSchemeType = {
  [key in keyof typeof TaskStatusEnum]?: VariantType;
};

const TaskGridScheme: TaskGridSchemeType = {
  PENDING: {
    backgroundColor: 'background',
    borderColor: 'button_primary',
    textColor: 'button_primary',
  },
  DONE: {
    backgroundColor: 'background',
    borderColor: 'success',
    textColor: 'success',
  },
};

interface GridStyledInterface {
  variant: VariantType;
}

const TaskGridButton = styled.TouchableHighlight<GridStyledInterface>`
  position: relative;
  border-width: 1px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 5px;
  margin-top: 10px;
  margin-right: 8px;
  width: 50px;
  height: 50px;
  border-color: ${({ theme, variant }): string =>
    theme.colors[variant.borderColor]};
  background-color: ${({ theme, variant }): string =>
    theme.colors[variant.backgroundColor]};
`;

const TaskSegmentView = styled.View`
  width: 100%;
  border-width: 1px;
  border-style: dotted;
  padding: 8px;
  border-radius: ${({ theme }): string => theme.units.borderRadius};
  border-color: ${({ theme }): string => theme.colors.border_color};
  margin-top: 20px;
  /* margin-bottom: -6px; */
`;

const TaskSegmentTitle = styled.Text<{ color?: ColorsType }>`
  padding-left: 8px;
  width: 140px;
  font-family: ${({ theme }): string => theme.fonts.roboto_500};
  background-color: ${({ theme }): string => theme.colors.background};
  color: ${({ theme, color }): string =>
    color ? theme.colors[color] : theme.colors.danger};
  position: relative;
  top: -16px;
  margin-bottom: -16px;
  left: 1px;
`;

const TaskViewHistory = styled.View`
  width: 100%;
  /* border-width: 1px; */
  /* border-style: dotted; */
  /* padding: 8px; */
  /* border-radius: ${({ theme }): string => theme.units.borderRadius}; */
  /* border-color: ${({ theme }): string => theme.colors.border_color}; */
  color: ${({ theme }): string => theme.colors.border_color};
  margin: 6px 0;
  /* text-align: center; */
`;

const TaskTextHistory = styled.Text`
  font-family: ${({ theme }): string => theme.fonts.roboto_700};
  font-size: ${({ theme }): string => theme.units.fontSizeBody};
  color: ${({ theme }): string => theme.colors.border_color};
  margin: 2px;
  line-height: 16px;
  letter-spacing: 0.25px;
  /* text-align: center; */
`;

const TaskSeparatorItem = styled.View`
  border-bottom-color: ${({ theme }): string => theme.colors.outline};
  border-bottom-width: 1px;
`;

export const TaskDetailStyle = {
  TaskViewModal,
  TaskViewContainer,
  TaskScrollView,
  TaskViewRow,
  TaskViewRowSpaceBetween,
  TaskViewGrid,
  TaskViewButtonClose,
  TaskDescription,
  TaskStatusText,
  TaskViewHistory,
  TaskTextHistory,
  TaskGridScheme,
  TaskGridButton,
  TaskSeparatorItem,
  TaskAfterScroll,
  MaterialIconViewRow,
  TaskSegmentView,
  TaskSegmentTitle,
};
