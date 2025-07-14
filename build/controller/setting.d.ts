export declare class TableController {
    private module;
    constructor(module: "table" | "column" | "rel" | "menu" | "page" | "layer" | "designtoken" | "workflow" | "stage" | "settingstage");
    getAll(): Promise<any>;
    getByListId(ids: Array<string>): Promise<any>;
    getListSimple(options?: {
        page?: number;
        size?: number;
        query?: string;
        returns?: Array<string>;
        sortby?: {
            BY: string;
            DIRECTION?: "ASC" | "DESC";
        };
    }): Promise<any>;
    group(options: {
        searchRaw?: string;
        reducers: string;
    }): Promise<any>;
    add(data: Array<{
        [p: string]: any;
    }>): Promise<any>;
    edit(data: Array<{
        [p: string]: any;
    }>): Promise<any>;
    delete(ids: Array<string>): Promise<any>;
}
export declare class WiniController {
    private module;
    constructor(module: "Project" | "ProjectCustomer" | "Customer");
    login: (props: {
        Username: string;
        Password: string;
    }) => Promise<any>;
    loginGoogle: (code: string, ggClientId: string, ggClientSecret: string) => Promise<any>;
    getInfor: () => Promise<any>;
    getAll(): Promise<any>;
    getListSimple(options?: {
        page?: number;
        size?: number;
        query?: string;
        returns?: Array<string>;
        sortby?: {
            BY: string;
            DIRECTION?: "ASC" | "DESC";
        };
    }): Promise<any>;
    group(options: {
        searchRaw?: string;
        reducers: string;
    }): Promise<any>;
    add(data: Array<{
        [p: string]: any;
    }>): Promise<any>;
    edit(data: Array<{
        [p: string]: any;
    }>): Promise<any>;
    delete(ids: Array<string>): Promise<any>;
    getByIds(ids: Array<string>): Promise<any>;
}
