import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import {
    KeyboardTypeOptions,
    ReturnKeyTypeOptions,
    StyleSheet,
    Text,
    TextInput,
    TextInputFocusEvent,
    TextStyle,
    useColorScheme,
    View
} from 'react-native';

interface TextFieldProps {
    value?: string;
    maxLength?: number;
    numberOfLines?: number;
    onPress?: () => void;
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
    disabledBg?: string;
    multiline?: boolean;
    suffix?: React.ReactNode;
    prefix?: React.ReactNode;
    helperText?: string;
    helperTextColor?: string;
    style?: TextStyle;
    autoFocus?: boolean;
    secureTextEntry?: boolean;
    type?: KeyboardTypeOptions;
}

interface TextFieldRef {
    value: string;
    isFocused: boolean;
}

export const FTextField = forwardRef<TextFieldRef, TextFieldProps>(({ style = {}, helperTextColor = "#E14337", ...props }, ref) => {
    const colorScheme = useColorScheme();
    const [inputValue, setInputValue] = useState('');
    const [focused, setFocused] = useState(false);
    const { fontVariant, fontSize, fontFamily, fontStyle, fontWeight, color, textAlign, textAlignVertical, textDecorationColor, textDecorationLine, textTransform, textDecorationStyle, textShadowColor, textShadowOffset, textShadowRadius, ...restOfStyle } = style

    useEffect(() => {
        if (props.value !== inputValue) setInputValue(props.value ?? "")
    }, [props.value])

    useImperativeHandle(ref, () => ({
        value: inputValue,
        isFocused: focused
    }), [focused, inputValue])

    const finalStyle = useMemo(() => {
        const tmp: any = { ...textFieldStyle.container, ...restOfStyle }
        if (focused) tmp.borderColor = "#287CF0"
        if (props.helperText?.length) tmp.borderColor = helperTextColor
        if (props.multiline) tmp.height = undefined
        if (props.disabled) tmp.backgroundColor = props.disabledBg ?? "#F4F4F5"
        return tmp
    }, [focused, props.disabled, props.helperText])

    return <View style={finalStyle}>
        {props.prefix}
        <TextInput
            style={{
                width: '100%',
                flex: 1,
                padding: 0,
                height: '100%',
                color: props.disabled ? "#61616B" : color,
                fontVariant, fontSize, fontFamily, fontStyle, fontWeight, textAlign, textAlignVertical, textDecorationColor, textDecorationLine, textTransform, textDecorationStyle, textShadowColor, textShadowOffset, textShadowRadius,
            }}
            placeholder={props.placeholder}
            placeholderTextColor={color}
            multiline={props.multiline}
            numberOfLines={props.numberOfLines}
            autoFocus={props.autoFocus}
            value={inputValue}
            onPress={props.onPress}
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
            <Text
                numberOfLines={1}
                style={[
                    // TextStyleSkin.subtitle4,
                    {
                        color: helperTextColor,
                        position: 'absolute',
                        bottom: 0,
                        left: 2,
                        transform: [{ translateY: 22 }],
                    },
                ]}
            >
                {props.helperText}
            </Text>
        ) : null}
    </View>
})

const textFieldStyle = StyleSheet.create({
    container: {
        overflow: 'visible',
        position: 'relative',
        flexDirection: 'row',
        minHeight: 40,
        borderWidth: 1,
        borderStyle: 'solid',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        columnGap: 12,
        width: '100%',
        borderColor: '#00358014',
    },
});
