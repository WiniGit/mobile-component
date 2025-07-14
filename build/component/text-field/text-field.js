"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FTextField = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
exports.FTextField = (0, react_1.forwardRef)(({ style = {}, helperTextColor = "#E14337", ...props }, ref) => {
    const colorScheme = (0, react_native_1.useColorScheme)();
    const [inputValue, setInputValue] = (0, react_1.useState)('');
    const [focused, setFocused] = (0, react_1.useState)(false);
    const { fontVariant, fontSize, fontFamily, fontStyle, fontWeight, color, textAlign, textAlignVertical, textDecorationColor, textDecorationLine, textTransform, textDecorationStyle, textShadowColor, textShadowOffset, textShadowRadius, ...restOfStyle } = style;
    (0, react_1.useEffect)(() => {
        if (props.value !== inputValue)
            setInputValue(props.value ?? "");
    }, [props.value]);
    (0, react_1.useImperativeHandle)(ref, () => ({
        value: inputValue,
        isFocused: focused
    }), [focused, inputValue]);
    const finalStyle = (0, react_1.useMemo)(() => {
        const tmp = { ...textFieldStyle.container, ...restOfStyle };
        if (focused)
            tmp.borderColor = "#287CF0";
        if (props.helperText?.length)
            tmp.borderColor = helperTextColor;
        if (props.multiline)
            tmp.height = undefined;
        if (props.disabled)
            tmp.backgroundColor = props.disabledBg ?? "#F4F4F5";
        return tmp;
    }, [focused, props.disabled, props.helperText]);
    return (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: finalStyle, children: [props.prefix, (0, jsx_runtime_1.jsx)(react_native_1.TextInput, { style: {
                    width: '100%',
                    flex: 1,
                    padding: 0,
                    height: '100%',
                    color: props.disabled ? "#61616B" : color,
                    fontVariant, fontSize, fontFamily, fontStyle, fontWeight, textAlign, textAlignVertical, textDecorationColor, textDecorationLine, textTransform, textDecorationStyle, textShadowColor, textShadowOffset, textShadowRadius,
                }, placeholder: props.placeholder, placeholderTextColor: color, multiline: props.multiline, numberOfLines: props.numberOfLines, autoFocus: props.autoFocus, value: inputValue, onPress: props.onPress, returnKeyType: props.returnKeyType, onFocus: (ev) => {
                    setFocused(true);
                    if (props.onFocus)
                        props.onFocus(ev);
                }, onChangeText: (value) => {
                    setInputValue(value);
                    if (props.onChange)
                        props.onChange(value);
                }, onBlur: (ev) => {
                    setFocused(false);
                    setInputValue(inputValue);
                    if (props.onBlur)
                        props.onBlur(ev, inputValue);
                }, secureTextEntry: props.secureTextEntry, keyboardType: props.type, maxLength: props.maxLength, readOnly: props.disabled, onSubmitEditing: () => {
                    if (props.onSubmit)
                        props.onSubmit(inputValue);
                } }), props.suffix, props.helperText?.length ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: [
                    // TextStyleSkin.subtitle4,
                    {
                        color: helperTextColor,
                        position: 'absolute',
                        bottom: 0,
                        left: 2,
                        transform: [{ translateY: 22 }],
                    },
                ], children: props.helperText })) : null] });
});
const textFieldStyle = react_native_1.StyleSheet.create({
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
