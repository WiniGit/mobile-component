import React, { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import { Text, TouchableOpacity, StyleSheet, TextStyle, ViewStyle, View } from 'react-native';
import { ReactNode } from 'react';
import { useDesignTokens } from '../../module/WiniProvider';
import { lightThemeColor } from '../../skin/color';

export enum WButtonVariant {
  size24 = "size24",
  size32 = "size32",
  size40 = "size40",
  size48 = "size48",
  size56 = "size56",
  size64 = "size64",
  success = "success",
  error = "error",
  warning = "warning",
  infor = "infor",
  dahsed = "dahsed",
  ghost = "ghost",
}

interface ButtonProps {
  onPress?: () => void;
  label: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  disabled?: boolean;
  style?: Array<ViewStyle | TextStyle | WButtonVariant> | ViewStyle | TextStyle | WButtonVariant
}

const initStyle: any = [WButtonVariant.size32, { lineHeight: 22, fontSize: 14, fontWeight: "500" }]

interface ButtonRef {
  element?: View,
  disabled?: boolean,
  press?: () => void
}

export const WButton = forwardRef<ButtonRef, ButtonProps>(({ style = initStyle, ...props }, ref) => {
  const uiRef = useRef<View>(null)
  const { colors } = useDesignTokens()
  const convertStyle: TextStyle = useMemo(() => {
    const tmp = Array.isArray(style) ? style : [style]
    let value: any = {}
    tmp.forEach((e => {
      if (typeof e === "string") {
        value = { ...value, ...(styles as any)[e] }
        switch (e) {
          case WButtonVariant.dahsed:
          case WButtonVariant.ghost:
            if (tmp.some(s => s === WButtonVariant.success)) {
              value.borderColor = colors?.['success-color-main']
              value.color = colors?.['success-color-main']
              delete value.backgroundColor
            } else if (tmp.some(s => s === WButtonVariant.error)) {
              value.borderColor = colors?.['error-color-main']
              value.color = colors?.['error-color-main']
            } else if (tmp.some(s => s === WButtonVariant.warning)) {
              value.borderColor = colors?.['warning-color-main']
              value.color = colors?.['warning-color-main']
            } else if (tmp.some(s => s === WButtonVariant.infor)) {
              value.borderColor = colors?.['infor-color-main']
              value.color = colors?.['infor-color-main']
            } else {
              value.borderColor = colors?.['neutral-border-color-bolder']
              value.color = colors?.['neutral-text-color-subtitle']
            }
            break;
          default:
            break;
        }
      } else value = { ...value, ...e }
    }))
    return value
  }, [style, colors]);
  const { fontVariant, fontSize, fontFamily, fontStyle, fontWeight, color, textAlign, textAlignVertical, textDecorationColor, textDecorationLine, textTransform, textDecorationStyle, textShadowColor, textShadowOffset, textShadowRadius, backgroundColor, ...restOfStyle } = convertStyle

  useImperativeHandle(ref, () => ({
    element: uiRef.current as any,
    disabled: props.disabled,
    press: props.onPress
  }), [props.disabled])

  return (
    <TouchableOpacity
      ref={uiRef}
      onPress={props.onPress}
      disabled={props.disabled}
      style={[styles.container, restOfStyle, { backgroundColor: props.disabled ? colors?.['neutral-background-color-disable'] : backgroundColor }]}
    >
      {props.prefix}
      {<Text style={{
        color: props.disabled ? colors?.['neutral-text-color-disabled'] : (color ?? colors?.['neutral-text-color-label']),
        fontVariant, fontSize, fontFamily, fontStyle, fontWeight, textAlign, textAlignVertical, textDecorationColor, textDecorationLine, textTransform, textDecorationStyle, textShadowColor, textShadowOffset, textShadowRadius
      }}>
        {props.label}
      </Text>}
      {props.suffix}
    </TouchableOpacity>
  );
})

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    justifyContent: 'center',
    borderRadius: 8,
  },
  size24: {
    height: 24,
    paddingHorizontal: 8,
  },
  size32: {
    height: 32,
    paddingHorizontal: 12,
  },
  size40: {
    gap: 8,
    height: 40,
    paddingHorizontal: 16
  },
  size48: {
    gap: 8,
    height: 48,
    paddingHorizontal: 20
  },
  size56: {
    gap: 8,
    height: 56,
    paddingHorizontal: 20
  },
  size64: {
    gap: 8,
    height: 64,
    paddingHorizontal: 24
  },
  success: {
    color: "#fff",
    backgroundColor: lightThemeColor['success-color-main']
  },
  error: {
    color: "#fff",
    backgroundColor: lightThemeColor['error-color-main']
  },
  warning: {
    color: "#fff",
    backgroundColor: lightThemeColor['warning-color-main']
  },
  infor: {
    color: "#fff",
    backgroundColor: lightThemeColor['infor-color-main']
  },
  dahsed: {
    borderStyle: "dashed",
    borderWidth: 1,
  },
  ghost: {
    borderStyle: "solid",
    borderWidth: 1
  },
})