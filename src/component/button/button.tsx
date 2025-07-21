import React, { useMemo } from 'react';
import { Text, TouchableOpacity, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ReactNode } from 'react';
import { useDesignTokens } from '../../module/WiniProvider';
import { lightThemeColor } from '../../skin/color';

enum FButtonVariant {
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
  grey = "grey"
}

interface ButtonProps {
  onPress?: () => void;
  label: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  disabled?: boolean;
  style?: Array<TextStyle | FButtonVariant> | ViewStyle | TextStyle | FButtonVariant
}

const initStyle: any = [FButtonVariant.size32, { lineHeight: 22, fontSize: 14, fontWeight: "500" }]

export const FButton = ({ style = initStyle, ...props }: ButtonProps) => {
  const { colors } = useDesignTokens()
  const convertStyle: TextStyle = useMemo(() => {
    const tmp = Array.isArray(style) ? style : [style]
    let value: any = {}
    tmp.forEach((e => {
      if (typeof e === "string") {
        value = { ...value, ...styles[e] }
        switch (e) {
          case FButtonVariant.dahsed:
          case FButtonVariant.ghost:
            if (tmp.some(s => s === FButtonVariant.success)) {
              value.borderColor = colors?.['success-color-main']
              value.color = colors?.['success-color-main']
              delete value.backgroundColor
            } else if (tmp.some(s => s === FButtonVariant.error)) value.borderColor = colors?.['error-color-main']
            else if (tmp.some(s => s === FButtonVariant.warning)) value.borderColor = colors?.['warning-color-main']
            else if (tmp.some(s => s === FButtonVariant.infor)) value.borderColor = colors?.['infor-color-main']
            else value.borderColor = colors?.['neutral-border-color-bolder']
            break;
          default:
            break;
        }
      } else value = { ...value, ...e }
    }))
    return value
  }, [style, colors]);
  const { fontVariant, fontSize, fontFamily, fontStyle, fontWeight, color, textAlign, textAlignVertical, textDecorationColor, textDecorationLine, textTransform, textDecorationStyle, textShadowColor, textShadowOffset, textShadowRadius, backgroundColor, ...restOfStyle } = convertStyle

  return (
    <TouchableOpacity
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
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
    borderRadius: 24,
  },
  size24: {
    height: 24,
    paddingHorizontal: 8
  },
  size32: {
    height: 32,
    paddingHorizontal: 12
  },
  size40: {
    height: 40,
    paddingHorizontal: 16
  },
  size48: {
    height: 48,
    paddingHorizontal: 20
  },
  size56: {
    height: 56,
    paddingHorizontal: 20
  },
  size64: {
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
  grey: {
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