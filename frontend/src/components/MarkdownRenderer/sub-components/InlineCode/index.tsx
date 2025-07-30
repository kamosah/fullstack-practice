import { forwardRef } from 'react';

import { Code } from './styles';

export const InlineCode = forwardRef<HTMLElement, React.ComponentProps<'code'>>(
  ({ children, ...restProps }, ref) => (
    <Code component="code" ref={ref} {...restProps}>
      {children}
    </Code>
  ),
);
