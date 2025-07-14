import { KeyboardTypeOptions, ReturnKeyTypeOptions, TextInputFocusEvent, TextStyle } from 'react-native';
interface TextFieldProps {
    value?: string;
    maxLength?: number;
    numberOfLines?: number;
    onPress?: () => void;
    onChange?: (e: string) => void;
    onSubmit?: (e: string) => void;
    onBlur?: (e: TextInputFocusEvent, value: string) => void;
    onFocus?: (e: TextInputFocusEvent) => void;
    placeholder?: string;
    returnKeyType?: ReturnKeyTypeOptions | undefined;
    disabled?: boolean;
    disabledBg?: string;
    multiline?: boolean;
    suffix?: React.ReactNode;
    prefix?: React.ReactNode;
    helperText?: string;
    helperTextColor?: string;
    style?: TextStyle;
    autoFocus?: boolean;
    secureTextEntry?: boolean;
    type?: KeyboardTypeOptions;
}
interface TextFieldRef {
    value: string;
    isFocused: boolean;
}
export declare const FTextField: import("react").ForwardRefExoticComponent<TextFieldProps & import("react").RefAttributes<TextFieldRef>>;
export {};
