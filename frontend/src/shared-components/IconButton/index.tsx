import { forwardRef } from 'react';

import { withTooltip } from '../withTooltip';

import { StyledIconButton } from './styles';

import type { IconButtonProps as MuiIconButtonProps } from '@mui/material/IconButton';
import type { TooltipProps as MuiTooltipProps } from '@mui/material/Tooltip';

export interface IconButtonProps extends MuiIconButtonProps {
  tooltip?: React.ReactNode;
  tooltipProps?: MuiTooltipProps;
}

export const PrimaryIconButton = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
  const { children, tooltip, tooltipProps, ...rest } = props;
  if (tooltip) {
    const IconButtonWithTooltip = withTooltip(StyledIconButton);
    return (
      <IconButtonWithTooltip
        ref={ref}
        tooltip={tooltip}
        tooltipProps={
          {
            slotProps: { tooltip: { className: 'MuiTooltip-tooltip icon-tooltip' } },
            placement: 'top',
            ...tooltipProps,
          } as MuiTooltipProps
        }
        {...rest}
      >
        {children}
      </IconButtonWithTooltip>
    );
  }
  return (
    <StyledIconButton ref={ref} {...rest}>
      {children}
    </StyledIconButton>
  );
});
