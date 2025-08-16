import React, { ReactNode, useState } from 'react'
import { Pressable, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import { ComponentStatus, getStatusIcon } from '../component-status'
import { useDesignTokens } from '../../module/WiniProvider'
import { Winicon } from '../wini-icon/wini-icon'

interface ProgressBarProps {
    /** value:  0 - 100 (%)*/
    percent?: number,
    title?: ReactNode | string,
    hideTitle?: boolean,
    progressBarOnly?: boolean,
    fullColor?: string,
    percentColor?: string,
    style?: ViewStyle,
    status?: ComponentStatus,
    /** no need when progressBarOnly */
    progressBarStyle?: ViewStyle
}

export const WProgressBar = ({ status = ComponentStatus.INFOR, percent = 0, style = {}, progressBarStyle = {}, ...props }: ProgressBarProps) => {
    const { colors, textStyles } = useDesignTokens()
    const [openDetails, setOpenDetails] = useState(true)

    return props.progressBarOnly ?
        <Pressable style={[styles.progressBarValue, { backgroundColor: props.fullColor ?? colors?.['neutral-background-color-main'] }, style]}>
            <View style={[styles.progressBarPercent, { backgroundColor: props.percentColor ?? colors?.['primary-color-main'], width: `${percent}%` }]} />
        </Pressable> :
        <Pressable style={[styles.progressBarContainer, style]}>
            {!props.hideTitle && (typeof props.title === "string" ? <TouchableOpacity style={styles.progressBarTitle} onPress={() => { setOpenDetails(!openDetails) }}>
                <Text style={textStyles?.['heading-8']}>{props.title}</Text>
                <Winicon src={openDetails ? "fill/arrows/down-arrow" : "fill/arrows/up-arrow"} size={14} />
            </TouchableOpacity> : props.title)}
            {openDetails ? <View style={styles.progressBarTile}>
                <View style={[styles.progressBarValue, { width: "100%", flex: 1, backgroundColor: props.fullColor ?? colors?.['neutral-background-color-main'] }, progressBarStyle]}>
                    <View style={[styles.progressBarPercent, { backgroundColor: props.percentColor ?? colors?.['primary-color-main'], width: `${percent}%` }]} />
                </View>
                {status === ComponentStatus.INFOR ? null : getStatusIcon(status, 16)}
                <Text style={textStyles?.['label-4']}>{percent}/100</Text>
            </View> : null}
        </Pressable>
}

const styles = StyleSheet.create({
    progressBarContainer: {
        gap: 12,
        width: 320,
    },
    progressBarTitle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%"
    },
    progressBarTile: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        height: 22,
        width: "100%"
    },
    progressBarValue: {
        borderRadius: 100,
        height: 6,
        position: "relative",
        overflow: "hidden"
    },
    progressBarPercent: {
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        borderRadius: 100,
    }
})