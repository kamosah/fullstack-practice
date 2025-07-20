import type { ThemeOptions } from '@mui/material/styles';

export const COMPONENTS_THEME: ThemeOptions['components'] = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        textTransform: 'none',
        fontWeight: 500,
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(59, 19, 52, 0.1)',
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 8,
        transition: 'border-radius 0.2s',
        color: theme.palette.text.primary,
        '&.Mui-selected, &.Mui-selected:hover': {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.primary.main,
          borderLeftColor: theme.palette.primary.dark,
        },
      }),
    },
  },
};
