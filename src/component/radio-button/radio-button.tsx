import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { TouchableOpacity, View, type ViewStyle } from 'react-native';
import { useDesignTokens } from '../../module/WiniProvider';

interface WRadioProps {
  size?: number;
  value: string;
  status?: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
  style?: ViewStyle;
}

interface WRadioButtonRef {
  checked?: boolean;
  disabled?: boolean;
  change?: () => void;
}

export const WRadioButton = forwardRef<WRadioButtonRef, WRadioProps>(({ style = {}, size = 24, ...props }, ref) => {
  const [checked, setChecked] = React.useState(props.status);
  const { colors } = useDesignTokens()

  useEffect(() => {
    setChecked(props.status);
  }, [props.status]);

  const handleChangeValue = () => {
    const newValue = !checked;
    setChecked(newValue);
    props.onChange?.(newValue);
  }

  useImperativeHandle(ref, () => ({
    checked,
    disabled: props.disabled,
    change: handleChangeValue
  }), [checked, props.disabled])

  return <TouchableOpacity
    key={props.value}
    activeOpacity={1}
    disabled={props.disabled}
    onPress={handleChangeValue}
    style={[
      { borderColor: colors?.['primary-color-main'] },
      style,
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
        backgroundColor: colors?.['primary-color-main'],
      }}
    />}
  </TouchableOpacity>
})
