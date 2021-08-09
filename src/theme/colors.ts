export const colors = {
  primary: '#009688',
  secondary: '#0288D1',
  tertiary: '#9EE0D4',
  quaternary: '#8000f8',
  active_in_primary: 'rgba(255,255,255,1)',
  inactive_in_primary: 'rgba(255,255,255,0.38)',
  background: '#FFFFFF',
  background_gray: '#838383',
  no_content: '#D0D0D0',
  modal_background: 'rgba(0, 0, 0, 0.4)',

  background_grid_see_more: '#CECDCD',

  text_high_emphasis: 'rgba(0, 0, 0, 0.87)',
  text_medium_emphasis: 'rgba(0, 0, 0, 0.6)',
  text_low_emphasis: 'rgba(0, 0, 0, 0.38)',

  soft: 'rgba(190, 190, 220, 0.7)',
  label: '#F7941D',
  input: '#000000',
  white: '#FFFFFF',

  outline: 'rgba(0, 0, 0, 0.12)',
  disabled: 'rgba(0,0,0,0.38)',
  border: 'rgba(0, 0, 0, 0.12)',
  border_bottom_color: 'rgba(206, 205, 205, 1)',
  border_color: 'rgba(151, 151, 151, 1)',

  button_primary: '#009688',
  button_secondary: '#0288D1',
  transparent: 'transparent',

  info: '#00AEED',
  success: '#4FC219',
  warning: '#ffad0a',
  darker: '#343A40',
  dark: '#7C858D',
  danger: '#DC3545',
  light: '#F2F2F2',
  black: '#000000',
};

export type ColorsType = keyof typeof colors;
