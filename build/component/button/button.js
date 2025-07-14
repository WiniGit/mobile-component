"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const FButton = ({ style = {}, ...props }) => {
    const { fontVariant, fontSize, fontFamily, fontStyle, fontWeight, color, textAlign, textAlignVertical, textDecorationColor, textDecorationLine, textTransform, textDecorationStyle, textShadowColor, textShadowOffset, textShadowRadius, ...restOfStyle } = style;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.TouchableOpacity, { onPress: props.onPress, disabled: props.disabled, style: [
            styles.container,
            props.disabled ? {
                backgroundColor: "#F4F4F5"
            } : undefined,
            { ...restOfStyle }
        ], children: [props.prefix, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: props.disabled ? "#61616B" : color,
                    fontVariant, fontSize, fontFamily, fontStyle, fontWeight, textAlign, textAlignVertical, textDecorationColor, textDecorationLine, textTransform, textDecorationStyle, textShadowColor, textShadowOffset, textShadowRadius
                }, children: props.label }), props.suffix] }));
};
exports.FButton = FButton;
const styles = react_native_1.StyleSheet.create({
    container: {
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        justifyContent: 'center',
        borderRadius: 24,
    }
});
