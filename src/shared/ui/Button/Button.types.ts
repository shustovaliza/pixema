export const ButtonAppearance = {
  IconButton: 'iconButton',
  Primary: 'primary',
  Secondary: 'secondary'
} as const;

export type ButtonAppearances =
  (typeof ButtonAppearance)[keyof typeof ButtonAppearance];
