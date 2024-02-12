import React, { ComponentProps } from 'react';

export const Label: React.FC<ComponentProps<'label'>> = (props) => {
  return <label {...props}>{props.children}</label>;
};
