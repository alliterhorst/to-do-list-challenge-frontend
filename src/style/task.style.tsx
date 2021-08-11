import styled from 'styled-components/native';

const ViewScreen = styled.View`
  flex: 1;
`;

const ScrollView = styled.ScrollView``;

/*
${Platform.select({
    web: css`
      :hover {
        background-color: black;
        border-width: 10px;
        border-style: solid;
        border-color: red;
      }
    `,
  })};
*/

const ViewTask = styled.TouchableOpacity`
  padding: ${({ theme }): string => theme.units.padding};
`;

const TextScreen = styled.Text``;

const SeparatorItem = styled.View`
  border-bottom-color: ${({ theme }): string => theme.colors.outline};
  border-bottom-width: 1px;
`;

export const TaskStyle = {
  ViewScreen,
  ScrollView,
  ViewTask,
  TextScreen,
  SeparatorItem,
};
