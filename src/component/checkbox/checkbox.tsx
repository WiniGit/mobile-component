import React, { useState, useEffect, type ReactNode, forwardRef, useImperativeHandle } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useDesignTokens } from '../../module/WiniProvider';

interface CheckboxProps {
  onChange?: (value: boolean) => void,
  value?: boolean | null,
  checkColor?: string,
  disabled?: boolean,
  style?: ViewStyle,
  /** default 20 **/
  size?: number,
}

interface CheckboxRef {
  checked?: boolean | null,
  disabled?: boolean,
  change?: () => void
}

export const WCheckbox = forwardRef<CheckboxRef, CheckboxProps>(({ size = 20, checkColor = "#fff", style = {}, ...props }, ref) => {
  const { colors } = useDesignTokens()
  const [checked, setChecked] = useState(props.value);

  useEffect(() => {
    if (props.value !== checked) setChecked(props.value)
  }, [props.value])

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

  return (
    <TouchableOpacity style={{ padding: 4 }} disabled={props.disabled} onPress={handleChangeValue}>
      <View style={[styles.container, style, { width: size, height: size }, checked ? { backgroundColor: colors?.['primary-color-main'], borderColor: colors?.['primary-color-main'] } : { borderColor: colors?.['neutral-border-color-bolder'] }]}>
        {checked === null && <SvgXml width={size - 4} height={size - 4} color={checkColor}
          xml={`<svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M4.79199 9.95298C4.79199 9.69148 5.00398 9.47949 5.26548 9.47949H14.7352C14.9967 9.47949 15.2087 9.69148 15.2087 9.95298C15.2087 10.2145 14.9967 10.4265 14.7352 10.4265H5.26548C5.00398 10.4265 4.79199 10.2145 4.79199 9.95298Z" fill=currentColor />
        </svg>`}
        />}
        {checked && <SvgXml width={size - 4} height={size - 4} color={checkColor}
          xml={`<svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M15.07 6.49317C15.2549 6.67808 15.2549 6.97787 15.07 7.16278L8.91467 13.3181C8.72977 13.503 8.42997 13.503 8.24507 13.3181L4.93067 10.0037C4.74577 9.81878 4.74577 9.51899 4.93067 9.33408C5.11558 9.14917 5.41537 9.14917 5.60028 9.33408L8.57987 12.3137L14.4004 6.49317C14.5853 6.30827 14.8851 6.30827 15.07 6.49317Z" fill=currentColor />
        </svg>`}
        />}
      </View>
    </TouchableOpacity>
  );
})

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export function FMultiCheckbox({ data = [], selected, onSelect, ...props }: {
  size?: number;
  borderRadius?: number;
  disabled?: boolean;
  data: Array<{ id: string | number; name: string | ReactNode }>;
  selected?: Array<string> | Array<number>;
  onSelect: (item: { id: string | number; name: string | ReactNode }) => void;
  checkboxStyle?: ViewStyle;
}) {
  const { colors } = useDesignTokens()

  return (
    <View pointerEvents={props.disabled ? 'none' : 'auto'}>
      <FlatList
        horizontal={true}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              onSelect(item);
            }}
            style={{ padding: 4, flexDirection: 'row', gap: 8 }}
          >
            <Text style={{ lineHeight: 22, fontSize: 14, fontWeight: "500", color: props.disabled ? colors?.['neutral-text-color-disabled'] : colors?.['neutral-text-color-label'] }}>
              {item.name}
            </Text>
            <WCheckbox
              value={selected?.some((e) => e == item.id)}
              onChange={() => onSelect(item)}
              {...props}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => `${item.id}`}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
}
