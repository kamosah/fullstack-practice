import Tooltip from '@mui/material/Tooltip';
import React from 'react';

type WithTooltipProps = {
  tooltip: React.ReactNode;
  tooltipProps?: React.ComponentProps<typeof Tooltip>;
};

export const withTooltip = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
): React.FC<P & WithTooltipProps> => {
  return ({ tooltip, tooltipProps, ...props }) => (
    <Tooltip title={tooltip} {...tooltipProps}>
      <span>
        <WrappedComponent {...(props as P)} />
      </span>
    </Tooltip>
  );
};
