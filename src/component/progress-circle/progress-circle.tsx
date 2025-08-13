import React, { useMemo } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { SvgXml } from "react-native-svg"
import { useDesignTokens } from "../../module/WiniProvider";

interface ProgressCircleProps {
    /** value:  0 - 100 (%)*/
    percent?: number,
    size?: number,
    style?: StyleProp<ViewStyle>,
    fillColor?: string,
    percentColor?: string,
    strokeWidth?: number,
    strokeColor?: string,
    title?: string
}

export const WProgressCircle = ({ strokeWidth = 4, percent = 0, ...props }: ProgressCircleProps) => {
    const { colors } = useDesignTokens();
    const finalXml = useMemo(() => {
        const radius = 30 - strokeWidth;
        const diameter = Math.PI * 2 * radius;
        const strokeOffset = (1 - (percent / 100)) * diameter;
        return `<svg width="100%" height="100%" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 30,30 m 0,-${radius} a ${radius},${radius} 0 1 1 0,${2 * radius} a ${radius},${radius} 0 1 1 0,-${2 * radius}" stroke="${props.strokeColor ?? colors?.["neutral-background-color-main"] ?? "#fff"}" stroke-width="${strokeWidth}" />
            <path d="M 30,30 m 0,-${radius} a ${radius},${radius} 0 1 1 0,${2 * radius} a ${radius},${radius} 0 1 1 0,-${2 * radius}" stroke="${props.percentColor ?? colors?.["primary-color-main"] ?? "#287CF0"}" stroke-width="${strokeWidth}" stroke-dasharray="${diameter} ${diameter}" stroke-dashoffset="${strokeOffset}" stroke-linecap="round" />
            <text x="50%" y="50%" dy=".3em" text-anchor="middle" fill="${colors?.["neutral-text-color-title"] ?? "#000"}" style="font-size: 16px; font-weight: 600">${props.title ?? `${percent}%`}</text>
        </svg>`
    }, [colors, strokeWidth, percent])

    return <SvgXml
        xml={finalXml}
        width={props.size ?? 60}
        height={props.size ?? 60}
        style={props.style}
    />
}

