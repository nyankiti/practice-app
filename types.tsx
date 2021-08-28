/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
  MusicPlayer: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
  ReanimatedScreen: undefined;
  PanGestureScreen: undefined;
  InterpolateScreen: undefined;
  InterpolateColorScreen: undefined;
  PinchGestureHandlerScreen: undefined;
  ScrollViewByPanGestureScreen: undefined;
  CircularBarScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
  SvgCircleScreen: undefined;
  ClockScreen: undefined;
  CubeScreen: undefined;
};

export type MusicPlayerParamList = {
  AudioListScreen: undefined;
  PlayListScreen: undefined;
  PlayerScreen: undefined;
};
