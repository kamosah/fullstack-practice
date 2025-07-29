import { styled, Typography, type TypographyProps } from '@mui/material';

export const Code = styled(Typography)<TypographyProps>(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '4px',
  fontFamily: 'DM Mono, monospace',
  fontSize: '1rem',
  padding: `${theme.spacing(0.2)} ${theme.spacing(0.5)}`,
}));
