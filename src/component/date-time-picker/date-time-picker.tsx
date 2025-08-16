import React, { forwardRef, ReactNode, useEffect, useMemo, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { differenceInCalendarDays } from "date-fns"
import { LayoutChangeEvent, Platform, Pressable, ScrollView, StyleSheet, Text, TextStyle, TouchableOpacity, useWindowDimensions, View, ViewStyle } from "react-native"
import { WCalendar } from "../calendar/calendar"
import { useDesignTokens } from "../../module/WiniProvider"
import { Util } from "../../controller/utils"
import { Winicon } from "../wini-icon/wini-icon"
import { hideBottomSheet, showBottomSheet, WBottomSheet } from "../bottom-sheet/bottom-sheet"
import { WCheckbox } from "../checkbox/checkbox"
import { WSelect1 } from "../select1/select1"
import { WTextField, SizeVariant } from "../text-field/text-field"
import { WButton, WButtonVariant } from "../button/button"
import { useForm } from "react-hook-form"

interface ValueProps {
    start?: Date,
    end?: Date,
    /** type: 1: daily, 2: weekly, 3: monthly */
    repeatData?: { type: 1 | 2 | 3, value: Array<string | number> }
}

interface DateTimePickerProps {
    value?: Date;
    endValue?: Date;
    min?: Date;
    max?: Date;
    helperText?: string;
    helperTextColor?: string;
    placeholder?: string;
    style?:
    | Array<ViewStyle | TextStyle | SizeVariant>
    | ViewStyle
    | TextStyle
    | SizeVariant;
    disabled?: boolean;
    pickerType?: "auto" | "date" | "datetime" | "daterange" | "datetimerange";
    enableRepeat?: boolean;
    /** type: 1: daily; 2: weekly; 3: monthly */
    repeatValue?: { type: 1 | 2 | 3; value: Array<"everyday" | "last" | number> };
    prefix?: ReactNode;
    suffix?: ReactNode;
    onChange?: (ev?: Date | ValueProps) => void;
    onLayout?: (event: LayoutChangeEvent) => void;
    simpleStyle?: boolean
}

const initStyle = [SizeVariant.size32];

export const WDateTimePicker = ({ style = initStyle, pickerType = "auto", helperTextColor = "#E14337", ...props }: DateTimePickerProps) => {
    const { colors } = useDesignTokens()
    const containerRef = useRef<View>(null);
    const bottomSheetRef = useRef<any>(null)
    const [value, setValue] = useState<Date | ValueProps>()
    const convertStyle: TextStyle = useMemo(() => {
        const tmp = Array.isArray(style) ? style : [style];
        let value: any = {};
        if (!props.simpleStyle) value = { ...styles.container };
        tmp.forEach((e) => {
            if (typeof e === "string") {
                value = { ...value, ...(styles as any)[e] };
            } else value = { ...value, ...e };
        });
        if (props.helperText?.length) value.borderColor = helperTextColor;
        else value.borderColor ??= colors?.["neutral-border-color-main"];
        if (props.disabled)
            value.backgroundColor = colors?.["neutral-background-color-disable"];
        return value;
    }, [style, props.simpleStyle, props.disabled, props.helperText, colors?.["neutral-background-color-disable"]]);
    const {
        fontVariant,
        fontSize,
        lineHeight,
        fontFamily,
        fontStyle,
        fontWeight,
        color,
        textAlign,
        textAlignVertical,
        textDecorationColor,
        textDecorationLine,
        textTransform,
        textDecorationStyle,
        textShadowColor,
        textShadowOffset,
        textShadowRadius,
        ...restOfStyle
    } = convertStyle;

    const txtValue = useMemo(() => {
        let suffixRepeat: ReactNode = null;
        if (!value) {
            var title = props.placeholder ?? ""
        } else if (value instanceof Date) {
            title = Util.datetoString(value, `dd/mm/yyyy${pickerType?.includes("time") ? " hh:mm" : ""}`)
        } else {
            title = Util.datetoString(value.start ?? new Date(), `dd/mm/yyyy${(pickerType?.includes("time") || pickerType === "auto") ? " hh:mm" : ""}`) + " - " + Util.datetoString(value.end ?? new Date(), `dd/mm/yyyy${(pickerType?.includes("time") || pickerType === "auto") ? " hh:mm" : ""}`)
            if (value.repeatData) suffixRepeat = <Winicon src="outline/arrows/loop-2" size={12} />
        }
        const textTitle = <Text
            numberOfLines={1}
            style={{
                color: props.disabled
                    ? colors?.["neutral-text-color-disabled"]
                    : color,
                opacity: value ? 1 : 0.6,
                fontVariant,
                fontSize,
                fontFamily,
                fontStyle,
                fontWeight,
                textAlign,
                textAlignVertical,
                textDecorationColor,
                textDecorationLine,
                textTransform,
                textDecorationStyle,
                textShadowColor,
                textShadowOffset,
                textShadowRadius,
                flex: suffixRepeat ? undefined : 1
            }}
        >{title}</Text>
        if (suffixRepeat)
            return <View style={{ flexDirection: "row", alignItems: "center", gap: 4, flex: 1 }}>
                {textTitle}
                {suffixRepeat}
            </View>
        else
            return textTitle

    }, [value, convertStyle])

    useEffect(() => {
        switch (pickerType) {
            case "date":
            case "datetime":
                setValue(props.value)
                break;
            default:
                setValue((!props.value || !props.endValue) ? undefined : { start: props.value, end: props.endValue, repeatData: pickerType === "auto" || !pickerType ? props.repeatValue : undefined })
                break;
        }
    }, [props.value, props.endValue, props.repeatValue, pickerType])

    const showCalendar = () => {
        const isEnableRepeat = props.enableRepeat || !!(!(value instanceof Date) && value?.repeatData)
        showBottomSheet({
            ref: bottomSheetRef,
            enableDismiss: !isEnableRepeat && pickerType !== "auto",
            children: <PopupDateTimePicker
                ref={bottomSheetRef}
                max={props.max}
                min={props.min}
                value={value instanceof Date ? value : value?.start}
                endValue={value instanceof Date ? undefined : value?.end}
                pickerType={pickerType}
                enableRepeat={isEnableRepeat}
                repeatValue={(value instanceof Date ? undefined : value?.repeatData) as any}
                onApply={(ev) => {
                    setValue(ev)
                    if (props.onChange) props.onChange(ev)
                }}
            />
        })
    }

    return <>
        <WBottomSheet ref={bottomSheetRef} />
        <TouchableOpacity
            ref={containerRef}
            style={[restOfStyle, styles.simpleStyle]}
            disabled={props.disabled}
            onPress={props.disabled ? undefined : showCalendar}
            onLayout={props.onLayout}
        >
            {props.prefix ?? <Winicon src="outline/user interface/calendar-date-2" size={14} />}
            {txtValue}
            {props.suffix}
            {props.helperText?.length ? (
                <Text numberOfLines={1} style={[styles.helperText, { color: helperTextColor }]} >
                    {props.helperText}
                </Text>
            ) : null}
        </TouchableOpacity>
    </>

}

interface PopupPickerProps {
    value?: Date,
    endValue?: Date,
    min?: Date,
    max?: Date,
    pickerType?: "auto" | "date" | "datetime" | "daterange" | "datetimerange",
    repeatValue?: { type: 1 | 2 | 3, value: Array<"everyday" | "last" | number> },
    onApply?: (ev: Date | ValueProps) => void,
    enableRepeat?: boolean,
}

const PopupDateTimePicker = forwardRef(({ value, endValue, repeatValue, onApply, pickerType = "auto", enableRepeat = false, min, max }: PopupPickerProps, ref: any) => {
    const { textStyles, colors } = useDesignTokens()
    const windowSize = useWindowDimensions()
    const methods = useForm({ shouldFocusError: false })
    const [selectTime, setSelectTime] = useState(false)
    const [isRepeat, setIsRepeat] = useState(false)
    const today = new Date()
    const [repeatData, setRepeatData] = useState<{ type: 1 | 2 | 3, value: Array<string | number> }>({ type: 1, value: ["everyday"] }) // 1: daily, 2: weekly, 3: monthly
    const inputStartRef = useRef<any>(null)
    const inputEndRef = useRef<any>(null)
    const inputStartTimeRef = useRef<any>(null)
    const inputEndTimeRef = useRef<any>(null)
    const { t } = useTranslation()
    const regexDate = /[0-9]{1,2}(\/|-)[0-9]{1,2}(\/|-)[0-9]{4}/g
    const regexTime = /^(?:[01]\d|2[0-3]):[0-5]\d(?:[:][0-5]\d)?$/g

    useEffect(() => {
        if (repeatValue && enableRepeat) {
            setIsRepeat(true)
            setRepeatData(repeatValue)
        } else setIsRepeat(false)
    }, [repeatValue])

    useEffect(() => {
        if (selectTime && pickerType !== "auto" && !pickerType.includes("time")) {
            setSelectTime(false)
            methods.setValue('time-start', null)
            methods.setValue('time-end', null)
            inputStartTimeRef.current!.setInputValue("")
            inputEndTimeRef.current!.setInputValue("")
        } else if (!selectTime && pickerType.includes("time")) {
            setSelectTime(true)
        }
    }, [pickerType])

    const initStartValue = () => {
        if (value) {
            const initStart = new Date(value)
            methods.setValue('date-start', initStart)
            inputStartRef.current!.setInputValue(Util.datetoString(initStart))
            if (pickerType.includes("time") || initStart.getSeconds() === 1) {
                setSelectTime(true)
                const tmpTime = `${initStart.getHours() < 9 ? `0${initStart.getHours()}` : initStart.getHours()}:${initStart.getMinutes() < 9 ? `0${initStart.getMinutes()}` : initStart.getMinutes()}`
                methods.setValue('time-start', tmpTime)
                inputStartTimeRef.current!.setInputValue(tmpTime)
            }
        } else inputStartRef.current!.setInputValue("")
    }

    const initEndValue = () => {
        if ((pickerType?.includes("range") || pickerType === "auto") && inputEndRef.current) {
            if (endValue) {
                const initEnd = new Date(endValue)
                methods.setValue('date-end', initEnd)
                inputEndRef.current.setInputValue(Util.datetoString(initEnd))
                if (pickerType.includes("time") || initEnd.getSeconds() === 59) {
                    const tmpTime = `${initEnd.getHours() < 9 ? `0${initEnd.getHours()}` : initEnd.getHours()}:${initEnd.getMinutes() < 9 ? `0${initEnd.getMinutes()}` : initEnd.getMinutes()}`
                    methods.setValue('time-end', tmpTime)
                    inputEndTimeRef.current!.setInputValue(tmpTime)
                }
            } else inputEndRef.current.setInputValue("")
        }
    }

    useEffect(() => {
        if (value && inputStartRef.current) initStartValue()
    }, [value, inputStartRef])

    useEffect(() => {
        initEndValue()
    }, [endValue, inputEndRef, pickerType])

    const repeatSetting = useMemo(() => {
        switch (repeatData.type) {
            case 2:
                return <>
                    <Text style={[textStyles?.["heading-8"], { paddingHorizontal: 16 }]}>{t("on") + " " + t("date").toLowerCase()}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 4, paddingHorizontal: 16 }}>
                        {Array.from({ length: 7 }).map((_, i) => {
                            switch (i) {
                                case 0:
                                    var weekdayTitle = t("su")
                                    break
                                case 1:
                                    weekdayTitle = t("mo")
                                    break
                                case 2:
                                    weekdayTitle = t("tu")
                                    break
                                case 3:
                                    weekdayTitle = t("we")
                                    break
                                case 4:
                                    weekdayTitle = t("th")
                                    break
                                case 5:
                                    weekdayTitle = t("fr")
                                    break
                                case 6:
                                    weekdayTitle = t("sa")
                                    break
                                default:
                                    weekdayTitle = ''
                                    break
                            }
                            return <View key={"weekday-" + i} style={{ gap: 4, alignItems: "center" }}>
                                <WCheckbox size={18} value={repeatData.value.includes(i)} disabled={repeatData.value.includes(i) && repeatData.value.length === 1}
                                    onChange={(v) => {
                                        if (v) setRepeatData({ type: 2, value: [...repeatData.value, i] })
                                        else setRepeatData({ type: 2, value: repeatData.value.filter(id => id !== i) })
                                    }} />
                                <Text style={textStyles?.['placeholder-2']}>{weekdayTitle}</Text>
                            </View>
                        })}
                    </View>
                </>
            case 3:
                return <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 4, paddingHorizontal: 16, gap: 12 }}>
                    <Text style={[textStyles?.["heading-8"], { flex: 1 }]}>{t("on") + " " + t("date").toLowerCase()}</Text>
                    <WSelect1
                        value={repeatData.value[0] === "last" ? 28 : (repeatData.value as any)[0] - 1}
                        style={[textStyles!["subtitle-3"], { fontWeight: "500", width: 48, padding: 0, borderWidth: 0 }]}
                        options={Array.from({ length: 29 }).map((_, num) => {
                            switch (num) {
                                case 28:
                                    var label = t("last")
                                    break;
                                default:
                                    label = `${num + 1}`
                                    break;
                            }
                            return { id: num, name: label }
                        })}
                        onChange={(ev: any) => {
                            setRepeatData({ type: 3, value: [ev.id === 28 ? "last" : (ev.id + 1)] })
                        }}
                    />
                </View>
            default:
                return null
        }
    }, [repeatData])

    return <>
        <View style={[{ position: "relative", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, height: 56 }]}>
            <View style={{ position: "absolute", alignItems: "center", left: 0, right: 0, top: "50%", transform: [{ translateY: "-50%" }] }}>
                <Text style={textStyles?.['heading-7']}>Select date</Text>
            </View>
            <Winicon src='outline/user interface/e-remove' size={20}
                onPress={() => {
                    hideBottomSheet(ref as any)
                }} />
            {pickerType === "auto" && <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                <Winicon
                    src='outline/user interface/time-alarm'
                    size={14}
                    style={{ padding: 7, borderRadius: 16, backgroundColor: selectTime ? colors?.["neutral-background-color-main"] : undefined }}
                    onPress={() => { setSelectTime(!selectTime) }}
                />
                {(enableRepeat || pickerType === "auto") && <Winicon
                    src='outline/arrows/loop-2'
                    size={14}
                    style={{ padding: 7, borderRadius: 16, backgroundColor: isRepeat ? colors?.["neutral-background-color-main"] : undefined }}
                    onPress={() => { setIsRepeat(!isRepeat) }}
                />}
            </View>}
        </View>
        <ScrollView style={{ maxHeight: windowSize.height - 56 - 64 - 60 }}>
            <WCalendar
                min={min}
                max={max}
                style={{ width: "100%" }}
                range={pickerType.includes("range") || pickerType === "auto"}
                value={pickerType === "date" || pickerType === "datetime" ? methods.watch('date-start') : (methods.watch('date-start') && methods.watch('date-end') ? { sTime: methods.watch('date-start'), eTime: methods.watch('date-end') } : undefined)}
                header={pickerType !== "date" && <View style={[styles.timeRangeContainer, { borderBottomColor: colors?.["neutral-border-color-main"] }]}>
                    <WTextField
                        ref={inputStartRef}
                        style={[textStyles!["body-3"], SizeVariant.size32, { width: (windowSize.width - 40) / 2 }]}
                        type="numeric"
                        placeholder={pickerType.includes("range") || pickerType === "auto" ? t("start-date") : "dd/mm/yyyy"}
                        onBlur={(_, inputValue) => {
                            if (regexDate.test(inputValue)) {
                                const dateValue = Util.stringToDate(inputValue, 'dd/mm/yyyy', '/')
                                if ((pickerType.includes("range") || pickerType === "auto") && differenceInCalendarDays(methods.getValues('date-end'), dateValue) < 0) {
                                    methods.setValue('date-end', dateValue)
                                    inputEndRef.current.setInputValue(Util.datetoString(dateValue))
                                }
                                methods.setValue('date-start', dateValue)
                            } else inputStartRef.current.setInputValue(methods.getValues('date-start') ? Util.datetoString(methods.getValues('date-start')) : "")
                        }}
                    />
                    {(pickerType.includes("range") || pickerType === "auto") &&
                        <WTextField
                            ref={inputEndRef}
                            style={[textStyles!["body-3"], SizeVariant.size32, { width: (windowSize.width - 40) / 2 }]}
                            placeholder={t("end-date")}
                            onBlur={(_, inputValue) => {
                                if (regexDate.test(inputValue)) {
                                    const dateValue = Util.stringToDate(inputValue, 'dd/mm/yyyy', '/')
                                    if (differenceInCalendarDays(dateValue, methods.getValues('date-start')) < 0) {
                                        methods.setValue('date-start', dateValue)
                                        inputStartRef.current!.setInputValue(Util.datetoString(dateValue))
                                    }
                                    methods.setValue('date-end', dateValue)
                                } else inputEndRef.current.setInputValue(methods.getValues('date-end') ? Util.datetoString(methods.getValues('date-end')) : "")
                            }}
                        />}
                    {selectTime && <>
                        <WTextField
                            ref={inputStartTimeRef}
                            style={[textStyles!["body-3"], SizeVariant.size32, { width: (windowSize.width - 40) / 2 }]}
                            placeholder={"hh:mm"}
                            onBlur={(_, inputValue) => {
                                if (regexTime.test(inputValue)) {
                                    methods.setValue('time-start', inputValue)
                                } else inputStartTimeRef.current.setInputValue("")
                            }}
                        />
                        {(pickerType.includes("range") || pickerType === "auto") &&
                            <WTextField
                                ref={inputEndTimeRef}
                                style={[textStyles!["body-3"], SizeVariant.size32, { width: (windowSize.width - 40) / 2 }]}
                                placeholder={"hh:mm"}
                                onBlur={(_, inputValue) => {
                                    if (regexTime.test(inputValue)) {
                                        methods.setValue('time-start', inputValue)
                                    } else inputEndTimeRef.current.setInputValue("")
                                }}
                            />}
                    </>}
                </View>}
                footer={pickerType !== "date" && isRepeat && <Pressable style={{ borderTopWidth: 1, paddingVertical: 12, gap: 12, borderStyle: "solid", borderTopColor: colors?.["neutral-border-color-main"] }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 16 }}>
                        <Text style={[textStyles?.["heading-8"], { flex: 1 }]}>{t("repeat")}</Text>
                        <WSelect1
                            style={[textStyles!["subtitle-3"], { fontWeight: "500", width: 72, padding: 0, borderWidth: 0, gap: 4 }]}
                            value={repeatData.type}
                            options={Array.from({ length: 3 }).map((_, num) => {
                                switch (num) {
                                    case 0:
                                        var label = t("daily")
                                        break;
                                    case 1:
                                        label = t("weekly")
                                        break;
                                    case 2:
                                        label = t("monthly")
                                        break;
                                    default:
                                        label = ""
                                        break;
                                }
                                return { id: num + 1, name: label }
                            })}
                            onChange={(ev: any) => {
                                let newValue: any = ["everyday"]
                                switch (ev.id) {
                                    case 1:
                                        newValue = ["everyday"]
                                        break;
                                    case 2:
                                        newValue = today.getDay()
                                        break;
                                    case 3:
                                        newValue = today.getDate()
                                        break;
                                    default:
                                        break;
                                }
                                setRepeatData({ type: ev.id, value: [newValue] })
                            }}
                        />
                    </View>
                    {repeatSetting}
                </Pressable>}
                onSelect={(ev: any) => {
                    if (pickerType !== "date") {
                        if (ev instanceof Date) {
                            methods.setValue('date-start', ev)
                            if (inputStartRef.current) inputStartRef.current.setInputValue(Util.datetoString(ev))
                        } else {
                            methods.setValue('date-start', ev.sTime)
                            if (inputStartRef.current) inputStartRef.current.setInputValue(Util.datetoString(ev.sTime))
                            if (pickerType.includes("range") || pickerType === "auto") {
                                methods.setValue('date-end', ev.eTime)
                                if (inputEndRef.current) inputEndRef.current.setInputValue(Util.datetoString(ev.eTime))
                            }
                        }
                    } else if (onApply) {
                        onApply(ev)
                        hideBottomSheet(ref)
                    }
                }}
            />
        </ScrollView>
        {onApply && <View style={[styles.footerActions, { backgroundColor: colors?.["neutral-background-color-absolute"], borderTopColor: colors?.["neutral-border-color-main"] }]}>
            <WButton
                label={t("reset")}
                style={[WButtonVariant.size40, textStyles!["label-3"], { flex: 1, backgroundColor: colors?.["neutral-background-color-main"] }]}
                onPress={() => {
                    methods.setValue("date-start", null)
                    methods.setValue("date-end", null)
                    methods.setValue("time-start", null)
                    methods.setValue("time-end", null)
                    initStartValue()
                    initEndValue()
                }}
            />
            <WButton
                label={t("apply")}
                disabled={!methods.watch("date-start") || (!methods.watch("date-end") && (pickerType.includes("range") || pickerType === "auto"))}
                style={[WButtonVariant.size40, textStyles!["label-3"], { flex: 1, backgroundColor: colors?.["primary-color-main"], color: "#fff" }]}
                onPress={() => {
                    let dateStartValue = methods.getValues("date-start")
                    let timeStartValue = selectTime ? (methods.getValues("time-start")?.length ? methods.getValues("time-start") : "00:00") : "00:00"
                    dateStartValue.setHours(parseInt(timeStartValue.split(':')[0]), parseInt(timeStartValue.split(':')[1]), selectTime ? 1 : 0, 0)
                    if (pickerType.includes("range") || pickerType === "auto") {
                        var dateEndValue = methods.getValues("date-end")
                        let timeEndValue = selectTime ? (methods.getValues("time-end")?.length ? methods.getValues("time-end") : "23:59") : "23:59"
                        dateEndValue.setHours(parseInt(timeEndValue.split(':')[0]), parseInt(timeEndValue.split(':')[1]), selectTime ? 59 : 0, 0)
                    }
                    onApply(!pickerType.includes("range") && pickerType !== "auto" ? dateStartValue : { start: dateStartValue, end: dateEndValue, repeatData: isRepeat ? repeatData : undefined })
                    hideBottomSheet(ref)
                }}
            />
        </View>}
    </>
})

const styles = StyleSheet.create({
    simpleStyle: {
        overflow: "visible",
        position: "relative",
        flexDirection: "row",
        alignItems: "center",
    },
    container: {
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 8,
    },
    timeRangeContainer: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderStyle: "solid",
        alignItems: "center",
        flexWrap: "wrap",
        columnGap: 8,
        rowGap: 12,
        padding: 16,
        paddingTop: 4,
    },
    footerActions: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingTop: 12,
        paddingBottom: Platform.OS === 'ios' ? 32 : 16,
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderStyle: "solid",
        width: "100%"
    },
    helperText: {
        fontSize: 12,
        position: 'absolute',
        bottom: -20,
        left: 2,
    },
    size24: {
        height: 24,
        paddingHorizontal: 8,
        columnGap: 8,
    },
    size32: {
        height: 32,
        paddingHorizontal: 12,
        columnGap: 12,
    },
    size40: {
        height: 40,
        paddingHorizontal: 16,
        columnGap: 12,
    },
    size48: {
        height: 48,
        paddingHorizontal: 16,
        columnGap: 12,
    },
})