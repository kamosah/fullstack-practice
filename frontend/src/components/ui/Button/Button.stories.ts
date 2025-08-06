import { Button } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'contained',
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
