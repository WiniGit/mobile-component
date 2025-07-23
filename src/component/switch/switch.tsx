import React, { useState } from 'react';
import { Switch, View } from 'react-native';
import { useDesignTokens } from '../../module/WiniProvider';

interface SwitchProps {
  onChange: (value: boolean) => void;
  value: boolean;
  color: string;
  size?: number;
}

export const WSwitch = ({ onChange, value = false, color, size = 32 }: SwitchProps) => {
  const { colors } = useDesignTokens()
  const [baseSize, setBaseSize] = useState<{ width: number; height: number }>()
  const ratio = baseSize ? (size / baseSize.height) : 1

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', overflow: "hidden", height: size, width: baseSize ? Math.ceil(baseSize.width * ratio) : undefined }}>
      <Switch
        onLayout={e => {
          setBaseSize(e.nativeEvent.layout)
        }}
        trackColor={{ false: '#EFEFF0', true: color ?? colors?.['primary-color-main'] }}
        ios_backgroundColor="#EFEFF0"
        style={{ transform: [{ scaleX: ratio }, { scaleY: ratio }], transformOrigin: 'center' }}
        onValueChange={onChange}
        value={value}
      />
    </View>
  );
}
