"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FSwitch = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const FSwitch = ({ onChange, value = false, color = '#287CF0', size = 1 }) => {
    return ((0, jsx_runtime_1.jsx)(react_native_1.Switch, { trackColor: { false: '#EFEFF0', true: color }, ios_backgroundColor: "#EFEFF0", style: { transform: [{ scaleX: size }, { scaleY: size }] }, onValueChange: onChange, value: value }));
};
exports.FSwitch = FSwitch;
