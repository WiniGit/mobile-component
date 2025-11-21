import React, { forwardRef, ReactNode, useEffect, useMemo, useState } from "react"
import { differenceInCalendarDays } from "date-fns"
import { Pressable, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { LinearGradient } from "react-native-linear-gradient"
import { useDesignTokens } from "../../module/WiniProvider"
import { useTranslation } from "react-i18next"
import { Winicon } from "../wini-icon/wini-icon"

export const today = new Date()
export const startDate = new Date(
    today.getFullYear() - 100,
    today.getMonth(),
    today.getDate()
)
export const endDate = new Date(
    today.getFullYear() + 100,
    today.getMonth(),
    today.getDate()
)

export const inRangeTime = (date: Date, startDate: Date, endDate: Date) => (differenceInCalendarDays(date, startDate) > -1 && differenceInCalendarDays(endDate, date) > -1)

enum CalendarTab {
    DATE = 0,
    MONTH = 1,
    YEAR = 2,
}

interface CalendarProps {
    id?: string,
    value?: Date | {
        /** start datetime */
        sTime: Date,
        /** end datetime */
        eTime: Date
    },
    range?: boolean,
    min?: Date,
    max?: Date,
    onSelect?: (props: Date | { sTime: Date, eTime: Date }) => void,
    style?: StyleProp<ViewStyle>,
    header?: ReactNode,
    footer?: ReactNode,
}

const stateValue = (minDate: Date, maxDate: Date, value?: Date | { sTime: Date, eTime: Date }, range?: boolean) => {
    let defaultValue: Date | { sTime: Date, eTime: Date }
    if (value) {
        if (range) {
            if (value instanceof Date) defaultValue = { sTime: value, eTime: value }
            else defaultValue = value
            if (defaultValue.sTime.getTime() < minDate.getTime()) defaultValue.sTime = minDate
            if (defaultValue.eTime.getTime() > maxDate.getTime()) defaultValue.eTime = maxDate
        } else {
            if (value instanceof Date) defaultValue = value
            else defaultValue = value.sTime
            if (defaultValue.getTime() < minDate.getTime()) defaultValue = minDate
            if (defaultValue.getTime() > maxDate.getTime()) defaultValue = maxDate
        }
    } else {
        defaultValue = range ? { sTime: today, eTime: today } : today
    }
    const defaultMonth = defaultValue instanceof Date ? defaultValue.getMonth() : defaultValue.sTime.getMonth()
    const defaultYear = defaultValue instanceof Date ? defaultValue.getFullYear() : defaultValue.sTime.getFullYear()
    return {
        value: value ? defaultValue : undefined,
        selectMonth: defaultMonth,
        selectYear: defaultYear,
    }
} 

export const WCalendar = forwardRef<any, CalendarProps>((props, ref) => {
    const { textStyles, colors } = useDesignTokens()
    const { t, i18n } = useTranslation()
    const minDate = useMemo<Date>(() => !props.min || props.min.getTime() < startDate.getTime() ? startDate : props.min, [props.min]);
    const maxDate = useMemo<Date>(() => !props.max || props.max.getTime() > endDate.getTime() ? endDate : props.max, [props.max]);
    const [tab, setTab] = useState<CalendarTab>(CalendarTab.DATE)
    const [selectMonth, setSelectMonth] = useState<number>(minDate.getMonth())
    const [selectYear, setSelectYear] = useState<number>(minDate.getFullYear())
    const [value, setValue] = useState<Date | { sTime: Date, eTime: Date }>()

    useEffect(() => {
        const tmp = stateValue(minDate, maxDate, props.value, props.range)
        setSelectMonth(tmp.selectMonth)
        setSelectYear(tmp.selectYear)
        setValue(tmp.value)
    }, [minDate, maxDate, props.value, props.range])

    const showDateInMonth = () => {
        let firstDayOfMonth = new Date(selectYear, selectMonth, 1)
        return <>
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
                return <View key={'dtwk-' + i} style={[styles.pickerItem, { width: `${100 / 7}%` }]}>
                    <Text style={textStyles?.["label-4"]}>{weekdayTitle}</Text>
                </View>
            })}
            {Array.from({ length: 42 }).map((_, i) => {
                let dateNumber = (i % 7) + (Math.floor(i / 7) * 7) - firstDayOfMonth.getDay()
                const timeValue = new Date(selectYear, selectMonth, dateNumber + 1)
                let styleList: StyleProp<ViewStyle>[] = [styles.datePickerCircle]
                let typoStyle = [textStyles?.["body-3"]]
                if (dateNumber + 1 === today.getDate() && selectMonth === today.getMonth() && selectYear === today.getFullYear()) {
                    styleList.push(styles.today, { borderColor: colors?.["neutral-border-color-main"] })
                }
                if (timeValue.getMonth() !== selectMonth) {
                    typoStyle[0] = textStyles?.["placeholder-2"]
                }
                let isValid = true
                const extendPickerItemStyle: ViewStyle = {}
                if (!inRangeTime(timeValue, minDate, maxDate)) {
                    isValid = false
                } else if (value instanceof Date) {
                    if (value.getTime() === timeValue.getTime()) {
                        styleList.push({ backgroundColor: colors?.["primary-color-main"] })
                        typoStyle.push({ color: colors?.["neutral-text-color-stable"] })
                    }
                } else if ((value?.sTime.getDate() === timeValue.getDate() && Math.abs(differenceInCalendarDays(timeValue, value.sTime)) < 1) || (value?.eTime.getDate() === timeValue.getDate() && Math.abs(differenceInCalendarDays(timeValue, value.eTime)) < 1)) {
                    styleList.push({ backgroundColor: colors?.["primary-color-main"] })
                    typoStyle.push({ color: colors?.["neutral-text-color-stable"] })
                    if (Math.abs(differenceInCalendarDays(value.sTime, value.eTime)) >= 1)
                        return <LinearPicker
                            key={timeValue.toString()}
                            reverse={value?.sTime.getDate() !== timeValue.getDate() || Math.abs(differenceInCalendarDays(timeValue, value.sTime)) >= 1}
                            style={[styles.pickerItem, { width: `${100 / 7}%` }]}
                        >
                            {pickDateItem({ styleList, isValid, timeValue, typoStyle })}
                        </LinearPicker>
                } else if (value && inRangeTime(timeValue, value.sTime, value.eTime)) {
                    extendPickerItemStyle.backgroundColor = colors?.["neutral-background-color-main"]
                }
                return <View
                    key={timeValue.toString()}
                    style={[styles.pickerItem, { width: `${100 / 7}%`, opacity: isValid ? 1 : 0.24 }, extendPickerItemStyle]}
                    pointerEvents={isValid ? "box-none" : "auto"}>
                    {pickDateItem({ styleList, isValid, timeValue, typoStyle })}
                </View>
            })}
        </>
    }

    const pickDateItem = (params: { styleList: StyleProp<ViewStyle>[], typoStyle: StyleProp<TextStyle>[], timeValue: Date, isValid: boolean }) => {
        return <TouchableOpacity style={params.styleList} disabled={!params.isValid}
            onPress={() => {
                const currentValue = value as any
                if (props.range) {
                    const newValue = (!currentValue || params.timeValue.getTime() < currentValue.sTime.getTime()) ? { sTime: params.timeValue, eTime: params.timeValue } : { sTime: currentValue.sTime, eTime: params.timeValue }
                    setValue(newValue)
                    if (props.onSelect) props.onSelect(newValue)
                } else {
                    setValue(params.timeValue)
                    if (props.onSelect) props.onSelect(params.timeValue)
                }
            }} >
            <Text style={params.typoStyle}>{`${params.timeValue.getDate()}`}</Text>
        </TouchableOpacity>
    }

    const showMonthInYear = () => {
        return Array.from({ length: 12 }).map((_, i) => {
            const timeValue = new Date(selectYear, i)
            let styleList: StyleProp<ViewStyle>[] = [styles.pickerItem, styles.monthPickerCircle]
            let typoStyle = [textStyles?.["body-3"]]
            if (selectYear === today.getFullYear() && today.getMonth() === i) {
                styleList.push(styles.today, { borderColor: colors?.["neutral-border-color-main"] })
            }
            let isValid = true
            const extendPickerItemStyle: ViewStyle = {}
            if (!inRangeTime(timeValue, minDate, maxDate)) {
                isValid = false
            } else if (value instanceof Date) {
                if (selectYear === value.getFullYear() && i === value.getMonth()) {
                    styleList.push({ backgroundColor: colors?.["primary-color-main"] })
                    typoStyle.push({ color: colors?.["neutral-text-color-stable"] })
                }
            } else if (value && ((i === value.sTime.getMonth() && value.sTime.getFullYear() === selectYear) || (i === value.eTime.getMonth() && value.eTime.getFullYear() === selectYear))) {
                styleList.push({ backgroundColor: colors?.["primary-color-main"] })
                typoStyle.push({ color: colors?.["neutral-text-color-stable"] })
                if (!(i === value.sTime.getMonth() && value.sTime.getFullYear() === selectYear && i === value.eTime.getMonth() && value.eTime.getFullYear() === selectYear))
                    return <LinearPicker
                        key={timeValue.toString()}
                        reverse={i !== value.sTime.getMonth() || value.sTime.getFullYear() !== selectYear}
                        style={[styles.pickerItem, { width: `${100 / 3}%` }]}
                    >
                        {pickMonthItem({ i, styleList, typoStyle, isValid })}
                    </LinearPicker>
            } else if (value && inRangeTime(timeValue, value.sTime, value.eTime)) {
                extendPickerItemStyle.backgroundColor = colors?.["neutral-background-color-main"]
            }
            return <View
                key={timeValue.toString()}
                style={[styles.pickerItem, { width: `${100 / 3}%`, opacity: isValid ? 1 : 0.24 }, extendPickerItemStyle]}
                pointerEvents={isValid ? "box-none" : "auto"}>
                {pickMonthItem({ i, styleList, typoStyle, isValid })}
            </View>
        })
    }

    const pickMonthItem = (params: { i: number, styleList: StyleProp<ViewStyle>, typoStyle: StyleProp<TextStyle>, isValid: boolean }) => {
        switch (params.i) {
            case 0:
                var monthTitle = i18n.language === "en" ? "Jan" : t('january')
                break
            case 1:
                monthTitle = i18n.language === "en" ? "Feb" : t('february')
                break
            case 2:
                monthTitle = i18n.language === "en" ? "Mar" : t('march')
                break
            case 3:
                monthTitle = i18n.language === "en" ? "Apr" : t('april')
                break
            case 4:
                monthTitle = i18n.language === "en" ? "May" : t('may')
                break
            case 5:
                monthTitle = i18n.language === "en" ? "Jun" : t('june')
                break
            case 6:
                monthTitle = i18n.language === "en" ? "Jul" : t('july')
                break
            case 7:
                monthTitle = i18n.language === "en" ? "Aug" : t('august')
                break
            case 8:
                monthTitle = i18n.language === "en" ? "Sep" : t('september')
                break
            case 9:
                monthTitle = i18n.language === "en" ? "Oct" : t('october')
                break
            case 10:
                monthTitle = i18n.language === "en" ? "Nov" : t('november')
                break
            case 11:
                monthTitle = i18n.language === "en" ? "Dec" : t('december')
                break
            default:
                monthTitle = ''
                break
        }

        return <TouchableOpacity style={params.styleList} disabled={!params.isValid}
            onPress={() => {
                setSelectMonth(params.i)
                setTab(CalendarTab.DATE)
            }}
        >
            <Text style={params.typoStyle}>{monthTitle}</Text>
        </TouchableOpacity>
    }

    const showYearInRange = () => {
        return Array.from({ length: 12 }).map((_, i) => {
            let firstYearInTable = selectYear - ((selectYear - startDate.getFullYear()) % 12)
            let yearNumber = i + firstYearInTable
            let styleList: StyleProp<ViewStyle>[] = [styles.yearPickerCircle]
            let typoStyle = [textStyles?.["body-3"]]
            if (yearNumber === today.getFullYear()) {
                styleList.push(styles.today, { borderColor: colors?.["neutral-border-color-main"] })
            }
            let isValid = true
            const extendPickerItemStyle: ViewStyle = {}
            if (yearNumber < minDate.getFullYear() || yearNumber > maxDate.getFullYear()) {
                isValid = false
            } else if (value instanceof Date) {
                if (yearNumber === value.getFullYear()) {
                    styleList.push({ backgroundColor: colors?.["primary-color-main"] })
                    typoStyle.push({ color: colors?.["neutral-text-color-stable"] })
                }
            } else if (yearNumber === value?.sTime.getFullYear() || yearNumber === value?.eTime.getFullYear()) {
                styleList.push({ backgroundColor: colors?.["primary-color-main"] })
                typoStyle.push({ color: colors?.["neutral-text-color-stable"] })
                if (!(yearNumber === value?.sTime.getFullYear() && yearNumber === value?.eTime.getFullYear()))
                    return <LinearPicker
                        key={yearNumber.toString()}
                        reverse={yearNumber !== value?.sTime.getFullYear()}
                        style={[styles.pickerItem, { width: `${100 / 3}%` }]}
                    >
                        {pickYearItem({ yearNumber, styleList, typoStyle, isValid })}
                    </LinearPicker>
            } else if (value && yearNumber > value.sTime.getFullYear() && yearNumber < value.eTime.getFullYear()) {
                extendPickerItemStyle.backgroundColor = colors?.["neutral-background-color-main"]
            }
            return <View
                key={yearNumber.toString()}
                style={[styles.pickerItem, { width: `${100 / 3}%`, opacity: isValid ? 1 : 0.24 }, extendPickerItemStyle]}
                pointerEvents={isValid ? "box-none" : "auto"}>
                {pickYearItem({ yearNumber, styleList, typoStyle, isValid })}
            </View>
        })
    }

    const pickYearItem = (params: { yearNumber: number, styleList: StyleProp<ViewStyle>, typoStyle: StyleProp<TextStyle>, isValid: boolean }) => {
        return <TouchableOpacity style={params.styleList} disabled={!params.isValid}
            onPress={() => {
                setSelectYear(params.yearNumber)
                setTab(CalendarTab.MONTH)
            }}
        >
            <Text style={params.typoStyle}>{`${params.yearNumber}`}</Text>
        </TouchableOpacity>
    }

    const title = useMemo<string>(() => {
        switch (tab) {
            case CalendarTab.YEAR:
                let firstYearInTable = selectYear - ((selectYear - startDate.getFullYear()) % 12)
                return `${firstYearInTable}-${firstYearInTable + 11}`
            case CalendarTab.MONTH:
                return `${selectYear}`
            default:
                switch (selectMonth) {
                    case 0:
                        var monthName = t('january')
                        break
                    case 1:
                        monthName = t('february')
                        break
                    case 2:
                        monthName = t('march')
                        break
                    case 3:
                        monthName = t('april')
                        break
                    case 4:
                        monthName = t('may')
                        break
                    case 5:
                        monthName = t('june')
                        break
                    case 6:
                        monthName = t('july')
                        break
                    case 7:
                        monthName = t('august')
                        break
                    case 8:
                        monthName = t('september')
                        break
                    case 9:
                        monthName = t('october')
                        break
                    case 10:
                        monthName = t('november')
                        break
                    case 11:
                        monthName = t('december')
                        break
                    default:
                        monthName = ''
                        break
                }
                return `${monthName}${i18n.language === 'en' ? ' ' : '/'}${selectYear}`
        }
    }, [i18n.language, selectMonth, selectYear, tab])

    return <Pressable style={[styles.calendarContainer, { backgroundColor: colors?.["neutral-background-color-absolute"] }, props.style]}>
        {props.header}
        <View style={[styles.pickerDateHeader, { borderBottomColor: colors?.["neutral-border-color-main"] }]}>
            <Winicon src={"fill/arrows/left-arrow"} size={14} style={{ paddingHorizontal: 12, paddingVertical: 8 }}
                onPress={() => {
                    switch (tab) {
                        case CalendarTab.YEAR:
                            if (selectYear - 10 < startDate.getFullYear()) {
                                setSelectYear(startDate.getFullYear())
                            } else {
                                setSelectYear(selectYear - 10)
                            }
                            break
                        case CalendarTab.MONTH:
                            const newTime = new Date(selectYear, selectMonth - 1)
                            if (newTime.getTime() >= startDate.getTime()) {
                                setSelectYear(selectYear - 1)
                            }
                            break
                        default:
                            const newDataVl = new Date(selectYear, selectMonth - 1)
                            if (newDataVl.getTime() >= startDate.getTime()) {
                                setSelectMonth(newDataVl.getMonth())
                                setSelectYear(newDataVl.getFullYear())
                            }
                            break
                    }
                }} />
            <Text style={[styles.pickerDateTitleHeader, textStyles?.["heading-7"]]}
                onPress={() => {
                    if (tab !== CalendarTab.YEAR)
                        setTab(tab === CalendarTab.DATE ? CalendarTab.MONTH : CalendarTab.YEAR)
                }}>
                {title}
            </Text>
            <Winicon src={"fill/arrows/right-arrow"} size={14} style={{ paddingHorizontal: 12, paddingVertical: 8 }}
                onPress={() => {
                    switch (tab) {
                        case CalendarTab.YEAR:
                            if (selectYear + 10 > endDate.getFullYear()) {
                                setSelectYear(endDate.getFullYear())
                            } else {
                                setSelectYear(selectYear + 10)
                            }
                            break
                        case CalendarTab.MONTH:
                            const newTime = new Date(selectYear, selectMonth + 1)
                            if (newTime.getTime() <= endDate.getTime()) {
                                setSelectYear(selectYear + 1)
                            }
                            break
                        default:
                            const newDataVl = new Date(selectYear, selectMonth + 1)
                            if (newDataVl.getTime() <= endDate.getTime()) {
                                setSelectMonth(newDataVl.getMonth())
                                setSelectYear(newDataVl.getFullYear())
                            }
                            break
                    }
                }} />
        </View>
        <View style={styles.pickerDateBody}>
            {tab === CalendarTab.YEAR ? showYearInRange() : tab === CalendarTab.MONTH ? showMonthInYear() : showDateInMonth()}
        </View>
        {props.footer}
    </Pressable>
})

