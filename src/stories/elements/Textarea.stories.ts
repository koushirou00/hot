import type { Meta, StoryObj } from '@storybook/react';

import { Textarea } from '@/components/elements/Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'search']
    },
    rows: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    maxLength: {
      control: 'number'
    }
  },
  args: {
    className: 'max-w-[318px]'
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
