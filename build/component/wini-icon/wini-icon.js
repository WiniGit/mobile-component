"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Winicon = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const react_native_svg_1 = require("react-native-svg");
const svgCache = {};
const Winicon = ({ style = {}, size = 24, ...props }) => {
    const [svgData, setSvgData] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const cdnSrc = 'https://cdn.jsdelivr.net/gh/WiniGit/icon-library@latest/';
    (0, react_1.useEffect)(() => {
        // If src is already an SVG string, use it directly
        if (props.src && props.src.startsWith('<svg')) {
            setSvgData(props.src);
            return;
        }
        const fetchSvg = async () => {
            try {
                const url = props.src?.startsWith('http') ? props.src : `${cdnSrc}${props.src}.svg`;
                if (!url)
                    return;
                // Create a cache key that includes the URL
                const cacheKey = url;
                if (svgCache[cacheKey]) {
                    setSvgData(svgCache[cacheKey]);
                    return;
                }
                // If not in cache, set loading state
                setIsLoading(true);
                // Fetch from network
                const response = await fetch(url);
                let text = await response.text();
                // Clear loading state
                setIsLoading(false);
                if (!text.startsWith('<svg')) {
                    // is image
                    setSvgData(null);
                    return;
                }
                // Cache the colored version
                svgCache[cacheKey] = text;
                setSvgData(text);
            }
            catch (error) {
                setIsLoading(false);
                setSvgData(null); // Set fallback data
            }
        };
        fetchSvg();
    }, [props.src, props.color]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, { disabled: !props.onPress, onPress: props.onPress, style: [styles.icon, style, { width: size, height: size }], children: svgData ? ((0, jsx_runtime_1.jsx)(react_native_svg_1.SvgXml, { preserveAspectRatio: "xMinYMin slice", xml: svgData, width: size, height: size, color: (props.src.startsWith("fill") || props.src.startsWith("outline")) ? props.color : undefined })) : isLoading ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: [styles.placeholder, { width: size, height: size }] }) : null }));
};
exports.Winicon = Winicon;
const styles = react_native_1.StyleSheet.create({
    icon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholder: {
        backgroundColor: '#e0e0e0', // Skeleton loading placeholder
    },
});
