import React, { ViewStyle } from "react-native";
import { SvgXml } from "react-native-svg"
import { useDesignTokens } from "../../module/WiniProvider";

interface ProgressCircleProps {
    /** value:  0 - 100 (%)*/
    percent?: number,
    size?: number,
    style?: React.StyleProp<ViewStyle>,
    fillColor?: string,
    percentColor?: string,
    strokeWidth?: number,
    strokeColor?: string,
    title?: string
}

export const WProgressCircle = ({ strokeWidth = 4, percent = 0, ...props }: ProgressCircleProps) => {
    const { colors } = useDesignTokens()
    const radius = 30 - strokeWidth
    const diameter = Math.PI * 2 * radius;
    const strokeOffset = (1 - (percent / 100)) * diameter;

    return <SvgXml
        xml={`<svg width="100%" height="100%" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 30,30 m 0,-${radius} a ${radius},${radius} 0 1 1 0,${2 * radius} a ${radius},${radius} 0 1 1 0,-${2 * radius}" stroke="${props.strokeColor ?? colors?.["neutral-background-color-main"]}" stroke-width="${strokeWidth}" />
            <path d="M 30,30 m 0,-${radius} a ${radius},${radius} 0 1 1 0,${2 * radius} a ${radius},${radius} 0 1 1 0,-${2 * radius}" stroke="${props.percentColor ?? colors?.["primary-color-main"]}" stroke-width="${strokeWidth}" stroke-dasharray="${diameter}px ${diameter}px" stroke-dashoffset="${strokeOffset}px" stroke-linecap="round" />
            <text x="50%" y="50%" dy=".3em" text-anchor="middle" fill="${colors?.["neutral-text-color-title"]}" style="font-size: 16px; font-weight: 600">${props.title ?? `${percent}%`}</text>
        </svg>`}
        width={props.size ?? 60}
        height={props.size ?? 60}
        style={props.style}
    />
}

