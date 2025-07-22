import Tooltip from '@mui/material/Tooltip';
import React from 'react';

import type { TooltipProps as MuiTooltipProps } from '@mui/material/Tooltip';

export interface WithTooltipProps {
  tooltip: React.ReactNode;
  tooltipProps?: MuiTooltipProps;
}

export function withTooltip<P extends object>(WrappedComponent: React.ComponentType<P>) {
  const ComponentWithTooltip = React.forwardRef<HTMLElement, P & WithTooltipProps>(
    ({ tooltip, tooltipProps, ...props }, ref) => (
      <Tooltip title={tooltip} {...tooltipProps}>
        {/* span is needed for Tooltip to work with disabled elements */}
        <span>
          <WrappedComponent ref={ref} {...(props as P)} />
        </span>
      </Tooltip>
    ),
  );
  ComponentWithTooltip.displayName = `withTooltip(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;
  return ComponentWithTooltip;
}
