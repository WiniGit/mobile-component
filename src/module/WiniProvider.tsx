import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { BaseDA, ConfigData } from "../controller/config";
import { TableController, WiniController } from "../controller/setting";
import { DesignTokenType } from "./da";
import { Util } from "../controller/utils";
import { DataController } from "../controller/data";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { FSnackbar } from "../component/snackbar/snackbar";
import { WDialog } from "../component/dialog/dialog";
import { ColorProps, darkThemeColor, lightThemeColor } from "../skin/color";
import {
    SafeAreaView,
    TextStyle,
    useColorScheme,
    useWindowDimensions,
    ViewStyle,
} from "react-native";
import { typography, TypoProps } from "../skin/typography";
import { BoxShadowProps, initBoxShadows } from "../skin/boxShadow";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { I18nextProvider } from "react-i18next";
import { i18n } from "../language/i18n";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";

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
    onProjectLoaded?: (item: any) => void;
    globalHeaders?: () => Promise<{ [k: string]: any }>;
}

type ThemeType = "light" | "dark";

interface DesignTokenContextType {
    colors?: ColorProps;
    textStyles?: TypoProps;
    boxShadows?: BoxShadowProps;
    customStyleSheet?: { [k: string]: ViewStyle };
    theme: ThemeType;
    setTheme: (theme: ThemeType) => void;
}

const DesignTokenContext = createContext<DesignTokenContextType | undefined>(
    undefined
);

