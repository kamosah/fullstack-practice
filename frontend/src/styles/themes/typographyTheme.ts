import type { ThemeOptions } from '@mui/material/styles';

const DEFAULT_FONT_FAMILY = '"Inter", "Roboto", "Helvetica Neue", Arial, sans-serif';

export const TYPOGRAPHY_THEME: ThemeOptions['typography'] = {
  fontFamily: DEFAULT_FONT_FAMILY,
  h1: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontWeight: 700,
    fontSize: '2.5rem',
    lineHeight: 1.2,
  },
  h2: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontWeight: 700,
    fontSize: '2rem',
    lineHeight: 1.25,
  },
  h3: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontWeight: 600,
    fontSize: '1.75rem',
    lineHeight: 1.3,
  },
  body1: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: 1.6,
  },
  body2: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontWeight: 400,
    fontSize: '0.875rem',
    lineHeight: 1.6,
  },
  button: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontWeight: 500,
    textTransform: 'none',
  },
};
