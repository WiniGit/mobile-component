import { ReactNode } from "react";
import { ProjectItem } from "./da";
import { ColorProps } from "../skin/color";
import { ViewStyle } from "react-native";
import { TypoProps } from "../skin/typography";
import { BoxShadowProps } from "../skin/boxShadow";
export declare const Stack: {
    Navigator: import("react").ComponentType<Omit<import("@react-navigation/native").DefaultRouterOptions<string> & {
        children: React.ReactNode;
        layout?: (props: {
            state: import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>;
            navigation: import("@react-navigation/native").NavigationHelpers<import("@react-navigation/native").ParamListBase, {}>;
            descriptors: Record<string, import("@react-navigation/native").Descriptor<import("@react-navigation/native-stack").NativeStackNavigationOptions, import("@react-navigation/native").NavigationProp<import("@react-navigation/native").ParamListBase, string, string, import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>, import("@react-navigation/native-stack").NativeStackNavigationOptions, import("@react-navigation/native-stack").NativeStackNavigationEventMap>, import("@react-navigation/native").RouteProp<import("@react-navigation/native").ParamListBase, string>>>;
            children: React.ReactNode;
        }) => React.ReactElement;
        screenListeners?: Partial<{
            transitionStart: import("@react-navigation/native").EventListenerCallback<import("@react-navigation/native-stack").NativeStackNavigationEventMap & import("@react-navigation/native").EventMapCore<import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>>, "transitionStart", unknown>;
            transitionEnd: import("@react-navigation/native").EventListenerCallback<import("@react-navigation/native-stack").NativeStackNavigationEventMap & import("@react-navigation/native").EventMapCore<import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>>, "transitionEnd", unknown>;
            gestureCancel: import("@react-navigation/native").EventListenerCallback<import("@react-navigation/native-stack").NativeStackNavigationEventMap & import("@react-navigation/native").EventMapCore<import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>>, "gestureCancel", unknown>;
            sheetDetentChange: import("@react-navigation/native").EventListenerCallback<import("@react-navigation/native-stack").NativeStackNavigationEventMap & import("@react-navigation/native").EventMapCore<import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>>, "sheetDetentChange", unknown>;
            focus: import("@react-navigation/native").EventListenerCallback<import("@react-navigation/native-stack").NativeStackNavigationEventMap & import("@react-navigation/native").EventMapCore<import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>>, "focus", unknown>;
            blur: import("@react-navigation/native").EventListenerCallback<import("@react-navigation/native-stack").NativeStackNavigationEventMap & import("@react-navigation/native").EventMapCore<import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>>, "blur", unknown>;
            state: import("@react-navigation/native").EventListenerCallback<import("@react-navigation/native-stack").NativeStackNavigationEventMap & import("@react-navigation/native").EventMapCore<import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>>, "state", unknown>;
            beforeRemove: import("@react-navigation/native").EventListenerCallback<import("@react-navigation/native-stack").NativeStackNavigationEventMap & import("@react-navigation/native").EventMapCore<import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>>, "beforeRemove", true>;
        }> | ((props: {
            route: import("@react-navigation/native").RouteProp<import("@react-navigation/native").ParamListBase, string>;
            navigation: import("@react-navigation/native-stack").NativeStackNavigationProp<import("@react-navigation/native").ParamListBase, string, undefined>;
        }) => Partial<{
            transitionStart: import("@react-navigation/native").EventListenerCallback<import("@react-navigation/native-stack").NativeStackNavigationEventMap & import("@react-navigation/native").EventMapCore<import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>>, "transitionStart", unknown>;
            transitionEnd: import("@react-navigation/native").EventListenerCallback<import("@react-navigation/native-stack").NativeStackNavigationEventMap & import("@react-navigation/native").EventMapCore<import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>>, "transitionEnd", unknown>;
            gestureCancel: import("@react-navigation/native").EventListenerCallback<import("@react-navigation/native-stack").NativeStackNavigationEventMap & import("@react-navigation/native").EventMapCore<import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>>, "gestureCancel", unknown>;
            sheetDetentChange: import("@react-navigation/native").EventListenerCallback<import("@react-navigation/native-stack").NativeStackNavigationEventMap & import("@react-navigation/native").EventMapCore<import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>>, "sheetDetentChange", unknown>;
            focus: import("@react-navigation/native").EventListenerCallback<import("@react-navigation/native-stack").NativeStackNavigationEventMap & import("@react-navigation/native").EventMapCore<import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>>, "focus", unknown>;
            blur: import("@react-navigation/native").EventListenerCallback<import("@react-navigation/native-stack").NativeStackNavigationEventMap & import("@react-navigation/native").EventMapCore<import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>>, "blur", unknown>;
            state: import("@react-navigation/native").EventListenerCallback<import("@react-navigation/native-stack").NativeStackNavigationEventMap & import("@react-navigation/native").EventMapCore<import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>>, "state", unknown>;
            beforeRemove: import("@react-navigation/native").EventListenerCallback<import("@react-navigation/native-stack").NativeStackNavigationEventMap & import("@react-navigation/native").EventMapCore<import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>>, "beforeRemove", true>;
        }>);
        screenOptions?: import("@react-navigation/native-stack").NativeStackNavigationOptions | ((props: {
            route: import("@react-navigation/native").RouteProp<import("@react-navigation/native").ParamListBase, string>;
            navigation: import("@react-navigation/native-stack").NativeStackNavigationProp<import("@react-navigation/native").ParamListBase, string, undefined>;
            theme: ReactNavigation.Theme;
        }) => import("@react-navigation/native-stack").NativeStackNavigationOptions);
        screenLayout?: (props: import("@react-navigation/native").ScreenLayoutArgs<import("@react-navigation/native").ParamListBase, string, import("@react-navigation/native-stack").NativeStackNavigationOptions, import("@react-navigation/native-stack").NativeStackNavigationProp<import("@react-navigation/native").ParamListBase, string, undefined>>) => React.ReactElement;
        UNSTABLE_router?: <Action extends Readonly<{
            type: string;
            payload?: object;
            source?: string;
            target?: string;
        }>>(original: import("@react-navigation/native").Router<import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>, Action>) => Partial<import("@react-navigation/native").Router<import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>, Action>>;
    } & {
        id: string;
    } & import("@react-navigation/native").StackRouterOptions, "children" | "id" | "initialRouteName" | "layout" | "screenListeners" | "screenOptions" | "screenLayout" | "UNSTABLE_router"> & import("@react-navigation/native").DefaultRouterOptions<string> & {
        children: React.ReactNode;
        layout?: (props: {
            state: import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>;
            navigation: import("@react-navigation/native").NavigationHelpers<import("@react-navigation/native").ParamListBase, {}>;
            descriptors: Record<string, import("@react-navigation/native").Descriptor<import("@react-navigation/native-stack").NativeStackNavigationOptions, import("@react-navigation/native").NavigationProp<import("@react-navigation/native").ParamListBase, string, string, import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>, import("@react-navigation/native-stack").NativeStackNavigationOptions, import("@react-navigation/native-stack").NativeStackNavigationEventMap>, import("@react-navigation/native").RouteProp<import("@react-navigation/native").ParamListBase, string>>>;
            children: React.ReactNode;
        }) => React.ReactElement;
        screenListeners?: Partial<{
            transitionStart: import("@react-navigation/native").EventListenerCallback<import("@react-navigation/native-stack").NativeStackNavigationEventMap & import("@react-navigation/native").EventMapCore<import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>>, "transitionStart", unknown>;
            transitionEnd: import("@react-navigation/native").EventListenerCallback<import("@react-navigation/native-stack").NativeStackNavigationEventMap & import("@react-navigation/native").EventMapCore<import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>>, "transitionEnd", unknown>;
            gestureCancel: import("@react-navigation/native").EventListenerCallback<import("@react-navigation/native-stack").NativeStackNavigationEventMap & import("@react-navigation/native").EventMapCore<import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>>, "gestureCancel", unknown>;
            sheetDetentChange: import("@react-navigation/native").EventListenerCallback<import("@react-navigation/native-stack").NativeStackNavigationEventMap & import("@react-navigation/native").EventMapCore<import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>>, "sheetDetentChange", unknown>;
            focus: import("@react-navigation/native").EventListenerCallback<import("@react-navigation/native-stack").NativeStackNavigationEventMap & import("@react-navigation/native").EventMapCore<import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>>, "focus", unknown>;
            blur: import("@react-navigation/native").EventListenerCallback<import("@react-navigation/native-stack").NativeStackNavigationEventMap & import("@react-navigation/native").EventMapCore<import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>>, "blur", unknown>;
            state: import("@react-navigation/native").EventListenerCallback<import("@react-navigation/native-stack").NativeStackNavigationEventMap & import("@react-navigation/native").EventMapCore<import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>>, "state", unknown>;
            beforeRemove: import("@react-navigation/native").EventListenerCallback<import("@react-navigation/native-stack").NativeStackNavigationEventMap & import("@react-navigation/native").EventMapCore<import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>>, "beforeRemove", true>;
        }> | ((props: {
            route: import("@react-navigation/native").RouteProp<import("@react-navigation/native").ParamListBase, string>;
            navigation: import("@react-navigation/native-stack").NativeStackNavigationProp<import("@react-navigation/native").ParamListBase, string, undefined>;
        }) => Partial<{
            transitionStart: import("@react-navigation/native").EventListenerCallback<import("@react-navigation/native-stack").NativeStackNavigationEventMap & import("@react-navigation/native").EventMapCore<import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>>, "transitionStart", unknown>;
            transitionEnd: import("@react-navigation/native").EventListenerCallback<import("@react-navigation/native-stack").NativeStackNavigationEventMap & import("@react-navigation/native").EventMapCore<import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>>, "transitionEnd", unknown>;
            gestureCancel: import("@react-navigation/native").EventListenerCallback<import("@react-navigation/native-stack").NativeStackNavigationEventMap & import("@react-navigation/native").EventMapCore<import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>>, "gestureCancel", unknown>;
            sheetDetentChange: import("@react-navigation/native").EventListenerCallback<import("@react-navigation/native-stack").NativeStackNavigationEventMap & import("@react-navigation/native").EventMapCore<import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>>, "sheetDetentChange", unknown>;
            focus: import("@react-navigation/native").EventListenerCallback<import("@react-navigation/native-stack").NativeStackNavigationEventMap & import("@react-navigation/native").EventMapCore<import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>>, "focus", unknown>;
            blur: import("@react-navigation/native").EventListenerCallback<import("@react-navigation/native-stack").NativeStackNavigationEventMap & import("@react-navigation/native").EventMapCore<import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>>, "blur", unknown>;
            state: import("@react-navigation/native").EventListenerCallback<import("@react-navigation/native-stack").NativeStackNavigationEventMap & import("@react-navigation/native").EventMapCore<import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>>, "state", unknown>;
            beforeRemove: import("@react-navigation/native").EventListenerCallback<import("@react-navigation/native-stack").NativeStackNavigationEventMap & import("@react-navigation/native").EventMapCore<import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>>, "beforeRemove", true>;
        }>);
        screenOptions?: import("@react-navigation/native-stack").NativeStackNavigationOptions | ((props: {
            route: import("@react-navigation/native").RouteProp<import("@react-navigation/native").ParamListBase, string>;
            navigation: import("@react-navigation/native-stack").NativeStackNavigationProp<import("@react-navigation/native").ParamListBase, string, undefined>;
            theme: ReactNavigation.Theme;
        }) => import("@react-navigation/native-stack").NativeStackNavigationOptions);
        screenLayout?: (props: import("@react-navigation/native").ScreenLayoutArgs<import("@react-navigation/native").ParamListBase, string, import("@react-navigation/native-stack").NativeStackNavigationOptions, import("@react-navigation/native-stack").NativeStackNavigationProp<import("@react-navigation/native").ParamListBase, string, undefined>>) => React.ReactElement;
        UNSTABLE_router?: <Action extends Readonly<{
            type: string;
            payload?: object;
            source?: string;
            target?: string;
        }>>(original: import("@react-navigation/native").Router<import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>, Action>) => Partial<import("@react-navigation/native").Router<import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>, Action>>;
    } & {
        id: undefined;
    }>;
    Group: import("react").ComponentType<import("@react-navigation/native").RouteGroupConfig<import("@react-navigation/native").ParamListBase, import("@react-navigation/native-stack").NativeStackNavigationOptions, import("@react-navigation/native-stack").NativeStackNavigationProp<import("@react-navigation/native").ParamListBase, string, undefined>>>;
    Screen: <RouteName extends string>(_: import("@react-navigation/native").RouteConfig<import("@react-navigation/native").ParamListBase, RouteName, import("@react-navigation/native").StackNavigationState<import("@react-navigation/native").ParamListBase>, import("@react-navigation/native-stack").NativeStackNavigationOptions, import("@react-navigation/native-stack").NativeStackNavigationEventMap, import("@react-navigation/native-stack").NativeStackNavigationProp<import("@react-navigation/native").ParamListBase, string, undefined>>) => null;
};
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
    globalHeaders?: () => Promise<{
        [k: string]: any;
    }>;
}
type ThemeType = 'light' | 'dark';
interface DesignTokenContextType {
    colors: ColorProps;
    textStyles: TypoProps;
    boxShadows: BoxShadowProps;
    customStyleSheet: {
        [k: string]: ViewStyle;
    };
    theme: ThemeType;
    setTheme: (theme: ThemeType) => void;
}
export declare const DesignTokenProvider: React.FC<{
    children: ReactNode;
    designTokens: Array<{
        [p: string]: any;
    }>;
}>;
export declare const useDesignTokens: () => DesignTokenContextType;
export declare const WiniProvider: (props: Props) => import("react/jsx-runtime").JSX.Element;
export {};
