import React, { useEffect } from 'react';
import { TouchableOpacity, View, type ViewStyle } from 'react-native';
import { lightThemeColor } from '../../skin/color';

interface FRadioProps {
  value: string;
  status?: boolean;
  disabled?: boolean;
  onPress: (value: boolean) => void;
  style?: ViewStyle;
}

export const FRadioButton = (props: FRadioProps) => {
  const [checked, setChecked] = React.useState(props.status);

  useEffect(() => {
    setChecked(props.status);
  }, [props.status]);

  return (
    <TouchableOpacity
      key={props.value}
      activeOpacity={1}
      disabled={props.disabled}
      onPress={() => {
        const temp = !checked;
        setChecked(temp);
        props.onPress(temp);
      }}
      style={[
        {
          height: 24,
          width: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: lightThemeColor['primary-color-main'],
          alignItems: 'center',
          justifyContent: 'center',
        },
        props.style,
      ]}
    >
      {checked ? (
        <View
          style={{
            height: 12,
            width: 12,
            borderRadius: 6,
            backgroundColor: lightThemeColor['primary-color-main'],
          }}
        />
      ) : null}
    </TouchableOpacity>
  );
}
