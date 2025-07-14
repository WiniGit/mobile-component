export declare class Util {
    static dateTime_stringToDecimal(stringDate: string): number;
    static tryParseInt(input: string): number;
    static tryParseFloat(input: string): number;
    static dateDefault: number;
    static set_timeRefreshToken(): void;
    static get_timeRefreshToken(): number;
    static calculateAge: (birthdate: string) => number;
    static getStringDateNow(): string;
    /**
     * number to money format.\
     * ex: 199999 => 1,999,999
     * */
    static money(number: number | string): string;
    static moneytmp(number: number, a: number): string;
    static stringToDate(_date: string, _format?: string, _delimiter?: string): Date;
    static datetoStringDefault(): string;
    /** date: dd/mm/yyyy | yyyy/mm/dd | dd/mm | mm/yyyy
        time: hh:mm:ss | hh:mm */
    static datetoString(x?: Date, y?: string): string;
    dateDefault: Date;
    /**
     * action with localStorage
     *  */
    static setStorage: (listKeyValue: Array<{
        key: string;
        value: string;
    }>) => Promise<void>;
    static getStorage: (key: string) => Promise<string>;
    static multiGetStorage: (keys: string[]) => Promise<readonly import("@react-native-async-storage/async-storage/lib/typescript/types").KeyValuePair[]>;
    static clearStorage: () => Promise<void>;
    static removeStorage: (keys: string[]) => Promise<void>;
    static randomString(length: number): string;
    static decodeJwtResponse(token: string): any;
    static percentToHex: (p: number) => string;
    static hexToPercent: (h: string) => number;
    static hexToRGB(hex: string): string;
    static rgbToHex(rgba: string): string;
    static colorNameToHex(color: string): string;
    static prettyJsonToString(data: {
        [p: string]: any;
    }): string;
    static syntaxHighlight(json: {
        [p: string]: any;
    }): string;
    static generateRandomColor(): string;
    static generateLightColorRgb(): string;
    static generateDarkColorRgb(id?: number | string): string;
    static toSlug(input: string): string;
    static convertToKebabCase: (str: string) => string;
    static processHTMLContent: (html: string) => string;
    static timeSince: (dateCreate: number) => string;
    static extractHashtags: (content: string) => RegExpMatchArray | [];
    static getRandomGradient(seed: string): string;
    static to_vietnamese(number: number | string): string;
    /** start from 1: Ex: 1=A, 2=B, 3=C, ... */
    static numberToAlphabet(n?: number): string;
}
export declare function formatNumberConvert(num: number): string;
export declare function inputMoneyPattern(ev: any): void;
export declare const randomGID: () => string;
