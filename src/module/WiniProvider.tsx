import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { BaseDA, ConfigData } from "../controller/config"
import { TableController, WiniController } from "../controller/setting"
import { DesignTokenType, ProjectItem } from "./da"
import { Util } from "../controller/utils"
import { useTranslation } from "react-i18next"
import { DataController } from "../controller/data"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer, useNavigation, StackActions } from "@react-navigation/native"
import { FSnackbar } from "../component/snackbar/snackbar"
import FDialog from "../component/dialog/dialog"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { ColorProps, darkThemeColor, lightThemeColor } from "../skin/color"
import { TextStyle, useColorScheme, ViewStyle } from "react-native"
import { typography, TypoProps } from "../skin/typography"
import { BoxShadowProps, initBoxShadows } from "../skin/boxShadow"
import transform from "css-to-react-native-transform";

export const Stack = createNativeStackNavigator();

interface Props {
    /**
     * project id on admin wini
     * */
    pid: string;
    /**
     * api link
     * */
    url: string;
    fileUrl: string;
    imgUrlId: string;
    onInvalidToken?: () => void;
    children?: ReactNode;
    onProjectLoaded?: (item: ProjectItem) => void;
    globalHeaders?: () => Promise<{ [k: string]: any }>
}

type ThemeType = 'light' | 'dark';

interface DesignTokenContextType {
    colors: ColorProps;
    textStyles: TypoProps;
    boxShadows: BoxShadowProps;
    customStyleSheet: { [k: string]: ViewStyle };
    theme: ThemeType;
    setTheme: (theme: ThemeType) => void
}

const DesignTokenContext = createContext<DesignTokenContextType | undefined>(undefined);

