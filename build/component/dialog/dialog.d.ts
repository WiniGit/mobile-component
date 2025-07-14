import React from 'react';
import { ComponentStatus } from '../component-status';
interface DialogState {
    readonly open?: boolean;
    title: string;
    status: ComponentStatus;
    content: string | React.ReactNode;
    titleSubmit?: string;
    titleCancel?: string;
    onSubmit: Function;
    onCancel?: Function;
    submitTitle?: string;
}
export declare const showDialog: ({ ref, title, status, content, onSubmit, onCancel, submitTitle, }: {
    ref: React.MutableRefObject<FDialog>;
    title?: string;
    status?: ComponentStatus;
    content?: string | React.ReactNode;
    titleSubmit?: string;
    titleCancel?: string;
    onSubmit?: Function;
    onCancel?: Function;
    submitTitle?: string;
}) => void;
export default class FDialog extends React.Component<Object, DialogState> {
    state: Readonly<DialogState>;
    showDialogNoti(data: DialogState): void;
    closeDialog(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
