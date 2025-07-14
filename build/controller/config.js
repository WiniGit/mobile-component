"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDA = exports.imgFileTypes = exports.ConfigData = void 0;
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("./utils");
const snackbar_1 = require("../component/snackbar/snackbar");
const component_status_1 = require("../component/component-status");
class ConfigData {
    static pid = "";
    static url = "";
    static fileUrl = "";
    static imgUrlId = "";
    static onInvalidToken = () => {
        utils_1.Util.clearStorage();
    };
    static globalHeaders = async () => {
        return { 'Content-Type': 'application/json' };
    };
}
exports.ConfigData = ConfigData;
exports.imgFileTypes = [".png", ".svg", ".jpg", "jpeg", ".webp", ".gif"];
class BaseDA {
    static post = async (url, options) => {
        try {
            let _headers = url.startsWith(ConfigData.url) ? (await ConfigData.globalHeaders()) : { 'Content-Type': 'application/json' };
            if (!_headers)
                _headers = { 'Content-Type': 'application/json' };
            if (options?.headers)
                _headers = { ..._headers, ...options.headers };
            const response = await axios_1.default.post(url, options?.body, { headers: _headers });
            if (response.status === 200 || response.status === 201) {
                return response.data;
            }
            else if (response.status === 204) {
                return {
                    message: 'ok',
                    data: options?.body
                };
            }
            else if (response.status === 401) {
                (0, snackbar_1.showSnackbar)({ message: 'Unauthorized access', status: component_status_1.ComponentStatus.ERROR });
                ConfigData.onInvalidToken();
            }
            else {
                console.log("error: ??: ", response.statusText);
                return { status: response.status, message: response.statusText };
            }
        }
        catch (error) {
            (0, snackbar_1.showSnackbar)({ message: error?.toString(), status: component_status_1.ComponentStatus.ERROR });
            throw error;
        }
    };
    static postFile = async (url, options) => {
        try {
            if (options?.headers) {
                options.headers["Content-Type"] = "multipart/form-data";
            }
            const response = await axios_1.default.post(url, options?.body, { headers: options?.headers ?? { "Content-Type": "multipart/form-data" } });
            if (response.status === 200 || response.status === 201) {
                return response.data;
            }
            else if (response.status === 204) {
                return {
                    message: 'ok',
                    data: options?.body
                };
            }
            else if (response.status === 401) {
                (0, snackbar_1.showSnackbar)({ message: 'Unauthorized access', status: component_status_1.ComponentStatus.ERROR });
                ConfigData.onInvalidToken();
            }
            else {
                console.log("error: ??: ", response.statusText);
                return { status: response.status, message: response.statusText };
            }
        }
        catch (error) {
            console.error("Failed to POST data:", error);
            throw error;
        }
    };
    static get = async (url, options) => {
        try {
            let _headers = url.startsWith(ConfigData.url) ? (await ConfigData.globalHeaders()) : { 'Content-Type': 'application/json' };
            if (!_headers)
                _headers = { 'Content-Type': 'application/json' };
            if (options?.headers)
                _headers = { ..._headers, ...options.headers };
            const response = await axios_1.default.get(url, { headers: _headers });
            if (response.status === 200 || response.status === 201) {
                return response.data;
            }
            else if (response.status === 204) {
                return {
                    message: 'ok',
                    // data: options?.body
                };
            }
            else if (response.status === 401) {
                (0, snackbar_1.showSnackbar)({ message: 'Unauthorized access', status: component_status_1.ComponentStatus.ERROR });
                ConfigData.onInvalidToken();
            }
            else {
                console.log("error: ??: ", response.statusText);
                return { status: response.status, message: response.statusText };
            }
        }
        catch (error) {
            console.error("Failed to GET data:", error);
            throw error;
        }
    };
    static uploadFiles = async (listFile) => {
        listFile = [...listFile];
        // const headersObj: any = await getHeaders()
        const headersObj = { pid: ConfigData.pid };
        const formData = new FormData();
        listFile.forEach(e => {
            formData.append("files", e);
        });
        const response = await BaseDA.postFile(ConfigData.url + 'file/uploadfiles', {
            headers: headersObj,
            body: formData,
        });
        if (response.code === 200) {
            return response.data;
        }
        else {
            (0, snackbar_1.showSnackbar)({ message: response.message, status: component_status_1.ComponentStatus.ERROR });
        }
        return null;
    };
    static getFilesInfor = async (ids) => {
        const headersObj = {};
        const response = await BaseDA.post(ConfigData.url + 'file/getFilesInfor', {
            headers: headersObj,
            body: { ids: ids },
        });
        return response;
    };
    static updateFilesInfor = async (data) => {
        const headersObj = {};
        const response = await BaseDA.post(ConfigData.url + 'file/editFileInfor', {
            headers: headersObj,
            body: { data: data },
        });
        return response;
    };
}
exports.BaseDA = BaseDA;
