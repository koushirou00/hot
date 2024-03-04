import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '@/components/elements/Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'search']
    },
    labelSize: {
      control: 'select',
      options: ['md', 'xl']
    },
    focus: {
      control: 'select',
      options: ['none', 'blue']
    },
    maxCount: {
      control: 'select',
      options: [50, 130]
    },
    children: { control: 'text' }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'primary label'
  }
};
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'secondary label'
  }
};
export const Search: Story = {
  args: {
    variant: 'search'
  }
};
