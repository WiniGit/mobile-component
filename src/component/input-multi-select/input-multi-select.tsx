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
} from 'react';
import { FlatList, GestureResponderEvent, LayoutChangeEvent, Platform, Pressable, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { hideBottomSheet, showBottomSheet, WBottomSheet } from '../bottom-sheet/bottom-sheet';
import { WCheckbox } from '../checkbox/checkbox';
import { useDesignTokens } from '../../module/WiniProvider';
import { Winicon } from '../wini-icon/wini-icon';
import { useTranslation } from 'react-i18next';
import { WTextField, SizeVariant } from '../text-field/text-field';

interface OptionsItem {
    id: string | number;
    prefix?: ReactNode;
    parentId?: string | number;
    name: string | ReactNode;
    disabled?: boolean;
    totalChild?: number;
}

interface SelectMultipleProps {
    value?: Array<string | number>;
    options: Required<Array<OptionsItem>>;
    getOptions?: (params: {
        length: number;
        search?: string;
        parentId?: string | number;
    }) => Promise<{ data: Array<OptionsItem>; totalCount: number }>;
    onChange?: (value?: Array<string | number>) => void;
    onLayout?: (event: LayoutChangeEvent) => void;
    placeholder?: string;
    disabled?: boolean;
    helperText?: string;
    helperTextColor?: string;
    style?: StyleProp<ViewStyle | TextStyle | SizeVariant>;
    showClearValueButton?: boolean;
    prefix?: ReactNode;
    suffix?: ReactNode;
    simpleStyle?: boolean;
    customOptionsList?: ReactNode;
    previewMaxLength?: number;
    optionListTitle?: string;
}

interface SelectMultipleRef {
    element: View;
    options: OptionsItem[];
    setOptions: Dispatch<SetStateAction<OptionsItem[]>>;
    onOpenOptions: () => void;
}

const initStyle = [SizeVariant.size32];

export const WSelectMultiple = forwardRef<SelectMultipleRef, SelectMultipleProps>(({ style = initStyle, helperTextColor = '#E14337', previewMaxLength = 3, ...props }, ref) => {
    const { colors } = useDesignTokens();
    const containerRef = useRef<View>(null);
    const bottomSheetRef = useRef<any>(null);
    const [options, setOptions] = useState<Array<OptionsItem>>([]);
    const [value, setValue] = useState<Array<string | number>>([]);
    const convertStyle: TextStyle = useMemo(() => {
        const tmp = Array.isArray(style) ? style : [style];
        let value: any = {};
        if (!props.simpleStyle) value = { ...styles.container };
        tmp.forEach((e: any) => {
            if (typeof e === 'string') {
                value = { ...value, ...(styles as any)[e] };
            } else value = { ...value, ...e };
        });
        if (props.helperText?.length) value.borderColor = helperTextColor;
        else value.borderColor ??= colors?.['neutral-border-color-main'];
        if (props.disabled) value.backgroundColor = colors?.['neutral-background-color-disable'];
        return value;
    }, [style, props.simpleStyle, props.disabled, props.helperText, colors?.['neutral-background-color-disable']]);
    const {
        flexWrap,
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

    const onClickItem = (ev: GestureResponderEvent, item: string | number) => {
        ev.stopPropagation();
        let newValue = value.filter(vl => vl !== item);
        setValue(newValue);
        props.onChange?.(newValue);
    };

    useEffect(() => {
        setValue(props.value ?? []);
    }, [props.value]);
    useEffect(() => {
        setOptions(props.options ?? []);
    }, [props.options]);

    const clearValue = (ev: any) => {
        ev.stopPropagation();
        setValue([]);
        props.onChange?.([]);
    };

    const onOpenOptions = () => {
        let tmpValue = [...value];
        showBottomSheet({
            ref: bottomSheetRef,
            enableDismiss: true,
            children: props.customOptionsList ?? (
                <OptionDropList
                    ref={bottomSheetRef}
                    optionListTitle={props.optionListTitle}
                    onClose={() => {
                        setValue(tmpValue);
                        props.onChange?.(tmpValue);
                    }}
                    getOptions={
                        props.getOptions ??
                        (async ({ search }) => {
                            if (search?.length) {
                                const filter = options.filter(
                                    e =>
                                        search.toLowerCase().includes(`${e.id}`.toLowerCase()) ||
                                        `${e.id}`.toLowerCase().includes(search.toLowerCase()) ||
                                        search.toLowerCase().includes(`${e.name}`.toLowerCase()) ||
                                        `${e.name}`.toLowerCase().includes(search.toLowerCase()),
                                );
                                return { data: filter, totalCount: filter.length };
                            }
                            return { data: options, totalCount: options.length };
                        })
                    }
                    selected={options.filter(e => tmpValue.includes(e.id))}
                    onChange={(ev, optList) => {
                        const newOList: OptionsItem[] = [];
                        optList.forEach(newO => {
                            if (options.every(o => o.id !== newO.id)) newOList.push(newO);
                        });
                        if (newOList.length) setOptions([...options, ...newOList]);
                        if (!ev && !optList.length) {
                            var tmp: any = []
                        } else {
                            tmp = tmpValue.filter(s => !optList.some(c => s === c.id)) ?? [];
                            if (ev) tmp.push(...optList.filter((e, _, arr) => arr.every(c => e.id !== c.parentId)).map(e => e.id));
                        }
                        tmpValue = tmp
                        setValue(tmpValue);
                        props.onChange?.(tmpValue);
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
        [options, containerRef],
    );

    return (
        <>
            <WBottomSheet ref={bottomSheetRef} />
            <TouchableOpacity
                ref={containerRef}
                onLayout={props.onLayout}
                helper-text={props.helperText}
                style={[restOfStyle, styles.simpleStyle]}
                disabled={props.disabled}
                onPress={props.disabled ? undefined : onOpenOptions}
            >
                {props.prefix}
                <View style={[styles.previewContainer, { flexWrap }]}>
                    {!value.length && (
                        <Text
                            numberOfLines={1}
                            style={{
                                width: '100%',
                                flex: 1,
                                opacity: 0.6,
                                fontVariant,
                                fontSize,
                                lineHeight,
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
                                color: props.disabled ? colors?.['neutral-text-color-disabled'] : color,
                            }}
                        >
                            {props.placeholder}
                        </Text>
                    )}
                    {value.slice(0, previewMaxLength).map(item => {
                        const optionItem = options.find(e => e.id === item);
                        return (
                            <View key={item} style={[styles.previewSelectedItem, { backgroundColor: colors?.['neutral-background-color-selected'] }]}>
                                <Text
                                    style={{
                                        fontSize: (fontSize ?? 14) * 0.8,
                                        fontVariant,
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
                                        color: props.disabled ? colors?.['neutral-text-color-disabled'] : color
                                    }}
                                >{optionItem?.name}</Text>
                                <Winicon
                                    src={'outline/user interface/e-remove'}
                                    size={12}
                                    onPress={optionItem?.disabled ? undefined : ev => onClickItem(ev, item)}
                                />
                            </View>
                        );
                    })}
                    {value.length > previewMaxLength && (
                        <View style={[styles.previewSelectedItem, { backgroundColor: colors?.['neutral-background-color-selected'], minWidth: 24 }]}>
                            <Text
                                style={{
                                    fontSize: (fontSize ?? 14) * 0.8,
                                    fontVariant,
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
                                    color: props.disabled ? colors?.['neutral-text-color-disabled'] : color
                                }}>+{value.length - previewMaxLength}</Text>
                        </View>
                    )}
                </View>
                {props.suffix ||
                    (props.showClearValueButton && value.length ? (
                        <Winicon src={'outline/user interface/c-remove'} size={14} onPress={clearValue} />
                    ) : (
                        <Winicon src={`fill/arrows/down-arrow`} size={12} />
                    ))}
                {props.helperText?.length ? (
                    <Text numberOfLines={1} style={[styles.helperText, { color: helperTextColor }]}>
                        {props.helperText}
                    </Text>
                ) : null}
            </TouchableOpacity>
        </>
    );
},
);

interface OptionDropListProps {
    optionListTitle?: string;
    onClose: () => void;
    selected: Array<OptionsItem>;
    onChange: (ev: boolean, value: OptionsItem[]) => void;
    getOptions: (params: {
        length: number;
        search?: string;
        parentId?: string | number;
    }) => Promise<{ data: Array<OptionsItem>; totalCount: number }>;
}

const OptionDropList = forwardRef<any, OptionDropListProps>((props, ref) => {
    const { textStyles, colors } = useDesignTokens();
    const [searchInput, setSearchInput] = useState<string>('');
    const searchValue = useDeferredValue(searchInput);
    const initTotal = useRef<number>(null);
    const [options, setOptions] = useState<{ data: OptionsItem[]; totalCount?: number }>({
        data: [],
        totalCount: undefined,
    });
    const { t } = useTranslation();
    const [selected, setSelected] = useState<Array<OptionsItem>>([]);
    const getData = async (length?: number) => {
        const res = await props.getOptions({ length: length ?? 0, search: searchValue });
        if (initTotal.current === null) initTotal.current = res.totalCount;
        setOptions(length ? { data: [...options.data, ...res.data], totalCount: res.totalCount } : res);
    };

    useEffect(() => {
        return () => { props.onClose?.() }
    }, [])

    useEffect(() => {
        setSelected(props.selected);
    }, [props.selected])

    useEffect(() => {
        getData();
    }, [searchValue]);

    const parentList = options.data.filter(e => !e.parentId);

    return (
        <Pressable style={{ backgroundColor: colors?.["neutral-background-color-absolute"], paddingTop: 8, paddingBottom: Platform.OS === 'ios' ? 28 : 8 }}>
            <View style={[{ position: "relative", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, height: props.optionListTitle ? 56 : 38 }]}>
                <View style={{ position: "absolute", alignItems: "center", left: 0, right: 0, top: "50%", transform: [{ translateY: "-50%" }] }}>
                    {props.optionListTitle && <Text style={textStyles?.['heading-7']}>{props.optionListTitle}</Text>}
                    <Text style={textStyles?.[`subtitle-${props.optionListTitle ? "4" : "3"}`]}>{t("itemsSelected", { count: selected.length })}</Text>
                </View>
                <Winicon src='outline/user interface/e-remove' size={20}
                    onPress={() => {
                        hideBottomSheet(ref as any)
                    }} />
                <Text style={textStyles?.['button-text-5']}
                    onPress={() => {
                        setSelected([])
                        props.onChange(false, [])
                    }}>{t("reset")}</Text>
            </View>
            {options.totalCount === 0 && !initTotal.current ? (
                <View style={{ alignItems: 'center', marginVertical: 8 }}>
                    <Winicon src="color/files/archive-file" size={28} />
                    <Text style={[textStyles?.['heading-7'], { margin: 8 }]}>{t('noResultFound')}</Text>
                </View>
            ) : (
                <>
                    {initTotal.current && initTotal.current > 10 && (
                        <WTextField
                            style={[
                                textStyles?.['body-3'] ?? {},
                                SizeVariant.size40,
                                { marginTop: 4, marginBottom: 8, marginHorizontal: 16, backgroundColor: colors?.['neutral-border-color-main'] },
                            ]}
                            placeholder={t('search')}
                            prefix={<Winicon src={'outline/development/zoom'} size={14} />}
                            onChange={setSearchInput}
                        />
                    )}
                    {options.totalCount === 0 ? <View style={{ alignItems: 'center', marginVertical: 8 }}>
                        <Winicon src="color/files/archive-file" size={28} />
                        <Text style={[textStyles?.['heading-7'], { margin: 8 }]}>{t('noResultFound')}</Text>
                    </View> : <FlatList
                        style={{ maxHeight: Platform.OS === 'ios' ? 320 : 300 }}
                        data={parentList}
                        keyExtractor={(item, index) => item.id + '-' + index}
                        ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
                        renderItem={({ item }) => {
                            const children = options.data.filter(e => e.parentId === item.id);
                            return (
                                <OptionsItemTile
                                    item={item}
                                    selected={selected}
                                    children={children}
                                    getOptions={props.getOptions}
                                    arr={parentList}
                                    onChange={(ev, optList) => {
                                        const tmp = selected.filter(s => !optList.some(c => s.id === c.id)) ?? [];
                                        if (ev) tmp.push(...optList.filter((e, _, arr) => arr.every(c => e.id !== c.parentId)));
                                        setSelected(tmp);
                                        props.onChange(ev, optList);
                                    }}
                                />
                            );
                        }}
                        onEndReached={() => {
                            if (options.totalCount && options.data.length < options.totalCount) getData(options.data.length);
                        }}
                        onEndReachedThreshold={0.5} // Trigger when 50% from the end
                    />}
                </>
            )}
        </Pressable>
    );
})

interface OptionTileProps {
    item: OptionsItem;
    children?: Array<OptionsItem>;
    arr: Array<OptionsItem>;
    selected: Array<OptionsItem>;
    onChange: (ev: boolean, optList: OptionsItem[]) => void;
    getOptions?: (params: {
        length: number;
        search?: string;
        parentId?: string | number;
    }) => Promise<{ data: Array<OptionsItem>; totalCount: number }>;
}

function OptionsItemTile({ item, children, selected, onChange, getOptions }: OptionTileProps) {
    const { colors, textStyles } = useDesignTokens();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [options, setOptions] = useState<{ data: OptionsItem[]; totalCount: number }>({ data: [], totalCount: 0 });
    const { t } = useTranslation();
    const itemChecked = useMemo(() => {
        if (item.totalChild) {
            return selected?.some(s => s.id === item.id) ||
                (!!options.data.length && options.data.every(c => selected?.some(s => s.id === c.id)))
                ? true
                : [...selected.filter(s => s.parentId === item.id), ...options.data].some(c =>
                    selected?.some(s => s.id === c.id),
                )
                    ? null
                    : false;
        } else return selected?.some(s => s.id === item.id);
    }, [item, selected, options]);

    useEffect(() => {
        if (children && !options.totalCount) setOptions({ data: children, totalCount: children.length });
    }, [children]);

    useEffect(() => {
        if (isOpen && !options.totalCount) getOptions?.({ length: 0, parentId: item.id }).then(res => setOptions(res));
    }, [isOpen]);

    useEffect(() => {
        if (children?.length && !options.data.length && children.some((e) => selected?.some(s => s.id === e.id)))
            setIsOpen(true);
    }, [children?.length, selected]);

    return (
        <>
            {item.totalChild ? (
                <View
                    style={[
                        styles.selectTile,
                        { backgroundColor: item.disabled ? colors?.['neutral-background-color-disable'] : undefined }
                    ]}
                >
                    <WCheckbox
                        size={20}
                        disabled={item.disabled}
                        value={itemChecked}
                        onChange={ev => {
                            onChange(ev, [item, ...options.data]);
                        }}
                    />
                    {typeof item?.name === 'object' ? (
                        item.name
                    ) : (
                        <TouchableOpacity
                            style={{ flexDirection: 'row', alignItems: "center", flex: 1, gap: 8 }}
                            onPress={() => {
                                setIsOpen(!isOpen);
                            }}
                        >
                            {item.totalChild !== undefined && (
                                <Winicon src={`fill/arrows/triangle-${isOpen ? 'down' : 'right'}`} size={12} />
                            )}
                            {item.prefix}
                            <Text
                                style={[
                                    textStyles?.['label-4'],
                                    {
                                        flex: 1,
                                        color: item.disabled
                                            ? colors?.['neutral-text-color-disabled']
                                            : colors?.['neutral-text-color-label'],
                                    },
                                ]}
                            >
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            ) : (
                <TouchableOpacity
                    disabled={item.disabled}
                    style={[
                        styles.selectTile,
                        { backgroundColor: item.disabled ? colors?.['neutral-background-color-disable'] : undefined },
                    ]}
                    onPress={() => {
                        onChange(!itemChecked, [item]);
                    }}
                >
                    <WCheckbox
                        size={20}
                        readOnly
                        disabled={item.disabled}
                        value={itemChecked}
                    />
                    {typeof item?.name === 'object' ? (
                        item.name
                    ) : (
                        <>
                            {item.prefix}
                            <Text
                                style={[
                                    textStyles?.['label-4'],
                                    {
                                        flex: 1,
                                        color: item.disabled
                                            ? colors?.['neutral-text-color-disabled']
                                            : colors?.['neutral-text-color-label'],
                                    },
                                ]}
                            >
                                {item.name}
                            </Text>
                        </>
                    )}
                </TouchableOpacity>
            )}
            {isOpen && (
                <>
                    {options.data.map((child, i) => {
                        const childChecked = selected?.some(s => s.id === child.id);
                        return (
                            <TouchableOpacity
                                key={child.id + '-' + i}
                                style={[
                                    styles.selectTile,
                                    {
                                        paddingLeft: 36,
                                        marginVertical: 1,
                                        backgroundColor: childChecked
                                            ? colors?.['neutral-background-color-selected']
                                            : child.disabled
                                                ? colors?.['neutral-background-color-disable']
                                                : undefined,
                                    },
                                ]}
                                onPress={() => {
                                    onChange(!childChecked, [child]);
                                }}
                            >
                                <WCheckbox
                                    size={20}
                                    readOnly
                                    disabled={child.disabled}
                                    value={childChecked}
                                />
                                {typeof child?.name === 'object' ? (
                                    child.name
                                ) : (
                                    <>
                                        {child.prefix}
                                        <Text
                                            style={[
                                                textStyles?.['label-4'],
                                                {
                                                    flex: 1,
                                                    color: child.disabled
                                                        ? colors?.['neutral-text-color-disabled']
                                                        : colors?.['neutral-text-color-label'],
                                                },
                                            ]}
                                        >
                                            {child.name}
                                        </Text>
                                    </>
                                )}
                            </TouchableOpacity>
                        );
                    })}
                    {options.data.length < options.totalCount && (
                        <TouchableOpacity
                            style={{ paddingVertical: 4, paddingHorizontal: 8, marginLeft: 4, marginBottom: 2 }}
                            onPress={() => {
                                getOptions?.({ length: options.data.length, parentId: item.id }).then(res => setOptions(res));
                            }}
                        >
                            <Text style={textStyles?.['button-text-5']}>{t('seemore')}</Text>
                        </TouchableOpacity>
                    )}
                </>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    simpleStyle: {
        overflow: 'visible',
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 8,
    },
    previewContainer: {
        flex: 1,
        gap: 4,
        height: "100%",
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center"
    },
    previewSelectedItem: {
        minWidth: 48,
        borderRadius: 100,
        gap: 4,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
        height: 24,
    },
    selectTile: {
        height: 32,
        paddingHorizontal: 8,
        marginHorizontal: 8,
        borderRadius: 8,
        gap: 8,
        alignItems: 'center',
        flexDirection: 'row',
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
});
