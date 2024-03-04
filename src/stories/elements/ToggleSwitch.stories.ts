import type { Meta, StoryObj } from '@storybook/react';

import { ToggleSwitch } from '@/components/elements/ToggleSwitch';

const meta: Meta<typeof ToggleSwitch> = {
  title: 'Components/ToggleSwitch',
  component: ToggleSwitch,
  argTypes: {}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {}
};
