import React, { useEffect, useState } from 'react';
import { Switch, View } from 'react-native';
import { useDesignTokens } from '../../module/WiniProvider';

interface SwitchProps {
  onChange?: (value: boolean) => void;
  value?: boolean;
  color?: string;
  dotColor?: string;
  size?: number;
  disabled?: boolean
}

export const WSwitch = ({ value = false, size = 32, ...props }: SwitchProps) => {
  const { colors } = useDesignTokens()
  const [baseSize, setBaseSize] = useState<{ width: number; height: number }>()
  const ratio = baseSize ? (size / baseSize.height) : 1
  const [checked, setChecked] = useState(value)

  useEffect(() => {
    if (value !== checked) setChecked(value)
  }, [value])

  return <View pointerEvents={props.disabled ? "box-none" : "auto"} style={{ justifyContent: 'center', alignItems: 'center', overflow: "hidden", height: size, width: baseSize ? Math.ceil(baseSize.width * ratio) : undefined }}>
    <Switch
      onLayout={e => {
        setBaseSize(e.nativeEvent.layout)
      }}
      disabled={props.disabled}
      trackColor={{ false: props.disabled ? colors?.['neutral-background-color-disable'] : colors?.['neutral-background-color-main'], true: props.color ?? (props.disabled ? colors?.['primary-color-lighter'] : colors?.['primary-color-main']) }}
      thumbColor={(props.disabled && !checked) ? colors?.['neutral-text-color-disabled'] : (props.dotColor ?? colors?.['neutral-text-color-stable'])}
      ios_backgroundColor={props.disabled ? colors?.['neutral-background-color-disable'] : colors?.['neutral-background-color-main']}
      style={{ transform: [{ scaleX: ratio }, { scaleY: ratio }], transformOrigin: 'center' }}
      value={checked}
      onValueChange={(v) => {
        setChecked(v)
        props.onChange?.(v)
      }}
    />
  </View>
}