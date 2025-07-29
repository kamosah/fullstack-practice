import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    spacingNumber: (factor: number) => number;
  }
  interface ThemeOptions {
    spacingNumber?: (factor: number) => number;
  }
}
