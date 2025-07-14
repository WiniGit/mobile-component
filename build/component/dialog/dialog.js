"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showDialog = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const component_status_1 = require("../component-status");
const react_native_1 = require("react-native");
const color_1 = require("../../skin/color");
const typography_1 = require("../../skin/typography");
const showDialog = ({ ref, title, status, content, onSubmit, onCancel, submitTitle, }) => {
    ref?.current?.showDialogNoti({
        title: title ?? '',
        status: status ?? component_status_1.ComponentStatus.INFOR,
        content: content ?? '',
        onSubmit: onSubmit ?? (() => { }),
        onCancel: onCancel ?? (() => { }),
        submitTitle: submitTitle,
    });
};
exports.showDialog = showDialog;
class FDialog extends react_1.default.Component {
    state = {
        open: false,
        title: '',
        status: component_status_1.ComponentStatus.INFOR,
        content: '',
        onSubmit: () => { },
        onCancel: () => { },
    };
    showDialogNoti(data) {
        this.setState({ open: true, ...data });
    }
    closeDialog() {
        this.setState({ open: false });
    }
    render() {
        switch (this.state.status) {
            case component_status_1.ComponentStatus.WARNING:
                var bgColor = color_1.lightThemeColor['warning-color-main'];
            case component_status_1.ComponentStatus.ERROR:
                bgColor = color_1.lightThemeColor['error-color-main'];
            case component_status_1.ComponentStatus.SUCCSESS:
                bgColor = color_1.lightThemeColor['success-color-main'];
            default: // ComponentStatus.INFOR
                bgColor = color_1.lightThemeColor['infor-color-main'];
        }
        return ((0, jsx_runtime_1.jsx)(react_native_1.Modal, { animationType: "slide", visible: this.state.open ?? false, transparent: true, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.overlay, children: (0, jsx_runtime_1.jsxs)(react_native_1.KeyboardAvoidingView, { behavior: react_native_1.Platform.OS === 'ios' ? 'padding' : 'height', keyboardVerticalOffset: react_native_1.Platform.OS === 'ios' ? 35 : 0, style: [styles.container], children: [(0, component_status_1.getStatusIcon)(this.state.status, 64), (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { style: { gap: 4, marginTop: 12, alignItems: 'center' }, children: [this.state.title ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [typography_1.typography["label-2"], { textAlign: 'center' }], children: this.state.title })) : null, typeof this.state.content === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [
                                        typography_1.typography["body-3"],
                                        { color: '#666666', textAlign: 'center' },
                                    ], children: this.state.content })) : (this.state.content)] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', marginVertical: 24, gap: 8 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, { style: [styles.footerButton], onPress: () => {
                                        if (this.state.onCancel)
                                            this.state.onCancel();
                                        this.closeDialog();
                                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [typography_1.typography["button-text-1"], { color: '#00000099' }], children: this.state.titleCancel ?? 'Hủy' }) }), (0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, { style: [styles.footerButton, { backgroundColor: bgColor }], onPress: () => {
                                        if (this.state.onSubmit)
                                            this.state.onSubmit();
                                        this.closeDialog();
                                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [typography_1.typography["button-text-1"], { color: '#fff' }], children: this.state.titleSubmit ?? 'Xác nhận' }) })] })] }) }) }));
    }
}
exports.default = FDialog;
const styles = react_native_1.StyleSheet.create({
    overlay: {
        alignItems: 'center',
        height: '100%',
        width: '100%',
        flex: 1,
        paddingHorizontal: 16,
        justifyContent: 'center',
        backgroundColor: '#00000080',
    },
    container: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 24,
        alignItems: 'center',
    },
    footerButton: {
        backgroundColor: '#F8F7F7',
        flex: 1,
        borderRadius: 8,
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
