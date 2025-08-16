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
}

interface WRadioButtonRef {
  checked?: boolean;
  disabled?: boolean;
  change?: () => void;
}

export const WRadioButton = forwardRef<WRadioButtonRef, WRadioProps>(({ style = {}, size = 24, ...props }, ref) => {
  const [checked, setChecked] = React.useState(props.checked);
  const { colors } = useDesignTokens()
  const { backgroundColor, borderColor, ...restOfStyle } = style
  const statusStyle = useMemo(() => {
    const tmp = { backgroundColor, borderColor: borderColor ?? colors?.['neutral-border-color-bolder'] }
    if (checked && !props.disabled) tmp.borderColor = colors?.['primary-color-main']
    if (props.disabled) tmp.backgroundColor = colors?.['neutral-background-color-disable']
    return tmp
  }, [backgroundColor, borderColor, checked, props.disabled, colors])

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
        backgroundColor: props.disabled ? colors?.['neutral-text-color-disabled'] : colors?.['primary-color-main'],
      }}
    />}
  </TouchableOpacity>
})
