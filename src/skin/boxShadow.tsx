export interface BoxShadowProps {
    "shadow-top": { boxShadow: string };
    "shadow-bottom": { boxShadow: string };
    "shadow-right": { boxShadow: string };
    "shadow-left": { boxShadow: string };
    "shadow-dropdown": { boxShadow: string };
    "shadow-card": { boxShadow: string };
    /* other */
    [key: string]: { boxShadow: string }
}

export const initBoxShadows: BoxShadowProps = {
    "shadow-top": { boxShadow: "0px -1px 6px 0px #2D32390F" },
    "shadow-bottom": { boxShadow: "0px 1px 6px 0px #2D32390F" },
    "shadow-right": { boxShadow: "1px 0px 6px 0px #2D32390F" },
    "shadow-left": { boxShadow: "-1px 0px 6px 0px #2D32390F" },
    "shadow-dropdown": { boxShadow: "2px 0px 16px 0px #0000000A" },
    "shadow-card": { boxShadow: "0px 3px 4px 0px rgba(0, 0, 0, .03)" }
}