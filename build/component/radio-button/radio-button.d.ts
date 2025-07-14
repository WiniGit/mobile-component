import { type ViewStyle } from 'react-native';
interface FRadioProps {
    value: string;
    status?: boolean;
    disabled?: boolean;
    onPress: (value: boolean) => void;
    style?: ViewStyle;
}
export declare const FRadioButton: (props: FRadioProps) => import("react/jsx-runtime").JSX.Element;
export {};
