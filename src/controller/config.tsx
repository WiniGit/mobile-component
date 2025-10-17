import axios from 'axios';
import { Util } from "./utils";
import { showSnackbar } from '../component/snackbar/snackbar';
import { ComponentStatus } from '../component/component-status';

export class ConfigData {
    static pid = ""
    static url = ""
    static fileUrl = "";
    static imgUrlId = "";
    static onInvalidToken = () => {
        Util.clearStorage()
    };
    static globalHeaders: () => Promise<{ [k: string]: any }> = async () => {
        return { 'Content-Type': 'application/json' }
    }
}

export const imgFileTypes = [".png", ".svg", ".jpg", "jpeg", ".webp", ".gif"]

export class BaseDA {
    static post = async (url: string, options?: { headers?: { [k: string]: any }, body?: any }) => {
        try {
            let _headers: { [k: string]: any } = url.startsWith(ConfigData.url) ? (await ConfigData.globalHeaders()) : { 'Content-Type': 'application/json' }
            if (!_headers) _headers = { 'Content-Type': 'application/json' }
            if (options?.headers) _headers = { ..._headers, ...options.headers }
            const response = await axios.post(url, options?.body, { headers: _headers })
            if (response.status === 200 || response.status === 201) {
                return response.data
            } else if (response.status === 204) {
                return {
                    message: 'ok',
                    data: options?.body
                }
            } else if (response.status === 401) {
                showSnackbar({ message: 'Unauthorized access', status: ComponentStatus.ERROR })
                ConfigData.onInvalidToken()
            } else {
                console.log("error: ??: ", response.statusText)
                return { status: response.status, message: response.statusText };
            }
        } catch (error) {
            showSnackbar({ message: `${error}`, status: ComponentStatus.ERROR })
            throw error;
        }
    }

    static postFile = async (url: string, options?: { headers?: { [k: string]: any }, body?: FormData }) => {
        try {
            if (options?.headers) {
                options.headers["Content-Type"] = "multipart/form-data"
            }
            const response = await axios.post(url, options?.body, { headers: options?.headers ?? { "Content-Type": "multipart/form-data" } })
            if (response.status === 200 || response.status === 201) {
                return response.data
            } else if (response.status === 204) {
                return {
                    message: 'ok',
                    data: options?.body
                }
            } else if (response.status === 401) {
                showSnackbar({ message: 'Unauthorized access', status: ComponentStatus.ERROR })
                ConfigData.onInvalidToken()
            } else {
                console.log("error: ??: ", response.statusText)
                return { status: response.status, message: response.statusText };
            }
        } catch (error) {
            console.error("Failed to POST data:", error);
            throw error;
        }
    }

    static get = async (url: string, options?: { headers?: { [k: string]: any } }) => {
        try {
            let _headers: { [k: string]: any } = url.startsWith(ConfigData.url) ? (await ConfigData.globalHeaders()) : { 'Content-Type': 'application/json' }
            if (!_headers) _headers = { 'Content-Type': 'application/json' }
            if (options?.headers) _headers = { ..._headers, ...options.headers }
            const response = await axios.get(url, { headers: _headers })
            if (response.status === 200 || response.status === 201) {
                return response.data
            } else if (response.status === 204) {
                return {
                    message: 'ok',
                    // data: options?.body
                }
            } else if (response.status === 401) {
                showSnackbar({ message: 'Unauthorized access', status: ComponentStatus.ERROR })
                ConfigData.onInvalidToken()
            } else {
                console.log("error: ??: ", response.statusText)
                return { status: response.status, message: response.statusText };
            }
        } catch (error) {
            console.error("Failed to GET data:", error);
            throw error;
        }
    }

    static uploadFiles = async (listFile: Array<{ uri: string; type: string; name: string }>) => {
        listFile = [...listFile];
        // const headersObj: any = await getHeaders()
        const headersObj: any = { pid: ConfigData.pid }
        const formData = new FormData();
        listFile.forEach(e => {
            formData.append("files", e);
        })
        const response = await BaseDA.postFile(ConfigData.url + 'file/uploadfiles', {
            headers: headersObj,
            body: formData,
        })
        return response;
    }

    static getFilesInfor = async (ids: Array<string>) => {
        const headersObj: any = {}
        const response = await BaseDA.post(ConfigData.url + 'file/getFilesInfor', {
            headers: headersObj,
            body: { ids: ids },
        })
        return response
    }

    static updateFilesInfor = async (data: Array<{ [p: string]: any }>) => {
        const headersObj: any = {}
        const response = await BaseDA.post(ConfigData.url + 'file/editFileInfor', {
            headers: headersObj,
            body: { data: data },
        })
        return response
    }
}