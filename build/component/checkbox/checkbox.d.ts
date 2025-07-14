import { type ReactNode } from 'react';
import { ViewStyle } from 'react-native';
interface CheckboxProps {
    onChange?: (value: boolean) => void;
    value?: boolean | null;
    checkColor?: string;
    disabled?: boolean;
    style?: ViewStyle;
    /** default 20 **/
    size?: number;
}
export declare function FCheckbox({ size, checkColor, style, ...props }: CheckboxProps): import("react/jsx-runtime").JSX.Element;
export declare function FMultiCheckbox({ data, selected, onSelect, size, disable, checkboxStyle, }: {
    size?: number;
    borderRadius?: number;
    disable?: boolean;
    data: Array<{
        id: string | number;
        name: string | ReactNode;
    }>;
    selected?: Array<string> | Array<number>;
    onSelect: (item: {
        id: string | number;
        name: string | ReactNode;
    }) => void;
    checkboxStyle?: ViewStyle;
}): import("react/jsx-runtime").JSX.Element;
export {};
