import { TextStyle } from 'react-native';
import { ReactNode } from 'react';
interface ButtonProps {
    onPress?: () => void;
    label: string;
    prefix?: ReactNode;
    suffix?: ReactNode;
    disabled?: boolean;
    style?: TextStyle;
}
export declare const FButton: ({ style, ...props }: ButtonProps) => import("react/jsx-runtime").JSX.Element;
export {};