const LinearPicker = (props: { style?: StyleProp<ViewStyle>, children?: ReactNode, reverse?: boolean }) => {
    const { colors } = useDesignTokens()
    return <LinearGradient
        style={props.style}
        colors={['transparent', 'transparent', colors!["neutral-background-color-main"], colors!["neutral-background-color-main"]]}
        locations={[0, 0.5, 0.5, 1]}
        start={props.reverse ? { x: 1, y: 0 } : { x: 0, y: 0 }}
        end={props.reverse ? { x: 0, y: 0 } : { x: 1, y: 0 }}
    >
        {props.children}
    </LinearGradient>
}

const styles = StyleSheet.create({
    calendarContainer: {
        alignItems: "stretch",
        width: 312,
        minWidth: 256
    },
    pickerDateHeader: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 12,
        gap: 12,
        borderBottomWidth: 1,
        borderStyle: "solid",
    },
    pickerDateTitleHeader: {
        flex: 1,
        textAlign: "center"
    },
    pickerDateBody: {
        height: 304,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        paddingVertical: 12,
        paddingHorizontal: 16,
        rowGap: 8,
    },
    pickerItem: {
        height: 32,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 4,
    },
    datePickerCircle: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        width: 32,
        borderRadius: 16,
    },
    today: {
        borderWidth: 1,
        borderStyle: "solid",
    },
    monthPickerCircle: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        width: 72,
        borderRadius: 24,
    },
    yearPickerCircle: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        width: 72,
        borderRadius: 24,
    },
})