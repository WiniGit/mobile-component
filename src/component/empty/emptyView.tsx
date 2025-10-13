import { JSX } from "react";
import { Text, View, ViewStyle } from "react-native"
import { useDesignTokens } from "../../module/WiniProvider";
import React from "react";
import { Winicon } from "../wini-icon/wini-icon";

interface EmptyViewProps {
    title?: string;
    subtitle?: string;
    titleElement?: JSX.Element;
    subtitleElement?: JSX.Element;
    icon?: string;
    iconElement?: JSX.Element;
    style?: ViewStyle
}

export const WEmptyView = ({ style = {}, ...props }: EmptyViewProps) => {
    const { textStyles } = useDesignTokens()
    return <View style={[{ alignItems: "center", justifyContent: "center" }, style]}>
        {props.iconElement ?? <Winicon src={(props.icon as any) ?? "color/files/archive"} size={24} />}
        {props.titleElement ?? (props.title && <Text style={[textStyles?.["heading-8"], { marginTop: 16, textAlign: "center" }]}>{props.title}</Text>)}
        {props.subtitleElement ?? (props.subtitle && <Text style={[textStyles?.["subtitle-4"], { marginTop: 4, textAlign: "center" }]}>{props.subtitle}</Text>)}
    </View>
}