export const DesignTokenProvider: React.FC<{
    children: ReactNode;
    designTokens: Array<{ [p: string]: any }>;
}> = ({ children, designTokens = [] }) => {
    const [colors, setColors] = useState<ColorProps>();
    const [textStyles, setTextStyles] = useState<TypoProps>();
    const [boxShadows, setBoxShadows] = useState<BoxShadowProps>();
    const [customStyleSheet, setCustomStyleSheet] = useState<{ [k: string]: ViewStyle }>();
    const systemScheme = useColorScheme();
    const [theme, setTheme] = useState<ThemeType>("light");
    const appliedScheme = theme === "light" ? systemScheme : theme;
    const isDark = appliedScheme === "dark";
    const windowSize = useWindowDimensions()

    useEffect(() => {
        const _colors = isDark ? darkThemeColor : lightThemeColor;
        let _textStyles: any = textStyles ?? {};
        const _boxShadows = { ...initBoxShadows };
        let _customStyleSheet = {};
        const _designTokens = designTokens.map((e) => (e.Value ? { ...e, Value: typeof e.Value === "string" ? JSON.parse(e.Value) : e.Value } : e));
        if (_designTokens.length) {
            const tokenValues = _designTokens.filter((e) => e.Type !== DesignTokenType.group && !!e.Value);
            const groupTokens = _designTokens.filter((e) => e.Type === DesignTokenType.group);
            const colorVariables = tokenValues.filter((e) => e.Type === DesignTokenType.color);
            const boxShadowVariables = tokenValues.filter((e) => e.Type === DesignTokenType.boxShadow);
            const fontVariables = tokenValues.filter((e) => e.Type === DesignTokenType.font);
            const customVariables = tokenValues.filter((e) => e.Type === DesignTokenType.custom);
            colorVariables.forEach((e) => {
                const tkParent = groupTokens.find((g) => g.Id === e.ParentId);
                _colors[
                    `${tkParent ? `${Util.toSlug(tkParent.Name)}-` : ""}${Util.toSlug(e.Name)}`
                ] = isDark ? e.Value.darkMode : e.Value.lightMode;
            });
            console.log("????font", fontVariables.map(e => ({ ...e, Value: e.Value.appMode })));
            fontVariables.forEach((e) => {
                const tkParent = groupTokens.find((g) => g.Id === e.ParentId);
                const fontName = `${tkParent ? `${Util.toSlug(tkParent.Name)}-` : ""}${Util.toSlug(e.Name)}`;
                if (e.Value.appMode)
                    _textStyles[fontName] ??= e.Value.appMode
            });
            console.log("????shadow", boxShadowVariables.map(e => ({ ...e, Value: e.Value.appMode })));
            boxShadowVariables.forEach((e) => {
                const tkParent = groupTokens.find((g) => g.Id === e.ParentId);
                const shadowName = `${tkParent ? `${Util.toSlug(tkParent.Name)}-` : ""}${Util.toSlug(e.Name)}`;
                if (e.Value.appMode?.boxShadow)
                    _boxShadows[shadowName] ??= {
                        boxShadow: e.Value.appMode.boxShadow.replace(
                            /var\(--([\w-]+),\s*([^()]+)\)/g,
                            (m: string, p1: string, p2: string) => (_colors[p1] ?? p2)
                        )
                    }
            });
            customVariables.forEach((e) => {
                if (e.Value.appMode?.length) {
                    try {
                        var fn = new Function('colors', "windowSize", `return ${e.Value.appMode}`)(_colors, windowSize)
                        console.log("??custom:", { Id: e.Id, Name: e.Name, Value: fn })
                    } catch (error) {
                        console.log("parse css error: ", e, error);
                    }
                    if (fn) _customStyleSheet = { ..._customStyleSheet, ...fn }
                }
            });
            setCustomStyleSheet(_customStyleSheet);
        }
        _textStyles = { ...typography, ..._textStyles };
        // regular
        _textStyles.regular0 = {
            ..._textStyles.regular0,
            color: _colors["neutral-text-color-title"],
        };
        _textStyles.regular1 = {
            ..._textStyles.regular1,
            color: _colors["neutral-text-color-title"],
        };
        _textStyles.regular2 = {
            ..._textStyles.regular2,
            color: _colors["neutral-text-color-title"],
        };
        _textStyles.regular3 = {
            ..._textStyles.regular3,
            color: _colors["neutral-text-color-title"],
        };
        _textStyles.regular4 = {
            ..._textStyles.regular4,
            color: _colors["neutral-text-color-title"],
        };
        _textStyles.regular5 = {
            ..._textStyles.regular5,
            color: _colors["neutral-text-color-title"],
        };
        _textStyles.regular6 = {
            ..._textStyles.regular6,
            color: _colors["neutral-text-color-title"],
        };
        _textStyles.regular7 = {
            ..._textStyles.regular7,
            color: _colors["neutral-text-color-title"],
        };
        _textStyles.regular8 = {
            ..._textStyles.regular8,
            color: _colors["neutral-text-color-title"],
        };
        _textStyles.regular9 = {
            ..._textStyles.regular9,
            color: _colors["neutral-text-color-title"],
        };
        // semibold
        _textStyles.semibold1 = {
            ..._textStyles.semibold1,
            color: _colors["neutral-text-color-title"],
        };
        _textStyles.semibold2 = {
            ..._textStyles.semibold2,
            color: _colors["neutral-text-color-title"],
        };
        _textStyles.semibold3 = {
            ..._textStyles.semibold3,
            color: _colors["neutral-text-color-title"],
        };
        _textStyles.semibold4 = {
            ..._textStyles.semibold4,
            color: _colors["neutral-text-color-title"],
        };
        _textStyles.semibold5 = {
            ..._textStyles.semibold5,
            color: _colors["neutral-text-color-title"],
        };
        _textStyles.semibold6 = {
            ..._textStyles.semibold6,
            color: _colors["neutral-text-color-title"],
        };
        _textStyles.semibold7 = {
            ..._textStyles.semibold7,
            color: _colors["neutral-text-color-title"],
        };
        _textStyles.semibold8 = {
            ..._textStyles.semibold8,
            color: _colors["neutral-text-color-title"],
        };
        _textStyles.semibold9 = {
            ..._textStyles.semibold9,
            color: _colors["neutral-text-color-title"],
        };
        // medium
        _textStyles.medium1 = {
            ..._textStyles.medium1,
            color: _colors["neutral-text-color-title"],
        };
        _textStyles.medium2 = {
            ..._textStyles.medium2,
            color: _colors["neutral-text-color-title"],
        };
        _textStyles.medium3 = {
            ..._textStyles.medium3,
            color: _colors["neutral-text-color-title"],
        };
        _textStyles.medium4 = {
            ..._textStyles.medium4,
            color: _colors["neutral-text-color-title"],
        };
        _textStyles.medium5 = {
            ..._textStyles.medium5,
            color: _colors["neutral-text-color-title"],
        };
        _textStyles.medium6 = {
            ..._textStyles.medium6,
            color: _colors["neutral-text-color-title"],
        };
        _textStyles.medium7 = {
            ..._textStyles.medium7,
            color: _colors["neutral-text-color-title"],
        };
        _textStyles.medium8 = {
            ..._textStyles.medium8,
            color: _colors["neutral-text-color-title"],
        };
        _textStyles.medium9 = {
            ..._textStyles.medium9,
            color: _colors["neutral-text-color-title"],
        };
        // heading
        _textStyles["heading-1"] = {
            ..._textStyles["heading-1"],
            color: _colors["neutral-text-color-title"],
        };
        _textStyles["heading-2"] = {
            ..._textStyles["heading-2"],
            color: _colors["neutral-text-color-title"],
        };
        _textStyles["heading-3"] = {
            ..._textStyles["heading-3"],
            color: _colors["neutral-text-color-title"],
        };
        _textStyles["heading-4"] = {
            ..._textStyles["heading-4"],
            color: _colors["neutral-text-color-title"],
        };
        _textStyles["heading-5"] = {
            ..._textStyles["heading-5"],
            color: _colors["neutral-text-color-title"],
        };
        _textStyles["heading-6"] = {
            ..._textStyles["heading-6"],
            color: _colors["neutral-text-color-title"],
        };
        _textStyles["heading-7"] = {
            ..._textStyles["heading-7"],
            color: _colors["neutral-text-color-title"],
        };
        _textStyles["heading-8"] = {
            ..._textStyles["heading-8"],
            color: _colors["neutral-text-color-title"],
        };
        _textStyles["heading-9"] = {
            ..._textStyles["heading-9"],
            color: _colors["neutral-text-color-title"],
        };
        // label
        _textStyles["label-1"] = {
            ..._textStyles["label-1"],
            color: _colors["neutral-text-color-label"],
        };
        _textStyles["label-2"] = {
            ..._textStyles["label-2"],
            color: _colors["neutral-text-color-label"],
        };
        _textStyles["label-3"] = {
            ..._textStyles["label-3"],
            color: _colors["neutral-text-color-label"],
        };
        _textStyles["label-4"] = {
            ..._textStyles["label-4"],
            color: _colors["neutral-text-color-label"],
        };
        _textStyles["label-5"] = {
            ..._textStyles["label-5"],
            color: _colors["neutral-text-color-label"],
        };
        // body
        _textStyles["body-1"] = {
            ..._textStyles["body-1"],
            color: _colors["neutral-text-color-body"],
        };
        _textStyles["body-2"] = {
            ..._textStyles["body-2"],
            color: _colors["neutral-text-color-body"],
        };
        _textStyles["body-3"] = {
            ..._textStyles["body-3"],
            color: _colors["neutral-text-color-body"],
        };
        // highlight
        _textStyles["highlight-1"] = {
            ..._textStyles["highlight-1"],
            color: _colors["neutral-text-color-title"],
        };
        _textStyles["highlight-2"] = {
            ..._textStyles["highlight-2"],
            color: _colors["neutral-text-color-title"],
        };
        _textStyles["highlight-3"] = {
            ..._textStyles["highlight-3"],
            color: _colors["neutral-text-color-title"],
        };
        _textStyles["highlight-4"] = {
            ..._textStyles["highlight-4"],
            color: _colors["neutral-text-color-title"],
        };
        _textStyles["highlight-5"] = {
            ..._textStyles["highlight-5"],
            color: _colors["neutral-text-color-title"],
        };
        _textStyles["highlight-6"] = {
            ..._textStyles["highlight-6"],
            color: _colors["neutral-text-color-title"],
        };
        // subtitle
        _textStyles["subtitle-1"] = {
            ..._textStyles["subtitle-1"],
            color: _colors["neutral-text-color-subtitle"],
        };
        _textStyles["subtitle-2"] = {
            ..._textStyles["subtitle-2"],
            color: _colors["neutral-text-color-subtitle"],
        };
        _textStyles["subtitle-3"] = {
            ..._textStyles["subtitle-3"],
            color: _colors["neutral-text-color-subtitle"],
        };
        _textStyles["subtitle-4"] = {
            ..._textStyles["subtitle-4"],
            color: _colors["neutral-text-color-subtitle"],
        };
        _textStyles["subtitle-5"] = {
            ..._textStyles["subtitle-5"],
            color: _colors["neutral-text-color-subtitle"],
        };
        // placeholder
        _textStyles["placeholder-1"] = {
            ..._textStyles["placeholder-1"],
            color: _colors["neutral-text-color-placeholder"],
        };
        _textStyles["placeholder-2"] = {
            ..._textStyles["placeholder-2"],
            color: _colors["neutral-text-color-placeholder"],
        };
        // button-text
        _textStyles["button-text-1"] = {
            ..._textStyles["button-text-1"],
            color: _colors["primary-color-main"],
        };
        _textStyles["button-text-2"] = {
            ..._textStyles["button-text-2"],
            color: _colors["primary-color-main"],
        };
        _textStyles["button-text-3"] = {
            ..._textStyles["button-text-3"],
            color: _colors["primary-color-main"],
        };
        _textStyles["button-text-4"] = {
            ..._textStyles["button-text-4"],
            color: _colors["primary-color-main"],
        };
        _textStyles["button-text-5"] = {
            ..._textStyles["button-text-5"],
            color: _colors["primary-color-main"],
        };
        _textStyles["button-text-6"] = {
            ..._textStyles["button-text-6"],
            color: _colors["primary-color-main"],
        };
        setColors(_colors);
        setTextStyles(_textStyles);
        setBoxShadows(_boxShadows);
    }, [isDark, designTokens.length]);

    return (
        <DesignTokenContext.Provider
            value={{
                colors,
                textStyles,
                boxShadows,
                customStyleSheet,
                theme,
                setTheme,
            }}
        >
            {children}
        </DesignTokenContext.Provider>
    );
};

