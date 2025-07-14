"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WiniProvider = exports.useDesignTokens = exports.DesignTokenProvider = exports.Stack = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const config_1 = require("../controller/config");
const setting_1 = require("../controller/setting");
const da_1 = require("./da");
const utils_1 = require("../controller/utils");
const react_i18next_1 = require("react-i18next");
const data_1 = require("../controller/data");
const native_stack_1 = require("@react-navigation/native-stack");
const native_1 = require("@react-navigation/native");
const snackbar_1 = require("../component/snackbar/snackbar");
const dialog_1 = __importDefault(require("../component/dialog/dialog"));
const react_native_gesture_handler_1 = require("react-native-gesture-handler");
const color_1 = require("../skin/color");
const react_native_1 = require("react-native");
const typography_1 = require("../skin/typography");
const boxShadow_1 = require("../skin/boxShadow");
const css_to_react_native_transform_1 = __importDefault(require("css-to-react-native-transform"));
exports.Stack = (0, native_stack_1.createNativeStackNavigator)();
const DesignTokenContext = (0, react_1.createContext)(undefined);
const DesignTokenProvider = ({ children, designTokens = [] }) => {
    const [colors, setColors] = (0, react_1.useState)(null);
    const [textStyles, setTextStyles] = (0, react_1.useState)(null);
    const [boxShadows, setBoxShadows] = (0, react_1.useState)(null);
    const [customStyleSheet, setCustomStyleSheet] = (0, react_1.useState)(null);
    const systemScheme = (0, react_native_1.useColorScheme)();
    const [theme, setTheme] = (0, react_1.useState)('light');
    const appliedScheme = theme === 'light' ? systemScheme : theme;
    const isDark = appliedScheme === 'dark';
    function convertRemToPxInString(cssString) {
        return filterCssToClassRulesOnly(cssString.replace(/(\d*\.?\d+)rem/g, (match, remValue) => {
            const pxValue = parseFloat(remValue) * 10;
            return `${pxValue}px`;
        }));
    }
    function filterCssToClassRulesOnly(rawCss) {
        // Biểu thức chính quy để tìm các khối bắt đầu bằng ".classname"
        // và kết thúc bằng cặp ngoặc nhọn {}.
        // \.          -> khớp với ký tự dấu chấm
        // [a-zA-Z0-9_-]+ -> khớp với tên class (chữ, số, gạch dưới, gạch ngang)
        // \s*\{       -> khớp với khoảng trắng (nếu có) và dấu {
        // [^}]+       -> khớp với bất kỳ ký tự nào không phải là dấu }
        // \}          -> khớp với dấu }
        const classRuleRegex = /\.([a-zA-Z0-9_-]+)\s*\{[^}]+\}/g;
        // Tìm tất cả các kết quả khớp trong chuỗi
        const matches = rawCss.match(classRuleRegex);
        // Nếu tìm thấy, nối chúng lại thành một chuỗi mới.
        // Nếu không, trả về một chuỗi rỗng.
        return matches ? matches.join('\n\n') : '';
    }
    (0, react_1.useEffect)(() => {
        const _colors = isDark ? color_1.darkThemeColor : color_1.lightThemeColor;
        let _textStyles = textStyles ?? {};
        const _boxShadows = { ...boxShadow_1.initBoxShadows };
        let _customStyleSheet = {};
        const _designTokens = designTokens.map(e => e.Value ? { ...e, Value: typeof e.Value === "string" ? JSON.parse(e.Value) : e.Value } : e);
        if (_designTokens.length) {
            const tokenValues = _designTokens.filter(e => e.Type !== da_1.DesignTokenType.group && (e.Value?.lightMode || e.Value?.darkMode));
            const groupTokens = _designTokens.filter(e => e.Type === da_1.DesignTokenType.group);
            const colorVariables = tokenValues.filter(e => e.Type === da_1.DesignTokenType.color);
            const boxShadowVariables = tokenValues.filter(e => e.Type === da_1.DesignTokenType.boxShadow);
            const fontVariables = tokenValues.filter(e => e.Type === da_1.DesignTokenType.font);
            const customVariables = tokenValues.filter(e => e.Type === da_1.DesignTokenType.custom);
            colorVariables.forEach(e => {
                const tkParent = groupTokens.find(g => g.Id === e.ParentId);
                _colors[`${tkParent ? `${utils_1.Util.toSlug(tkParent.Name)}-` : ""}${utils_1.Util.toSlug(e.Name)}`] = isDark ? e.Value.darkMode : e.Value.lightMode;
            });
            fontVariables.forEach(e => {
                _textStyles[utils_1.Util.toSlug(e.Name)] ??= parseFontString(e.Value.lightMode);
            });
            try {
                customVariables.forEach(e => {
                    _customStyleSheet = { ..._customStyleSheet, ...(0, css_to_react_native_transform_1.default)(convertRemToPxInString(e.Value.lightMode)) };
                });
                console.log("customStyleSheet: ", _customStyleSheet);
                setCustomStyleSheet(_customStyleSheet);
            }
            catch (error) {
                console.log("parse css error: ", error);
            }
            boxShadowVariables.forEach(e => {
                _boxShadows[utils_1.Util.toSlug(e.Name)] = { boxShadow: e.Value.lightMode };
            });
        }
        _textStyles = { ...typography_1.typography, ..._textStyles };
        // regular
        _textStyles.regular0.color = _colors["neutral-text-color-title"];
        _textStyles.regular1.color = _colors["neutral-text-color-title"];
        _textStyles.regular2.color = _colors["neutral-text-color-title"];
        _textStyles.regular3.color = _colors["neutral-text-color-title"];
        _textStyles.regular4.color = _colors["neutral-text-color-title"];
        _textStyles.regular5.color = _colors["neutral-text-color-title"];
        _textStyles.regular6.color = _colors["neutral-text-color-title"];
        _textStyles.regular7.color = _colors["neutral-text-color-title"];
        _textStyles.regular8.color = _colors["neutral-text-color-title"];
        _textStyles.regular9.color = _colors["neutral-text-color-title"];
        // semibold
        _textStyles.semibold1.color = _colors["neutral-text-color-title"];
        _textStyles.semibold2.color = _colors["neutral-text-color-title"];
        _textStyles.semibold3.color = _colors["neutral-text-color-title"];
        _textStyles.semibold4.color = _colors["neutral-text-color-title"];
        _textStyles.semibold5.color = _colors["neutral-text-color-title"];
        _textStyles.semibold6.color = _colors["neutral-text-color-title"];
        _textStyles.semibold7.color = _colors["neutral-text-color-title"];
        _textStyles.semibold8.color = _colors["neutral-text-color-title"];
        _textStyles.semibold9.color = _colors["neutral-text-color-title"];
        // medium
        _textStyles.medium1.color = _colors["neutral-text-color-title"];
        _textStyles.medium2.color = _colors["neutral-text-color-title"];
        _textStyles.medium3.color = _colors["neutral-text-color-title"];
        _textStyles.medium4.color = _colors["neutral-text-color-title"];
        _textStyles.medium5.color = _colors["neutral-text-color-title"];
        _textStyles.medium6.color = _colors["neutral-text-color-title"];
        _textStyles.medium7.color = _colors["neutral-text-color-title"];
        _textStyles.medium8.color = _colors["neutral-text-color-title"];
        _textStyles.medium9.color = _colors["neutral-text-color-title"];
        // heading
        _textStyles["heading-1"].color = _colors["neutral-text-color-title"];
        _textStyles["heading-2"].color = _colors["neutral-text-color-title"];
        _textStyles["heading-3"].color = _colors["neutral-text-color-title"];
        _textStyles["heading-4"].color = _colors["neutral-text-color-title"];
        _textStyles["heading-5"].color = _colors["neutral-text-color-title"];
        _textStyles["heading-6"].color = _colors["neutral-text-color-title"];
        _textStyles["heading-7"].color = _colors["neutral-text-color-title"];
        _textStyles["heading-8"].color = _colors["neutral-text-color-title"];
        _textStyles["heading-9"].color = _colors["neutral-text-color-title"];
        // label
        _textStyles["label-1"].color = _colors["neutral-text-color-label"];
        _textStyles["label-2"].color = _colors["neutral-text-color-label"];
        _textStyles["label-3"].color = _colors["neutral-text-color-label"];
        _textStyles["label-4"].color = _colors["neutral-text-color-label"];
        _textStyles["label-5"].color = _colors["neutral-text-color-label"];
        // body
        _textStyles["body-1"].color = _colors["neutral-text-color-body"];
        _textStyles["body-2"].color = _colors["neutral-text-color-body"];
        _textStyles["body-3"].color = _colors["neutral-text-color-body"];
        // highlight
        _textStyles["highlight-1"].color = _colors["neutral-text-color-title"];
        _textStyles["highlight-2"].color = _colors["neutral-text-color-title"];
        _textStyles["highlight-3"].color = _colors["neutral-text-color-title"];
        _textStyles["highlight-4"].color = _colors["neutral-text-color-title"];
        _textStyles["highlight-5"].color = _colors["neutral-text-color-title"];
        _textStyles["highlight-6"].color = _colors["neutral-text-color-title"];
        // subtitle
        _textStyles["subtitle-1"].color = _colors["neutral-text-color-subtitle"];
        _textStyles["subtitle-2"].color = _colors["neutral-text-color-subtitle"];
        _textStyles["subtitle-3"].color = _colors["neutral-text-color-subtitle"];
        _textStyles["subtitle-4"].color = _colors["neutral-text-color-subtitle"];
        _textStyles["subtitle-5"].color = _colors["neutral-text-color-subtitle"];
        // placeholder
        _textStyles["placeholder-1"].color = _colors["neutral-text-color-placeholder"];
        _textStyles["placeholder-2"].color = _colors["neutral-text-color-placeholder"];
        // button-text
        _textStyles["button-text-1"].color = _colors["primary-color-main"];
        _textStyles["button-text-2"].color = _colors["primary-color-main"];
        _textStyles["button-text-3"].color = _colors["primary-color-main"];
        _textStyles["button-text-4"].color = _colors["primary-color-main"];
        _textStyles["button-text-5"].color = _colors["primary-color-main"];
        _textStyles["button-text-6"].color = _colors["primary-color-main"];
        setColors(_colors);
        setTextStyles(_textStyles);
        setBoxShadows(_boxShadows);
    }, [isDark, designTokens.length]);
    return ((0, jsx_runtime_1.jsx)(DesignTokenContext.Provider, { value: { colors, textStyles, boxShadows, customStyleSheet, theme, setTheme }, children: children }));
};
exports.DesignTokenProvider = DesignTokenProvider;
const useDesignTokens = () => {
    const context = (0, react_1.useContext)(DesignTokenContext);
    if (context === undefined) {
        throw new Error('useDesignTokens must be used within a DesignTokenProvider');
    }
    return context;
};
exports.useDesignTokens = useDesignTokens;
function parseFontString(input) {
    const regex = /^(normal|bold|lighter|bolder|\d{3})\s+(\d+(?:\.\d+)?(?:px|pt|pc|in|cm|mm|em|ex|ch|rem|lh|vw|vh|vmin|vmax|%))\/(\d+(?:\.\d+)?(?:px|pt|pc|in|cm|mm|em|ex|ch|rem|lh|vw|vh|vmin|vmax|%))\s+(['"].+['"])$/i;
    const match = input.match(regex);
    if (!match)
        return {};
    const [weight, size, line, family] = match;
    return {
        fontWeight: isNaN(parseInt(weight)) ? weight : parseInt(weight, 10),
        fontSize: size.endsWith("rem") ? (parseFloat(size.replace("rem", "")) * 10) : parseFloat(size.replace("px", "")),
        lineHeight: line.endsWith("rem") ? (parseFloat(line.replace("rem", "")) * 10) : parseFloat(line.replace("px", "")),
        fontFamily: family,
    };
}
const WiniProvider = (props) => {
    return (0, jsx_runtime_1.jsx)(react_native_gesture_handler_1.GestureHandlerRootView, { children: (0, jsx_runtime_1.jsx)(native_1.NavigationContainer, { children: (0, jsx_runtime_1.jsx)(RootStack, { ...props }) }) });
};
exports.WiniProvider = WiniProvider;
const RootStack = (props) => {
    const navigate = (0, native_1.useNavigation)();
    config_1.ConfigData.pid = props.pid;
    config_1.ConfigData.url = props.url;
    config_1.ConfigData.imgUrlId = props.imgUrlId;
    config_1.ConfigData.fileUrl = props.fileUrl;
    if (props.globalHeaders)
        config_1.ConfigData.globalHeaders = props.globalHeaders;
    config_1.ConfigData.onInvalidToken = props.onInvalidToken ?? (() => {
        utils_1.Util.clearStorage();
        navigate.dispatch(native_1.StackActions.popTo("/login"));
    });
    const { i18n } = (0, react_i18next_1.useTranslation)();
    const [loadedResources, setLoadedResources] = (0, react_1.useState)(false);
    const [designTokens, setDesignTokens] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        config_1.ConfigData.pid = props.pid;
        if (props.pid.length === 32) {
            const _desginTokenController = new setting_1.TableController("designtoken");
            _desginTokenController.getAll().then(res => {
                if (res.code === 200 && res.data.length)
                    setDesignTokens(res.data);
            });
            const projectController = new setting_1.WiniController("Project");
            projectController.getByIds([props.pid]).then(res => {
                if (res.code === 200 && res.data[0]) {
                    if (props.onProjectLoaded)
                        props.onProjectLoaded(res.data[0]);
                }
            });
            const languageController = new data_1.DataController("Language");
            languageController.getAll().then(async (res) => {
                if (res.code === 200 && res.data.length) {
                    const languages = await Promise.all(res.data.map((e) => config_1.BaseDA.get(config_1.ConfigData.imgUrlId + e.Json)));
                    languages.forEach((lngData, i) => {
                        if (lngData) {
                            i18n.addResourceBundle(res.data[i].Lng, "translation", lngData, true, true);
                        }
                    });
                    setLoadedResources(true);
                }
                else
                    setLoadedResources(true);
            });
        }
        else {
            console.log("Project not found");
            setLoadedResources(true);
        }
    }, [props.pid]);
    return (0, jsx_runtime_1.jsxs)(exports.DesignTokenProvider, { designTokens: designTokens, children: [(0, jsx_runtime_1.jsx)(snackbar_1.FSnackbar, {}), (0, jsx_runtime_1.jsx)(dialog_1.default, {}), loadedResources && props.children] });
};
