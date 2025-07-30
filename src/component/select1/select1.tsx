import React, {
    Dispatch,
    forwardRef,
    ReactNode,
    SetStateAction,
    useDeferredValue,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from "react";
import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";
import {
    hideBottomSheet,
    showBottomSheet,
    WBottomSheet,
} from "../bottom-sheet/bottom-sheet";
import { useDesignTokens } from "../../module/WiniProvider";
import { Winicon } from "../wini-icon/wini-icon";
import { useTranslation } from "react-i18next";
import { WTextField, WTextFieldVariant } from "../text-field/text-field";

export enum WSelect1Variant {
    size24 = "size24",
    size32 = "size32",
    size40 = "size40",
    size48 = "size48",
}

export interface OptionsItem {
    id: string | number;
    prefix?: ReactNode;
    parentId?: string | number;
    name: string | ReactNode;
    disabled?: boolean;
    totalChild?: number;
}

interface Select1Props {
    value?: string | number;
    options: Required<Array<OptionsItem>>;
    getOptions?: (params: {
        length: number;
        search?: string;
        parentId?: string | number;
    }) => Promise<{ data: Array<OptionsItem>; totalCount: number }>;
    onChange?: (v?: OptionsItem) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    helperText?: string;
    helperTextColor?: string;
    style?:
    | Array<ViewStyle | TextStyle | WSelect1Variant>
    | ViewStyle
    | TextStyle
    | WSelect1Variant;
    prefix?: ReactNode;
    suffix?: ReactNode;
    simpleStyle?: boolean;
    customOptionsList?: ReactNode;
}

interface Select1Ref {
    element?: View;
    options: OptionsItem[];
    setOptions: Dispatch<SetStateAction<OptionsItem[]>>;
    onOpenOptions: () => void;
}

const initStyle = [WSelect1Variant.size32];

export const WSelect1 = forwardRef<Select1Ref, Select1Props>(
    ({ style = initStyle, helperTextColor = "#E14337", ...props }, ref) => {
        const { colors } = useDesignTokens();
        const containerRef = useRef<View>(null);
        const bottomSheetRef = useRef<any>(null);
        const [options, setOptions] = useState<Array<OptionsItem>>([]);
        const [value, setValue] = useState<string | number>();
        const valueItem = useMemo<OptionsItem | undefined>(
            () => options.find((e) => e.id === value),
            [options.length, value]
        );
        const convertStyle: TextStyle = useMemo(() => {
            const tmp = Array.isArray(style) ? style : [style];
            let value: any = { ...styles.container };
            tmp.forEach((e) => {
                if (typeof e === "string") {
                    value = { ...value, ...(styles as any)[e] };
                } else value = { ...value, ...e };
            });
            if (props.helperText?.length) value.borderColor = helperTextColor;
            else value.borderColor = colors?.["neutral-border-color-main"];
            if (props.disabled)
                value.backgroundColor = colors?.["neutral-background-color-disable"];
            return value;
        }, [
            style,
            props.disabled,
            props.helperText,
            colors?.["neutral-background-color-disable"],
        ]);
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

        useEffect(() => {
            setValue(props.value);
        }, [props.value]);
        useEffect(() => {
            setOptions(props.options ?? []);
        }, [props.options]);

        const onOpenOptions = () => {
            showBottomSheet({
                ref: bottomSheetRef,
                enableDismiss: true,
                style: { height: 240 },
                children: props.customOptionsList ?? (
                    <OptionDropList
                        getOptions={
                            props.getOptions ??
                            (async ({ search }) => {
                                if (search?.length) {
                                    const filter = options.filter(
                                        (e) =>
                                            search.toLowerCase().includes(`${e.id}`.toLowerCase()) ||
                                            `${e.id}`.toLowerCase().includes(search.toLowerCase()) ||
                                            search
                                                .toLowerCase()
                                                .includes(`${e.name}`.toLowerCase()) ||
                                            `${e.name}`.toLowerCase().includes(search.toLowerCase())
                                    );
                                    return { data: filter, totalCount: filter.length };
                                }
                                return { data: options, totalCount: options.length };
                            })
                        }
                        selected={value}
                        onSelect={(e) => {
                            if (options.every((o) => o.id !== e.id)) setOptions([e]);
                            setValue(e.id);
                            if (props.onChange) props.onChange(e);
                            hideBottomSheet(bottomSheetRef);
                        }}
                    />
                ),
            });
        };

        useImperativeHandle(
            ref,
            () => ({
                element: containerRef.current as any,
                options: options,
                setOptions: setOptions,
                onOpenOptions: onOpenOptions,
            }),
            [options, containerRef]
        );

        return (
            <>
                <WBottomSheet ref={bottomSheetRef} />
                <TouchableOpacity
                    ref={containerRef}
                    helper-text={props.helperText}
                    style={restOfStyle}
                    disabled={props.disabled}
                    onPress={props.disabled ? undefined : onOpenOptions}
                >
                    {valueItem?.prefix ?? props.prefix}
                    {typeof valueItem?.name === "object" ? (
                        valueItem.name
                    ) : (
                        <Text
                            numberOfLines={1}
                            style={{
                                width: "100%",
                                flex: 1,
                                padding: 0,
                                color: props.disabled
                                    ? colors?.["neutral-text-color-disabled"]
                                    : color,
                                opacity: valueItem ? 1 : 0.6,
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
                            }}
                        >
                            {valueItem?.name ?? props.placeholder}
                        </Text>
                    )}
                    {props.suffix ?? <Winicon src={`fill/arrows/down-arrow`} size={12} />}
                    {props.helperText?.length ? (
                        <Text
                            numberOfLines={1}
                            style={[styles.helperText, { color: helperTextColor }]}
                        >
                            {props.helperText}
                        </Text>
                    ) : null}
                </TouchableOpacity>
            </>
        );
    }
);

const OptionDropList = (props: {
    selected?: string | number;
    onSelect: (e: OptionsItem) => void;
    getOptions: (params: {
        length: number;
        search?: string;
        parentId?: string | number;
    }) => Promise<{ data: Array<OptionsItem>; totalCount: number }>;
}) => {
    const { textStyles, colors } = useDesignTokens();
    const [searchInput, setSearchInput] = useState<string>("");
    const searchValue = useDeferredValue(searchInput);
    const initTotal = useRef<number>(null);
    const flatListRef = useRef<FlatList>(null);
    const [options, setOptions] = useState<{
        data: OptionsItem[];
        totalCount?: number;
    }>({ data: [], totalCount: undefined });
    const { t } = useTranslation();
    const getData = async (length?: number) => {
        const res = await props.getOptions({
            length: length ?? 0,
            search: searchValue,
        });
        if (initTotal.current === null) initTotal.current = res.totalCount;
        setOptions(
            length
                ? { data: [...options.data, ...res.data], totalCount: res.totalCount }
                : res
        );
    };

    useEffect(() => {
        getData();
    }, [searchValue]);

    useEffect(() => {
        if (options.totalCount === initTotal.current) {
            setTimeout(() => {
                const scrollIndex = options.data
                    .filter((e) => !e.parentId)
                    .findIndex(
                        (e) =>
                            e.id === props.selected ||
                            options.data.some(
                                (c) => c.parentId === e.id && c.id === props.selected
                            )
                    );
                if (scrollIndex >= 0)
                    flatListRef.current?.scrollToOffset({
                        offset: scrollIndex * 34 - 16,
                        animated: true,
                    });
            }, 250);
        }
    }, [options.totalCount]);

    return (
        <>
            {options.totalCount === 0 && !initTotal.current ? (
                <View style={{ alignItems: "center", marginVertical: 8 }}>
                    <Winicon src="color/files/archive-file" size={28} />
                    <Text style={[textStyles?.["heading-7"], { margin: 8 }]}>
                        {t("noResultFound")}
                    </Text>
                </View>
            ) : (
                <>
                    {initTotal.current && initTotal.current > 10 && (
                        <WTextField
                            style={[
                                textStyles?.["body-3"] ?? {},
                                WTextFieldVariant.size40,
                                { marginVertical: 8, marginHorizontal: 16, backgroundColor: colors?.['neutral-border-color-main'] },
                            ]}
                            placeholder={t("search")}
                            prefix={<Winicon src={"outline/development/zoom"} size={14} />}
                            onChange={setSearchInput}
                        />
                    )}
                    {options.totalCount === 0 ? (
                        <View style={{ alignItems: "center", marginVertical: 8 }}>
                            <Winicon src="color/files/archive-file" size={28} />
                            <Text style={[textStyles?.["heading-7"], { margin: 8 }]}>
                                {t("noResultFound")}
                            </Text>
                        </View>
                    ) : (
                        <FlatList
                            ref={flatListRef}
                            style={{ flex: 1, marginVertical: 4 }}
                            data={options.data.filter((e) => !e.parentId)}
                            keyExtractor={(item, index) => item.id + "-" + index}
                            ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
                            renderItem={({ item }) => {
                                const children = options.data.filter(
                                    (e) => e.parentId === item.id
                                );
                                return (
                                    <OptionsItemTile
                                        item={item}
                                        selected={props.selected}
                                        children={children}
                                        onPress={props.onSelect}
                                        getOptions={(params) =>
                                            props.getOptions?.({ ...params, search: searchValue })
                                        }
                                    />
                                );
                            }}
                            onEndReached={() => {
                                if (
                                    options.totalCount &&
                                    options.data.length < options.totalCount
                                )
                                    getData(options.data.length);
                            }}
                            onEndReachedThreshold={0.5} // Trigger when 50% from the end
                        />
                    )}
                </>
            )}
        </>
    );
};

interface OptionTileProps {
    item: OptionsItem;
    children?: Array<OptionsItem>;
    selected?: string | number;
    onPress: (e: OptionsItem) => void;
    getOptions?: (params: {
        length: number;
        search?: string;
        parentId?: string | number;
    }) => Promise<{ data: Array<OptionsItem>; totalCount: number }>;
}

function OptionsItemTile({
    item,
    children,
    selected,
    onPress,
    getOptions,
}: OptionTileProps) {
    const { colors, textStyles } = useDesignTokens();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [options, setOptions] = useState<{
        data: OptionsItem[];
        totalCount: number;
    }>({ data: [], totalCount: 0 });
    const { t } = useTranslation();

    useEffect(() => {
        if (children) setOptions({ data: children, totalCount: children.length });
    }, [children]);

    useEffect(() => {
        if (isOpen && !options.totalCount)
            getOptions?.({ length: 0, parentId: item.id }).then((res) =>
                setOptions(res)
            );
    }, [isOpen]);

    useEffect(() => {
        if (children?.length && children.some((e) => e.id === selected))
            setIsOpen(true);
    }, [children?.length, selected]);

    return (
        <>
            {
                <TouchableOpacity
                    style={[
                        styles.selectTile,
                        {
                            backgroundColor:
                                selected === item.id
                                    ? colors?.["neutral-background-color-selected"]
                                    : item.disabled
                                        ? colors?.["neutral-background-color-disable"]
                                        : undefined,
                        },
                    ]}
                    onPress={() => {
                        if (item.totalChild) setIsOpen(!isOpen);
                        else onPress(item);
                    }}
                >
                    {typeof item?.name === "string" ? (
                        <>
                            {item.totalChild !== undefined && (
                                <Winicon
                                    src={`fill/arrows/triangle-${isOpen ? "down" : "right"}`}
                                    size={12}
                                />
                            )}
                            {item.prefix}
                            <Text
                                style={[
                                    textStyles?.["label-4"],
                                    {
                                        flex: 1,
                                        color: item.disabled
                                            ? colors?.["neutral-text-color-disabled"]
                                            : colors?.["neutral-text-color-label"],
                                    },
                                ]}
                            >
                                {item.name}
                            </Text>
                        </>
                    ) : (
                        item.name
                    )}
                </TouchableOpacity>
            }
            {isOpen && (
                <>
                    {options.data.map((child, i) => {
                        return (
                            <TouchableOpacity
                                key={child.id + "-" + i}
                                style={[
                                    styles.selectTile,
                                    {
                                        paddingLeft: 36,
                                        marginVertical: 1,
                                        backgroundColor:
                                            selected === child.id
                                                ? colors?.["neutral-background-color-selected"]
                                                : child.disabled
                                                    ? colors?.["neutral-background-color-disable"]
                                                    : undefined,
                                    },
                                ]}
                                onPress={() => onPress(child)}
                            >
                                {typeof child?.name === "string" ? (
                                    <>
                                        {child.prefix}
                                        <Text
                                            style={[
                                                textStyles?.["label-4"],
                                                {
                                                    flex: 1,
                                                    color: child.disabled
                                                        ? colors?.["neutral-text-color-disabled"]
                                                        : colors?.["neutral-text-color-label"],
                                                },
                                            ]}
                                        >
                                            {child.name}
                                        </Text>
                                    </>
                                ) : (
                                    child.name
                                )}
                            </TouchableOpacity>
                        );
                    })}
                    {options.data.length < options.totalCount && (
                        <TouchableOpacity
                            style={{
                                paddingVertical: 4,
                                paddingHorizontal: 8,
                                marginLeft: 4,
                                marginBottom: 2,
                            }}
                            onPress={() => {
                                getOptions?.({
                                    length: options.data.length,
                                    parentId: item.id,
                                }).then((res) => setOptions(res));
                            }}
                        >
                            <Text style={textStyles?.["button-text-5"]}>{t("seemore")}</Text>
                        </TouchableOpacity>
                    )}
                </>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        overflow: "visible",
        position: "relative",
        flexDirection: "row",
        borderWidth: 1,
        borderStyle: "solid",
        alignItems: "center",
        borderRadius: 8,
    },
    selectTile: {
        height: 32,
        paddingHorizontal: 8,
        marginHorizontal: 8,
        borderRadius: 8,
        gap: 8,
        alignItems: "center",
        flexDirection: "row",
    },
    helperText: {
        lineHeight: 16,
        fontSize: 12,
        position: "absolute",
        bottom: 0,
        left: 2,
        transform: [{ translateY: 22 }],
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
});
