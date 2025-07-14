export declare enum ComponentStatus {
    INFOR = 1,
    ERROR = 2,
    WARNING = 3,
    SUCCSESS = 4
}
export declare const getStatusIcon: (status: ComponentStatus, size?: number) => import("react/jsx-runtime").JSX.Element;
