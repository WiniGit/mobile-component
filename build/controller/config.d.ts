export declare class ConfigData {
    static pid: string;
    static url: string;
    static fileUrl: string;
    static imgUrlId: string;
    static onInvalidToken: () => void;
    static globalHeaders: () => Promise<{
        [k: string]: any;
    }>;
}
export declare const imgFileTypes: string[];
export declare class BaseDA {
    static post: (url: string, options?: {
        headers?: {
            [k: string]: any;
        };
        body?: any;
    }) => Promise<any>;
    static postFile: (url: string, options?: {
        headers?: {
            [k: string]: any;
        };
        body?: FormData;
    }) => Promise<any>;
    static get: (url: string, options?: {
        headers?: {
            [k: string]: any;
        };
    }) => Promise<any>;
    static uploadFiles: (listFile: Array<File>) => Promise<any>;
    static getFilesInfor: (ids: Array<string>) => Promise<any>;
    static updateFilesInfor: (data: Array<{
        [p: string]: any;
    }>) => Promise<any>;
}
