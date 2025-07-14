"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.hideBottomSheet = exports.showBottomSheet = exports.FBottomSheet = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const react_1 = __importStar(require("react"));
const typography_1 = require("../../skin/typography");
class FBottomSheet extends react_1.default.Component {
    state = {
        isVisible: false,
        children: (0, jsx_runtime_1.jsx)(react_native_1.View, {}),
    };
    showBottomSheet({ enableDismiss, title, dismiss, prefixAction, suffixAction, children, height, }) {
        this.setState({
            isVisible: true,
            enableDismiss: enableDismiss,
            title: title,
            dismiss: dismiss,
            prefixAction: prefixAction,
            suffixAction: suffixAction,
            children: children,
            height: height,
        });
    }
    hideBottomSheet() {
        this.setState({ isVisible: false });
    }
    render() {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Modal, { visible: this.state.isVisible ?? false, transparent: true, animationType: "slide", 
            // Thêm thuộc tính này để ngăn modal cha nhận sự kiện khi modal con hiển thị
            statusBarTranslucent: true, children: (0, jsx_runtime_1.jsx)(react_native_1.KeyboardAvoidingView, { behavior: react_native_1.Platform.OS === 'ios' ? 'padding' : undefined, style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(react_native_1.TouchableWithoutFeedback, { children: (0, jsx_runtime_1.jsx)(Container, { onDismiss: this.state.enableDismiss
                            ? () => {
                                this.hideBottomSheet();
                                if (this.state.dismiss)
                                    this.state.dismiss();
                            }
                            : undefined, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [styles.container, { height: this.state.height }], pointerEvents: "box-none", children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        width: 56,
                                        marginTop: 8,
                                        height: 6,
                                        borderRadius: 10,
                                        backgroundColor: '#EAEAEA',
                                    } }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { style: { width: '100%' }, children: this.state.title ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.header, children: [this.state.prefixAction, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [
                                                    typography_1.typography['label-3'],
                                                    {
                                                        position: 'absolute',
                                                        left: '12%',
                                                        right: '12%',
                                                        textAlign: 'center',
                                                        top: 12,
                                                    },
                                                ], children: this.state.title ?? '-' }), this.state.suffixAction] })) : (this.state.title) }), this.state.children] }) }) }) }) }));
    }
}
exports.FBottomSheet = FBottomSheet;
const scrSize = react_native_1.Dimensions.get('window');
const Container = ({ children, onDismiss, }) => {
    const pan = (0, react_1.useRef)(new react_native_1.Animated.ValueXY()).current;
    const panResponder = (0, react_1.useRef)(react_native_1.PanResponder.create({
        onStartShouldSetPanResponderCapture: () => false,
        onMoveShouldSetPanResponderCapture: (_, gestureState) => {
            // Chỉ bắt sự kiện vuốt xuống khi:
            // 1. Đang vuốt xuống (dy > 0)
            // 2. Đang ở vùng header (y < 100)
            return gestureState.dy > 10 && gestureState.y0 < 100;
        },
        onPanResponderGrant: () => {
            // Khi bắt đầu vuốt, đảm bảo modal cha không nhận sự kiện
            // Use a type assertion to access the internal value
            pan.setOffset({
                x: pan.x._value,
                y: pan.y._value,
            });
            pan.setValue({ x: 0, y: 0 });
        },
        onPanResponderMove: react_native_1.Animated.event([null, { dx: pan.x, dy: pan.y }], {
            useNativeDriver: false,
        }),
        onPanResponderRelease: (_, gestureState) => {
            pan.flattenOffset();
            const velocityThreshold = 0.5;
            if (gestureState.vy > velocityThreshold && gestureState.dy > 50) {
                react_native_1.Animated.timing(pan.y, {
                    toValue: scrSize.height,
                    duration: 300,
                    useNativeDriver: false,
                }).start(() => {
                    if (onDismiss)
                        onDismiss();
                });
            }
            else {
                // Nếu kéo không vượt ngưỡng, trả BottomSheet về vị trí ban đầu
                react_native_1.Animated.spring(pan.y, {
                    toValue: 0,
                    useNativeDriver: false,
                }).start();
            }
        },
    })).current;
    return onDismiss ? ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: {
            ...styles.overlay,
            backgroundColor: pan.y.interpolate({
                inputRange: [0, scrSize.height],
                outputRange: ['#00000080', '#00000000'],
                extrapolate: 'clamp',
            }),
        }, ...panResponder.panHandlers, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { style: styles.dismissOverlay, onPress: onDismiss }), (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: {
                    alignItems: 'center',
                    gap: 8,
                    width: '100%',
                    transform: [
                        {
                            translateY: pan.y.interpolate({
                                inputRange: [0, scrSize.height],
                                outputRange: [0, scrSize.height],
                                extrapolate: 'clamp',
                            }),
                        },
                    ],
                }, children: children })] })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { ...styles.overlay, backgroundColor: '#00000080' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignItems: 'center', gap: 8, width: '100%' }, children: children }) }));
};
const styles = react_native_1.StyleSheet.create({
    overlay: {
        alignItems: 'center',
        height: '100%',
        width: '100%',
        flex: 1,
        position: 'relative',
        justifyContent: 'flex-end',
    },
    dismissOverlay: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#000000',
        opacity: 0.01,
    },
    container: {
        width: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        alignItems: 'center',
        maxHeight: '90%', // Add this to limit maximum height
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        minHeight: 48,
        width: '100%',
        position: 'relative',
    },
});
const showBottomSheet = ({ ref, enableDismiss, titleText, title, dismiss, prefixAction, suffixAction, children,
// height,
 }) => {
    ref.current.showBottomSheet({
        dismiss: dismiss,
        enableDismiss: enableDismiss,
        prefixAction: prefixAction,
        suffixAction: suffixAction,
        title: title,
        titleText: titleText,
        children: children,
        // height: height,
    });
};
exports.showBottomSheet = showBottomSheet;
const hideBottomSheet = (ref) => {
    ref.current.hideBottomSheet();
};
exports.hideBottomSheet = hideBottomSheet;
