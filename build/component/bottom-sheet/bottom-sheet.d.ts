import { DimensionValue } from 'react-native';
import React from 'react';
interface BottomSheetState {
    isVisible: boolean;
    enableDismiss?: boolean;
    dismiss?: () => void;
    title?: React.ReactNode;
    prefixAction?: React.ReactNode;
    suffixAction?: React.ReactNode;
    children: React.ReactNode;
    height?: DimensionValue | undefined;
}
export declare class FBottomSheet extends React.Component<any, BottomSheetState> {
    state: Readonly<BottomSheetState>;
    showBottomSheet({ enableDismiss, title, dismiss, prefixAction, suffixAction, children, height, }: {
        enableDismiss?: boolean;
        dismiss?: () => void;
        titleText?: string;
        title?: React.ReactNode;
        prefixAction?: React.ReactNode;
        suffixAction?: React.ReactNode;
        children: React.ReactNode;
        height?: DimensionValue | undefined;
    }): void;
    hideBottomSheet(): void;
    render(): React.ReactNode;
}
export declare const showBottomSheet: ({ ref, enableDismiss, titleText, title, dismiss, prefixAction, suffixAction, children, }: {
    ref: React.MutableRefObject<FBottomSheet>;
    enableDismiss?: boolean;
    dismiss?: () => void;
    titleText?: string;
    title?: React.ReactNode;
    prefixAction?: React.ReactNode;
    suffixAction?: React.ReactNode;
    children: React.ReactNode;
}) => void;
export declare const hideBottomSheet: (ref: React.MutableRefObject<FBottomSheet>) => void;
export {};
