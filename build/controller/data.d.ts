export declare class DataController {
    private module;
    constructor(module: string);
    getAll(): Promise<any>;
    getProperties(): Promise<any>;
    aggregateList(options: {
        page?: number;
        size?: number;
        searchRaw?: string;
        filter?: string;
        sortby?: Array<{
            prop: string;
            direction?: "ASC" | "DESC";
        }>;
        returns?: Array<string>;
    } | undefined): Promise<any>;
    filterByEmptyKey(options: {
        page?: number;
        size?: number;
        searchRaw?: string;
        key: string;
        notEmpty?: boolean;
        sortby?: Array<{
            prop: string;
            direction?: "ASC" | "DESC";
        }>;
    } | undefined): Promise<any>;
    patternList(options: {
        page?: number;
        size?: number;
        searchRaw?: string;
        filter?: string;
        sortby?: Array<{
            prop: string;
            direction?: "ASC" | "DESC";
        }>;
        pattern?: {
            returns: Array<string>;
            [p: string]: Array<string> | {
                searchRaw?: string;
                reducers: string;
            };
        };
    } | undefined): Promise<any>;
    group(options: {
        searchRaw?: string;
        reducers: string;
    }): Promise<any>;
    getListSimple(options: {
        page?: number;
        size?: number;
        query?: string;
        returns?: Array<string>;
        sortby?: {
            BY: string;
            DIRECTION?: "ASC" | "DESC";
        };
    } | undefined): Promise<any>;
    getById(id: string): Promise<any>;
    getByListId(ids: Array<string>): Promise<any>;
    add(data: Array<{
        [p: string]: any;
    }>): Promise<any>;
    edit(data: Array<{
        [p: string]: any;
    }>): Promise<any>;
    duplicate(ids: Array<string>): Promise<any>;
    delete(ids: Array<string>): Promise<any>;
    checkotp(idToken: string): Promise<any>;
}
export declare class SettingDataController {
    private setting;
    constructor(setting: "report" | "chart" | "form" | "card" | "view");
    action(action: "add" | "edit" | "delete", options: {
        data?: Array<{
            [p: string]: any;
        }>;
        ids?: Array<string>;
    }): Promise<any>;
    getListSimple(options: {
        page?: number;
        size?: number;
        query?: string;
        returns?: Array<string>;
        sortby?: {
            BY: string;
            DIRECTION?: "ASC" | "DESC";
        };
    } | undefined): Promise<any>;
    getByIds(ids: Array<string>): Promise<any>;
    static searchSetting(options: {
        page?: number;
        size?: number;
        query?: string;
        returns?: Array<string>;
        sortby?: {
            BY: string;
            DIRECTION?: "ASC" | "DESC";
        };
    } | undefined): Promise<any>;
}
export declare class AccountController {
    private module;
    constructor(module?: "Customer" | "User");
    login(body: {
        type: "phone" | "apple" | "google" | "microsoft" | "account";
        token?: string;
        deviceToken?: string;
        ggClientId?: string;
        phone?: string;
        password?: string;
        email?: string;
        username?: string;
    }, resolve?: () => void): Promise<any>;
    getInfor(): Promise<any>;
    checkPassword(body: {
        phone?: string;
        password?: string;
        email?: string;
        username?: string;
    }): Promise<any>;
    hashPassword(password: string): Promise<any>;
}