export const useDesignTokens = () => {
    const context = useContext(DesignTokenContext);
    if (context === undefined) {
        throw new Error(
            "useDesignTokens must be used within a DesignTokenProvider"
        );
    }
    return context;
};

function parseFontString(input: string): TextStyle {
    const regex =
        /^(normal|bold|lighter|bolder|\d{3})\s+(\d+(?:\.\d+)?(?:px|pt|pc|in|cm|mm|em|ex|ch|rem|lh|vw|vh|vmin|vmax|%))\/(\d+(?:\.\d+)?(?:px|pt|pc|in|cm|mm|em|ex|ch|rem|lh|vw|vh|vmin|vmax|%))\s+(['"].+['"])$/i;
    const match = input.match(regex);

    if (!match) return {};

    const [weight, size, line, family] = match;

    return {
        fontWeight: isNaN(parseInt(weight))
            ? (weight as any)
            : parseInt(weight, 10),
        fontSize: size.endsWith("rem")
            ? parseFloat(size.replace("rem", "")) * 10
            : parseFloat(size.replace("px", "")),
        lineHeight: line.endsWith("rem")
            ? parseFloat(line.replace("rem", "")) * 10
            : parseFloat(line.replace("px", "")),
        fontFamily: family,
    };
}

export const WiniProvider = (props: Props) => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <PaperProvider>
                        <I18nextProvider i18n={i18n}>
                            <RootStack {...props} />
                        </I18nextProvider>
                    </PaperProvider>
                </NavigationContainer>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
};

const RootStack = (props: Props) => {
    ConfigData.pid = props.pid;
    ConfigData.url = props.url;
    ConfigData.imgUrlId = props.imgUrlId;
    ConfigData.fileUrl = props.fileUrl;
    if (props.globalHeaders)
        ConfigData.globalHeaders = props.globalHeaders as any;
    ConfigData.onInvalidToken =
        props.onInvalidToken ??
        (() => {
            Util.clearStorage();
            StackActions.popTo("/login");
        });
    const [loadedResources, setLoadedResources] = useState(false);
    const [designTokens, setDesignTokens] = useState<Array<{ [p: string]: any }>>(
        []
    );

    useEffect(() => {
        if (props.pid.length === 32) {
            const _desginTokenController = new TableController("designtoken");
            _desginTokenController.getAll().then((res) => {
                if (res.code === 200 && res.data.length) setDesignTokens(res.data);
            });
            const projectController = new WiniController("Project");
            projectController.getByIds([props.pid]).then((res) => {
                if (res.code === 200 && res.data[0]) {
                    if (props.onProjectLoaded) {
                        props.onProjectLoaded(res.data[0]);
                        ConfigData.fileUrl = res.data[0].FileDomain;
                    }
                }
            });
            const languageController = new DataController("Language");
            languageController.getAll().then(async (res) => {
                if (res.code === 200 && res.data.length) {
                    const languages = await Promise.all(
                        res.data.map((e: any) => BaseDA.get(ConfigData.imgUrlId + e.Json))
                    );
                    languages.forEach((lngData, i) => {
                        if (lngData) {
                            i18n.addResourceBundle(
                                res.data[i].Lng,
                                "translation",
                                lngData,
                                true,
                                true
                            );
                        }
                    });
                    setLoadedResources(true);
                } else setLoadedResources(true);
            });
        } else {
            console.log("Project not found");
            setLoadedResources(true);
        }
    }, [props.pid]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <DesignTokenProvider designTokens={designTokens}>
                <FSnackbar />
                <WDialog />
                {loadedResources && props.children}
            </DesignTokenProvider>
        </SafeAreaView>
    );
};
