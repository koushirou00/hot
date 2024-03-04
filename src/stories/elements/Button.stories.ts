import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/elements/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'delete', 'cancel']
    },
    variant: {
      control: 'select',
      options: ['fill', 'outline', 'solid']
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    rounder: {
      control: 'select',
      options: ['nomal', 'lg']
    },
    children: { control: 'text' }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    color: 'primary',
    children: 'Primary Button'
  }
};

export const Secondary: Story = {
  args: {
    color: 'secondary',
    children: 'secondary Button'
  }
};

export const Cancel: Story = {
  args: {
    color: 'cancel',
    children: 'Cancel Button'
  }
};

export const Delete: Story = {
  args: {
    color: 'delete',
    children: 'Delete Button',
    variant: 'outline'
  }
};
