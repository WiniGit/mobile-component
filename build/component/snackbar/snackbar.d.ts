import { type ReactNode } from 'react';
export declare function FSnackbar(): import("react/jsx-runtime").JSX.Element;
export declare const showSnackbar: ({ message, label, status, children, action, actionTitle, bottom, }: {
    message: string;
    label?: string;
    status?: number;
    action?: () => {};
    actionTitle?: string;
    children?: ReactNode;
    bottom?: number;
}) => void;
