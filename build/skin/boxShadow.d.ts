export interface BoxShadowProps {
    "shadow-top": {
        boxShadow: string;
    };
    "shadow-bottom": {
        boxShadow: string;
    };
    "shadow-right": {
        boxShadow: string;
    };
    "shadow-left": {
        boxShadow: string;
    };
    "shadow-dropdown": {
        boxShadow: string;
    };
    "shadow-card": {
        boxShadow: string;
    };
    [key: string]: {
        boxShadow: string;
    };
}
export declare const initBoxShadows: BoxShadowProps;
