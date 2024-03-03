import React, { ComponentProps } from 'react';

export type ButtonProps = ComponentProps<'button'> &
  ComponentProps<'a'> & {
    color: 'primary' | 'secondary' | 'delete' | 'cancel';
    variant?: 'fill' | 'outline' | 'solid';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    rounder?: 'nomal' | 'lg';
  };
