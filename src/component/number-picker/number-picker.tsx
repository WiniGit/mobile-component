import { StyleSheet, Text, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useDesignTokens } from '../../module/WiniProvider';
import { Winicon } from '../wini-icon/wini-icon';

export enum WNumberPickerVariant {
  size24 = "size24",
  size32 = "size32",
  size40 = "size40",
  solid = "solid",
}

interface NumberPickerProps {
  initValue?: number;
  hideMinus?: boolean;
  onChange?: (value: number) => void;
  style?: Array<ViewStyle | TextStyle | WNumberPickerVariant> | ViewStyle | TextStyle | WNumberPickerVariant
  disabled?: boolean;
  min?: number;
  max?: number;
  /** default: 1 */
  volume?: number;
  helperText?: string;
  helperTextColor?: string;
}

interface NumberPickerRef {
  value: number;
  isFocused: boolean;
}

const initStyle: any = [WNumberPickerVariant.size32]

export const WNumberPicker = forwardRef<NumberPickerRef, NumberPickerProps>(({ initValue = 0, volume = 1, style = initStyle, helperTextColor = "#E14337", ...props }, ref) => {
  const { colors } = useDesignTokens()
  const [val, setValue] = useState<number>(initValue);
  const [inputValue, setInputValue] = useState<string>("");
  const [focused, setFocused] = useState(false);
  const convertStyle: any = useMemo(() => {
    const tmp = Array.isArray(style) ? style : [style]
    let value: any = {}
    let solidStyle = false
    tmp.forEach((e => {
      if (typeof e === "string") {
        value = { ...value, ...(styles as any)[e] }
        solidStyle = e === WNumberPickerVariant.solid
        if (solidStyle) value.borderColor = colors?.['neutral-border-color-bolder']
      } else value = { ...value, ...e }
    }))
    if (solidStyle) {
      if (focused) value.borderColor = "#287CF0"
      if (props.helperText?.length) value.borderColor = helperTextColor
      if (props.disabled) value.backgroundColor = colors?.['neutral-background-color-disable']
    } else {
      value.customBorderColor = value.borderColor ?? colors?.['neutral-border-color-bolder']
      delete value.borderColor
    }
    return value
  }, [style, colors, focused, props.disabled, props.helperText])
  const { fontVariant, fontSize, fontFamily, fontStyle, fontWeight, color, textAlign, textAlignVertical, textDecorationColor, textDecorationLine, textTransform, textDecorationStyle, textShadowColor, textShadowOffset, textShadowRadius, customBorderColor, ...restOfStyle } = convertStyle

  useEffect(() => {
    if (initValue !== val) setValue(initValue)
  }, [initValue])

  useEffect(() => {
    setInputValue(`${val ?? ""}`)
  }, [val])

  useImperativeHandle(ref, () => ({
    value: val,
    isFocused: focused
  }), [focused, val])

  return <View style={[styles.container, restOfStyle]} pointerEvents={props.disabled ? "none" : "auto"}>
    <TouchableOpacity
      disabled={props.disabled || val === props.min}
      onPress={() => {
        let newValue = val - volume
        if (props.min === undefined || newValue >= props.min) {
          if (volume % 1 === 0) newValue = Math.round(newValue)
          else newValue = parseFloat(newValue.toFixed(1))
          setValue(newValue)
          props.onChange?.(newValue)
        }
      }}
      style={[styles.button, { backgroundColor: (props.disabled || val === props.min) ? colors?.['neutral-background-color-disable'] : undefined }, customBorderColor ? { borderColor: customBorderColor, borderRadius: 24, borderWidth: 1 } : { borderRadius: 4 }]}
    >
      <Winicon src="outline/layout/minus" size={12} color={colors?.['neutral-text-color-subtitle']} />
    </TouchableOpacity>
    <TextInput
      style={{
        width: '100%',
        minWidth: 40,
        flex: 1,
        padding: 0,
        height: '100%',
        color: props.disabled ? colors?.['neutral-text-color-disabled'] : color,
        textAlign: textAlign ?? "center",
        fontVariant, fontSize, fontFamily, fontStyle, fontWeight, textAlignVertical, textDecorationColor, textDecorationLine, textTransform, textDecorationStyle, textShadowColor, textShadowOffset, textShadowRadius,
      }}
      keyboardType='numeric'
      returnKeyType='done'
      value={inputValue}
      onFocus={() => setFocused(true)}
      onChangeText={setInputValue}
      onBlur={() => {
        setFocused(false)
        let newValue = volume % 1 === 0 ? parseInt(inputValue) : parseFloat(inputValue)
        if (isNaN(newValue)) setInputValue(`${val ?? ""}`)
        else {
          if (volume % 1 === 0) newValue = Math.round(newValue)
          else newValue = parseFloat(newValue.toFixed(1))
          if (props.min !== undefined && newValue < props.min) {
            setValue(props.min)
            props.onChange?.(props.min)
          } else if (props.max !== undefined && newValue > props.max) {
            setValue(props.max)
            props.onChange?.(props.max)
          } else {
            setValue(newValue)
            props.onChange?.(newValue)
          }
        }
      }}
    />
    <TouchableOpacity
      disabled={props.disabled || val === props.max}
      onPress={() => {
        let newValue = val + volume
        if (props.max === undefined || newValue <= props.max) {
          if (volume % 1 === 0) newValue = Math.round(newValue)
          else newValue = parseFloat(newValue.toFixed(1))
          setValue(newValue)
          props.onChange?.(newValue)
        }
      }}
      style={[styles.button, { backgroundColor: (props.disabled || val === props.max) ? colors?.['neutral-background-color-disable'] : undefined }, customBorderColor ? { borderColor: customBorderColor, borderRadius: 24, borderWidth: 1 } : { borderRadius: 4 }]}
    >
      <Winicon src="outline/layout/plus" size={12} color={colors?.['neutral-text-color-subtitle']} />
    </TouchableOpacity>
    {props.helperText?.length ? (
      <Text
        numberOfLines={1}
        style={{
          lineHeight: 16,
          fontSize: 12,
          color: helperTextColor,
          position: 'absolute',
          bottom: -2,
          left: 2,
          transform: [{ translateY: "100%" }],
        }}
      >
        {props.helperText}
      </Text>
    ) : null}
  </View>
})

const styles = StyleSheet.create({
  container: {
    overflow: 'visible',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    width: 152,
    gap: 4,
    height: 32
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%",
    aspectRatio: 1 / 1,
  },
  size24: {
    height: 24,
    lineHeight: 22,
    fontSize: 14
  },
  size32: {
    height: 32,
    lineHeight: 24,
    fontSize: 16
  },
  size40: {
    height: 40,
    lineHeight: 24,
    fontSize: 16
  },
  solid: {
    borderRadius: 4,
    padding: 4,
    borderStyle: 'solid',
    borderWidth: 1
  }
});