export const DesignTokenProvider: React.FC<{ children: ReactNode, designTokens: Array<{ [p: string]: any }> }> = ({ children, designTokens = [] }) => {
    const [colors, setColors] = useState<ColorProps>(null);
    const [textStyles, setTextStyles] = useState<TypoProps>(null);
    const [boxShadows, setBoxShadows] = useState<BoxShadowProps>(null);
    const [customStyleSheet, setCustomStyleSheet] = useState<{ [k: string]: ViewStyle }>(null);
    const systemScheme = useColorScheme();
    const [theme, setTheme] = useState<ThemeType>('light');
    const appliedScheme = theme === 'light' ? systemScheme : theme;
    const isDark = appliedScheme === 'dark';

    function convertRemToPxInString(cssString: string) {
        return filterCssToClassRulesOnly(cssString.replace(/(\d*\.?\d+)rem/g, (match, remValue) => {
            const pxValue = parseFloat(remValue) * 10;
            return `${pxValue}px`;
        }))
    }

    function filterCssToClassRulesOnly(rawCss: string) {
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

    useEffect(() => {
        const _colors = isDark ? darkThemeColor : lightThemeColor;
        let _textStyles: any = textStyles ?? {};
        const _boxShadows = { ...initBoxShadows };
        let _customStyleSheet = {}
        const _designTokens = designTokens.map(e => e.Value ? { ...e, Value: typeof e.Value === "string" ? JSON.parse(e.Value) : e.Value } : e)
        if (_designTokens.length) {
            const tokenValues = _designTokens.filter(e => e.Type !== DesignTokenType.group && (e.Value?.lightMode || e.Value?.darkMode))
            const groupTokens = _designTokens.filter(e => e.Type === DesignTokenType.group)
            const colorVariables = tokenValues.filter(e => e.Type === DesignTokenType.color)
            const boxShadowVariables = tokenValues.filter(e => e.Type === DesignTokenType.boxShadow)
            const fontVariables = tokenValues.filter(e => e.Type === DesignTokenType.font)
            const customVariables = tokenValues.filter(e => e.Type === DesignTokenType.custom)
            colorVariables.forEach(e => {
                const tkParent = groupTokens.find(g => g.Id === e.ParentId);
                _colors[`${tkParent ? `${Util.toSlug(tkParent.Name)}-` : ""}${Util.toSlug(e.Name)}`] = isDark ? e.Value.darkMode : e.Value.lightMode;
            })
            fontVariables.forEach(e => {
                _textStyles[Util.toSlug(e.Name)] ??= parseFontString(e.Value.lightMode)
            })
            try {
                customVariables.forEach(e => {
                    _customStyleSheet = { ..._customStyleSheet, ...transform(convertRemToPxInString(e.Value.lightMode)) }
                })
                console.log("customStyleSheet: ", _customStyleSheet)
                setCustomStyleSheet(_customStyleSheet)
            } catch (error) {
                console.log("parse css error: ", error)
            }
            boxShadowVariables.forEach(e => {
                _boxShadows[Util.toSlug(e.Name)] = { boxShadow: e.Value.lightMode };
            })
        }
        _textStyles = { ...typography, ..._textStyles };
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
    }, [isDark, designTokens.length])

    return (
        <DesignTokenContext.Provider value={{ colors, textStyles, boxShadows, customStyleSheet, theme, setTheme }}>
            {children}
        </DesignTokenContext.Provider>
    );
};

export const useDesignTokens = () => {
    const context = useContext(DesignTokenContext);
    if (context === undefined) {
        throw new Error('useDesignTokens must be used within a DesignTokenProvider');
    }
    return context;
};


function parseFontString(input: string): TextStyle {
    const regex = /^(normal|bold|lighter|bolder|\d{3})\s+(\d+(?:\.\d+)?(?:px|pt|pc|in|cm|mm|em|ex|ch|rem|lh|vw|vh|vmin|vmax|%))\/(\d+(?:\.\d+)?(?:px|pt|pc|in|cm|mm|em|ex|ch|rem|lh|vw|vh|vmin|vmax|%))\s+(['"].+['"])$/i;
    const match = input.match(regex);

    if (!match) return {};

    const [weight, size, line, family] = match;

    return {
        fontWeight: isNaN(parseInt(weight)) ? weight as any : parseInt(weight, 10),
        fontSize: size.endsWith("rem") ? (parseFloat(size.replace("rem", "")) * 10) : parseFloat(size.replace("px", "")),
        lineHeight: line.endsWith("rem") ? (parseFloat(line.replace("rem", "")) * 10) : parseFloat(line.replace("px", "")),
        fontFamily: family,
    };
}

export const WiniProvider = (props: Props) => {
    return <GestureHandlerRootView>
        <NavigationContainer>
            <RootStack {...props} />
        </NavigationContainer >
    </GestureHandlerRootView>
}

const RootStack = (props: Props) => {
    const navigate = useNavigation();
    ConfigData.pid = props.pid;
    ConfigData.url = props.url;
    ConfigData.imgUrlId = props.imgUrlId;
    ConfigData.fileUrl = props.fileUrl;
    if (props.globalHeaders) ConfigData.globalHeaders = props.globalHeaders;
    ConfigData.onInvalidToken = props.onInvalidToken ?? (() => {
        Util.clearStorage()
        navigate.dispatch(StackActions.popTo("/login"))
    })
    const { i18n } = useTranslation()
    const [loadedResources, setLoadedResources] = useState(false)
    const [designTokens, setDesignTokens] = useState<Array<{ [p: string]: any }>>([])

    useEffect(() => {
        ConfigData.pid = props.pid
        if (props.pid.length === 32) {
            const _desginTokenController = new TableController("designtoken")
            _desginTokenController.getAll().then(res => {
                if (res.code === 200 && res.data.length) setDesignTokens(res.data)
            })
            const projectController = new WiniController("Project")
            projectController.getByIds([props.pid]).then(res => {
                if (res.code === 200 && res.data[0]) {
                    if (props.onProjectLoaded) props.onProjectLoaded(res.data[0])
                }
            })
            const languageController = new DataController("Language")
            languageController.getAll().then(async (res) => {
                if (res.code === 200 && res.data.length) {
                    const languages = await Promise.all(res.data.map((e: any) => BaseDA.get(ConfigData.imgUrlId + e.Json)))
                    languages.forEach((lngData, i) => {
                        if (lngData) {
                            i18n.addResourceBundle(res.data[i].Lng, "translation", lngData, true, true)
                        }
                    })
                    setLoadedResources(true)
                } else setLoadedResources(true)
            })
        } else {
            console.log("Project not found")
            setLoadedResources(true)
        }
    }, [props.pid])

    return <DesignTokenProvider designTokens={designTokens}>
        <FSnackbar />
        <FDialog />
        {loadedResources && props.children}
    </DesignTokenProvider>
}