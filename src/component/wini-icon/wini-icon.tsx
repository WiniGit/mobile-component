import { useEffect, useState } from "react";
import { GestureResponderEvent, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { SvgXml } from "react-native-svg"

interface WiniconProps {
    src: string;
    style?: ViewStyle;
    size?: number;
    color?: string;
    onPress?: (event: GestureResponderEvent) => void
}

const Winicon = ({ style = {}, size = 24, ...props }: WiniconProps) => {
    const [svgData, setSvgData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const cdnSrc = 'https://cdn.jsdelivr.net/gh/WiniGit/icon-library@latest/';

    useEffect(() => {
        // If src is already an SVG string, use it directly
        if (props.src && props.src.startsWith('<svg')) {
            setSvgData(props.src);
            return;
        }

        const fetchSvg = async () => {
            try {
                const url = props.src?.startsWith('http') ? props.src : `${cdnSrc}${props.src}.svg`;
                if (!url) return;

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
                setSvgData(text);
            } catch (error) {
                setIsLoading(false);
                setSvgData(null); // Set fallback data
            }
        };

        fetchSvg();
    }, [src, color]);

    return (
        <TouchableOpacity
            disabled={!onClick}
            onPress={onClick ? onClick : undefined}
            activeOpacity={onClick ? 0.7 : 1}
            style={[styles.icon, style, { width: size, height: size }]}
        >
            {svgData ? (
                <SvgXml
                    preserveAspectRatio="xMinYMin slice"
                    xml={svgData}
                    width={size}
                    height={size}
                    color={}
                />
            ) : isLoading ? <View style={[styles.placeholder, { width: size, height: size }]} /> : null}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    icon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholder: {
        backgroundColor: '#e0e0e0', // Skeleton loading placeholder
    },
});