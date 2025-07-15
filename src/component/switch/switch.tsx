import React from 'react';
import { Switch } from 'react-native';

interface SwitchProps {
  onChange: (value: boolean) => void;
  value: boolean;
  color: string;
  size?: number;
}

export const FSwitch = ({ onChange, value = false, color = '#287CF0', size = 1 }: SwitchProps) => {
  return (
    <Switch
      trackColor={{ false: '#EFEFF0', true: color }}
      ios_backgroundColor="#EFEFF0"
      style={{ transform: [{ scaleX: size }, { scaleY: size }] }}
      onValueChange={onChange}
      value={value}
    />
  );
}
