import { type TextStyle } from 'react-native';
interface RatingProps {
    /**
      value: 0-5
      */
    value: number;
    size?: number;
    onChange?: (value: number) => void;
    style?: TextStyle;
    strokeColor?: string;
    fillColor?: string;
}
export declare const FRating: ({ style, fillColor, size, strokeColor, ...props }: RatingProps) => import("react/jsx-runtime").JSX.Element;
export {};
