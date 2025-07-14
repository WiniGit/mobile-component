"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FCheckbox = FCheckbox;
exports.FMultiCheckbox = FMultiCheckbox;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const color_1 = require("../../skin/color");
const react_native_svg_1 = require("react-native-svg");
const typography_1 = require("../../skin/typography");
function FCheckbox({ size = 20, checkColor = "#fff", style = {}, ...props }) {
    const [checked, setChecked] = (0, react_1.useState)(props.value);
    (0, react_1.useEffect)(() => {
        if (props.value !== checked)
            setChecked(props.value);
    }, [props.value]);
    const handleChangeValue = () => {
        const newValue = !checked;
        setChecked(newValue);
        props.onChange?.(newValue);
    };
    return ((0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, { style: { padding: 4 }, onPress: props.disabled ? undefined : handleChangeValue, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: [styles.container, { width: size, height: size }, checked ? styles.activeStyle : styles.inactiveStyle, style], children: (0, jsx_runtime_1.jsx)(react_native_svg_1.SvgXml, { width: "100%", height: "100%", xml: `<svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            ${checked === null && (0, jsx_runtime_1.jsx)("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M4.79199 9.95298C4.79199 9.69148 5.00398 9.47949 5.26548 9.47949H14.7352C14.9967 9.47949 15.2087 9.69148 15.2087 9.95298C15.2087 10.2145 14.9967 10.4265 14.7352 10.4265H5.26548C5.00398 10.4265 4.79199 10.2145 4.79199 9.95298Z", fill: checkColor })}
            ${checked && (0, jsx_runtime_1.jsx)("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M15.07 6.49317C15.2549 6.67808 15.2549 6.97787 15.07 7.16278L8.91467 13.3181C8.72977 13.503 8.42997 13.503 8.24507 13.3181L4.93067 10.0037C4.74577 9.81878 4.74577 9.51899 4.93067 9.33408C5.11558 9.14917 5.41537 9.14917 5.60028 9.33408L8.57987 12.3137L14.4004 6.49317C14.5853 6.30827 14.8851 6.30827 15.07 6.49317Z", fill: checkColor })}
        </svg>` }) }) }));
}
const styles = react_native_1.StyleSheet.create({
    container: {
        borderRadius: 4,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeStyle: {
        backgroundColor: color_1.lightThemeColor['primary-color-main'],
        borderColor: 'transparent',
    },
    inactiveStyle: {
        borderColor: '#00358033',
    },
});
function FMultiCheckbox({ data = [], selected, onSelect, size = 20, disable = false, checkboxStyle = {}, }) {
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: disable ? 'none' : 'auto', children: (0, jsx_runtime_1.jsx)(react_native_1.FlatList, { horizontal: true, data: data, renderItem: ({ item }) => ((0, jsx_runtime_1.jsxs)(react_native_1.TouchableOpacity, { onPress: () => {
                    onSelect(item);
                }, style: { padding: 4, flexDirection: 'row', gap: 8 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [
                            typography_1.typography.regular2,
                            { color: disable ? '#667994' : '#00204D' },
                        ], children: item.name }), (0, jsx_runtime_1.jsx)(FCheckbox, { size: size, value: selected?.some((e) => e == item.id) ?? false, onChange: () => onSelect(item), disabled: disable, style: checkboxStyle })] })), keyExtractor: (item) => `${item.id}`, onEndReachedThreshold: 0.1 }) }));
}
