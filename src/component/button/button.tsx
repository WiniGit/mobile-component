import { Text, TouchableOpacity, StyleSheet, TextStyle } from 'react-native';
import { ReactNode } from 'react';

interface ButtonProps {
  onPress?: () => void;
  label: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  disabled?: boolean;
  style?: TextStyle;
}

export const FButton = ({ style = {}, ...props }: ButtonProps) => {
  const { fontVariant, fontSize, fontFamily, fontStyle, fontWeight, color, textAlign, textAlignVertical, textDecorationColor, textDecorationLine, textTransform, textDecorationStyle, textShadowColor, textShadowOffset, textShadowRadius, ...restOfStyle } = style

  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.disabled}
      style={[
        styles.container,
        props.disabled ? {
          backgroundColor: "#F4F4F5"
        } : undefined,
        { ...restOfStyle }
      ]}
    >
      {props.prefix}
      {<Text style={{
        color: props.disabled ? "#61616B" : color,
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
  }
})