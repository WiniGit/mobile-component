import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { GestureResponderEvent, KeyboardTypeOptions, LayoutChangeEvent, Pressable, ReturnKeyTypeOptions, StyleSheet, Text, TextInput, TextInputFocusEvent, TextStyle, View, ViewStyle } from 'react-native';
import { useDesignTokens } from '../../module/WiniProvider';

export enum SizeVariant {
    size24 = "size24",
    size32 = "size32",
    size40 = "size40",
    size48 = "size48",
}

interface TextFieldProps {
    value?: string;
    maxLength?: number;
    numberOfLines?: number;
    onPress?: (event: GestureResponderEvent) => void;
    onLayout?: ((event: LayoutChangeEvent) => void)
    onChange?: (e: string) => void;
    onSubmit?: (e: string) => void;
    onBlur?: (
        e: TextInputFocusEvent,
        value: string
    ) => void;
    onFocus?: (e: TextInputFocusEvent) => void;
    placeholder?: string;
    returnKeyType?: ReturnKeyTypeOptions | undefined;
    disabled?: boolean;
    multiline?: boolean;
    suffix?: React.ReactNode;
    prefix?: React.ReactNode;
    helperText?: string;
    helperTextColor?: string;
    style?: Array<ViewStyle | TextStyle | SizeVariant> | ViewStyle | TextStyle | SizeVariant
    autoFocus?: boolean;
    secureTextEntry?: boolean;
    type?: KeyboardTypeOptions;
    simpleStyle?: boolean;
}

interface TextFieldRef {
    value: string;
    setInputValue: (value: string) => void;
    isFocused: boolean;
}

const initStyle = [SizeVariant.size32]

export const WTextField = forwardRef<TextFieldRef, TextFieldProps>(({ style = initStyle, helperTextColor = "#E14337", ...props }, ref) => {
    const { colors } = useDesignTokens();
    const [inputValue, setInputValue] = useState('');
    const [focused, setFocused] = useState(false);
    const convertStyle: TextStyle = useMemo(() => {
        const tmp = Array.isArray(style) ? style : [style]
        let value: any = {}
        if (!props.simpleStyle) value = { ...styles.container }
        tmp.forEach((e => {
            if (typeof e === "string") {
                value = { ...value, ...(styles as any)[e] }
            } else value = { ...value, ...e }
        }))
        if (props.helperText?.length) value.borderColor = helperTextColor
        else if (focused) value.borderColor = "#287CF0"
        else value.borderColor = colors?.['neutral-border-color-main']
        if (props.disabled) value.backgroundColor = colors?.['neutral-background-color-disable']
        return value
    }, [style, props.simpleStyle, focused, props.disabled, props.helperText, colors?.['neutral-background-color-disable']])
    const { fontVariant, fontSize, lineHeight, fontFamily, fontStyle, fontWeight, color, textAlign, textAlignVertical, textDecorationColor, textDecorationLine, textTransform, textDecorationStyle, textShadowColor, textShadowOffset, textShadowRadius, ...restOfStyle } = convertStyle

    useEffect(() => {
        if (props.value !== inputValue) setInputValue(props.value ?? "")
    }, [props.value])

    useImperativeHandle(ref, () => ({
        value: inputValue,
        setInputValue: setInputValue,
        isFocused: focused
    }), [focused, inputValue])

    return <Pressable style={[restOfStyle, styles.simpleStyle]} disabled={props.disabled} onLayout={props.onLayout} onPress={props.onPress}>
        {props.prefix}
        <TextInput
            style={{
                width: '100%',
                flex: 1,
                padding: 0,
                height: '100%',
                color: props.disabled ? colors?.['neutral-text-color-disabled'] : color,
                opacity: inputValue.length ? 1 : 0.6,
                fontVariant, fontSize, fontFamily, fontStyle, fontWeight, textAlign, textAlignVertical, textDecorationColor, textDecorationLine, textTransform, textDecorationStyle, textShadowColor, textShadowOffset, textShadowRadius,
            }}
            placeholder={props.placeholder}
            placeholderTextColor={color}
            multiline={props.multiline}
            numberOfLines={props.numberOfLines}
            autoFocus={props.autoFocus}
            value={inputValue}
            returnKeyType={props.returnKeyType}
            onFocus={(ev: TextInputFocusEvent) => {
                setFocused(true);
                if (props.onFocus) props.onFocus(ev);
            }}
            onChangeText={(value) => {
                setInputValue(value)
                if (props.onChange) props.onChange(value);
            }}
            onBlur={(ev: TextInputFocusEvent) => {
                setFocused(false)
                setInputValue(inputValue)
                if (props.onBlur) props.onBlur(ev, inputValue);
            }}
            secureTextEntry={props.secureTextEntry}
            keyboardType={props.type}
            maxLength={props.maxLength}
            readOnly={props.disabled}
            onSubmitEditing={() => {
                if (props.onSubmit) props.onSubmit(inputValue);
            }}
        />
        {props.suffix}
        {props.helperText?.length ? (
            <Text numberOfLines={1} style={[styles.helperText, { color: helperTextColor }]} >
                {props.helperText}
            </Text>
        ) : null}
    </Pressable>
})

const styles = StyleSheet.create({
    simpleStyle: {
        overflow: 'visible',
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 8,
    },
    helperText: {
        fontSize: 12,
        position: 'absolute',
        bottom: -20,
        left: 2,
    },
    size24: {
        height: 24,
        paddingHorizontal: 8,
        columnGap: 8
    },
    size32: {
        height: 32,
        paddingHorizontal: 12,
        columnGap: 12,
    },
    size40: {
        height: 40,
        paddingHorizontal: 16,
        columnGap: 12,
    },
    size48: {
        height: 48,
        paddingHorizontal: 16,
        columnGap: 12,
    }
});
