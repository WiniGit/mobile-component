import React, { forwardRef, useEffect, useImperativeHandle, useMemo } from 'react';
import { TouchableOpacity, View, type ViewStyle } from 'react-native';
import { useDesignTokens } from '../../module/WiniProvider';

interface WRadioProps {
  size?: number;
  value?: string | number;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (value?: string | number) => void;
  style?: ViewStyle;
  activeColor?: string;
  offColor?: string;
}

interface WRadioButtonRef {
  checked?: boolean;
  disabled?: boolean;
  change?: () => void;
}

export const WRadioButton = forwardRef<WRadioButtonRef, WRadioProps>(({ style = {}, size = 24, ...props }, ref) => {
  const [checked, setChecked] = React.useState(props.checked);
  const { colors } = useDesignTokens()
  const { backgroundColor, ...restOfStyle } = style
  const statusStyle = useMemo(() => {
    const tmp = { backgroundColor, borderColor: props.offColor ?? colors?.['neutral-border-color-bolder'] }
    if (checked && !props.disabled) tmp.borderColor = props.activeColor ?? colors?.['primary-color-main']
    if (props.disabled) tmp.backgroundColor = colors?.['neutral-background-color-disable']
    return tmp
  }, [backgroundColor, checked, props.disabled, colors, props.activeColor, props.offColor])

  useEffect(() => {
    setChecked(props.checked);
  }, [props.checked]);

  const handleChecked = () => {
    setChecked(true);
    props.onChange?.(props.value);
  }

  useImperativeHandle(ref, () => ({
    checked,
    disabled: props.disabled,
    change: handleChecked
  }), [checked, props.disabled])

  return <TouchableOpacity
    key={props.value}
    activeOpacity={1}
    disabled={props.disabled || checked}
    onPress={handleChecked}
    style={[
      restOfStyle,
      statusStyle,
      {
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        height: size,
        width: size,
        borderRadius: size / 2,
      }
    ]}
  >
    {checked && <View
      style={{
        height: size / 2,
        width: size / 2,
        borderRadius: size / 4,
        backgroundColor: props.disabled ? colors?.['neutral-text-color-disabled'] : (props.activeColor ?? colors?.['primary-color-main']),
      }}
    />}
  </TouchableOpacity>
})
